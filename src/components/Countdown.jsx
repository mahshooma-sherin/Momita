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

  // Draw circular rose gold glitter foil on canvas
  useEffect(() => {
    if (revealed) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const draw = () => {
      const size = canvas.offsetWidth || 290
      canvas.width = size
      canvas.height = size
      const width = size
      const height = size
      const cx = width / 2
      const cy = height / 2
      const radius = size / 2

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.clip()

      // Shimmering Rose Gold Glitter Metallic Gradient (matching Image 2)
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius)
      grad.addColorStop(0, '#fae3ec')
      grad.addColorStop(0.35, '#e4b0c2')
      grad.addColorStop(0.7, '#d393a8')
      grad.addColorStop(1, '#a8657d')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // Dense sparkling glitter dots
      for (let i = 0; i < 280; i++) {
        const angle = Math.random() * Math.PI * 2
        const dist = Math.random() * (radius - 6)
        const x = cx + Math.cos(angle) * dist
        const y = cy + Math.sin(angle) * dist
        const dotSize = Math.random() * 2.2 + 0.5
        const alpha = Math.random() * 0.7 + 0.3
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, dotSize, 0, Math.PI * 2)
        ctx.fill()
      }

      // Bright sparkle points
      for (let i = 0; i < 22; i++) {
        const angle = Math.random() * Math.PI * 2
        const dist = Math.random() * (radius - 20)
        const x = cx + Math.cos(angle) * dist
        const y = cy + Math.sin(angle) * dist
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
        ctx.beginPath()
        ctx.arc(x, y, 2.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Inner delicate gold ring border matching Image 2
      ctx.strokeStyle = 'rgba(218, 178, 126, 0.65)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(cx, cy, radius - 10, 0, Math.PI * 2)
      ctx.stroke()

      // "Scratch to reveal" in cursive script
      ctx.fillStyle = '#491d2d'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = 'normal 46px "Imperial Script", "Parisienne", cursive'
      ctx.fillText('Scratch to reveal', cx, cy - 14)

      // "THE DAY WE SAY \"I DO\""
      ctx.fillStyle = '#5f2b3e'
      ctx.font = '600 11px "Cormorant Garamond", Georgia, serif'
      ctx.fillText('THE DAY WE SAY "I DO"', cx, cy + 32)

      ctx.restore()
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
      {/* Circular Scratch to Reveal Date Card (matching Image 2) */}
      <div className="scratch-block circular reveal">
        <div className={`scratch-circle-box ${revealed ? 'is-revealed' : ''}`}>
          <div className="revealed-circle-target">
            <div className="circle-date-content">
              <div className="circle-date-top" aria-hidden="true">— &diams; —</div>

              <div className="circle-date-grid">
                <div className="date-col date-col-day">FRIDAY</div>
                <div className="date-col date-col-center">
                  <span className="date-month">JANUARY</span>
                  <span className="date-num">29</span>
                  <span className="date-year">2027</span>
                </div>
                <div className="date-col date-col-time">1:00 PM</div>
              </div>

              <p className="circle-date-footer">Our Forever Begins</p>
            </div>
          </div>

          {!revealed && (
            <div
              className="scratch-foil circular"
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
              <canvas ref={canvasRef} className="scratch-canvas circular" />
            </div>
          )}
        </div>

        {!revealed && (
          <button
            type="button"
            className="reveal-date-btn circular-btn"
            onClick={() => setRevealed(true)}
          >
            REVEAL THE DATE
          </button>
        )}
      </div>

      {/* Until we say "I do" countdown (reception removed as per Image 3) */}
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
    </section>
  )
}
