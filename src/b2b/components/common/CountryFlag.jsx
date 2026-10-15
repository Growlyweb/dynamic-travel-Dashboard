export default function CountryFlag({ countryCode, countryName, className = 'w-5 h-4' }) {
  // SVG Flags for crisp rendering
  switch (countryCode?.toUpperCase()) {
    case 'CN':
      return (
        <span className={`inline-flex items-center justify-center overflow-hidden rounded-[3px] shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="600" fill="#de2910" />
            <polygon fill="#ffde00" points="150,50 180,140 90,85 210,85 120,140" />
            <polygon fill="#ffde00" points="300,40 295,70 270,55 300,55 275,70" />
            <polygon fill="#ffde00" points="360,90 350,118 330,100 360,105 332,120" />
            <polygon fill="#ffde00" points="360,160 345,185 330,165 360,175 330,185" />
            <polygon fill="#ffde00" points="300,210 292,238 272,220 300,225 275,240" />
          </svg>
        </span>
      )
    case 'TH':
      return (
        <span className={`inline-flex items-center justify-center overflow-hidden rounded-[3px] shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="600" fill="#A51931" />
            <rect y="100" width="900" height="400" fill="#F4F5F8" />
            <rect y="200" width="900" height="200" fill="#2D2A4A" />
          </svg>
        </span>
      )
    case 'MY':
      return (
        <span className={`inline-flex items-center justify-center overflow-hidden rounded-[3px] shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 1400 700" className="w-full h-full object-cover">
            <rect width="1400" height="700" fill="#fff" />
            {[0, 100, 200, 300, 400, 500, 600].map((y) => (
              <rect key={y} y={y} width="1400" height="50" fill="#cc0000" />
            ))}
            <rect width="700" height="400" fill="#000066" />
            <circle cx="330" cy="200" r="130" fill="#ffcc00" />
            <circle cx="360" cy="200" r="115" fill="#000066" />
            <polygon
              fill="#ffcc00"
              points="450,200 420,210 440,230 415,225 425,250 405,235 405,260 390,240 380,265 375,240 360,260 360,235 340,250 350,225 325,230 345,210 320,200 345,190 325,170 350,175 340,150 360,165 360,140 375,160 380,135 390,160 405,140 405,165 425,150 415,175 440,170 420,190"
            />
          </svg>
        </span>
      )
    case 'SG':
      return (
        <span className={`inline-flex items-center justify-center overflow-hidden rounded-[3px] shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="300" fill="#ED2939" />
            <rect y="300" width="900" height="300" fill="#FFFFFF" />
            <circle cx="200" cy="150" r="95" fill="#FFFFFF" />
            <circle cx="230" cy="150" r="85" fill="#ED2939" />
          </svg>
        </span>
      )
    case 'AE':
      return (
        <span className={`inline-flex items-center justify-center overflow-hidden rounded-[3px] shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="200" fill="#00732F" />
            <rect y="200" width="900" height="200" fill="#FFFFFF" />
            <rect y="400" width="900" height="200" fill="#000000" />
            <rect width="250" height="600" fill="#FF0000" />
          </svg>
        </span>
      )
    case 'SA':
      return (
        <span className={`inline-flex items-center justify-center overflow-hidden rounded-[3px] shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="600" fill="#006C35" />
            <rect x="250" y="380" width="400" height="20" fill="#FFFFFF" rx="4" />
            <text x="450" y="280" fill="#FFFFFF" fontSize="90" textAnchor="middle" fontWeight="bold">
              لا إله إلا الله
            </text>
          </svg>
        </span>
      )
    case 'TR':
      return (
        <span className={`inline-flex items-center justify-center overflow-hidden rounded-[3px] shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="600" fill="#E30A17" />
            <circle cx="380" cy="300" r="150" fill="#FFFFFF" />
            <circle cx="420" cy="300" r="120" fill="#E30A17" />
            <polygon fill="#FFFFFF" points="520,300 560,315 540,285 555,260 525,275 500,250 510,285 480,300 515,315 510,345" />
          </svg>
        </span>
      )
    case 'GB':
      return (
        <span className={`inline-flex items-center justify-center overflow-hidden rounded-[3px] shadow-xs shrink-0 ${className}`}>
          <svg viewBox="0 0 60 30" className="w-full h-full object-cover">
            <clipPath id="s">
              <path d="M0,0 v30 h60 v-30 z" />
            </clipPath>
            <clipPath id="t">
              <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
            </clipPath>
            <g clipPath="url(#s)">
              <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
              <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
              <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
              <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
            </g>
          </svg>
        </span>
      )
    default:
      return <span className="text-base leading-none">🌐</span>
  }
}
