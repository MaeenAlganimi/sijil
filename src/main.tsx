import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ChevronDown } from 'lucide-react';
import manifest from './manifest.json';
import { legal, LEGAL_DRAFT, type LegalDoc } from './legal';
import './styles.css';

type Language = 'en' | 'ar';
const webApp = 'https://sijil-dun.vercel.app';
const files = [
  { platform: 'Windows', file: 'Sijil-Setup-x64.exe', detail: { en: 'Windows 10/11 x64, installer (.exe)', ar: 'مثبّت (.exe) لنظام Windows 10/11 بمعمارية x64' }, key: 'windows' },
  { platform: 'Linux', file: 'Sijil-x86_64.AppImage', detail: { en: 'Linux x86_64, AppImage', ar: 'AppImage لنظام Linux بمعمارية x86_64' }, key: 'linux' },
];
const copy = {
  en: {
    nav: 'Main navigation', featuresNav: 'Features', download: 'Download', github: 'GitHub',
    heroTitle: 'Know what’s due before it becomes urgent.', heroBody: 'Sijil helps businesses keep licenses, contracts, permits and insurance in view. Find the document and its renewal date together, with reminders to give your team time to act.', downloadSijil: 'Download Sijil', webApp: 'Open the web app',
    whoTitle: 'For the documents a business depends on.', whoBody: 'When expiry dates are spread across folders, inboxes and calendars, it takes extra work to know what needs attention. Sijil gives business teams one place to follow documents and upcoming renewals.',
    featuresTitle: 'Keep important dates close to the work.', features: [
      ['One overview', 'See current, upcoming and overdue documents across locations and categories.'], ['Renewal reminders', 'Give your team advance notice, with time to find the document and plan a renewal.'], ['Documents with their dates', 'Keep each file and its important dates together so the next step is easy to find.'], ['A clear timeline', 'See what needs attention soon without digging through folders or inboxes.']],
    how: 'How it works', steps: ['First, add a license, contract, permit or policy and record its important dates.', 'Then, choose when your team should get a reminder before expiry.', 'After that, check what is coming up and find the right document when it is time to act.'],
    screensTitle: 'A closer look at Sijil', actualScreens: 'Actual product screens from the Sijil workspace.', screens: [['Documents and expiry dates', 'Sijil workspace showing business documents and their expiry dates', 'Open full-size Sijil documents and expiry dates screenshot in a new tab'], ['Renewal notifications', 'Sijil workspace showing document renewal notifications', 'Open full-size Sijil renewal notifications screenshot in a new tab']],
    videoTitle: 'See how it works', videoBody: 'A prerecorded walkthrough of the Sijil workspace, with synthetic narration.', videoFallback: 'Your browser does not support HTML video.', videoLink: 'Open the video directly',
    downloadTitle: 'Get Sijil for desktop', downloadBody: 'The desktop app securely opens the hosted Sijil web app. Your account and document features are provided by that service.', downloadButton: 'Download', coming: 'Coming later', macDetail: 'A Mac build is required.', note: 'Windows is a one-click setup .exe that installs for your user and adds Start Menu and desktop shortcuts. Builds are not code-signed, so SmartScreen may warn. Choose More info → Run anyway. Button labels may differ with your Windows language.',
    questions: 'Questions', faqs: [['What is Sijil?', 'Sijil is a business document expiry manager for licenses, contracts, permits, insurance and other documents with important dates.'], ['Is the desktop app a separate product?', 'No. It is a secure Electron wrapper around the hosted Sijil web app. It does not contain a local copy of the product or its business logic.'], ['Where is my data stored?', 'The wrapper opens the hosted service. Data handling and account features are provided by that service; the public repository contains no private application source.'], ['Are the downloads signed?', 'No. The desktop builds are unsigned. Windows SmartScreen may warn when you run the installer.'], ['Can I use Sijil offline?', 'The wrapper needs an internet connection to load the hosted app. If the service is unavailable, it shows an offline screen with a retry option.'], ['Is there a macOS version?', 'Not yet. The macOS app is coming later and requires a Mac build.']],
    footer: 'Business document expiry management.', footerNote: 'Public product site built with AI assistance. The private application is maintained separately.', frame: 'The Sijil workspace', home: 'Sijil home', switchLanguage: 'Switch language to Arabic'
  },
  ar: {
    nav: 'التنقل الرئيسي', featuresNav: 'المزايا', download: 'التنزيل', github: 'GitHub',
    heroTitle: 'اعرف ما يقترب موعده قبل أن يصبح أمرًا عاجلًا.', heroBody: 'يساعد سجل الشركات على متابعة التراخيص والعقود والتصاريح والتأمين. اجمع المستند وتاريخ تجديده في مكان واحد، مع تذكيرات تمنح فريقك وقتًا للتصرف.', downloadSijil: 'نزّل سجل', webApp: 'افتح تطبيق الويب',
    whoTitle: 'للمستندات التي يعتمد عليها عملك.', whoBody: 'حين تتوزع تواريخ الانتهاء بين الملفات والبريد والتقويمات، يصبح تحديد ما يحتاج إلى متابعة مهمة إضافية. يمنح سجل فرق العمل مكانًا واحدًا لمتابعة المستندات والتجديدات القادمة.',
    featuresTitle: 'لا تفوّت مواعيد التجديد.', features: [
      ['نظرة شاملة', 'تابع المستندات الحالية والقادمة والمتأخرة حسب المواقع والفئات.'], ['تذكيرات التجديد', 'نبّه فريقك مبكرًا ليجد المستند ويخطط لتجديده في الوقت المناسب.'], ['المستند ومواعيده معًا', 'احتفظ بكل ملف ومواعيده المهمة في مكان واحد لتعرف الخطوة التالية بسهولة.'], ['جدول زمني واضح', 'اعرف ما يحتاج إلى اهتمام قريبًا دون البحث بين المجلدات أو الرسائل.']],
    how: 'كيف يعمل', steps: ['أضف الترخيص أو العقد أو التصريح أو وثيقة التأمين، وسجّل مواعيده المهمة.', 'اختر موعد إرسال التذكير إلى فريقك قبل انتهاء الصلاحية.', 'تابع ما يقترب موعده واعثر على المستند المناسب عندما يحين وقت التصرف.'],
    screensTitle: 'ألقِ نظرة على سجل', actualScreens: 'لقطات فعلية من مساحة عمل سجل.', screens: [['المستندات وتواريخ الانتهاء', 'مساحة عمل سجل تعرض مستندات الشركة وتواريخ انتهائها', 'افتح لقطة المستندات وتواريخ الانتهاء بالحجم الكامل في علامة تبويب جديدة'], ['إشعارات التجديد', 'مساحة عمل سجل تعرض إشعارات تجديد المستندات', 'افتح لقطة إشعارات التجديد بالحجم الكامل في علامة تبويب جديدة']],
    videoTitle: 'شاهد طريقة العمل', videoBody: 'جولة مسجلة مسبقًا في مساحة عمل سجل، بتعليق صوتي مولّد اصطناعيًا.', videoFallback: 'متصفحك لا يدعم تشغيل الفيديو.', videoLink: 'افتح الفيديو مباشرة',
    downloadTitle: 'نزّل سجل لسطح المكتب', downloadBody: 'يفتح تطبيق سطح المكتب خدمة سجل المستضافة بأمان. حسابك وميزات إدارة المستندات متاحة عبر هذه الخدمة.', downloadButton: 'تنزيل', coming: 'قريبًا', macDetail: 'يتطلب إصدار macOS إعداد نسخة على جهاز Mac.', note: 'ملف Windows هو مثبّت سريع (.exe) يثبّت التطبيق لحسابك ويضيف اختصارات إلى قائمة Start وسطح المكتب. التطبيقات غير موقّعة رقميًا، لذلك قد يعرض SmartScreen تحذيرًا. اختر More info ثم Run anyway. قد تختلف أسماء الأزرار حسب لغة Windows.',
    questions: 'الأسئلة الشائعة', faqs: [['ما هو سجل؟', 'سجل أداة لمتابعة انتهاء مستندات الأعمال، مثل التراخيص والعقود والتصاريح والتأمين وغيرها من المستندات ذات المواعيد المهمة.'], ['هل تطبيق سطح المكتب منتج منفصل؟', 'لا. إنه غلاف آمن مبني على Electron يفتح تطبيق سجل المستضاف، ولا يتضمن الشيفرة المصدرية للتطبيق الخاص.'], ['أين تُخزّن بياناتي؟', 'يفتح التطبيق الخدمة المستضافة، وهي التي تتولى البيانات وميزات الحساب. لا يحتوي المستودع العام على الشيفرة المصدرية للتطبيق الخاص.'], ['هل ملفات التنزيل موقّعة؟', 'لا، إصدارات سطح المكتب غير موقّعة. قد يعرض Windows SmartScreen تحذيرًا عند تشغيل المثبّت.'], ['هل يعمل سجل دون اتصال؟', 'يحتاج التطبيق إلى اتصال بالإنترنت لتحميل الخدمة المستضافة. وإذا تعذّر الوصول إليها، تظهر شاشة انقطاع مع خيار إعادة المحاولة.'], ['هل يتوفر إصدار macOS؟', 'ليس بعد. سيصدر تطبيق macOS لاحقًا، ويتطلب إعداد نسخة على جهاز Mac.']],
    footer: 'إدارة مواعيد انتهاء مستندات الأعمال.', footerNote: 'موقع تعريفي عام أُعد بمساعدة الذكاء الاصطناعي. ويُطوّر التطبيق الخاص بشكل منفصل.', frame: 'مساحة عمل سجل', home: 'الصفحة الرئيسية لسجل', switchLanguage: 'غيّر اللغة إلى الإنجليزية'
  }
} as const;

type Page = 'home' | 'privacy' | 'terms';
function getPage(): Page {
  const path = window.location.pathname.replace(/\/+$/, '');
  return path === '/privacy' ? 'privacy' : path === '/terms' ? 'terms' : 'home';
}
const page = getPage();
const home = page === 'home' ? '' : '/';
function withPlaceholders(text: string) {
  return text.split(/(\[[^\]]+\])/).map((part, i) => /^\[[^\]]+\]$/.test(part) ? <mark key={i} className="placeholder" dir="ltr">{part}</mark> : part);
}
function LegalPage({ doc, language }: { doc: LegalDoc; language: Language }) {
  const l = legal[language];
  return <article className="legal wrap" aria-labelledby="legal-title">
    <nav className="legal-switch" aria-label={language === 'ar' ? 'الصفحات القانونية' : 'Legal pages'}><a href="/privacy" aria-current={page === 'privacy' ? 'page' : undefined}>{l.privacyLabel}</a><a href="/terms" aria-current={page === 'terms' ? 'page' : undefined}>{l.termsLabel}</a></nav>
    <h1 id="legal-title">{doc.title}</h1>
    <p className="legal-updated">{withPlaceholders(l.updated)}</p>
    {LEGAL_DRAFT && <p className="legal-draft" role="note">{l.draft}</p>}
    {doc.intro.map((text) => <p key={text}>{withPlaceholders(text)}</p>)}
    {doc.sections.map((section) => <section key={section.h}><h2>{section.h}</h2>{section.p?.map((text) => <p key={text}>{withPlaceholders(text)}</p>)}{section.ul && <ul>{section.ul.map((item) => <li key={item}>{withPlaceholders(item)}</li>)}</ul>}</section>)}
    <p className="legal-back"><a className="text-link" href="/">{l.back}</a></p>
  </article>;
}
function getInitialLanguage(): Language {
  try { const saved = localStorage.getItem('site-language'); if (saved === 'en' || saved === 'ar') return saved; } catch { /* Storage may be disabled. */ }
  return navigator.language.toLowerCase().startsWith('ar') ? 'ar' : 'en';
}
function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const t = copy[language];
  useEffect(() => {
    const rtl = language === 'ar';
    document.documentElement.lang = language;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.title = rtl ? 'سجل — إدارة مواعيد مستندات الأعمال' : 'Sijil — Business document expiry manager';
    document.querySelector('meta[name="description"]')?.setAttribute('content', rtl ? 'يساعد سجل الشركات على متابعة التراخيص والعقود والتصاريح والتأمين ومواعيد تجديدها.' : 'Sijil helps businesses keep licenses, contracts, permits and insurance in view, with reminders before renewal.');
    if (page !== 'home') document.title = `${legal[language][page].title} — ${rtl ? 'سجل' : 'Sijil'}`;
    try { localStorage.setItem('site-language', language); } catch { /* Storage may be disabled. */ }
  }, [language]);
  const switchLanguage = () => setLanguage((current) => current === 'en' ? 'ar' : 'en');
  const videoBase = language === 'ar' ? '/demo/sijil-explainer-ar' : '/demo/sijil-explainer';
  return <main id="top">
    <header className="nav wrap"><a className="brand" href={page === 'home' ? '#top' : '/'} aria-label={t.home}><span className="mark">س</span><span>{language === 'en' ? 'Sijil' : 'سجل'}</span></a><nav aria-label={t.nav}><a href={`${home}#features`}>{t.featuresNav}</a><a href={`${home}#download`}>{t.download}</a><a href="https://github.com/MaeenAlganimi/sijil" target="_blank" rel="noreferrer">GitHub</a></nav><div className="nav-actions"><button className="language-toggle" type="button" onClick={switchLanguage} aria-pressed={language === 'ar'} aria-label={t.switchLanguage}>EN | عر</button><a className="button primary nav-cta" href={`${home}#download`}>{t.download}</a></div></header>
    {page === 'home' ? <>
    <section className="hero wrap"><div className="hero-copy"><h1>{t.heroTitle}</h1><p>{t.heroBody}</p><div className="hero-actions"><a className="button primary" href={`${home}#download`}>{t.downloadSijil}</a><a className="text-link" href={webApp} target="_blank" rel="noreferrer">{t.webApp}</a></div></div><ProductPreview frame={t.frame} language={language}/></section>
    <section className="section wrap who"><h2>{t.whoTitle}</h2><p>{t.whoBody}</p></section>
    <section className="section features" id="features"><div className="wrap"><h2>{t.featuresTitle}</h2><dl className="feature-list">{t.features.map(([title, body]) => <div key={title}><dt>{title}</dt><dd>{body}</dd></div>)}</dl></div></section>
    <section className="section wrap how"><h2>{t.how}</h2><div>{t.steps.map((step) => <p key={step}>{step}</p>)}</div></section>
    <section className="section product-tour" aria-labelledby="screens-title"><div className="wrap"><h2 id="screens-title">{t.screensTitle}</h2><p className="tour-intro">{t.actualScreens}</p><div className="screens-gallery">{t.screens.map(([caption, alt, aria], i) => <figure key={caption}><a className="screen-link" href={i === 0 ? '/demo/documents.webp' : '/demo/notifications.webp'} target="_blank" rel="noreferrer" aria-label={aria}><img src={i === 0 ? '/demo/documents.webp' : '/demo/notifications.webp'} alt={alt} loading="lazy"/></a><figcaption>{caption}</figcaption></figure>)}</div></div></section>
    <section className="section wrap video-section" aria-labelledby="video-title"><div className="video-copy"><h2 id="video-title">{t.videoTitle}</h2><p>{t.videoBody}</p></div><video key={language} className="explainer-video" controls playsInline preload="metadata" poster={language === 'ar' ? '/demo/video-poster-ar.jpg' : '/demo/video-poster.jpg'}><source src={`${videoBase}.mp4`} type="video/mp4"/><track kind="captions" src={`${videoBase}.vtt`} srcLang={language} label={language === 'ar' ? 'العربية' : 'English'} default/>{t.videoFallback} <a href={`${videoBase}.mp4`}>{t.videoLink}</a></video></section>
    <section className="section wrap download" id="download"><div className="download-intro"><h2>{t.downloadTitle}</h2><p>{t.downloadBody}</p></div><div className="download-list">{files.map(({ platform, file, detail, key }) => { const item = manifest[key as keyof typeof manifest]; return <div className="download-row" key={file}><div><h3 dir="ltr">{platform}</h3><p>{detail[language]}</p><p className="integrity"><bdi dir="ltr">{(item.size / 1024 / 1024).toFixed(1)} MB</bdi> <span>SHA256</span> <code dir="ltr">{item.sha256}</code></p></div><a className="button primary download-button" href={`https://github.com/MaeenAlganimi/sijil/releases/latest/download/${file}`}>{t.downloadButton}</a></div>; })}<div className="download-row coming"><div><h3 dir="ltr">macOS</h3><p>{t.macDetail}</p></div><span>{t.coming}</span></div></div><p className="download-note">{t.note}</p></section>
    <section className="section faq"><div className="wrap faq-layout"><h2>{t.questions}</h2><div className="faq-list">{t.faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={17} aria-hidden="true"/></summary><p>{answer}</p></details>)}</div></div></section>
    </> : <LegalPage doc={legal[language][page]} language={language}/>}
    <footer className="footer wrap"><a className="brand" href={page === 'home' ? '#top' : '/'}><span className="mark">س</span><span>{language === 'en' ? 'Sijil' : 'سجل'}</span></a><p>{t.footer}</p><nav className="footer-links" aria-label={language === 'ar' ? 'روابط التذييل' : 'Footer'}><a href="https://github.com/MaeenAlganimi/sijil" target="_blank" rel="noreferrer">GitHub</a><a href="/privacy">{legal[language].privacyLabel}</a><a href="/terms">{legal[language].termsLabel}</a></nav><small>{t.footerNote}</small></footer>
  </main>;
}
function ProductPreview({ frame, language }: { frame: string; language: Language }) { return <figure className="product-frame hero-screen"><figcaption className="frame-head"><span className="mark">س</span><strong>{language === 'en' ? 'Sijil' : 'سجل'}</strong><span>{frame}</span></figcaption><img src="/demo/dashboard.webp" alt={frame} fetchPriority="high"/></figure>; }
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
