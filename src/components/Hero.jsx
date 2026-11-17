import { asset, safeURL } from '../utils'
import Decor from './Decor'

export default function Hero({ data, theme, heroRef, heroHidden }) {
  const { first, second } = data.couple
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
            <p className="hero-verse-text">“{bibleVerse.text}”</p>
            <p className="hero-verse-ref">{bibleVerse.reference}</p>
          </div>
        )}
        <div className="hero-divider" aria-hidden="true"></div>
        <p className="hero-family-intro">Together with our Families</p>
        <p className="occasion">You are joyfully invited to the wedding of</p>
        <p className="date">{data.wedding.dateLabel}</p>
        <h1 className="names" id="names" tabIndex={-1}>
          <span>{first}</span><i>&amp;</i><span>{second}</span>
        </h1>
        <a className="hero-link" href="#our-invitation">With love, you are invited</a>
      </div>
      <Decor index={0} eager />
    </section>
  )
}
