const { app, BrowserWindow, shell, ipcMain, session } = require('electron');
const path = require('node:path');

// ---------------------------------------------------------------------------
// DEFAULT_APP_URL: the hosted Sijil web app this desktop wrapper opens.
// This is the single place to change it (for example once a custom domain is
// chosen). It can still be overridden at runtime with SIJIL_APP_URL or
// --sijil-url=https://... ; only the resulting origin may load in the window.
// ---------------------------------------------------------------------------
const DEFAULT_APP_URL = 'https://sijil-dun.vercel.app';

const configuredUrl = process.env.SIJIL_APP_URL || process.argv.find((arg) => arg.startsWith('--sijil-url='))?.slice('--sijil-url='.length) || DEFAULT_APP_URL;
let appUrl;
try {
  appUrl = new URL(configuredUrl);
  if (appUrl.protocol !== 'https:' && appUrl.hostname !== 'localhost') throw new Error('Only HTTPS app URLs are allowed');
} catch (error) {
  console.error('Invalid SIJIL_APP_URL:', error.message);
  appUrl = new URL(DEFAULT_APP_URL);
}
const appOrigin = appUrl.origin;
let mainWindow;
let showingError = false;

// Auto-update: checks this repository's GitHub Releases (see "publish" in package.json)
// and installs a newer version the next time the app quits. Only runs in packaged builds.
function setupAutoUpdates() {
  if (!app.isPackaged) return;
  let autoUpdater;
  try { ({ autoUpdater } = require('electron-updater')); } catch (error) { console.error('Auto-update unavailable:', error.message); return; }
  autoUpdater.on('error', (error) => console.error('Auto-update error:', error && error.message));
  const check = () => autoUpdater.checkForUpdatesAndNotify().catch((error) => console.error('Update check failed:', error && error.message));
  check();
  setInterval(check, 6 * 60 * 60 * 1000).unref();
}

if (!app.requestSingleInstanceLock()) app.quit();
else {
  app.on('second-instance', () => {
    if (mainWindow) { if (mainWindow.isMinimized()) mainWindow.restore(); mainWindow.focus(); }
  });
  app.whenReady().then(() => { createWindow(); setupAutoUpdates(); });
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
  app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
}

function isAllowed(rawUrl) {
  try { return new URL(rawUrl).origin === appOrigin; } catch { return false; }
}
function openExternal(rawUrl) {
  try { const parsed = new URL(rawUrl); if (parsed.protocol === 'https:' || parsed.protocol === 'mailto:') shell.openExternal(parsed.href); } catch {}
}
function showError(message) {
  if (!mainWindow || mainWindow.isDestroyed() || showingError) return;
  showingError = true;
  const errorText = String(message || 'The Sijil service could not be reached.');
  mainWindow.loadFile(path.join(__dirname, 'offline.html'), { query: { message: errorText } }).catch(() => {});
}
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200, height: 800, minWidth: 360, minHeight: 560,
    title: 'Sijil', icon: path.join(__dirname, 'assets', 'icon.png'),
    backgroundColor: '#f7f8f6', show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true, sandbox: true, nodeIntegration: false,
      webviewTag: false, allowRunningInsecureContent: false, devTools: false
    }
  });
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.webContents.setWindowOpenHandler(({ url }) => { if (!isAllowed(url)) openExternal(url); return { action: 'deny' }; });
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (url.startsWith('file:') && showingError) return;
    if (!isAllowed(url)) { event.preventDefault(); openExternal(url); }
  });
  mainWindow.webContents.on('will-redirect', (event, url) => {
    if (!isAllowed(url)) { event.preventDefault(); openExternal(url); }
  });
  mainWindow.webContents.on('did-fail-load', (_event, code, description, _url, isMainFrame) => {
    if (isMainFrame && code !== -3) showError(description || 'The Sijil service could not be reached.');
  });
  mainWindow.on('closed', () => { mainWindow = null; });

  // Electron does not reliably emit did-fail-load for HTTP 4xx/5xx responses.
  // Observe top-level response status and replace error responses with the local retry screen.
  const filter = { urls: [`${appOrigin}/*`] };
  session.defaultSession.webRequest.onHeadersReceived(filter, (details, callback) => {
    if (details.resourceType === 'mainFrame' && details.statusCode >= 400) {
      setImmediate(() => showError(`Sijil returned an HTTP ${details.statusCode} error. Please try again in a moment.`));
    }
    callback({ responseHeaders: details.responseHeaders });
  });
  ipcMain.removeAllListeners('sijil:retry');
  ipcMain.on('sijil:retry', () => { if (mainWindow && !mainWindow.isDestroyed()) { showingError = false; mainWindow.loadURL(appUrl.href).catch((error) => showError(error.message)); } });
  mainWindow.loadURL(appUrl.href).catch((error) => showError(error.message));
}
