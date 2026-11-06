import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChevronDown } from 'lucide-react';
import manifest from './manifest.json';
import './styles.css';

const webApp = 'https://sijil-dun.vercel.app';
const files = [
  { platform: 'Windows', file: 'Sijil-win-x64.zip', detail: 'Windows x64, portable ZIP', key: 'windows' },
  { platform: 'Linux', file: 'Sijil-x86_64.AppImage', detail: 'Linux x86_64, AppImage', key: 'linux' },
];
const features = [
  ['One overview', 'See current, upcoming and overdue documents across locations and categories.'],
  ['Renewal reminders', 'Give your team advance notice, with time to find the document and plan a renewal.'],
  ['Documents with their dates', 'Keep each file and its important dates together so the next step is easy to find.'],
  ['A clear timeline', 'See what needs attention soon without digging through folders or inboxes.'],
];
const faqs = [
  ['What is Sijil?', 'Sijil is a business document expiry manager for licenses, contracts, permits, insurance and other documents with important dates.'],
  ['Is the desktop app a separate product?', 'No. It is a secure Electron wrapper around the hosted Sijil web app. It does not contain a local copy of the product or its business logic.'],
  ['Where is my data stored?', 'The wrapper opens the hosted service. Data handling and account features are provided by that service; the public repository contains no private application source.'],
  ['Are the downloads signed?', 'No. The desktop builds are unsigned. Windows SmartScreen may warn when you open the portable ZIP app.'],
  ['Can I use Sijil offline?', 'The wrapper needs an internet connection to load the hosted app. If the service is unavailable, it shows an offline screen with a retry option.'],
  ['Is there a macOS version?', 'Not yet. The macOS app is coming later and requires a Mac build.'],
];
function App() {
  return <main id="top">
    <header className="nav wrap"><a className="brand" href="#top"><span className="mark">س</span><span>Sijil</span></a><nav aria-label="Main navigation"><a href="#features">Features</a><a href="#download">Download</a><a href="https://github.com/MaeenAlganimi/sijil" target="_blank" rel="noreferrer">GitHub</a></nav><a className="button primary nav-cta" href="#download">Download</a></header>
    <section className="hero wrap"><div className="hero-copy"><h1>Know what’s due before it becomes urgent.</h1><p>Sijil helps businesses keep licenses, contracts, permits and insurance in view. Find the document and its renewal date together, with reminders to give your team time to act.</p><div className="hero-actions"><a className="button primary" href="#download">Download Sijil</a><a className="text-link" href={webApp} target="_blank" rel="noreferrer">Open the web app</a></div></div><ProductPreview/></section>
    <section className="section wrap who"><h2>For the documents a business depends on.</h2><p>When expiry dates are spread across folders, inboxes and calendars, it takes extra work to know what needs attention. Sijil gives business teams one place to follow documents and upcoming renewals.</p></section>
    <section className="section features" id="features"><div className="wrap"><h2>Keep important dates close to the work.</h2><dl className="feature-list">{features.map(([title, body]) => <div key={title}><dt>{title}</dt><dd>{body}</dd></div>)}</dl></div></section>
    <section className="section wrap how"><h2>How it works</h2><div><p>First, add a license, contract, permit or policy and record its important dates.</p><p>Then, choose when your team should get a reminder before expiry.</p><p>After that, check what is coming up and find the right document when it is time to act.</p></div></section>
    <section className="section wrap download" id="download"><div className="download-intro"><h2>Get Sijil for desktop</h2><p>The desktop app securely opens the hosted Sijil web app. Your account and document features are provided by that service.</p></div><div className="download-list">{files.map(({ platform, file, detail, key }) => { const item = manifest[key as keyof typeof manifest]; return <div className="download-row" key={file}><div><h3>{platform}</h3><p>{detail}</p><p className="integrity">{(item.size / 1024 / 1024).toFixed(1)} MB <span>SHA256</span> <code>{item.sha256}</code></p></div><a className="button primary download-button" href={`https://github.com/MaeenAlganimi/sijil/releases/latest/download/${file}`}>Download</a></div>; })}<div className="download-row coming"><div><h3>macOS</h3><p>Coming later. A Mac build is required.</p></div><span>Coming later</span></div></div><p className="download-note">Windows is distributed as a portable ZIP. Both builds are unsigned; Windows SmartScreen may warn when opening the app.</p></section>
    <section className="section faq"><div className="wrap faq-layout"><h2>Questions</h2><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={17} aria-hidden="true"/></summary><p>{answer}</p></details>)}</div></div></section>
    <footer className="footer wrap"><a className="brand" href="#top"><span className="mark">س</span><span>Sijil</span></a><p>Business document expiry management.</p><a href="https://github.com/MaeenAlganimi/sijil" target="_blank" rel="noreferrer">GitHub</a><small>Public product site built with AI assistance. The private application is maintained separately.</small></footer>
  </main>;
}
function ProductPreview() { return <div className="product-frame" aria-label="Illustrative Sijil interface preview"><div className="frame-head"><span className="mark">س</span><strong>Sijil</strong><span>Illustrative sample</span></div><div className="frame-body"><aside><b>Workspace</b><span>Overview</span><span>Documents</span><span>Reminders</span></aside><div className="preview-content"><p className="preview-label">WORKSPACE / DOCUMENTS</p><h3>Upcoming renewals</h3><p>Illustrative content, no customer data</p><div className="preview-lines"><div><b>Trade license</b><span>Operations, 12 days</span></div><div><b>Office lease</b><span>Contracts, 34 days</span></div><div><b>Public liability</b><span>Insurance, 61 days</span></div></div></div></div></div>; }
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
