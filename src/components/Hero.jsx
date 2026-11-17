import { asset, safeURL } from '../utils'
import Decor from './Decor'

export default function Hero({ data, theme, heroRef, heroHidden }) {
  const { bride, groom } = data.parents || {}
  const bibleVerse = data.wedding.bibleVerse
  return (
    <section className="hero motion-scene" aria-label="Wedding invitation">
      <img
        className="hero-art"
        src={data.media.heroPoster ? safeURL(data.media.heroPoster) : asset('hero-first.webp')}
        alt={theme.scene}
        decoding="async"
      />
      <video className="hero-video" id="hero-video" ref={heroRef} muted loop playsInline preload="none" hidden={heroHidden} />
      <div className="hero-copy">
        {bibleVerse && (
          <div className="hero-verse">
            <p className="hero-verse-text">
              “So they are no longer two, but one flesh.<br />
              Therefore what God has joined together, let no one separate.”
            </p>
            <p className="hero-verse-ref">— {bibleVerse.reference} —</p>
          </div>
        )}

        <div className="hero-divider" aria-hidden="true"></div>

        <h2 className="hero-families-title">TOGETHER WITH OUR FAMILIES</h2>
        <p className="hero-joyfully-invite">We joyfully invite you to the</p>

        <div className="hero-wedding-badge">
          <span className="hero-wedding-text">wedding</span>
          <span className="hero-of-pill">-of-</span>
        </div>

        <div className="hero-person-block">
          <h1 className="hero-person-name" id="names" tabIndex={-1}>
            {data.couple.fullNameBride || data.couple.first}
          </h1>
          <p className="hero-person-parents">
            D/O {bride?.father} &amp; {bride?.mother}
          </p>
        </div>

        <div className="hero-amp" aria-hidden="true">&amp;</div>

        <div className="hero-person-block">
          <h2 className="hero-person-name">
            {data.couple.fullNameGroom || data.couple.second}
          </h2>
          <p className="hero-person-parents">
            S/O {groom?.father} &amp; {groom?.mother}
          </p>
        </div>
      </div>
      <Decor index={0} eager />
    </section>
  )
}
