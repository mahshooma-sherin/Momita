import { useEffect, useRef, useState } from 'react'

const pad = (n) => String(n).padStart(2, '0')

export default function Countdown({ data }) {
  const date = new Date(data.wedding.dateISO)
  const validDate = !Number.isNaN(date.getTime())
  const [now, setNow] = useState(() => Date.now())
  const [revealed, setRevealed] = useState(false)
  const canvasRef = useRef(null)
  const isDrawing = useRef(false)
  const scratchCount = useRef(0)

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  // Draw cute foil on canvas once mounted
  useEffect(() => {
    if (revealed) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const draw = () => {
      const width = (canvas.width = canvas.offsetWidth || 345)
      const height = (canvas.height = canvas.offsetHeight || 180)

      // Satin Champagne Rose Gold Metallic Gradient
      const grad = ctx.createLinearGradient(0, 0, width, height)
      grad.addColorStop(0, '#c2889a')
      grad.addColorStop(0.2, '#daaab6')
      grad.addColorStop(0.45, '#fae6ee')
      grad.addColorStop(0.55, '#f4d5df')
      grad.addColorStop(0.8, '#c88da0')
      grad.addColorStop(1, '#9f5d74')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // Delicate inner decorative border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)'
      ctx.lineWidth = 1.2
      ctx.strokeRect(9, 9, width - 18, height - 18)

      // Corner flourish dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
      ;[
        [15, 15],
        [width - 15, 15],
        [15, height - 15],
        [width - 15, height - 15],
      ].forEach(([cx, cy]) => {
        ctx.beginPath()
        ctx.arc(cx, cy, 2.5, 0, Math.PI * 2)
        ctx.fill()
      })

      // Soft diagonal silk luster lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)'
      ctx.lineWidth = 18
      for (let x = -width; x < width * 2; x += 38) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x + height, height)
        ctx.stroke()
      }

      // Sparkles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
      for (let i = 0; i < 48; i++) {
        ctx.beginPath()
        ctx.arc(
          Math.random() * (width - 24) + 12,
          Math.random() * (height - 24) + 12,
          Math.random() * 2 + 0.6,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }

      // Top tiny cute motif
      ctx.fillStyle = '#5c2a3e'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = '600 10.5px "Cormorant Garamond", Georgia, serif'
      ctx.fillText('✦  SAVE OUR DATE  ✦', width / 2, height * 0.22)

      // Script headline: "Scratch to reveal"
      ctx.fillStyle = '#451a2b'
      ctx.font = 'normal 42px "Imperial Script", "Parisienne", cursive'
      ctx.fillText('Scratch to reveal', width / 2, height * 0.48)

      // Subtitle
      ctx.fillStyle = '#5c2a3e'
      ctx.font = 'italic 400 13.5px "Cormorant Garamond", Georgia, serif'
      ctx.fillText('The day we say “I do”', width / 2, height * 0.72)

      // Cute scratch hint at bottom
      ctx.fillStyle = 'rgba(92, 42, 62, 0.85)'
      ctx.font = '600 9.5px "Cormorant Garamond", Georgia, serif'
      ctx.fillText('♡  SCRATCH WITH LOVE  ♡', width / 2, height * 0.88)
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(draw)
    } else {
      draw()
    }
  }, [revealed])

  const handleScratch = (clientX, clientY) => {
    if (revealed) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 28, 0, Math.PI * 2)
    ctx.fill()

    scratchCount.current += 1
    if (scratchCount.current > 14) {
      setRevealed(true)
    }
  }

  const remaining = validDate ? Math.max(0, date.getTime() - now) : 0
  const seconds = Math.floor(remaining / 1000)
  const values = {
    days: Math.floor(seconds / 86400),
    hours: Math.floor(seconds / 3600) % 24,
    minutes: Math.floor(seconds / 60) % 60,
    seconds: seconds % 60,
  }
  const begun = validDate && !remaining

  return (
    <section className="paper-section countdown-section torn motion-scene" aria-labelledby="countdown-title">
      {/* 1st: Scratch to reveal Date Card */}
      <div className="scratch-block reveal">
        <div className={`scratch-card-box ${revealed ? 'is-revealed' : ''}`}>
          <div className="revealed-date-target">
            <div className="date-reveal-card">
              <div className="date-card-top-motif" aria-hidden="true">— &diams; —</div>

              <div className="date-card-grid">
                <div className="date-col date-col-day">FRIDAY</div>
                <div className="date-col date-col-center">
                  <span className="date-month">JANUARY</span>
                  <span className="date-num">29</span>
                  <span className="date-year">2027</span>
                </div>
                <div className="date-col date-col-time">1:00 PM</div>
              </div>

              <p className="date-card-footer-note">Our Forever Begins</p>
            </div>
          </div>

          {!revealed && (
            <div
              className="scratch-foil"
              onPointerDown={(e) => {
                isDrawing.current = true
                handleScratch(e.clientX, e.clientY)
              }}
              onPointerMove={(e) => {
                if (isDrawing.current) handleScratch(e.clientX, e.clientY)
              }}
              onPointerUp={() => {
                isDrawing.current = false
              }}
              onPointerCancel={() => {
                isDrawing.current = false
              }}
              onPointerLeave={() => {
                isDrawing.current = false
              }}
            >
              <canvas ref={canvasRef} className="scratch-canvas" />
            </div>
          )}
        </div>

        {!revealed && (
          <button
            type="button"
            className="reveal-date-btn"
            onClick={() => setRevealed(true)}
          >
            ✨ Reveal The Date ✨
          </button>
        )}
      </div>

      {/* 2nd: Until we say "I do" countdown */}
      <div className="countdown-wrap reveal">
        <h2 className="script" id="countdown-title">
          {begun ? 'Our celebration has begun' : 'Until we say “I do”'}
        </h2>
        <div className="countdown" id="countdown" role="timer" aria-label="Time until the wedding" hidden={!validDate}>
          {[['days', 'Days'], ['hours', 'Hours'], ['minutes', 'Minutes'], ['seconds', 'Seconds']].map(([key, label]) => (
            <div key={key}>
              <strong data-count={key}>{pad(values[key])}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3rd: Reception to follow */}
      <div className="reception-section-badge reveal">
        <h3 className="reception-title">RECEPTION TO FOLLOW</h3>
        <p className="reception-time">Till 7:00 PM</p>
      </div>
    </section>
  )
}
