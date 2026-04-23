// Components for Shahzaib & Momna anniversary site

// ── Falling Petals ─────────────────────────────────────────────────
function Petals({ density = 18 }) {
  const petals = React.useMemo(() => {
    return Array.from({ length: density }).map((_, i) => {
      const left = Math.random() * 100;
      const size = 8 + Math.random() * 14;
      const dur = 12 + Math.random() * 14;
      const delay = -Math.random() * 20;
      const drift = (Math.random() - 0.5) * 220;
      const spin = (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 540);
      const hue = Math.random() > 0.5 ? '#e8a4a8' : '#d4b483';
      const opacity = 0.55 + Math.random() * 0.35;
      return { i, left, size, dur, delay, drift, spin, hue, opacity };
    });
  }, [density]);

  return (
    <div className="petals" aria-hidden="true">
      {petals.map(p => (
        <svg key={p.i} className="petal"
          width={p.size} height={p.size * 1.4} viewBox="0 0 20 28"
          style={{
            left: `${p.left}%`,
            animation: `fall ${p.dur}s ${p.delay}s linear infinite`,
            '--drift': `${p.drift}px`,
            '--spin': `${p.spin}deg`,
            opacity: p.opacity,
          }}>
          <path
            d="M10 0 C 4 8, 0 16, 10 28 C 20 16, 16 8, 10 0 Z"
            fill={p.hue}
            opacity="0.85"
          />
          <path
            d="M10 2 C 6 10, 4 18, 10 26"
            stroke="#ffffff" strokeWidth="0.4" fill="none" opacity="0.4"
          />
        </svg>
      ))}
    </div>
  );
}

// ── Password Gate ──────────────────────────────────────────────────
function Gate({ enabled, password, onUnlock }) {
  const [val, setVal] = React.useState('');
  const [err, setErr] = React.useState('');
  const [unlocked, setUnlocked] = React.useState(!enabled);

  React.useEffect(() => {
    if (!enabled) setUnlocked(true);
  }, [enabled]);

  const submit = (e) => {
    e && e.preventDefault();
    if (val.trim().toLowerCase() === password.toLowerCase()) {
      setUnlocked(true);
      setTimeout(() => onUnlock && onUnlock(), 900);
    } else {
      setErr('not quite, jaan — try again');
      setTimeout(() => setErr(''), 2400);
    }
  };

  if (!enabled) return null;

  return (
    <div className={`gate ${unlocked ? 'gone' : ''}`}>
      <div className="gate-inner">
        <div className="mark">for you, only</div>
        <h1>a little something <br/>before you enter</h1>
        <p>whisper my pet name for you</p>
        <form className="gate-input" onSubmit={submit}>
          <input
            type="text"
            autoFocus
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="..."
            aria-label="Password"
          />
          <button type="submit" className="gate-btn">Open</button>
        </form>
        <div className="gate-err">{err}</div>
        <div className="gate-hint">hint: the one you love</div>
      </div>
    </div>
  );
}

// ── Hero ───────────────────────────────────────────────────────────
function Hero({ names, dateLabel, years }) {
  const parts = names.split('&');
  const a = (parts[0] || '').trim();
  const b = (parts[1] || '').trim();
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero-ornament">~ our forever, written slowly ~</div>
      <h1 className="hero-names">
        {a}<span className="amp">&</span>{b}
      </h1>
      <div className="hero-sub">
        <span className="line"/>
        <span className="date">{dateLabel}</span>
        <span className="line"/>
      </div>
      <div className="hero-years">
        celebrating <b>{years}</b> {years === 1 ? 'year' : 'years'} of us
      </div>
      <div className="scroll-cue">scroll ↓</div>
    </section>
  );
}

// ── Typewriter Letter ──────────────────────────────────────────────
function Letter({ message, urdu, start }) {
  const [idx, setIdx] = React.useState(0);
  const [urIdx, setUrIdx] = React.useState(0);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (!start) return;
    if (idx < message.length) {
      const t = setTimeout(() => setIdx(idx + 1), 32 + (message[idx] === ' ' ? 10 : 0));
      return () => clearTimeout(t);
    }
    // after english done, type urdu
    if (urIdx < urdu.length) {
      const t = setTimeout(() => setUrIdx(urIdx + 1), 40);
      return () => clearTimeout(t);
    }
    setDone(true);
  }, [idx, urIdx, start, message, urdu]);

  return (
    <section className="letter" data-screen-label="02 Letter">
      <div className="letter-label">— a letter —</div>
      <div className="letter-body">
        {message.slice(0, idx)}
        {idx < message.length && <span className="caret"/>}
      </div>
      <div className="letter-urdu">
        {urdu.slice(0, urIdx)}
        {idx >= message.length && urIdx < urdu.length && <span className="caret"/>}
      </div>
      <div className={`letter-sign ${done ? 'show' : ''}`}>— always yours, Shahzaib</div>
    </section>
  );
}

// ── Countdown ──────────────────────────────────────────────────────
function Countdown({ targetDate, years }) {
  const [now, setNow] = React.useState(() => new Date());

  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // target is the NEXT anniversary (or today if it's the day)
  const target = React.useMemo(() => {
    const t = new Date(targetDate);
    const next = new Date(now.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0);
    if (next < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
      next.setFullYear(now.getFullYear() + 1);
    }
    return next;
  }, [targetDate, now.getFullYear(), now.getMonth(), now.getDate()]);

  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  const isToday = days === 0 && target.toDateString() === now.toDateString();

  return (
    <section className="countdown" data-screen-label="03 Countdown">
      <div className="section-eyebrow">— the day approaches —</div>
      <h2 className="section-title">
        until <span className="accent">our</span> day
      </h2>
      <p className="section-sub">
        the day the world quietly changed for me — counting down, just like the first time
      </p>

      <div className="countdown-grid">
        <div className="cd-unit">
          <div className="cd-num">{String(days).padStart(2,'0')}</div>
          <div className="cd-lbl">Days</div>
        </div>
        <div className="cd-unit">
          <div className="cd-num">{String(hours).padStart(2,'0')}</div>
          <div className="cd-lbl">Hours</div>
        </div>
        <div className="cd-unit">
          <div className="cd-num">{String(mins).padStart(2,'0')}</div>
          <div className="cd-lbl">Minutes</div>
        </div>
        <div className="cd-unit">
          <div className="cd-num">{String(secs).padStart(2,'0')}</div>
          <div className="cd-lbl">Seconds</div>
        </div>
      </div>

      {isToday && (
        <div className="cd-today">
          ♡ today is the day ♡ <br/>
          <em>happy {years}-year engagement, meri jaan</em>
        </div>
      )}
    </section>
  );
}

// ── Timeline ───────────────────────────────────────────────────────
function Timeline() {
  const items = [
    {
      date: "The Beginning",
      title: "when the world first made sense",
      body: "before i knew your name, something in me was already waiting. then you arrived  not loudly, not all at once  but completely.",
    },
    {
      date: "Falling",
      title: "the slow, beautiful fall",
      body: "conversations that wouldn't end. laughter that echoed after you'd gone home. one day i looked up and realized yeh toh muhabbat thi.</em>",
    },
    {
      date: "The Proposal",
      title: "the question i already knew the answer to",
      body: "my hands trembled more than my voice. you smiled before i'd finished asking. a yes softer than a whisper, louder than my heart.",
    },
    {
      date: "24 April, 2023",
      title: "the day you said yes, forever",
      body: "three years ago, you became my <em>mangetar</em>. three years, and every morning i still wake up grateful the sky answered for us both.",
    },
    {
      date: "Today & Always",
      title: "and the story keeps writing itself",
      body: "every sunrise since is a new page of the same book. mein tumhein kal, aaj sy ziada piyarr kroon ga a promise i renew each day.",
    },
  ];

  return (
    <section className="timeline" data-screen-label="04 Timeline">
      <div className="section-eyebrow">— our story, in chapters —</div>
      <h2 className="section-title">
        how <span className="accent">you</span> became my always
      </h2>

      <div className="timeline-inner">
        {items.map((it, i) => (
          <div key={i} className={`tl-item ${i % 2 === 1 ? 'reverse' : ''} reveal`}>
            <div className="tl-dot"/>
            <div className="tl-date">{it.date}</div>
            <div className="tl-body">
              <h3 className="tl-title">{it.title}</h3>
              <p className="tl-text" dangerouslySetInnerHTML={{__html: it.body}}/>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Gallery ────────────────────────────────────────────────────────
function Gallery() {
  // 7 images, varying grid sizes
  const items = [
    { id: 1, size: 'sq',    tag: 'IMG_01 · the_first_look.png',  label: 'The first look',  title: 'when our eyes first met' },
    { id: 2, size: 'wide',  tag: 'IMG_02 · proposal_day.png',    label: 'The proposal',    title: 'a trembling yes' },
    { id: 3, size: 'tall',  tag: 'IMG_03 · ring_moment.png',     label: 'The ring',        title: 'gold on your finger, forever' },
    { id: 4, size: 'slim',  tag: 'IMG_04 · laughing.png',        label: 'Just laughing',   title: 'your laugh, my favorite sound' },
    { id: 5, size: 'slim',  tag: 'IMG_05 · hands_held.png',      label: 'Held',            title: 'hand in hand, always' },
    { id: 6, size: 'wide',  tag: 'IMG_06 · golden_hour.png',     label: 'Golden hour',     title: 'the sun never looked at me like you did' },
    { id: 7, size: 'sq',    tag: 'IMG_07 · us_today.png',        label: 'Us, today',       title: 'three years and counting' },
  ];

  return (
    <section className="gallery" data-screen-label="05 Gallery">
      <div className="section-eyebrow">— moments, gently framed —</div>
      <h2 className="section-title">
        chapters, <span className="accent">one frame</span> at a time
      </h2>
      <p className="section-sub">hover over each a little memory rests behind every photograph.</p>

      <div className="g-grid">
        {items.map(it => (
          <div key={it.id} className={`g-item ${it.size} reveal`}>
            <img src={`images/${it.tag.split(' · ')[1]}`} alt={it.label}
                 style={{width:'100%',height:'100%',objectFit:'cover',position:'absolute',inset:0}}/>
            <div className="g-caption">
              <div className="g-cap-label">{it.label}</div>
              <div className="g-cap-title">{it.title}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Shayari ────────────────────────────────────────────────────────
function Shayari() {
  return (
    <section className="shayari" data-screen-label="06 Shayari">
      <div className="shayari-frame">
        <div className="shayari-label">— for you, in verse —</div>
        <div className="shayari-text">
          <span>Hota agar main shayar koi</span>
          <span className="spacer"/>
          <span className="highlight">Nazmein likhta teri adaon py</span>
          <span>Shayari krta teri aankhon py</span>
          <span>Ghazlein likhta teri aahon py</span>
          <span className="spacer"/>
          <span>Qayal hota teri chaal ka</span>
          <span>Sadky jaata teri nigahon pe</span>
          <span className="highlight">Mrr hee jaata tere husn par</span>
          <span>Toot kar girta teri baahon mein</span>
          <span className="spacer"/>
          <span>Hota agar main shayar koi...</span>
          <span className="highlight">Nazmein likhta teri adaon pe</span>
        </div>
        <div className="shayari-attr">~ the song that sounds like you ~</div>
      </div>
    </section>
  );
}

// ── Closing ────────────────────────────────────────────────────────
function Closing({ years }) {
  return (
    <section className="closing" data-screen-label="07 Closing">
      <div className="closing-orn">~ and so, my love ~</div>
      <h2 className="closing-title">
        here's to <span className="accent">three</span> years<br/>
        and every year after forever.
      </h2>
      <div className="closing-sig">— Shahzaib</div>
      <div className="closing-date">24 April · 2023 → 2026</div>
      <div className="closing-heart">♡</div>
    </section>
  );
}

// Reveal-on-scroll helper
function useReveals() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

Object.assign(window, {
  Petals, Gate, Hero, Letter, Countdown, Timeline, Gallery, Shayari, Closing, useReveals
});
