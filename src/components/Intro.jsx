import Decor from './Decor'

export default function Intro({ data }) {
  const { bride, groom } = data.parents || {}
  return (
    <section className="paper-section floral intro motion-scene" id="our-invitation" aria-label="Our invitation">
      <h2 className="script reveal">{data.couple.subtitle}</h2>
      <div className="rule" aria-hidden="true"></div>
      <p className="reveal">{data.wedding.salutation}</p>
      <p className="invitation-note reveal">{data.wedding.invitationNote}</p>

      {bride && groom && (
        <div className="parents-block reveal">
          <div className="parents-card">
            <h3 className="bride-groom-name">{data.couple.fullNameBride || data.couple.first}</h3>
            <p className="parent-names">
              <span className="relation-label">Daughter of</span>
              <span className="parent-title">{bride.father}</span>
              <span className="parent-amp">&amp;</span>
              <span className="parent-title">{bride.mother}</span>
            </p>
          </div>
          <div className="parents-amp" aria-hidden="true">&amp;</div>
          <div className="parents-card">
            <h3 className="bride-groom-name">{data.couple.fullNameGroom || data.couple.second}</h3>
            <p className="parent-names">
              <span className="relation-label">Son of</span>
              <span className="parent-title">{groom.father}</span>
              <span className="parent-amp">&amp;</span>
              <span className="parent-title">{groom.mother}</span>
            </p>
          </div>
        </div>
      )}

      <Decor index={1} />
    </section>
  )
}
