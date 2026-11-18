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

  // Draw foil on canvas once mounted
  useEffect(() => {
    if (revealed) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const draw = () => {
      const width = (canvas.width = canvas.offsetWidth || 320)
      const height = (canvas.height = canvas.offsetHeight || 140)

      // Metallic blush rose gradient
      const grad = ctx.createLinearGradient(0, 0, width, height)
      grad.addColorStop(0, '#c78da0')
      grad.addColorStop(0.25, '#deaab9')
      grad.addColorStop(0.5, '#f4dbe3')
      grad.addColorStop(0.75, '#cb90a3')
      grad.addColorStop(1, '#a7677d')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // Diagonal shimmer highlight stripes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)'
      ctx.lineWidth = 16
      for (let x = -width; x < width * 2; x += 36) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x + height, height)
        ctx.stroke()
      }

      // Sparkles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)'
      for (let i = 0; i < 40; i++) {
        ctx.beginPath()
        ctx.arc(
          Math.random() * width,
          Math.random() * height,
          Math.random() * 2 + 0.6,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }

      // Script headline
      ctx.fillStyle = '#482030'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = 'normal 38px "Imperial Script", "Parisienne", cursive'
      ctx.fillText('Scratch to reveal', width / 2, height * 0.42)

      // Kicker
      ctx.fillStyle = '#633348'
      ctx.font = '600 11.5px "Cormorant Garamond", Georgia, serif'
      ctx.fillText('THE DAY WE SAY "I DO"', width / 2, height * 0.72)
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
    ctx.arc(x, y, 26, 0, Math.PI * 2)
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
      {/* 1st: Scratch to reveal Date */}
      <div className="scratch-block reveal">
        <div className={`scratch-card-box ${revealed ? 'is-revealed' : ''}`}>
          <div className="revealed-date-target">
            <div className="date-reveal-card">
              <div className="date-col date-col-day">FRIDAY</div>
              <div className="date-col date-col-center">
                <span className="date-month">JANUARY</span>
                <span className="date-num">29</span>
                <span className="date-year">2027</span>
              </div>
              <div className="date-col date-col-time">1:00 PM</div>
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
            REVEAL THE DATE
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
