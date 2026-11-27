import React, { useCallback, useEffect, useState } from 'react';
import { siteConfig } from './siteConfig';

const ASSET = '/images/';

/** Featured roster (full game has 9 playable fighters). */
const fighters = [
  { id: 'pacer', name: 'PACER', className: 'LONG LEGS', description: 'A long-legged shotgun specialist — fast on the move, lethal at mid range, and a natural pick for the campaign.', color: '#ffb542', image: 'fighter-pacer.png', stat: 'SHOTGUN BURST', number: '01', frame: 'portrait' },
  { id: 'buster', name: 'BUSTER', className: 'HAIR BUSTER RIBBERTS', description: 'Close-range bruiser with slash, throw, and kick attacks — built for aggressive 1v1 pressure.', color: '#ff5a3c', image: 'fighter-buster.png', stat: 'MELEE ASSAULT', number: '02', frame: 'portrait' },
  { id: 'gastino', name: 'GASTINO', className: 'THE WILDCARD', description: 'A distinct combat silhouette from the Character Select roster — ready for campaign or arena duels.', color: '#41b8ff', image: 'fighter-gastino.png', stat: 'VERSATILE FIGHTER', number: '03', frame: 'portrait' },
  { id: 'xebec', name: 'XEBEC', className: 'THE ENFORCER', description: 'Heavy presence on the battlefield. One of nine machines you can pilot across every game mode.', color: '#93df4e', image: 'fighter-xebec.png', stat: 'HEAVY FRAME', number: '04', frame: 'portrait' },
];

const enemies = [
  { id: 'shotgun', name: 'SHOTGUN UNIT', image: 'enemy-shotgun.png', number: 'E–01', note: 'Close-range cannon hostile' },
  { id: 'assault', name: 'ASSAULT UNIT', image: 'enemy-assault.png', number: 'E–02', note: 'Hammer-armed frontline machine' },
  { id: 'marksman', name: 'MARKSMAN UNIT', image: 'enemy-marksman.png', number: 'E–03', note: 'Long-rifle enemy fire' },
  { id: 'patrol', name: 'PATROL UNIT', image: 'enemy-patrol.png', number: 'E–04', note: 'Industrial sentry threat' },
];

const gallery = [
  { image: 'battle-street.gif', label: 'STREET SWEEP', sub: 'Campaign chase through the city', category: 'action' },
  { image: 'gallery-team.png', label: 'THE ROSTER', sub: 'Pacer, Gastino, Hendrix, and Rodeo on the arena floor', category: 'fighters' },
  { image: 'battle-city.gif', label: 'CITY FIREFIGHT', sub: 'Enemies firing across the neon street', category: 'action' },
  { image: 'gallery-showdown.png', label: 'SHOWDOWN', sub: 'Pacer closes in on the factory floor', category: 'fighters' },
  { image: 'battle-trees.gif', label: 'TREE LINE', sub: 'Enemies grouped under the trees', category: 'action' },
  { image: 'battle-factory.gif', label: 'FACTORY FLOOR', sub: 'Push through the industrial hall', category: 'action' },
  { image: 'battle-boss.gif', label: 'FRONT GUARD', sub: 'Boss fight on the open field', category: 'action' },
  { image: 'gallery-roster.png', label: 'OPEN FIRE', sub: 'The lineup cuts through the arena', category: 'fighters' },
];

const questions = [
  { q: 'What kind of game is Dishonored?', a: 'Dishonored is a 3D robot fighting game. It features a campaign, offline and online 1v1 Arena modes, and dedicated Boss Fights with four bosses.' },
  { q: 'Which platform is the game for?', a: 'Dishonored is a Windows PC build. Use the download button to save the game as a RAR file.' },
  { q: 'Can I download the game right now?', a: 'Yes. Download for Windows saves the Dishonored Battle RAR to your computer.' },
  { q: 'What modes does the game include?', a: 'Singleplayer campaign levels, 1v1 Arena (VS Player online or VS Bot offline with difficulty select), and Boss Fights against Railway Protector, Excavator, Front Guard, and Brain Bot.' },
  { q: 'How many fighters can I play?', a: 'There are nine selectable fighters: Pacer, Buster, Gastino, Xebec, Hendrix, Bigbata, Macky, Rodeo, and Glamour. This site spotlights Pacer, Buster, Gastino, and Xebec.' },
];

function Icon({ name, size = 20, strokeWidth = 1.9 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    arrowUp: <><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></>,
    download: <><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 17v4h16v-4"/></>,
    external: <><path d="M13 5h6v6"/><path d="m19 5-9 9"/><path d="M19 13v6H5V5h6"/></>,
    play: <path d="m8 5 11 7-11 7z"/>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <path d="M5 5 19 19M19 5 5 19"/>,
    check: <path d="m5 12 4 4L19 6"/>,
    plus: <path d="M12 5v14M5 12h14"/>,
    minus: <path d="M5 12h14"/>,
    chevronLeft: <path d="m15 18-6-6 6-6"/>,
    chevronRight: <path d="m9 18 6-6-6-6"/>,
    monitor: <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></>,
    shield: <><path d="m12 22 8-5V6l-8-4-8 4v11z"/><path d="m9 12 2 2 4-4"/></>,
    crosshair: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/></>,
    bolt: <path d="m13 2-9 12h7l-1 8 10-12h-7z"/>,
    spark: <><path d="m12 3 1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5z"/><path d="M19 17v4M17 19h4"/></>,
    eye: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>,
    window: <><path d="M3 5 11 4v8H3zM13 3l8-1v10h-8zM3 14h8v8l-8-1zM13 14h8v8l-8-1z"/></>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/></>,
  };
  return <svg {...common}>{paths[name] || paths.arrow}</svg>;
}

function Brand({ compact = false }) {
  return <a href="#home" className={`brand ${compact ? 'brand-compact' : ''}`} aria-label="Dishonored 3D Fighting Game, go to home">
    <span className="brand-symbol" aria-hidden="true"><span /></span>
    <span className="brand-words"><strong>DISHONORED</strong><small>3D FIGHTING GAME</small></span>
  </a>;
}

function SectionEyebrow({ number, children }) {
  return <div className="section-eyebrow"><span className="eyebrow-bar"/><span>{number} / {children}</span></div>;
}

function SectionHead({ number, eyebrow, first, accent, description, right }) {
  return <div className="section-header">
    <div><SectionEyebrow number={number}>{eyebrow}</SectionEyebrow><h2>{first} <em>{accent}</em></h2>{description && <p>{description}</p>}</div>
    {right && <div className="section-head-right">{right}</div>}
  </div>;
}

function DownloadButton({ onClick, small = false, className = '' }) {
  return <button className={`btn btn-primary ${small ? 'btn-small' : ''} ${className}`} onClick={onClick} type="button"><Icon name="download" size={small ? 17 : 19}/><span>Download for Windows</span><Icon name="arrow" size={small ? 17 : 19}/></button>;
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [activeFighter, setActiveFighter] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [faqOpen, setFaqOpen] = useState(0);
  const filteredGallery = gallery.filter(item => galleryFilter === 'all' || item.category === galleryFilter);
  const current = fighters[activeFighter];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    handleScroll(); window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const isModalOpen = downloadOpen || lightboxIndex !== null;
    if (!isModalOpen) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const keydown = e => {
      if (e.key === 'Escape') { setDownloadOpen(false); setLightboxIndex(null); }
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowRight') setLightboxIndex(i => (i + 1) % filteredGallery.length);
        if (e.key === 'ArrowLeft') setLightboxIndex(i => (i - 1 + filteredGallery.length) % filteredGallery.length);
      }
    };
    window.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = old; window.removeEventListener('keydown', keydown); };
  }, [downloadOpen, lightboxIndex, filteredGallery.length]);

  const handleDownload = useCallback(() => {
    if (siteConfig.downloadUrl) {
      const link = document.createElement('a');
      link.href = siteConfig.downloadUrl;
      if (!/^https?:\/\//i.test(siteConfig.downloadUrl)) link.download = siteConfig.downloadFilename;
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link); link.click(); link.remove();
    } else setDownloadOpen(true);
  }, []);

  const navLinks = [['#home', 'Home'], ['#about', 'About'], ['#fighters', 'Fighters'], ['#gallery', 'Gallery'], ['#faq', 'FAQ']];
  const closeNav = () => setNavOpen(false);

  return <>
    <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
      <div className="container nav-wrap">
        <Brand />
        <nav className={`nav-links ${navOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {navLinks.map(([href, label]) => <a key={href} href={href} onClick={closeNav}>{label}</a>)}
          <button className="mobile-download" onClick={() => { setNavOpen(false); handleDownload(); }}><Icon name="download" size={17}/> Windows Download</button>
        </nav>
        <div className="nav-actions">
          <button className="header-download" onClick={handleDownload}><Icon name="download" size={17}/> GET THE GAME <Icon name="arrow" size={16}/></button>
          <button type="button" className="menu-toggle" aria-label={navOpen ? 'Close menu' : 'Open menu'} aria-expanded={navOpen} onClick={() => setNavOpen(!navOpen)}><Icon name={navOpen ? 'close' : 'menu'} size={25}/></button>
        </div>
      </div>
    </header>

    <main>
      <section id="home" className="hero">
        <div className="hero-background"/>
        <div className="hero-shade"/>
        <div className="hero-noise"/>
        <div className="container hero-content">
          <div className="hero-copy">
            <div className="hero-topline"><span className="live-marker"/><span>A NEW BREED OF ROBOT COMBAT</span><span className="hero-serial">// D–01</span></div>
            <p className="hero-suptitle">DISHONORED <span className="slanted-divider">/</span> 3D FIGHTING GAME</p>
            <h1>BUILT<br/>TO <span className="hero-outline">BRAWL.</span></h1>
            <p className="hero-description">Nine playable machines. Campaign missions. 1v1 Arena and Boss Fights. Step into an industrial world where metal meets mayhem.</p>
            <div className="hero-buttons">
              <DownloadButton onClick={handleDownload}/>
              <a className="btn btn-secondary" href="#fighters"><span>MEET THE FIGHTERS</span><Icon name="arrow" size={18}/></a>
            </div>
            <div className="hero-meta">
              <span><Icon name="monitor" size={17}/> WINDOWS PC</span><i/>
              <span><Icon name="crosshair" size={17}/> 3D COMBAT</span><i/>
              <span>NINE FIGHTERS</span>
            </div>
          </div>
          <div className="hero-side-tag"><span>01</span><div><strong>THE ARENA<br/>IS OPEN</strong><small>SCROLL TO DISCOVER</small></div></div>
        </div>
        <a className="hero-scroll" href="#about" aria-label="Scroll to about section"><span>SCROLL TO EXPLORE</span><span className="scroll-line"/></a>
        <div className="hero-corner">PC — 2026</div>
      </section>

      <div className="ticker" aria-label="Game modes">
        <div className="ticker-inner">
          {Array.from({ length: 2 }, (_, i) => (
            <React.Fragment key={i}>
              <span>CAMPAIGN</span><b>✳</b>
              <span>1V1 ARENA</span><b>✳</b>
              <span>VS PLAYER</span><b>✳</b>
              <span>VS BOT</span><b>✳</b>
              <span>BOSS FIGHTS</span><b>✳</b>
              <span>NINE FIGHTERS</span><b>✳</b>
            </React.Fragment>
          ))}
        </div>
      </div>

      <section id="about" className="section about-section">
        <div className="container about-grid">
          <div className="about-visual">
            <div className="about-image-frame">
              <img src={ASSET + 'gallery-action.png'} loading="lazy" alt="Dishonored promotional combat scene"/>
              <div className="about-image-glow"/>
            </div>
            <div className="about-stamp"><span>ORIGINAL</span><strong>3D</strong><span>ROBOT COMBAT</span></div>
            <div className="visual-corner-lines"/>
          </div>
          <div className="about-text">
            <SectionEyebrow number="01">ABOUT THE GAME</SectionEyebrow>
            <h2>WELCOME TO<br/>THE <em>IRON AGE.</em></h2>
            <p className="about-lead">Dishonored is a 3D robot fighting game — campaign levels, online and offline arena duels, and four signature boss encounters.</p>
            <p>Pick from nine fighters, clear industrial stages, challenge Railway Protector, Excavator, Front Guard, or Brain Bot, or jump into 1v1 Arena against a player or a difficulty-tuned bot.</p>
            <div className="about-divider"/>
            <div className="feature-list">
              <div><span className="feature-icon"><Icon name="crosshair" size={22}/></span><div><strong>CAMPAIGN + ARENA + BOSSES</strong><small>Story levels, VS Player / VS Bot 1v1, and dedicated Boss Fights.</small></div></div>
              <div><span className="feature-icon"><Icon name="shield" size={22}/></span><div><strong>NINE DISTINCT FIGHTERS</strong><small>Pacer, Buster, Gastino, Xebec, Hendrix, Bigbata, Macky, Rodeo, Glamour.</small></div></div>
              <div><span className="feature-icon"><Icon name="spark" size={22}/></span><div><strong>A COMPLETE WINDOWS GAME</strong><small>Download the build and fight through campaign, arena, and bosses.</small></div></div>
            </div>
            <a className="text-link" href="#gallery">EXPLORE THE WORLD <Icon name="arrow" size={20}/></a>
          </div>
        </div>
      </section>

      <section className="section feature-banner">
        <div className="container"><div className="feature-banner-grid">
          <div className="feature-tile"><span className="feature-count">01 / CAMPAIGN</span><Icon name="crosshair" size={34}/><h3>CLEAR THE<br/>LAB</h3><p>Progress through industrial levels, hostile machines, and mission objectives.</p></div>
          <div className="feature-tile"><span className="feature-count">02 / 1V1 ARENA</span><Icon name="shield" size={34}/><h3>DUEL ONLINE<br/>OR VS BOT</h3><p>VS Player multiplayer or offline VS Bot with Easy, Normal, and Chaotic difficulty.</p></div>
          <div className="feature-tile"><span className="feature-count">03 / BOSS FIGHTS</span><Icon name="bolt" size={34}/><h3>FACE THE<br/>FOUR</h3><p>Railway Protector, Excavator, Front Guard, and Brain Bot await.</p></div>
        </div></div>
      </section>

      <section id="fighters" className="section fighters-section">
        <div className="container">
          <SectionHead
            number="02"
            eyebrow="THE FIGHTERS"
            first="CHOOSE YOUR"
            accent="UNIT."
            description="Nine machines in the full roster. Here are four featured fighters."
            right={<span className="small-counter">04 / FEATURED · 09 TOTAL</span>}
          />
          <div className="fighter-tabs" role="tablist" aria-label="Select a robot fighter">
            {fighters.map((fighter, i) => (
              <button key={fighter.id} className={activeFighter === i ? 'fighter-tab active' : 'fighter-tab'} onClick={() => setActiveFighter(i)} role="tab" aria-selected={activeFighter === i} style={{ '--unit-color': fighter.color }}>
                <span>{fighter.number}</span><strong>{fighter.name}</strong><span className="tab-dot"/>
              </button>
            ))}
          </div>
          <div className={`fighter-showcase fighter-${current.id}`} style={{ '--unit-color': current.color }}>
            <div className="fighter-backdrop-word" aria-hidden="true">{current.id.toUpperCase()}</div>
            <div className="fighter-info">
              <span className="fighter-class">[ {current.className} ]</span>
              <div className="fighter-number">UNIT <strong>{current.number}</strong></div>
              <h3>{current.name}</h3>
              <p>{current.description}</p>
              <div className="fighter-weapon"><span>RECOGNIZABLE LOADOUT</span><strong>{current.stat}</strong></div>
              <div className="fighter-pagination">
                {fighters.map((f, i) => <button key={f.id} aria-label={`View ${f.name}`} onClick={() => setActiveFighter(i)} className={activeFighter === i ? 'active' : ''} />)}
              </div>
            </div>
            <div className="fighter-image" key={current.id}>
              <img className={current.frame === 'portrait' ? 'frame-portrait' : 'frame-scene'} src={ASSET + current.image} alt={current.name + ' character select artwork'}/>
            </div>
            <div className="fighter-vertical">CHARACTER FILE // {current.number}</div>
          </div>
        </div>
      </section>

      <section id="enemies" className="section enemy-section">
        <div className="container">
          <SectionHead number="03" eyebrow="THE OPPOSITION" first="MEET THE" accent="ENEMIES." description="Hostile machines fill the campaign floors. Know what you are up against." right={<span className="small-counter">04 / ENEMY DESIGNS</span>} />
          <div className="enemy-grid">
            {enemies.map(enemy => (
              <article key={enemy.id} className="enemy-card">
                <div className="enemy-card-top"><span>{enemy.number}</span><Icon name="crosshair" size={20}/></div>
                <div className="enemy-portrait"><img src={ASSET + enemy.image} alt={enemy.name} loading="lazy"/></div>
                <div className="enemy-card-bottom"><h3>{enemy.name}</h3><p>{enemy.note}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="section gallery-section">
        <div className="container">
          <SectionHead number="04" eyebrow="MEDIA GALLERY" first="INSIDE THE" accent="ARENA." description="Key art and gameplay from Dishonored." right={<span className="small-counter">08 / MEDIA</span>}/>
          <div className="gallery-filter" aria-label="Filter gallery">
            {[['all', 'All images'], ['action', 'Battle scenes'], ['fighters', 'Fighters']].map(([value, label]) => (
              <button key={value} type="button" className={galleryFilter === value ? 'selected' : ''} onClick={() => { setGalleryFilter(value); setLightboxIndex(null); }}>{label}</button>
            ))}
          </div>
          <div className="gallery-grid">
            {filteredGallery.map((item, i) => (
              <button className={`gallery-item ${galleryFilter === 'all' && i === 0 ? 'gallery-large' : ''}`} key={item.image} onClick={() => setLightboxIndex(i)} aria-label={'View ' + item.label}>
                <img loading="lazy" src={ASSET + item.image} alt={item.sub}/>
                <span className="gallery-image-overlay"/>
                <span className="gallery-label"><small>MEDIA / {String(i + 1).padStart(2, '0')}</small><strong>{item.label}</strong></span>
                <span className="gallery-expand"><Icon name="external" size={19}/></span>
              </button>
            ))}
          </div>
          <p className="gallery-note"><Icon name="info" size={16}/> Battle scenes are short loops from gameplay. Fighter stills are key art.</p>
        </div>
      </section>

      <section className="section project-strip">
        <div className="container project-strip-content">
          <div><span>EVERY MACHINE HAS A STORY</span><h2>THIS IS ONLY THE <em>BEGINNING.</em></h2></div>
          <a href="#download" className="btn btn-secondary">GET THE GAME <Icon name="arrow" size={19}/></a>
        </div>
      </section>

      <section id="download" className="section download-section">
        <div className="download-pattern"/>
        <div className="container download-inner">
          <div className="download-intro">
            <SectionEyebrow number="05">THE GAME</SectionEyebrow>
            <h2>READY TO<br/><em>ENTER THE FIGHT?</em></h2>
            <p>Bring the robot arena to your desktop. Download the Windows build and enter the fight.</p>
            <div className="download-meta">
              <span><Icon name="window" size={20}/> WINDOWS PC</span>
              <span><Icon name="check" size={20}/> 3D FIGHTING GAME</span>
            </div>
            <DownloadButton onClick={handleDownload} className="download-big"/>
            <span className="release-note"><span className="live-marker"/> {siteConfig.downloadUrl ? 'Windows build available' : 'Windows installer not linked yet'}</span>
          </div>
          <div className="download-visual">
            <img src={ASSET + 'hero-firefight.png'} alt="Dishonored promotional firefight" loading="lazy"/>
            <div className="download-image-vignette"/>
            <div className="download-visual-label"><span>PC / WINDOWS</span><strong>DISHONORED</strong><span>3D FIGHTING GAME</span></div>
          </div>
        </div>
      </section>

      <section id="faq" className="section faq-section">
        <div className="container faq-grid">
          <div className="faq-left">
            <SectionEyebrow number="06">QUESTIONS & ANSWERS</SectionEyebrow>
            <h2>GOOD TO<br/><em>KNOW.</em></h2>
            <p>A few things to know about Dishonored and the Windows download.</p>
            <a className="text-link" href="#home">BACK TO THE TOP <Icon name="arrowUp" size={19}/></a>
          </div>
          <div className="faq-list">
            {questions.map((item, i) => (
              <div className={`faq-item ${faqOpen === i ? 'is-open' : ''}`} key={item.q}>
                <button onClick={() => setFaqOpen(faqOpen === i ? -1 : i)} aria-expanded={faqOpen === i}>
                  <span className="faq-index">0{i + 1}</span><span>{item.q}</span>
                  <span className="faq-toggle"><Icon name={faqOpen === i ? 'minus' : 'plus'} size={19}/></span>
                </button>
                {faqOpen === i && <div className="faq-answer"><p>{item.a}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>

    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Brand/>
            <p>A 3D robot fighting game.<br/>Nine fighters. Campaign, arena, and boss fights.</p>
          </div>
          <div className="footer-nav">
            <div><strong>EXPLORE</strong><a href="#about">About</a><a href="#fighters">Fighters</a><a href="#enemies">Enemies</a></div>
            <div><strong>THE GAME</strong><a href="#gallery">Gallery</a><a href="#faq">FAQ</a><button onClick={handleDownload}>Windows Download</button></div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DISHONORED: 3D FIGHTING GAME.</span>
          <a href="#home">BACK TO TOP <Icon name="arrowUp" size={15}/></a>
          <span>MADE FOR THE ARENA <span className="footer-red">✳</span></span>
        </div>
      </div>
    </footer>

    {downloadOpen && (
      <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setDownloadOpen(false); }} role="presentation">
        <div className="download-modal" role="dialog" aria-modal="true" aria-labelledby="download-dialog-heading">
          <button className="modal-close" onClick={() => setDownloadOpen(false)} aria-label="Close download dialog"><Icon name="close" size={23}/></button>
          <div className="modal-emblem"><Icon name="window" size={34}/></div>
          <div className="section-eyebrow"><span className="eyebrow-bar"/><span>WINDOWS RELEASE</span></div>
          <h2 id="download-dialog-heading">GEAR UP.<br/><em>COMING SOON.</em></h2>
          <p>The Windows build is not linked on this page yet.</p>
          <div className="modal-platform"><Icon name="monitor" size={20}/><span>PLATFORM</span><strong>WINDOWS PC</strong></div>
          <div className="modal-tip">
            <Icon name="info" size={19}/>
            <p>Use Download for Windows when the build link is available.</p>
          </div>
          <button className="btn btn-primary modal-done" onClick={() => setDownloadOpen(false)}>GOT IT <Icon name="check" size={19}/></button>
        </div>
      </div>
    )}

    {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
      <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onMouseDown={e => { if (e.target === e.currentTarget) setLightboxIndex(null); }}>
        <button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close gallery"><Icon name="close" size={26}/></button>
        <button className="lightbox-arrow prev" onClick={() => setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length)} aria-label="Previous gallery image"><Icon name="chevronLeft" size={28}/></button>
        <div className="lightbox-center">
          <img src={ASSET + filteredGallery[lightboxIndex].image} alt={filteredGallery[lightboxIndex].sub}/>
          <div className="lightbox-caption"><strong>{filteredGallery[lightboxIndex].label}</strong><span>{lightboxIndex + 1} / {filteredGallery.length}</span></div>
        </div>
        <button className="lightbox-arrow next" onClick={() => setLightboxIndex((lightboxIndex + 1) % filteredGallery.length)} aria-label="Next gallery image"><Icon name="chevronRight" size={28}/></button>
      </div>
    )}
  </>;
}

export default App;
