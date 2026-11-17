import Decor from './Decor'

export default function Intro({ data }) {
  const { groom, bride } = data.parents || {}
  const bibleVerse = data.wedding.bibleVerse
  return (
    <section className="paper-section floral intro motion-scene" id="our-invitation" aria-label="Our invitation">
      {bibleVerse && (
        <div className="bible-verse reveal">
          <p className="verse-text">“{bibleVerse.text}”</p>
          <p className="verse-ref">— {bibleVerse.reference}</p>
        </div>
      )}
      <div className="rule" aria-hidden="true"></div>
      <h2 className="script reveal">{data.couple.subtitle}</h2>
      <p className="reveal">{data.wedding.salutation}</p>
      <p className="invitation-note reveal">{data.wedding.invitationNote}</p>

      {groom && bride && (
        <div className="parents-block reveal">
          <div className="parents-card">
            <h3 className="bride-groom-name">{data.couple.fullNameGroom || data.couple.first}</h3>
            <p className="parent-names">
              <span className="relation-label">Son of</span>
              <span className="parent-title">{groom.father}</span>
              <span className="parent-amp">&amp;</span>
              <span className="parent-title">{groom.mother}</span>
            </p>
          </div>
          <div className="parents-amp" aria-hidden="true">&amp;</div>
          <div className="parents-card">
            <h3 className="bride-groom-name">{data.couple.fullNameBride || data.couple.second}</h3>
            <p className="parent-names">
              <span className="relation-label">Daughter of</span>
              <span className="parent-title">{bride.father}</span>
              <span className="parent-amp">&amp;</span>
              <span className="parent-title">{bride.mother}</span>
            </p>
          </div>
        </div>
      )}

      <Decor index={1} />
    </section>
  )
}
