import { useId } from "react";

export function PipeArt({
  kind = "pipes",
  hero = false,
}: {
  kind?: "pipes" | "elbow" | "tee" | "coupler" | "glue";
  hero?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 520 360"
      fill="none"
      aria-hidden="true"
      className={hero ? "pipe-art hero-art" : "pipe-art"}
    >
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0.2" y2="1">
          <stop stopColor="#e0e3e3" />
          <stop offset=".18" stopColor="#afb6b7" />
          <stop offset=".5" stopColor="#899294" />
          <stop offset=".8" stopColor="#586467" />
          <stop offset="1" stopColor="#bac1c1" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#e9ebea" />
          <stop offset="1" stopColor="#718082" />
        </linearGradient>
        <radialGradient id={`${id}-hole`}>
          <stop stopColor="#131e20" />
          <stop offset=".8" stopColor="#283638" />
          <stop offset="1" stopColor="#607173" />
        </radialGradient>
        <filter
          id={`${id}-shadow`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>
      <ellipse
        cx="268"
        cy="290"
        rx="176"
        ry="21"
        fill="#111"
        opacity={hero ? ".4" : ".1"}
        filter={`url(#${id}-shadow)`}
      />
      {kind === "pipes" && (
        <g transform="translate(46 5) rotate(-24 225 180)">
          {[
            { x: 105, y: 103, w: 280, h: 66 },
            { x: 70, y: 157, w: 300, h: 76 },
            { x: 135, y: 214, w: 290, h: 84 },
          ].map(({ x, y, w, h }, i) => (
            <g key={i}>
              <path
                d={`M${x} ${y} H${x + w} V${y + h} H${x} Z`}
                fill={`url(#${id}-body)`}
              />
              <ellipse
                cx={x + w}
                cy={y + h / 2}
                rx={20}
                ry={h / 2}
                fill={`url(#${id}-edge)`}
              />
              <ellipse
                cx={x}
                cy={y + h / 2}
                rx={26}
                ry={h / 2}
                fill={`url(#${id}-edge)`}
              />
              <ellipse
                cx={x}
                cy={y + h / 2}
                rx={19}
                ry={h / 2 - 7}
                fill={`url(#${id}-hole)`}
              />
              <path
                d={`M${x + 35} ${y + 11} H${x + w - 10}`}
                stroke="white"
                opacity=".32"
                strokeWidth="2"
              />
              <path
                d={`M${x + 130} ${y + 28} h80`}
                stroke="#485657"
                opacity=".4"
                strokeWidth="3"
                strokeDasharray="2 4"
              />
            </g>
          ))}
        </g>
      )}
      {kind === "elbow" && (
        <g transform="rotate(-20 260 180)">
          <path
            d="M155 95v92c0 55 40 91 95 91h111v-79H260c-15 0-26-9-26-25V95Z"
            fill={`url(#${id}-body)`}
            stroke="#879293"
            strokeWidth="2"
          />
          <path
            d="M172 113v68c0 51 27 76 78 76h98"
            stroke="white"
            strokeWidth="5"
            opacity=".2"
          />
          <ellipse cx="195" cy="95" rx="49" ry="20" fill={`url(#${id}-edge)`} />
          <ellipse cx="195" cy="95" rx="38" ry="13" fill={`url(#${id}-hole)`} />
          <path d="M144 95v25c27 18 75 18 102 0V95" fill={`url(#${id}-body)`} />
          <ellipse cx="195" cy="95" rx="51" ry="21" fill={`url(#${id}-edge)`} />
          <ellipse cx="195" cy="95" rx="39" ry="13" fill={`url(#${id}-hole)`} />
          <ellipse
            cx="363"
            cy="239"
            rx="19"
            ry="47"
            fill={`url(#${id}-edge)`}
          />
          <ellipse
            cx="363"
            cy="239"
            rx="12"
            ry="36"
            fill={`url(#${id}-hole)`}
          />
        </g>
      )}
      {kind === "tee" && (
        <g transform="rotate(-22 260 180)">
          <path d="M102 187h300v79H102Z" fill={`url(#${id}-body)`} />
          <path d="M230 216V110h78v109Z" fill={`url(#${id}-body)`} />
          <ellipse
            cx="269"
            cy="110"
            rx="47"
            ry="20"
            fill={`url(#${id}-edge)`}
          />
          <ellipse
            cx="269"
            cy="110"
            rx="36"
            ry="13"
            fill={`url(#${id}-hole)`}
          />
          <ellipse
            cx="102"
            cy="226"
            rx="22"
            ry="43"
            fill={`url(#${id}-edge)`}
          />
          <ellipse
            cx="102"
            cy="226"
            rx="14"
            ry="33"
            fill={`url(#${id}-hole)`}
          />
          <ellipse
            cx="402"
            cy="226"
            rx="22"
            ry="43"
            fill={`url(#${id}-edge)`}
          />
          <ellipse
            cx="402"
            cy="226"
            rx="14"
            ry="33"
            fill={`url(#${id}-hole)`}
          />
          <path
            d="M130 199h83M286 199h90M241 130v59"
            stroke="white"
            strokeWidth="4"
            opacity=".25"
          />
        </g>
      )}
      {kind === "coupler" && (
        <g transform="rotate(-27 260 180)">
          <path d="M172 115h180v133H172Z" fill={`url(#${id}-body)`} />
          <ellipse
            cx="352"
            cy="181"
            rx="34"
            ry="67"
            fill={`url(#${id}-edge)`}
          />
          <ellipse
            cx="172"
            cy="181"
            rx="34"
            ry="67"
            fill={`url(#${id}-edge)`}
          />
          <ellipse
            cx="172"
            cy="181"
            rx="25"
            ry="55"
            fill={`url(#${id}-hole)`}
          />
          <path
            d="M214 117v129M310 117v129"
            stroke="#d4dada"
            strokeWidth="5"
            opacity=".5"
          />
        </g>
      )}
      {kind === "glue" && (
        <g>
          <path
            d="M196 112h128l12 147c-32 30-119 30-152 0Z"
            fill={`url(#${id}-body)`}
          />
          <path d="M188 167h144l5 80c-43 22-106 22-151 0Z" fill="#e6bc22" />
          <path d="M192 96h136v25c-36 19-100 19-136 0Z" fill="#303b3d" />
          <ellipse cx="260" cy="96" rx="68" ry="21" fill="#5b6869" />
          <path
            d="M235 195h50M224 211h72M242 226h35"
            stroke="#5b4c18"
            strokeWidth="5"
          />
        </g>
      )}
    </svg>
  );
}
