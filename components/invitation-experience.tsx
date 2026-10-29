'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { ArrowDown, ArrowUpRight, CalendarPlus, Heart, MapPin, Pause, Play, X } from 'lucide-react';
import { artwork, eventDate, invitation } from '@/lib/invitation';

function Lotus({ className = '' }: { className?: string }) {
  return <svg className={`lotus ${className}`} viewBox="0 0 100 65" fill="none" aria-hidden="true"><path d="M50 53C26 39 36 15 50 5c14 10 24 34 0 48Z"/><path d="M50 53C23 54 14 35 15 20c20 1 31 13 35 33Zm0 0c27 1 36-18 35-33-20 1-31 13-35 33Z"/><path d="M50 53C24 64 8 49 3 36c18-5 35 2 47 17Zm0 0c26 11 42-4 47-17-18-5-35 2-47 17Z"/><path d="M27 60h46M50 6V0"/></svg>;
}
function Ornament() { return <div className="ornament" aria-hidden="true"><span/><Lotus/><span/></div>; }
function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: .9, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

function TemplePicture({ eager = false }: { eager?: boolean }) {
  return <picture><source media="(max-width: 650px)" srcSet={artwork.portrait}/><img src={artwork.landscape} alt="Cinematic Indian temple artwork framed by jasmine, roses, carved arches, and brass bells" loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} /></picture>;
}

const chapterLabels = ['A sacred beginning', 'Two hearts, one promise', 'An auspicious day', 'You are warmly invited'];
function FilmText({ progress, stops, children, className = '', active }: { progress: MotionValue<number>; stops: number[]; children: ReactNode; className?: string; active: boolean }) {
  const opacity = useTransform(progress, stops, [0, 1, 1, 0]);
  const y = useTransform(progress, [stops[0], stops[1], stops[2], stops[3]], [25, 0, 0, -28]);
  const blur = useTransform(progress, stops, ['blur(5px)', 'blur(0px)', 'blur(0px)', 'blur(5px)']);
  return <motion.div className={`film-copy ${className}`} style={{ opacity, y, filter: blur }} aria-hidden={!active}>{children}</motion.div>;
}

function CinematicStory({ onFilm, ambient }: { onFilm: () => void; ambient: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [chapter, setChapter] = useState(0);
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const templeScale = useTransform(progress, [0, .45, .7, 1], [1, 1.22, 1.17, 1.03]);
  const templeY = useTransform(progress, [0, .45, 1], ['0%', '-4%', '0%']);
  const templeOpacity = useTransform(progress, [0, .36, .49, .76, .88, 1], [1, 1, 0, 0, 1, 1]);
  const ritualOpacity = useTransform(progress, [.36, .49, .76, .88], [0, 1, 1, 0]);
  const ritualScale = useTransform(progress, [.36, .88], [1.1, 1]);
  const openingOpacity = useTransform(progress, [0, .13, .22], [1, 1, 0]);
  const openingY = useTransform(progress, [0, .22], [0, -35]);
  const endingOpacity = useTransform(progress, [.76, .87, 1], [0, 1, 1]);
  const endingY = useTransform(progress, [.76, .87], [30, 0]);
  const cueOpacity = useTransform(progress, [0, .08], [1, 0]);
  useMotionValueEvent(progress, 'change', value => setChapter(value < .2 ? 0 : value < .44 ? 1 : value < .78 ? 2 : 3));
  const goToChapter = (index: number) => {
    if (!ref.current) return;
    const points = [0, .3, .61, .96];
    window.scrollTo({ top: ref.current.offsetTop + (ref.current.offsetHeight - window.innerHeight) * points[index], behavior: reduced ? 'instant' : 'smooth' });
  };
  return <section id="our-story" ref={ref} className={`cinematic-story ${reduced ? 'reduced-story' : ''}`} aria-label="Our engagement invitation, unfolding as you scroll">
    <div className={`film-stage ${ambient ? '' : 'ambient-paused'}`}>
      <motion.div className="scene-background temple-background" style={reduced ? {} : { scale: templeScale, y: templeY, opacity: templeOpacity }}><TemplePicture eager /></motion.div>
      {!reduced && <motion.div className="scene-background ritual-background" style={{ opacity: ritualOpacity, scale: ritualScale }}><img src={artwork.ritual} alt="Gold engagement rings, a glowing brass diya, jasmine, and burgundy silk" /></motion.div>}
      <div className="film-light"/><div className="film-grain"/>
      <div className="floating-petals" aria-hidden="true">{Array.from({ length: 11 }, (_, i) => <i key={i} style={{ left: `${5 + i * 9}%`, animationDelay: `${-i * 2.7}s`, animationDuration: `${19 + i % 4 * 3}s` }}/>)}</div>
      <motion.div className="film-copy opening-copy" style={reduced ? {} : { opacity: openingOpacity, y: openingY }} aria-hidden={!reduced && chapter !== 0}>
        <p className="sacred-line">WITH LOVE & THE BLESSINGS OF OUR FAMILIES</p>
        <p className="story-title">The Story of Kanth ♥ Samyuktha</p>
        <h1><span>{invitation.names[0]}</span><i>♥</i><span>{invitation.names[1]}</span></h1>
        <p className="script-title">Engagement Invitation</p>
        <div className="opening-date"><span>{eventDate.day} {eventDate.month.toUpperCase()} {eventDate.year}</span><b>✦</b><span>{invitation.time}</span></div>
      </motion.div>
      {!reduced && <><FilmText progress={progress} stops={[.17, .24, .35, .44]} active={chapter === 1} className="promise-copy"><Lotus/><p className="eyebrow">A BOND BLESSED. A JOURNEY BEGUN.</p><h2>Two hearts.<br/><em>One beautiful promise.</em></h2><p>Woven in tradition.<br/>Written with love.</p><span className="script-whisper">Our forever begins here.</span></FilmText>
      <FilmText progress={progress} stops={[.42, .5, .69, .79]} active={chapter === 2} className="date-copy"><p className="eyebrow">SAVE THIS BEAUTIFUL DAY</p><p className="date-weekday">{eventDate.weekday}</p><div className="ceremony-date"><span>{eventDate.month.toUpperCase()}</span><strong>{eventDate.day}</strong><span>{eventDate.year}</span></div><p className="ceremony-time">{invitation.time}</p><div className="small-divider"/><p className="date-note">The beginning of a lifetime, together.</p></FilmText>
      <motion.div className="film-copy closing-copy" style={{ opacity: endingOpacity, y: endingY }} aria-hidden={chapter !== 3}><p className="eyebrow">WITH OPEN HEARTS, WE INVITE YOU</p><h2>Come for the celebration.<br/><em>Stay in our story.</em></h2><p className="scene-venue">{invitation.venue}</p><p className="scene-address">{invitation.address}</p><p className="scene-hosts">With love from<br/><span>{invitation.hosts[0]} & {invitation.hosts[1]}</span></p></motion.div></>}
      <motion.a href="#invitation" className="scroll-cue" style={reduced ? {} : { opacity: cueOpacity }} onClick={e => { if (!reduced) { e.preventDefault(); goToChapter(1); } }}><span>SCROLL SLOWLY. LET THE STORY UNFOLD.</span><ArrowDown size={16}/></motion.a>
      {!reduced && <div className="film-chapters"><span className="chapter-caption"><b>0{chapter + 1}</b> / 04 <i/> {chapterLabels[chapter]}</span><nav aria-label="Invitation scenes">{chapterLabels.map((label, i) => <button key={label} onClick={() => goToChapter(i)} className={chapter === i ? 'current' : ''} aria-label={`Scene ${i + 1}: ${label}`} aria-current={chapter === i ? 'step' : undefined}><span/></button>)}</nav></div>}
      <button className="watch-film" onClick={onFilm}><Play size={11} fill="currentColor"/><span>PLAY INVITATION</span></button>
    </div>
  </section>;
}

function Traditions() {
  return <section className="traditions" id="traditions"><Reveal className="tradition-intro"><p className="eyebrow">ROOTED IN TRADITION. BLOOMING WITH LOVE.</p><h2>A little gold. A little grace.<br/><em>A lifetime of togetherness.</em></h2><Ornament/></Reveal><div className="editorial-gallery"><Reveal className="editorial-tile floral-tile"><div className="editorial-image"><img src={artwork.portrait} alt="Jasmine and rose garlands framing a traditional Indian temple" loading="lazy"/></div><p>Flowers, blessings & new beginnings.</p></Reveal><Reveal className="editorial-tile rings-tile"><div className="editorial-image"><img src={artwork.ritual} alt="Two gold engagement rings resting on a brass plate beside a diya" loading="lazy"/></div><p>A promise, for all our tomorrows.</p><span className="gallery-handwriting">It was always you.</span></Reveal><Reveal className="editorial-tile temple-tile"><div className="editorial-image"><img src={artwork.landscape} alt="A couple in traditional Indian attire standing before a golden temple, illustrated artwork" loading="lazy"/></div><p>Two families. One beautiful story.</p></Reveal></div></section>;
}

function InvitationDetails() {
  return <section className="invitation-section" id="invitation"><div className="invitation-floral" aria-hidden="true"/><Reveal className="invitation-paper"><div className="paper-border" aria-hidden="true"/><Lotus className="invitation-lotus"/><p className="eyebrow">TOGETHER WITH OUR FAMILIES</p><p className="formal-title">Engagement Invitation</p><p className="formal-story">The Story of Kanth ♥ Samyuktha</p><h2>{invitation.names[0]}<span>&</span>{invitation.names[1]}</h2><p className="invitation-message">{invitation.message}</p><Ornament/><div className="formal-date"><p>{eventDate.weekday.toUpperCase()}</p><div><span>{eventDate.month.toUpperCase()}</span><strong>{eventDate.day}</strong><span>{eventDate.year}</span></div><p>AT {invitation.time}</p></div><div className="venue-details"><MapPin size={17} strokeWidth={1}/><h3>{invitation.venue}</h3><p>{invitation.address}</p></div><div className="invitation-actions"><a className="gold-button" href={invitation.mapsUrl} target="_blank" rel="noopener noreferrer">View location <ArrowUpRight size={15}/></a><a className="outline-button" href="/engagement.ics" download="Kanth-Samyuktha-Engagement.ics">Save the date <CalendarPlus size={15}/></a></div><div className="host-details"><p>WITH LOVE, INVITED BY</p><h3>{invitation.hosts[0]}<span>&</span>{invitation.hosts[1]}</h3></div>{invitation.rsvpUrl && <a className="rsvp-link" href={invitation.rsvpUrl} target="_blank" rel="noopener noreferrer">RSVP <ArrowUpRight size={13}/></a>}<p className="closing-note">Your presence is our most cherished blessing.</p></Reveal></section>;
}

function FilmDialog({ close }: { close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState(false);
  useEffect(() => { const focus = document.activeElement as HTMLElement | null; const overflow = document.body.style.overflow; ref.current?.showModal(); document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = overflow; focus?.focus(); }; }, []);
  return <dialog className="film-dialog" ref={ref} aria-label="Play the engagement invitation film" onCancel={e => { e.preventDefault(); close(); }} onClick={e => { if (e.target === e.currentTarget) close(); }}><button className="close-film" onClick={close} aria-label="Close film" autoFocus><X/></button><video controls autoPlay muted playsInline preload="metadata" poster={artwork.landscape} onError={() => setError(true)}><source src={invitation.film} type="video/mp4"/></video>{error && <p>The film could not load. Please close this window and enjoy the scrolling invitation.</p>}<div className="film-caption"><span>The Story of Kanth ♥ Samyuktha</span><span>AN ILLUSTRATED INVITATION FILM</span></div></dialog>;
}

export default function InvitationExperience() {
  const [filmOpen, setFilmOpen] = useState(false);
  const [ambient, setAmbient] = useState(true);
  const reduced = useReducedMotion();
  const [pastFilm, setPastFilm] = useState(false);
  const { scrollYProgress } = useScroll();
  useEffect(() => { const update = () => { const element = document.getElementById('our-story'); setPastFilm(!!element && window.scrollY > element.offsetHeight - 100); }; update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update); }, []);
  return <><a className="skip-link" href="#invitation">Skip to invitation details</a><motion.div className="reading-progress" style={{ scaleX: scrollYProgress }}/><header className={`site-header ${pastFilm ? 'over-paper' : ''}`}><a href="#our-story" className="monogram" aria-label="Kanth and Samyuktha, return to the beginning">K<span>&</span>S</a><a href="#invitation" className="invitation-shortcut">THE INVITATION <ArrowUpRight size={12}/></a></header><main><CinematicStory onFilm={() => setFilmOpen(true)} ambient={ambient && !filmOpen}/><Traditions/><InvitationDetails/></main><footer><Lotus/><p className="footer-names">Kanth <Heart size={14} fill="currentColor"/> Samyuktha</p><p className="footer-date">{eventDate.day} {eventDate.month.toUpperCase()} {eventDate.year} · {invitation.venue.toUpperCase()}</p><div><p>{invitation.credit}</p><a href="#our-story">BACK TO THE BEGINNING <ArrowUpRight size={12}/></a></div></footer>{!reduced && <button className="ambient-toggle" onClick={() => setAmbient(!ambient)} aria-label={ambient ? 'Pause floating petals' : 'Resume floating petals'} aria-pressed={!ambient}>{ambient ? <Pause size={12}/> : <Play size={12}/>}<span>{ambient ? 'PAUSE PETALS' : 'RESUME PETALS'}</span></button>}{filmOpen && <FilmDialog close={() => setFilmOpen(false)}/>}</>;
}
