export default function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 select-none shrink-0 whitespace-nowrap ${className}`}>
      {/* Stylized Delta Origami Airplane / Chevron Symbol */}
      <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 100 100" className="w-8 h-8 drop-shadow-xs" fill="none">
          {/* Cyan/Blue delta wing */}
          <path
            d="M 15 15 L 75 15 L 45 85 Z"
            fill="url(#blueGrad)"
          />
          {/* Vibrant Orange fold wing */}
          <path
            d="M 45 85 L 75 15 L 85 40 Z"
            fill="url(#orangeGrad)"
          />
          {/* Subtle wing highlight */}
          <path
            d="M 15 15 L 45 85 L 35 48 Z"
            fill="#0284c7"
            fillOpacity="0.4"
          />
          <defs>
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex items-center shrink-0 whitespace-nowrap">
        <span className="text-xl font-bold italic tracking-tight text-[#0066cc] whitespace-nowrap">
          ABL <span className="font-extrabold text-[#004f9e] not-italic">Travels</span>
        </span>
      </div>
    </div>
  )
}

