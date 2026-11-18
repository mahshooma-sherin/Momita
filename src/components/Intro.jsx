import Decor from './Decor'

export default function Intro({ data }) {
  return (
    <section className="paper-section floral intro motion-scene" id="our-invitation" aria-label="Our invitation">
      <h2 className="script reveal">{data.couple.subtitle}</h2>
      <div className="rule" aria-hidden="true"></div>
      <div className="invitation-body reveal">
        <p className="salutation">{data.wedding.salutation}</p>
        <p className="invitation-message">
          Love brought us together, and<br />faith will keep us together.
        </p>
        <p className="invitation-message">
          We would be so honoured if you joined us as we say our vows and begin forever, together.
        </p>
      </div>
      <Decor index={1} />
    </section>
  )
}
