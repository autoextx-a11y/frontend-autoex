export function ComingSoonImage() {
  return (
    <div className="absolute inset-0 grid grid-rows-[1fr_64px] overflow-hidden bg-white">
      {/* Large car illustration */}
      <div className="flex min-h-0 items-center justify-center bg-white">
        <svg
          viewBox="0 0 300 180"
          className="h-[190px] w-[280px] max-h-[90%] max-w-[90%] text-[#D1DCE2]"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M48 65 L65 65 L82 27 Q87 12 103 12 H197 Q213 12 218 27 L235 65 H252 Q265 65 265 80 V130 Q265 140 253 140 H47 Q35 140 35 130 V80 Q35 65 48 65Z" />

          <path d="M83 57 L98 27 Q100 23 106 23 H194 Q200 23 202 27 L217 57 Z" fill="white" />

          <rect x="17" y="61" width="25" height="16" rx="4" />
          <rect x="258" y="61" width="25" height="16" rx="4" />

          <circle cx="67" cy="105" r="18" fill="white" />
          <circle cx="233" cy="105" r="18" fill="white" />

          <rect x="99" y="94" width="102" height="27" rx="7" fill="white" />

          <rect x="38" y="125" width="32" height="34" rx="8" />
          <rect x="230" y="125" width="32" height="34" rx="8" />
        </svg>
      </div>

      {/* Fully visible Coming Soon banner */}
      <div className="flex items-center justify-center bg-[#D1DCE2]">
        <span className="whitespace-nowrap text-[28px] font-light tracking-[1px] text-[#58656B]">
          COMING SOON
        </span>
      </div>
    </div>
  );
}
