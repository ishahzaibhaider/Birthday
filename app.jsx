// App root — composes sections, manages tweaks, wires gate + letter start

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "blush",
  "fontPair": "cormorant-outfit",
  "petalDensity": 40,
  "petalsOn": true,
  "passwordOn": true,
  "password": "momna",
  "showUrdu": true,
  "accentHue": "#b5686a",
  "goldHue": "#b8935a"
}/*EDITMODE-END*/;

const PALETTES = {
  blush:     { blush: '#f6e1d8', blushDeep: '#e8c4b3', cream: '#fbf6ef', creamWarm: '#f4ead9', rose: '#b5686a', roseDeep: '#8a3f45', gold: '#b8935a', goldSoft: '#d4b483', ink: '#3a2a26', inkSoft: '#6b4f48' },
  ivoryGold: { blush: '#ece4d3', blushDeep: '#d9c9a8', cream: '#fbf8f1', creamWarm: '#f2ead6', rose: '#9a7b3e', roseDeep: '#6b5425', gold: '#b8935a', goldSoft: '#d4b483', ink: '#2f2a1f', inkSoft: '#5d523e' },
  dusk:      { blush: '#dac4c6', blushDeep: '#b99ba1', cream: '#f3ece8', creamWarm: '#e6d6d0', rose: '#8a4f5a', roseDeep: '#5a2a35', gold: '#9c7a4a', goldSoft: '#c3a477', ink: '#2a1f22', inkSoft: '#5a4048' },
  mehndi:    { blush: '#d9ddc9', blushDeep: '#b0b89a', cream: '#f6f4e8', creamWarm: '#e6e4ce', rose: '#6e7b3a', roseDeep: '#3f4a1d', gold: '#a98547', goldSoft: '#cdac70', ink: '#262a1a', inkSoft: '#4a5033' },
};

const FONT_PAIRS = {
  'cormorant-outfit': { serif: '"Cormorant Garamond", serif', sans: '"Outfit", sans-serif', script: '"Dancing Script", cursive' },
  'serif-mono':       { serif: '"Cormorant Garamond", serif', sans: '"JetBrains Mono", ui-monospace, monospace', script: '"Dancing Script", cursive' },
  'playful':          { serif: '"Cormorant Garamond", serif', sans: '"Outfit", sans-serif', script: '"Dancing Script", cursive' },
};

function applyTweaks(t) {
  const p = PALETTES[t.palette] || PALETTES.blush;
  const r = document.documentElement.style;
  r.setProperty('--blush', p.blush);
  r.setProperty('--blush-deep', p.blushDeep);
  r.setProperty('--cream', p.cream);
  r.setProperty('--cream-warm', p.creamWarm);
  r.setProperty('--rose', t.accentHue || p.rose);
  r.setProperty('--rose-deep', p.roseDeep);
  r.setProperty('--gold', t.goldHue || p.gold);
  r.setProperty('--gold-soft', p.goldSoft);
  r.setProperty('--ink', p.ink);
  r.setProperty('--ink-soft', p.inkSoft);

  const fp = FONT_PAIRS[t.fontPair] || FONT_PAIRS['cormorant-outfit'];
  r.setProperty('--serif', fp.serif);
  r.setProperty('--sans', fp.sans);
  r.setProperty('--script', fp.script);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [entered, setEntered] = React.useState(!t.passwordOn);

  React.useEffect(() => { applyTweaks(t); }, [t]);
  React.useEffect(() => { if (!t.passwordOn) setEntered(true); }, [t.passwordOn]);

  useReveals();

  const urduLine = t.showUrdu
    ? 'Mein tumhein kal, aaj sy ziada piyarr kroon ga.'
    : '';

  return (
    <>
      {t.petalsOn && <Petals density={t.petalDensity}/>}

      <Gate
        enabled={t.passwordOn}
        password={t.password}
        onUnlock={() => setEntered(true)}
      />

      <Hero
        names="Shahzaib & Momna"
        dateLabel="24 · April · 2023"
        years={3}
      />

      <Letter
        start={entered}
        message="Jaanum, I will always love you more."
        urdu={urduLine}
      />

      <Countdown
        targetDate="2023-04-24"
        years={3}
      />

      <Timeline/>

      <Gallery/>

      <Shayari/>

      <Closing years={3}/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette"/>
        <TweakRadio label="Mood" value={t.palette}
          options={[
            {value: 'blush', label: 'Blush'},
            {value: 'ivoryGold', label: 'Ivory'},
            {value: 'dusk', label: 'Dusk'},
            {value: 'mehndi', label: 'Mehndi'},
          ]}
          onChange={(v) => setTweak('palette', v)}/>
        <TweakColor label="Accent" value={t.accentHue}
          onChange={(v) => setTweak('accentHue', v)}/>
        <TweakColor label="Gold" value={t.goldHue}
          onChange={(v) => setTweak('goldHue', v)}/>

        <TweakSection label="Atmosphere"/>
        <TweakToggle label="Falling petals" value={t.petalsOn}
          onChange={(v) => setTweak('petalsOn', v)}/>
        <TweakSlider label="Petal density" value={t.petalDensity} min={0} max={60}
          onChange={(v) => setTweak('petalDensity', v)}/>
        <TweakToggle label="Show Urdu line" value={t.showUrdu}
          onChange={(v) => setTweak('showUrdu', v)}/>

        <TweakSection label="Entry"/>
        <TweakToggle label="Password gate" value={t.passwordOn}
          onChange={(v) => setTweak('passwordOn', v)}/>
        <TweakText label="Password" value={t.password}
          onChange={(v) => setTweak('password', v)}/>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
