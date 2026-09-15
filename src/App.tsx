import { useState, useEffect, useRef } from "react"

// ─── Animation hooks ──────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useCounter(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else setCount(Math.round(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])
  return count
}

interface AnimateInProps {
  children: React.ReactNode
  delay?: number
  from?: "bottom" | "left" | "right" | "scale"
  className?: string
}

function AnimateIn({
  children,
  delay = 0,
  from = "bottom",
  className = "",
}: AnimateInProps) {
  const { ref, inView } = useInView()
  const initial: React.CSSProperties = {
    opacity: 0,
    transform:
      from === "bottom"
        ? "translateY(28px)"
        : from === "left"
          ? "translateX(-28px)"
          : from === "right"
            ? "translateX(28px)"
            : "scale(0.92)",
  }
  const active: React.CSSProperties = { opacity: 1, transform: "none" }
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(inView ? active : initial),
        transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Journey", href: "#learning-journey" },
  { label: "Modules", href: "#program-overview" },
  { label: "Curriculum", href: "#program-modules" },
  { label: "Tools", href: "#stats-tools" },
  { label: "Projects", href: "#capstone-portfolio" },
]

const MODULES_OVERVIEW = [
  {
    id: "01",
    title: "Digital Instrument Cluster",
    sub: "HMI Design – OEM Tools",
    from: "#3b82f6",
    to: "#7c3aed",
  },
  {
    id: "02",
    title: "Infotainment (IVI) System",
    sub: "Multi-touch – Android Auto",
    from: "#7c3aed",
    to: "#a21caf",
  },
  {
    id: "03",
    title: "Head-Up Display (HUD)",
    sub: "HMD – SafetyTech",
    from: "#ef4444",
    to: "#ec4899",
  },
  {
    id: "04",
    title: "Voice UI & Alexa Integration",
    sub: "AI: Alexa + Auto SDK",
    from: "#10b981",
    to: "#059669",
  },
  {
    id: "05",
    title: "ADAS Interface & Alerts",
    sub: "ADAS – SafetyPlus",
    from: "#f59e0b",
    to: "#d97706",
  },
  {
    id: "06",
    title: "EV Charging & Energy UX",
    sub: "EV – EnergyFlow",
    from: "#06b6d4",
    to: "#0284c7",
  },
]

const JOURNEY_STEPS = [
  {
    num: 1,
    hrs: "12 hrs",
    title: "Automotive UX Foundations",
    desc: "HMI principles, UX research, and design thinking for automotive contexts.",
    color: "#6366f1",
  },
  {
    num: 2,
    hrs: "16 hrs",
    title: "Human Factors & IA",
    desc: "Cognitive load, driver distraction, and information architecture.",
    color: "#8b5cf6",
  },
  {
    num: 3,
    hrs: "14 hrs",
    title: "Layout & Wireframing",
    desc: "Night mode, accessibility, and low-fidelity prototype techniques.",
    color: "#ef4444",
  },
  {
    num: 4,
    hrs: "18 hrs",
    title: "Rapid Prototyping",
    desc: "Figma to ProtoPie — interactive automotive UI demos.",
    color: "#10b981",
  },
  {
    num: 5,
    hrs: "22 hrs",
    title: "Qt Design Studio HMI",
    desc: "Production-grade embedded HMI built with Qt and C++.",
    color: "#f59e0b",
  },
  {
    num: 6,
    hrs: "18 hrs",
    title: "UX Testing & Capstone",
    desc: "Simulation testing, analytics, and portfolio-ready deliverable.",
    color: "#06b6d4",
  },
]

const PROGRAM_MODULES = [
  {
    num: 1,
    hrs: "12 Hours",
    title: "Automotive UX Foundations & Voice UX",
    items: [
      "Layout UX Animation",
      "WheelAudio UX IC, HUD",
      "Voice UI & Alexa Auto SDK",
    ],
    color: "#6366f1",
  },
  {
    num: 2,
    hrs: "16 Hours",
    title: "Human Factors & Information Architecture",
    items: [
      "Cognitive Psychology",
      "Driver distraction & UI Canvas",
      "AI to HVC systems",
    ],
    color: "#8b5cf6",
  },
  {
    num: 3,
    hrs: "14 Hours",
    title: "Layout Design & Wireframing",
    items: ["Accessibility & Night Mode", "Low-fidelity wireframes"],
    color: "#ef4444",
  },
  {
    num: 4,
    hrs: "18 Hours",
    title: "Rapid Prototyping",
    items: ["Layout and Interaction flows", "Scene Creation & UI Canvas"],
    color: "#10b981",
  },
  {
    num: 5,
    hrs: "22 Hours",
    title: "Qt Design Studio for Embedded HMI",
    items: [
      "Qt Studio Basics & Figma import",
      "States, Animations, C++ Integration",
    ],
    color: "#f59e0b",
  },
  {
    num: 6,
    hrs: "18 Hours",
    title: "UX Testing, Analytics & Capstone",
    items: ["Analytics & Simulation", "Time-to-scan Calibration"],
    color: "#06b6d4",
  },
]

const PORTFOLIO = [
  {
    num: "01",
    title: "EV Infotainment System",
    img: "https://images.unsplash.com/photo-1676288176918-232f7caadfee?w=700&h=440&fit=crop&auto=format",
  },
  {
    num: "02",
    title: "Digital Instrument Cluster",
    img: "https://images.unsplash.com/photo-1585014165903-6d6c6ebad3e9?w=700&h=440&fit=crop&auto=format",
  },
  {
    num: "03",
    title: "ADAS Warning System",
    img: "https://images.unsplash.com/photo-1675831903577-6bb42207699f?w=700&h=440&fit=crop&auto=format",
  },
  {
    num: "04",
    title: "Qt Animated Dashboard",
    img: "https://doc.qt.io/QtForMCUs/images/qtul-automotive-sport-demo.png",
  },
  {
    num: "05",
    title: "Interactive ProtoPie Prototype",
    img: "https://images.unsplash.com/photo-1680446808444-07b70aca83cd?w=700&h=440&fit=crop&auto=format",
  },
  {
    num: "06",
    title: "Automotive UX Case Study",
    img: "https://images.unsplash.com/photo-1786052073421-c2a8d74eb6fe?w=700&h=440&fit=crop&auto=format",
  },
]

const FAQS = [
  {
    q: "Is this course UX-focused or automotive-focused?",
    a: "Both. The program bridges UX design methodology with automotive HMI engineering — you will learn to design for real embedded systems, not just for screens.",
  },
  {
    q: "Do I need prior Figma or design experience?",
    a: "Basic Figma familiarity is helpful but not required. The program starts from automotive UX foundations and builds up to production-grade tools.",
  },
  {
    q: "Is the capstone project mandatory?",
    a: "Yes. The capstone is a core deliverable — a portfolio-ready HMI project that demonstrates end-to-end automotive UX competence.",
  },
  {
    q: "Will I get a certificate?",
    a: "Yes, upon completing all 6 modules and the capstone project, you receive an Expert Certificate in Automotive UX/UI & HMI Design.",
  },
  {
    q: "What if I miss a class?",
    a: "All live sessions are recorded and available for replay. You can catch up at your own pace, and mentors are available for async support.",
  },
]

const TOOLS = ["Figma", "ProtoPie", "Qt Studio", "UX Concepts", "Miro"]

// ─── Automotive HMI Digital Cockpit ───────────────────────────────────────────

type HmiMode = "cluster" | "infotainment" | "adas"

function AutomotiveHmiCockpit() {
  const [activeMode, setActiveMode] = useState<HmiMode>("cluster")
  const [speed, setSpeed] = useState(0)
  const [powerKw, setPowerKw] = useState(18.4)
  const [isAccelerating, setIsAccelerating] = useState(true)
  const [revBoostActive, setRevBoostActive] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const listener = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", listener)
    return () => mediaQuery.removeEventListener("change", listener)
  }, [])

  // Real-time continuous dynamic speed & power variation loop
  useEffect(() => {
    if (prefersReducedMotion) {
      setSpeed(72)
      setPowerKw(18.4)
      return
    }

    let start: number | null = null
    const startupDuration = 900
    const initialTarget = 72
    let revStartTime: number | null = null
    let animId: number

    const tick = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start

      let currentSpeed = 72

      if (elapsed < startupDuration) {
        // Initial entrance count-up from 0 to 72
        const progress = elapsed / startupDuration
        const eased = 1 - Math.pow(1 - progress, 3)
        currentSpeed = Math.round(eased * initialTarget)
      } else if (revBoostActive) {
        // Rev Boost surge effect (up to ~108 km/h)
        if (!revStartTime) revStartTime = timestamp
        const revElapsed = timestamp - revStartTime
        if (revElapsed < 1200) {
          const progress = revElapsed / 1200
          const surge = Math.sin(progress * Math.PI) * 36
          currentSpeed = Math.round(72 + surge)
        } else {
          setRevBoostActive(false)
          revStartTime = null
        }
      } else {
        // Smooth real-time driving speed fluctuation
        const t = elapsed * 0.0015
        const wave =
          Math.sin(t) * 7.5 + Math.cos(t * 1.8) * 3.5 + Math.sin(t * 0.4) * 4.0
        currentSpeed = Math.round(72 + wave)
      }

      // Calculate dynamic power kW based on driving state
      const tPow = elapsed * 0.0015
      const powDelta = Math.cos(tPow) * 12.0
      const calculatedKw = Number((18.4 + powDelta).toFixed(1))

      setSpeed(Math.max(0, currentSpeed))
      setPowerKw(calculatedKw)
      setIsAccelerating(powDelta >= 0)

      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [prefersReducedMotion, revBoostActive])

  const handleRevBoost = () => {
    if (!revBoostActive) {
      setRevBoostActive(true)
    }
  }

  // Mouse parallax depth effect (max +-2 deg)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const ry = Math.max(-2, Math.min(2, (x / (rect.width / 2)) * 2))
    const rx = Math.max(-2, Math.min(2, (-y / (rect.height / 2)) * 2))
    setTilt({ rx, ry })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[660px] mx-auto select-none transition-transform duration-200 ease-out"
      style={{
        transform: prefersReducedMotion
          ? "none"
          : `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }}
    >
      {/* Outer Dashboard Bezel Frame */}
      <div className="relative rounded-2xl p-3 sm:p-4 bg-[#0a0e1a] border border-[#1e293b] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(124,58,237,0.15)] overflow-hidden">
        {/* Ambient Top Bezel Bar with Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-[#1e293b]/80 bg-[#0d1324] rounded-t-xl mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-semibold text-slate-300 tracking-wider font-mono">
              EV HMI v4.2 • LIVE COCKPIT
            </span>
          </div>

          {/* Mode Switching Tabs */}
          <div
            role="tablist"
            aria-label="HMI Display Modes"
            className="flex items-center gap-1 bg-[#161f36] p-1 rounded-lg border border-[#273556]"
          >
            {[
              { id: "cluster", label: "Instrument Cluster" },
              { id: "infotainment", label: "Infotainment" },
              { id: "adas", label: "ADAS" },
            ].map((tab) => {
              const isActive = activeMode === tab.id
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveMode(tab.id as HmiMode)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${isActive
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Display Container with Faint Grid Backdrop */}
        <div className="relative rounded-xl bg-[#070b14] border border-[#1b253e] p-4 sm:p-5 overflow-hidden min-h-[360px] flex flex-col justify-between">
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 80%), linear-gradient(0deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 24px 24px, 24px 24px",
            }}
          />

          {/* MODE 1: INSTRUMENT CLUSTER */}
          {activeMode === "cluster" && (
            <div
              id="panel-cluster"
              role="tabpanel"
              aria-labelledby="tab-cluster"
              className="relative z-10 flex flex-col gap-4 animate-in fade-in duration-300"
            >
              {/* Top Status Bar */}
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-violet-950/80 text-violet-300 font-semibold text-[10px] border border-violet-800/50">
                    SPORT MODE
                  </span>
                  <span>11:24 AM</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="relative cursor-pointer flex items-center gap-1 group"
                    onMouseEnter={() => setActiveTooltip("battery")}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <svg
                      className="w-4 h-4 text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span className="text-emerald-400 font-bold">84%</span>
                    <span className="text-slate-500 text-[10px]">(420 km)</span>

                    {activeTooltip === "battery" && (
                      <div className="absolute right-0 top-6 z-30 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/40 text-[11px] text-slate-200 whitespace-nowrap shadow-xl">
                        800V Li-ion Battery • BMS Nominal
                      </div>
                    )}
                  </div>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-300 font-bold">D1</span>
                </div>
              </div>

              {/* Central Speedometer Arc Display */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center my-1">
                {/* Left Dynamic Power Flow Widget */}
                <div className="sm:col-span-3 flex flex-col gap-2 p-3 rounded-lg bg-[#0e1629]/80 border border-[#1e2c4a]">
                  <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                    Power Flow
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-white font-mono">
                      {powerKw}
                    </span>
                    <span className="text-[10px] text-cyan-400 font-mono">
                      kW
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-150 ${isAccelerating
                        ? "bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500"
                        : "bg-gradient-to-r from-emerald-500 to-cyan-500"
                        }`}
                      style={{
                        width: `${Math.min(100, Math.max(15, (powerKw / 40) * 100))}%`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-mono font-medium text-slate-400">
                    {isAccelerating ? "Drive Power" : "Regen Active"}
                  </span>
                </div>

                {/* Main Speed Gauge SVG with Real-time Sweeping Needle & Tap-to-Rev */}
                <div
                  className="sm:col-span-6 flex flex-col items-center justify-center relative py-2 cursor-pointer group"
                  onClick={handleRevBoost}
                  title="Click to Rev Accelerate"
                >
                  <svg className="w-48 h-48 select-none" viewBox="0 0 200 200">
                    <defs>
                      <linearGradient
                        id="clusterGaugeGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="60%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                      <filter
                        id="arcDotGlow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Outer Gauge Track Arc */}
                    <path
                      d="M 30,150 A 75,75 0 1,1 170,150"
                      fill="none"
                      stroke="#162036"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />

                    {/* Real-time Dynamic Arc Fill */}
                    <path
                      d="M 30,150 A 75,75 0 1,1 170,150"
                      fill="none"
                      stroke="url(#clusterGaugeGrad)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray="360"
                      strokeDashoffset={360 - (speed / 160) * 270}
                      style={{ transition: "stroke-dashoffset 0.08s linear" }}
                    />

                    {/* Gauge Tick Marks */}
                    {[0, 20, 40, 60, 80, 100, 120, 140, 160].map((v, i) => {
                      const angle = -210 + (i / 8) * 240
                      const rad = (angle * Math.PI) / 180
                      const x1 = 100 + 65 * Math.cos(rad)
                      const y1 = 100 + 65 * Math.sin(rad)
                      const x2 = 100 + 58 * Math.cos(rad)
                      const y2 = 100 + 58 * Math.sin(rad)
                      return (
                        <line
                          key={v}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={
                            speed >= v
                              ? revBoostActive
                                ? "#ec4899"
                                : "#00d4ff"
                              : "#334155"
                          }
                          strokeWidth={speed >= v ? "2.5" : "1"}
                        />
                      )
                    })}

                    {/* Center Digital Speed Readout */}
                    <text
                      x="100"
                      y="100"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="46"
                      fontWeight="900"
                      fontFamily="Inter, sans-serif"
                    >
                      {speed}
                    </text>
                    <text
                      x="100"
                      y="122"
                      textAnchor="middle"
                      fill="#06b6d4"
                      fontSize="12"
                      fontWeight="700"
                      letterSpacing="2"
                    >
                      KM/H
                    </text>
                    <text
                      x="100"
                      y="144"
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.3)"
                      fontSize="8"
                      fontWeight="600"
                      letterSpacing="1"
                    >
                      {revBoostActive ? "BOOSTING..." : "CLICK TO REV"}
                    </text>
                  </svg>
                </div>

                {/* Right Turn-by-Turn Nav Widget */}
                <div className="sm:col-span-3 flex flex-col gap-2 p-3 rounded-lg bg-[#0e1629]/80 border border-[#1e2c4a]">
                  <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                    Navigation
                  </span>
                  <div className="flex items-center gap-2 text-cyan-400">
                    <svg
                      className="w-5 h-5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                    <span className="text-xs font-bold text-white leading-tight">
                      250m
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-300 font-medium truncate">
                    Grand Avenue
                  </span>
                  <span className="text-[10px] text-slate-500">
                    ETA 11:38 AM
                  </span>
                </div>
              </div>

              {/* Bottom Mini Control Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-slate-300 font-semibold">PRND</span>
                  <span className="text-emerald-400 font-bold">● DRIVE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">TPMS:</span>
                  <span className="text-slate-300 font-semibold">
                    34 PSI OK
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: INFOTAINMENT */}
          {activeMode === "infotainment" && (
            <div
              id="panel-infotainment"
              role="tabpanel"
              aria-labelledby="tab-infotainment"
              className="relative z-10 flex flex-col gap-4 animate-in fade-in duration-300"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
                {/* Vehicle Health & 3D Vector Silhouette */}
                <div className="sm:col-span-7 p-3.5 rounded-xl bg-[#0d1527] border border-[#1c2947] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                      Vehicle Status • EV Sedan
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                      ALL SYSTEMS NOMINAL
                    </span>
                  </div>

                  <div className="relative py-4 flex items-center justify-center">
                    <svg className="w-56 h-24" viewBox="0 0 200 80" fill="none">
                      <path
                        d="M 10 50 C 30 50, 45 48, 60 30 C 75 15, 125 15, 145 30 C 160 42, 175 48, 190 50 L 190 60 C 190 62, 185 64, 175 64 L 25 64 C 15 64, 10 62, 10 60 Z"
                        fill="rgba(124, 58, 237, 0.15)"
                        stroke="#7c3aed"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="45"
                        cy="62"
                        r="10"
                        fill="#0f172a"
                        stroke="#00d4ff"
                        strokeWidth="2"
                      />
                      <circle
                        cx="155"
                        cy="62"
                        r="10"
                        fill="#0f172a"
                        stroke="#00d4ff"
                        strokeWidth="2"
                      />
                      <circle cx="45" cy="62" r="4" fill="#00d4ff" />
                      <circle cx="155" cy="62" r="4" fill="#00d4ff" />
                    </svg>

                    <div
                      className="absolute top-2 left-6 cursor-pointer"
                      onMouseEnter={() => setActiveTooltip("tpms")}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                      {activeTooltip === "tpms" && (
                        <div className="absolute left-0 bottom-5 z-30 px-2 py-1 rounded bg-slate-900 border border-cyan-500 text-[10px] text-white whitespace-nowrap">
                          Front Left: 34 PSI
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs border-t border-slate-800 pt-2 font-mono">
                    <div>
                      <div className="text-slate-500 text-[10px]">Tires</div>
                      <div className="text-slate-200 font-semibold">34 PSI</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px]">Doors</div>
                      <div className="text-emerald-400 font-semibold">
                        Locked
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px]">Climate</div>
                      <div className="text-violet-300 font-semibold">
                        21.5°C
                      </div>
                    </div>
                  </div>
                </div>

                {/* Media & Audio Player Widget */}
                <div className="sm:col-span-5 p-3.5 rounded-xl bg-[#0d1527] border border-[#1c2947] flex flex-col justify-between">
                  <span className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">
                    Media Player
                  </span>

                  <div className="flex items-center gap-3 my-2">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-md">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zm12 0c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zM9 10l12-3"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-white truncate">
                        Quantum Horizon
                      </span>
                      <span className="text-[11px] text-slate-400 truncate">
                        Synthwave Audio
                      </span>
                    </div>
                  </div>

                  <div className="flex items-end gap-1 h-6 my-1 justify-center">
                    {[40, 75, 55, 90, 60, 85, 45, 100, 70, 50].map((h, i) => (
                      <div
                        key={i}
                        className="w-1 bg-gradient-to-t from-violet-500 to-cyan-400 rounded-full transition-all duration-300"
                        style={{ height: isPlaying ? `${h}%` : "20%" }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-800 pt-2">
                    <span className="text-[10px] text-slate-500 font-mono">
                      02:45 / 03:50
                    </span>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-3 py-1 rounded bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold font-mono transition-colors"
                    >
                      {isPlaying ? "Pause" : "Play"}
                    </button>
                  </div>
                </div>
              </div>

              {/* HVAC Quick Control Strip */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#090e1b] border border-[#1a243d] text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Driver:</span>
                  <span className="text-cyan-400 font-bold text-sm">
                    21.5°C
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px]">
                    AUTO AC ON
                  </span>
                  <span className="px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-800 text-[10px]">
                    SYNC
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Passenger:</span>
                  <span className="text-cyan-400 font-bold text-sm">
                    22.0°C
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* MODE 3: ADAS */}
          {activeMode === "adas" && (
            <div
              id="panel-adas"
              role="tabpanel"
              aria-labelledby="tab-adas"
              className="relative z-10 flex flex-col gap-4 animate-in fade-in duration-300"
            >
              <div className="relative h-44 rounded-xl bg-[#080d19] border border-[#1b2744] overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 160"
                >
                  <line
                    x1="80"
                    y1="160"
                    x2="170"
                    y2="48"
                    stroke="#334155"
                    strokeWidth="2"
                  />
                  <line
                    x1="320"
                    y1="160"
                    x2="230"
                    y2="48"
                    stroke="#334155"
                    strokeWidth="2"
                  />

                  <line
                    x1="120"
                    y1="160"
                    x2="185"
                    y2="48"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                  <line
                    x1="280"
                    y1="160"
                    x2="215"
                    y2="48"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />

                  <g className="animate-pulse">
                    <rect
                      x="184"
                      y="44"
                      width="32"
                      height="20"
                      rx="3"
                      fill="none"
                      stroke="#00d4ff"
                      strokeWidth="1.5"
                    />
                    <circle cx="200" cy="54" r="4" fill="#00d4ff" />
                  </g>
                </svg>

                <div className="absolute top-3 px-2.5 py-1 rounded bg-slate-900/90 border border-cyan-500/50 text-[10px] text-cyan-300 font-mono shadow-md">
                  Lead Target Locked • 42m Distance
                </div>

                <div
                  className="absolute bottom-3 left-4 cursor-pointer flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded border border-violet-500/40 text-[10px] text-violet-300 font-mono"
                  onMouseEnter={() => setActiveTooltip("radar")}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
                  <span>77GHz RADAR</span>

                  {activeTooltip === "radar" && (
                    <div className="absolute left-0 bottom-7 z-30 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-violet-500/60 text-[11px] text-slate-200 whitespace-nowrap shadow-xl">
                      Long-Range Radar + Stereo Vision Active
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div className="p-2.5 rounded-lg bg-[#0d1527] border border-[#1c2947] flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400">
                    Lane Centering
                  </span>
                  <span className="text-xs font-bold text-cyan-400">
                    ACTIVE
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0d1527] border border-[#1c2947] flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400">ACC Cruise</span>
                  <span className="text-xs font-bold text-emerald-400">
                    SET: 75 KM/H
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0d1527] border border-[#1c2947] flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400">Blind Spot</span>
                  <span className="text-xs font-bold text-emerald-400">
                    CLEAR
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0d1527] border border-[#1c2947] flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400">
                    Speed Limit
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full border border-red-500 text-red-500 text-[9px] font-bold flex items-center justify-center">
                      70
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      70 KM/H
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Display Status Bar */}
          <div className="relative z-10 flex items-center justify-between pt-3 mt-2 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="text-violet-400 font-semibold">
                AUTOMOTIVE HMI ENGINE
              </span>
              <span>• QT DESIGN STUDIO COMPATIBLE</span>
            </div>
            <div className="text-slate-500">INTERACTIVE PROTOTYPE</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Components ──────────────────────────────────────────────────────────────

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
        background: "rgba(6,12,24,0.88)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z"
              stroke="white"
              strokeWidth="1.2"
              fill="none"
            />
            <circle cx="8" cy="8" r="2" fill="white" opacity="0.8" />
          </svg>
        </div>
        <span
          className="font-700 text-white tracking-wide text-[15px]"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Automotive UX+HCI
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-sm hover:text-white transition-colors duration-200"
            style={{
              color: "rgba(255,255,255,0.55)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {l.label}
          </a>
        ))}
      </div>
      <a
        href="#program-modules"
        className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-600 text-white transition-all duration-200 hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #6366f1, #a855f7)",
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: "0.04em",
          boxShadow: "0 0 20px rgba(99,102,241,0.35)",
        }}
      >
        Enroll now
      </a>
      <button
        className="md:hidden text-white/70"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          {menuOpen ? (
            <path d="M6 6L18 18M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 md:hidden py-4 px-8 flex flex-col gap-4"
          style={{
            background: "rgba(6,12,24,0.97)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm hover:text-cyan-400 transition-colors"
              style={{
                color: "rgba(255,255,255,0.7)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {l.label}
            </a>
          ))}
          <button
            className="self-start px-5 py-2 rounded-full text-sm font-600 text-white"
            style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
          >
            Enroll now
          </button>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const scrollToModules = () => {
    document
      .getElementById("program-modules")
      ?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[#060913] flex items-center pt-20 pb-12">
      {/* Background Ambient Glows & Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/6 w-[550px] h-[550px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-[450px] h-[450px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 75% 50%, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column (5 cols on Desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold uppercase tracking-wider font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Expert Certificate Program
            </div>

            {/* Main Headline */}
            <h1 className="font-extrabold tracking-tight text-white leading-[1.08] text-4xl sm:text-5xl lg:text-6xl font-display">
              <span className="block text-slate-300 font-normal text-2xl sm:text-3xl mb-1 tracking-normal font-sans">
                Expert Certificate in
              </span>
              <span className="block text-white">
                Automotive UX/UI &amp;{" "}
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  HMI Design
                </span>
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg leading-relaxed text-slate-300 max-w-xl font-sans">
              A 100-hour, project-based journey from automotive UI foundations
              to production-grade HMI engineering — covering Infotainment,
              Instrument Clusters and HUDs using Figma, ProtoPie and Qt Design
              Studio.
            </p>

            {/* 3 Compact Information Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-1">
              {[
                { title: "100 Hours", sub: "Hands-on Training" },
                { title: "6 Advanced Modules", sub: "Production HMI" },
                { title: "5 Months + 1 Month", sub: "Internship Program" },
              ].map((ind, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[#0f172a]/70 border border-[#1e293b] flex flex-col gap-0.5 backdrop-blur-sm"
                >
                  <span className="text-sm font-bold text-white font-sans">
                    {ind.title}
                  </span>
                  <span className="text-[11px] text-slate-400 font-sans">
                    {ind.sub}
                  </span>
                </div>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-5 mt-2">
              <a
                href="#program-modules"
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:shadow-[0_0_35px_rgba(124,58,237,0.6)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                <span>Book Free Technical Demo</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>

              <button
                onClick={scrollToModules}
                className="text-sm font-semibold text-slate-300 hover:text-white underline underline-offset-4 decoration-violet-500/50 hover:decoration-violet-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded px-2 py-1"
              >
                Explore Curriculum
              </button>
            </div>
          </div>

          {/* Right Column (7 cols on Desktop - Dominant HMI visual) */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <AutomotiveHmiCockpit />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsTools() {
  const { ref, inView } = useInView()
  const c1 = useCounter(100, inView)
  const c2 = useCounter(6, inView)
  const c3 = useCounter(5, inView)

  const toolDetails = [
    { name: "Figma", role: "UI Systems & Design Tokens", dot: "#8b5cf6" },
    {
      name: "ProtoPie",
      role: "HMI Interaction & Sensor Logic",
      dot: "#06b6d4",
    },
    { name: "Qt Studio", role: "Production Embedded C++ HMI", dot: "#10b981" },
    {
      name: "UX Concepts",
      role: "Cognitive Load & Human Factors",
      dot: "#f59e0b",
    },
    { name: "Miro", role: "Information Architecture", dot: "#ec4899" },
  ]

  return (
    <section
      id="stats-tools"
      className="relative py-20 px-6 sm:px-8 bg-[#070a13] border-t border-b border-[#1b253e] overflow-hidden"
    >
      {/* Background ambient grid & glow */}
      <div className="absolute inset-0 cockpit-grid pointer-events-none opacity-30" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[350px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Telemetry Eyebrow */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-8 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase">
              // TELEMETRY &amp; SPECIFICATION METRICS
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/70 px-2.5 py-1 rounded-md border border-cyan-800/60 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
              ● REAL-TIME DATA STREAM
            </span>
          </div>
        </div>

        {/* 3 Metric Cards with Odometer / Cluster Aesthetics */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            {
              tag: "METRIC // 01",
              value: `${c1}h`,
              label: "Program Duration",
              sub: "100 hours hands-on embedded engineering",
              accent: "#8b5cf6",
            },
            {
              tag: "METRIC // 02",
              value: `0${c2}`,
              label: "Advanced Modules",
              sub: "Cluster, IVI, HUD, Voice, ADAS & EV UX",
              accent: "#06b6d4",
            },
            {
              tag: "METRIC // 03",
              value: `${c3}+`,
              label: "Years Industry Relevance",
              sub: "Aligned to current Tier-1 OEM requirements",
              accent: "#10b981",
            },
          ].map((s, i) => (
            <AnimateIn key={s.label} delay={i * 100} from="bottom">
              <div className="group relative rounded-2xl p-6 bg-[#0c1426]/90 border border-[#1b2844] hover:border-violet-500/60 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(124,58,237,0.2)] flex flex-col justify-between h-full overflow-hidden">
                {/* Top Corner Bezel Accent */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-10 group-hover:opacity-25 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${s.accent} 0%, transparent 70%)`,
                  }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-semibold text-cyan-400 tracking-wider">
                      {s.tag}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />
                  </div>

                  <div className="font-900 text-white mb-2 font-display text-5xl sm:text-6xl tracking-tight">
                    <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                      {s.value}
                    </span>
                  </div>

                  <div className="border-t border-slate-800/80 pt-3 mt-2">
                    <div className="text-base font-bold text-slate-100 font-sans tracking-wide">
                      {s.label}
                    </div>
                    <div className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                      {s.sub}
                    </div>
                  </div>
                </div>

                {/* Bottom status line */}
                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>TELEMETRY: NOMINAL</span>
                  <span className="text-emerald-400 font-bold">100% PASS</span>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Embedded HMI Toolchain Stack */}
        <AnimateIn from="bottom" delay={150}>
          <div className="rounded-2xl p-6 sm:p-8 bg-[#0c1426]/90 border border-[#1e2c4f] backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-violet-950 flex items-center justify-center border border-violet-700/60">
                  <svg
                    className="w-3.5 h-3.5 text-violet-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                  Hardware &amp; Software Toolchain Integration
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
                INDUSTRY-STANDARD HMI STACK
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {TOOLS.map((t, i) => {
                const details = toolDetails[i] || {
                  role: "Software Tool",
                  dot: "#8b5cf6",
                }
                return (
                  <div
                    key={t}
                    className="group flex flex-col justify-between p-3.5 rounded-xl bg-[#080d1a] border border-[#1b253e] hover:border-violet-400 hover:bg-[#0f172e] transition-all duration-200 cursor-default shadow-sm hover:shadow-[0_0_15px_rgba(124,58,237,0.25)]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse"
                        style={{
                          background: details.dot,
                          boxShadow: `0 0 8px ${details.dot}`,
                        }}
                      />
                      <span className="text-[9px] font-mono text-slate-500">
                        TOOL 0{i + 1}
                      </span>
                    </div>
                    <span className="font-bold text-white group-hover:text-cyan-300 transition-colors font-sans text-sm mb-1">
                      {t}
                    </span>
                    <span className="text-[11px] font-sans text-slate-400 leading-tight">
                      {details.role}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

function ProgramOverview() {
  const domainCodes = [
    "CLUSTER // 60FPS",
    "IVI // ANDROID AUTO",
    "HUD // AR OPTICS",
    "VOICE // ALEXA SDK",
    "ADAS // RADAR+VISION",
    "ENERGY // 800V BMS",
  ]

  return (
    <section
      id="program-overview"
      className="relative py-24 px-6 sm:px-8 bg-[#090e1b] border-b border-[#1b253e] overflow-hidden"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <AnimateIn from="bottom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/80 border border-violet-800/60 text-violet-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              // IN-VEHICLE SYSTEM DOMAINS
            </div>
            <h2 className="font-900 text-white mb-4 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              Program Overview
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed font-sans">
              Build real-world Automotive UX skills led by leading automotive
              companies
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES_OVERVIEW.map((m, i) => (
            <AnimateIn key={m.id} delay={i * 80} from="bottom">
              <div className="relative rounded-2xl p-7 bg-[#0c1426]/90 border border-[#1c2a49] hover:border-violet-500/60 group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(124,58,237,0.2)] flex flex-col justify-between h-full min-h-[220px] overflow-hidden">
                {/* Top accent line indicator */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${m.from}, ${m.to})`,
                  }}
                />

                {/* Header row with Module ID and domain tag */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-400 uppercase bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-800/50">
                        Module {m.id}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                      {domainCodes[i]}
                    </span>
                  </div>

                  <h3 className="font-800 text-white group-hover:text-cyan-300 transition-colors font-display text-2xl leading-tight mb-2">
                    {m.title}
                  </h3>
                  <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors font-sans leading-relaxed">
                    {m.sub}
                  </p>
                </div>

                {/* Bottom telemetry footer */}
                <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>SPEC VERIFIED</span>
                  </div>
                  <span className="text-violet-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all font-semibold">
                    EXPLORE →
                  </span>
                </div>

                {/* Subtle hover gradient glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${m.from}, ${m.to})`,
                  }}
                />
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function LearningJourney() {
  return (
    <section
      id="learning-journey"
      className="relative py-24 px-6 sm:px-8 bg-[#060a14] border-b border-[#1b253e] overflow-hidden"
    >
      <div className="absolute inset-0 cockpit-grid pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimateIn from="bottom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              // ARCHITECTURE ROADMAP
            </div>
            <h2 className="font-900 text-white mb-4 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              Learning Journey
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-base sm:text-lg leading-relaxed font-sans">
              Six progressive modules — from UX foundations to production-grade
              HMI deployment.
            </p>
          </div>
        </AnimateIn>

        <div className="relative">
          {/* Illuminated CAN-bus Data Stream Track */}
          <div
            className="absolute top-7 left-8 right-8 h-1 hidden lg:block rounded-full overflow-hidden"
            style={{
              background:
                "linear-gradient(90deg, #6366f1, #8b5cf6, #ef4444, #10b981, #f59e0b, #06b6d4)",
              boxShadow: "0 0 15px rgba(99,102,241,0.5)",
            }}
          >
            <div className="w-20 h-full bg-white/80 blur-[2px] animate-bus-packet" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 items-stretch">
            {JOURNEY_STEPS.map((step, i) => (
              <AnimateIn
                key={step.num}
                delay={i * 90}
                from="bottom"
                className="h-full flex flex-col"
              >
                <div className="flex flex-col items-center text-center gap-4 h-full w-full">
                  {/* Step ECU Node Marker */}
                  <div
                    className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center text-white font-900 text-lg shadow-xl transition-all duration-300 hover:scale-110 cursor-default border border-white/20 shrink-0"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      background: `linear-gradient(135deg, ${step.color}, #0c1426)`,
                      boxShadow: `0 0 20px ${step.color}66`,
                    }}
                  >
                    <span>0{step.num}</span>
                  </div>

                  {/* Step Card */}
                  <div className="w-full bg-[#0c1426]/90 rounded-2xl p-5 text-left border border-[#1b2844] hover:border-cyan-500/50 hover:shadow-[0_10px_25px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between flex-1 h-full min-h-[250px] group">
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50 font-semibold">
                          {step.hrs}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          BUS 0x0{step.num}
                        </span>
                      </div>

                      <h4 className="font-800 text-white group-hover:text-cyan-300 transition-colors text-base mb-2 leading-snug font-display min-h-[2.75rem] flex items-center">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans flex-1">
                        {step.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between shrink-0">
                      <div
                        className="h-1 w-10 rounded-full"
                        style={{ background: step.color }}
                      />
                      <span className="text-[9px] font-mono text-slate-500">
                        VERIFIED
                      </span>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProgramModules() {
  return (
    <section
      id="program-modules"
      className="relative py-24 px-6 sm:px-8 bg-[#080d19] border-b border-[#1b253e]"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <AnimateIn from="bottom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-800/60 text-purple-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              // 100-HOUR PRODUCTION SYLLABUS
            </div>
            <h2 className="font-900 text-white font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              Program Modules{" "}
              <span className="font-400 text-violet-400">
                (100 Hours • 6 Modules)
              </span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed font-sans">
              From design thinking to deployed HMI — the complete automotive UX
              workflow.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAM_MODULES.map((m, i) => (
            <AnimateIn key={m.num} delay={i * 80} from="scale">
              <div className="rounded-2xl p-6 bg-[#0c1426]/95 border border-[#1e2a47] hover:border-violet-500/60 hover:shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(124,58,237,0.2)] transition-all duration-300 h-full flex flex-col justify-between group relative overflow-hidden">
                {/* Top Corner Bezel Accent */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${m.color} 0%, transparent 70%)`,
                  }}
                />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-900 text-base font-display shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${m.color}, #080d19)`,
                        border: `1px solid ${m.color}66`,
                      }}
                    >
                      0{m.num}
                    </div>
                    <span className="text-xs font-mono font-semibold text-cyan-400 bg-cyan-950/70 px-2.5 py-1 rounded-md border border-cyan-800/60">
                      {m.hrs}
                    </span>
                  </div>

                  <h3 className="font-800 text-white group-hover:text-cyan-300 transition-colors mb-5 leading-snug font-display text-xl">
                    {m.title}
                  </h3>

                  <ul className="flex flex-col gap-3">
                    {m.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-slate-300 font-sans"
                      >
                        <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-950/90 px-1.5 py-0.5 rounded border border-emerald-800/60 shrink-0 mt-0.5">
                          SYS_OK
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>ECU_SYS // PROD</span>
                  <span className="text-violet-400 font-semibold">
                    COMPLETE SPEC
                  </span>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function Portfolio() {
  return (
    <section
      id="capstone-portfolio"
      className="relative py-24 px-6 sm:px-8 bg-[#060a14] border-b border-[#1b253e]"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <AnimateIn from="bottom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              // HMI VIRTUAL PROVING GROUND &amp; CASE STUDIES
            </div>
            <h2 className="font-900 tracking-widest uppercase font-display text-3xl sm:text-4xl lg:text-5xl text-white">
              Capstone Project
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mt-4 text-base font-sans">
              Production-ready automotive interfaces engineered and validated by
              program graduates.
            </p>
          </div>
        </AnimateIn>

        {/* 3 × 2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO.map((p, i) => (
            <AnimateIn key={p.title} delay={i * 70} from="scale">
              <div className="group bg-[#0c1426] rounded-2xl overflow-hidden cursor-pointer h-full border border-[#1e2c4f] hover:border-violet-500 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(124,58,237,0.25)] flex flex-col justify-between">
                {/* In-Dash Display Bezel Top Bar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#090e1d] border-b border-slate-800/80 text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    DISP // 0{p.num}
                  </span>
                  <span className="text-cyan-400">1920×720 • 60 FPS</span>
                </div>

                {/* Image Display */}
                <div
                  className="relative overflow-hidden bg-black"
                  style={{ aspectRatio: "16/10" }}
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  {/* Vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1426] via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Corner HUD targeting brackets */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                {/* Title and Specs Footer */}
                <div className="px-5 py-4 bg-[#0c1426]">
                  <h3 className="font-800 text-white group-hover:text-cyan-300 transition-colors font-display text-lg tracking-wide mb-1">
                    {p.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mt-2">
                    <span>CAPSTONE DELIVERABLE</span>
                    <span className="text-violet-400 group-hover:text-cyan-400 transition-colors font-semibold">
                    </span>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <section
      id="faq-section"
      className="relative py-24 px-6 sm:px-8 bg-[#080d1a] border-b border-[#1b253e]"
    >
      <div className="relative z-10 max-w-3xl mx-auto">
        <AnimateIn from="bottom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              // PROGRAM BRIEFINGS &amp; TECHNICAL SPECS
            </div>
            <h2 className="font-900 text-white mb-4 font-display text-4xl sm:text-5xl tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-base sm:text-lg font-sans">
              Everything you need to know about the program
            </p>
          </div>
        </AnimateIn>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <AnimateIn key={i} delay={i * 60} from="bottom">
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                    ? "border-violet-500/80 bg-[#0f1830] shadow-[0_0_25px_rgba(124,58,237,0.18)]"
                    : "border-[#1c2947] bg-[#0c1426]/90 hover:border-slate-600 hover:bg-[#0f1932]"
                    }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 pr-4">
                      <span className="font-mono text-xs text-cyan-400 font-bold shrink-0">
                        [Q-0{i + 1}]
                      </span>
                      <span className="font-semibold text-white font-sans text-sm sm:text-base">
                        {faq.q}
                      </span>
                    </div>
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center transition-all duration-300 ${isOpen
                        ? "border-violet-500 bg-violet-600 text-white shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                        : "border-slate-700 bg-slate-800 text-slate-400"
                        }`}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 10 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{
                          transform: isOpen ? "rotate(45deg)" : "none",
                          transition: "transform 0.25s ease",
                        }}
                      >
                        <path d="M5 1v8M1 5h8" />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 border-t border-slate-800/80 animate-in fade-in duration-200">
                      <p className="text-slate-300 leading-relaxed font-sans text-sm">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 px-6 sm:px-8 bg-[#070b14] border-t border-[#1b253e]">
      {/* Telemetry Status Ribbon */}
      <div className="max-w-5xl mx-auto mb-8 pb-6 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-semibold">
            STATUS: CAN-BUS NOMINAL
          </span>
          <span className="text-slate-600">|</span>
          <span>ECU FIRMWARE v4.2</span>
          <span className="text-slate-600">|</span>
          <span>800V BMS NOMINAL</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-400">
          <span>● AUTOMOTIVE HMI EXPERT PROGRAM</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
            style={{
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              boxShadow: "0 0 15px rgba(99,102,241,0.3)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1L13 4.5V9.5L7 13L1 9.5V4.5L7 1Z"
                stroke="white"
                strokeWidth="1.2"
                fill="none"
              />
              <circle cx="7" cy="7" r="1.8" fill="white" opacity="0.9" />
            </svg>
          </div>
          <span className="font-800 text-white text-base tracking-wide font-display">
            Automotive UX+HCI
          </span>
        </div>
        <p className="text-xs text-slate-400 font-sans text-center sm:text-left">
          © 2026 Automotive UX+HCI. Expert Certificate Program.
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-xs text-slate-400 hover:text-cyan-400 transition-colors font-sans"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-[#060913] text-slate-100">
      <Nav />
      <Hero />
      <StatsTools />
      <ProgramOverview />
      <LearningJourney />
      <ProgramModules />
      <Portfolio />
      <FAQ />
      <Footer />
    </div>
  )
}
