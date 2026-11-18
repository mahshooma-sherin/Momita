export default function Schedule({ data }) {
  return (
    <section className="paper-section floral schedule-section motion-scene" aria-labelledby="schedule-title">
      <h2 className="script reveal" id="schedule-title">Every lovely moment</h2>
      <ol className="timeline">
        {data.schedule.map((event, i) => (
          <li className="reveal" key={i}>
            <time>{event.time}</time>
            <span className="event-marker" aria-hidden="true"></span>
            <span className="event-name">
              <span>{event.title}</span>
              {event.note && <span className="event-note">{event.note}</span>}
            </span>
          </li>
        ))}
      </ol>

      <div className="schedule-info-card reveal">
        <div className="venue-highlight">
          <p className="venue-calligraphy">
            At Bride’s Residence Khamari,<br />
            Tikrikilla, West Garo Hills.
          </p>
          <div className="venue-calligraphy-gap" aria-hidden="true"></div>
          <p className="venue-calligraphy">
            Reception to follow<br />
            Till 7:00 PM
          </p>
        </div>
      </div>
    </section>
  )
}
