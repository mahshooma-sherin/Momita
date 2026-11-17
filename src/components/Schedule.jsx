export default function Schedule({ data }) {
  return (
    <section className="paper-section floral schedule-section motion-scene" aria-labelledby="schedule-title">
      <h2 className="script reveal" id="schedule-title">Every lovely moment</h2>
      <ol className="timeline">
        {data.schedule.map((event, i) => (
          <li className="reveal" key={i}>
            <time>{event.time}</time>
            <span className="event-marker" aria-hidden="true"></span>
            <span className="event-name">{event.title}</span>
          </li>
        ))}
      </ol>
      <div className="venue-highlight reveal">
        <span className="venue-label">Venue</span>
        <p className="venue-address-text">{data.venue.address || data.venue.name}</p>
      </div>
    </section>
  )
}
