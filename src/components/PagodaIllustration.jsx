/* Decorative pagoda + cherry blossom + visa stamp illustration (pure SVG) */

function Blossom({ x, y, s = 1, r = 0 }) {
  const petals = [0, 72, 144, 216, 288]
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {petals.map((a) => (
        <ellipse
          key={a}
          cx="0"
          cy="-6.5"
          rx="3"
          ry="6"
          fill="#f9a8d4"
          transform={`rotate(${a})`}
        />
      ))}
      <circle r="2.1" fill="#ec4899" />
    </g>
  )
}

export default function PagodaIllustration() {
  return (
    <svg
      viewBox="0 0 520 520"
      className="mx-auto w-full max-w-sm"
      role="img"
      aria-label="Chinese pagoda with cherry blossoms and a visa stamp"
    >
      {/* backdrop blobs */}
      <circle cx="272" cy="238" r="198" fill="#e8f1fc" />
      <circle cx="212" cy="212" r="176" fill="#e0ecfa" opacity="0.7" />
      <circle cx="382" cy="132" r="26" fill="#fdeef5" />
      <circle cx="120" cy="382" r="20" fill="#fdeef5" />

      {/* ground */}
      <ellipse cx="260" cy="424" rx="150" ry="17" fill="#d4e4f7" />
      <ellipse cx="260" cy="419" rx="104" ry="10" fill="#c6dbf3" opacity="0.8" />

      {/* pagoda */}
      <g>
        {/* plinth */}
        <rect x="172" y="398" width="176" height="18" rx="4" fill="#243b5e" />
        <rect x="184" y="392" width="152" height="8" rx="3" fill="#1a2b4c" />

        {/* tier 1 body */}
        <rect x="216" y="332" width="88" height="62" fill="#c0433b" />
        <rect x="226" y="344" width="10" height="16" rx="5" fill="#8f2a2a" />
        <rect x="255" y="344" width="10" height="16" rx="5" fill="#8f2a2a" />
        <rect x="284" y="344" width="10" height="16" rx="5" fill="#8f2a2a" />
        <rect x="248" y="364" width="24" height="30" rx="11" fill="#8f2a2a" />
        {/* tier 1 roof */}
        <path
          d="M160 330 C 200 344, 320 344, 360 330 L 350 308 C 310 297, 210 297, 170 308 Z"
          fill="#1a2b4c"
        />
        <rect x="176" y="331" width="168" height="4" rx="2" fill="#f7941d" />

        {/* tier 2 body */}
        <rect x="226" y="268" width="68" height="42" fill="#c0433b" />
        <rect x="238" y="276" width="9" height="13" rx="4" fill="#8f2a2a" />
        <rect x="273" y="276" width="9" height="13" rx="4" fill="#8f2a2a" />
        {/* tier 2 roof */}
        <path
          d="M186 264 C 222 277, 298 277, 334 264 L 326 246 C 296 237, 224 237, 194 246 Z"
          fill="#1a2b4c"
        />
        <rect x="200" y="265" width="120" height="4" rx="2" fill="#f7941d" />

        {/* tier 3 body */}
        <rect x="238" y="208" width="44" height="38" fill="#c0433b" />
        <rect x="251" y="215" width="18" height="12" rx="6" fill="#8f2a2a" />
        {/* tier 3 roof */}
        <path
          d="M206 204 C 232 216, 288 216, 314 204 L 308 189 C 286 181, 234 181, 212 189 Z"
          fill="#1a2b4c"
        />
        <rect x="220" y="205" width="80" height="4" rx="2" fill="#f7941d" />

        {/* finial */}
        <line x1="260" y1="150" x2="260" y2="182" stroke="#1a2b4c" strokeWidth="4" />
        <circle cx="260" cy="160" r="5.5" fill="#f7941d" />
        <circle cx="260" cy="148" r="3.2" fill="#f7941d" />
      </g>

      {/* blossoms */}
      <Blossom x="128" y="182" s={1.35} r={12} />
      <Blossom x="96" y="258" s={0.95} r={-8} />
      <Blossom x="392" y="172" s={1.15} r={-15} />
      <Blossom x="422" y="252" s={0.85} r={20} />
      <Blossom x="152" y="122" s={0.7} r={30} />
      <Blossom x="360" y="112" s={0.9} r={-25} />
      <Blossom x="112" y="330" s={0.75} r={45} />
      <Blossom x="404" y="322" s={0.8} r={-40} />
      <circle cx="176" cy="150" r="4" fill="#fbcfe8" />
      <circle cx="348" cy="146" r="3.4" fill="#fbcfe8" />
      <circle cx="88" cy="308" r="3.6" fill="#fbcfe8" />
      <circle cx="436" cy="206" r="3" fill="#fbcfe8" />

      {/* visa stamp seal */}
      <g transform="translate(382 362) rotate(12)">
        <circle r="62" fill="#0b1220" opacity="0.08" transform="translate(4 5)" />
        <circle r="62" fill="#ffffff" stroke="#e11d48" strokeWidth="3" />
        <circle r="49" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="5 4" />
        <defs>
          <path id="abl-stamp-arc" d="M -46,0 A 46,46 0 1 1 46,0" fill="none" />
        </defs>
        <text
          fill="#e11d48"
          fontSize="11.5"
          fontWeight="800"
          letterSpacing="3.5"
          fontFamily="Poppins, sans-serif"
        >
          <textPath href="#abl-stamp-arc" startOffset="50%" textAnchor="middle">
            CHINA VISA
          </textPath>
        </text>
        <path
          d="M0 -25 L3.1 -16.3 11.9 -16.2 4.8 -10.9 7.4 -2.3 0 -7.4 -7.4 -2.3 -4.8 -10.9 -11.9 -16.2 -3.1 -16.3 Z"
          transform="translate(0 -2)"
          fill="#e11d48"
        />
        <text
          x="0"
          y="18"
          textAnchor="middle"
          fill="#e11d48"
          fontSize="10.5"
          fontWeight="800"
          letterSpacing="1.5"
          fontFamily="Poppins, sans-serif"
        >
          SPECIALIST
        </text>
        <text
          x="0"
          y="33"
          textAnchor="middle"
          fill="#e11d48"
          opacity="0.65"
          fontSize="7"
          fontWeight="700"
          letterSpacing="2.5"
          fontFamily="Poppins, sans-serif"
        >
          ABL TRAVELS
        </text>
      </g>
    </svg>
  )
}
