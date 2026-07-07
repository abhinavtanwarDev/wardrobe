/* Flat-lay garment illustrations — self-contained SVG stand-ins for real item
   photos (no external image hosts, offline-safe). Each kind is drawn once and
   recolored per item, so tiles read as actual clothes instead of gradients. */

export type GarmentKind =
  | "tee"
  | "shirt"
  | "knit"
  | "trousers"
  | "jeans"
  | "skirt"
  | "shorts"
  | "coat"
  | "jacket"
  | "shell"
  | "hoodie"
  | "cap"
  | "sneaker"
  | "loafer"
  | "boot"
  | "tote"
  | "watch"
  | "glasses"
  | "pendant";

export interface GarmentArtSpec {
  kind: GarmentKind;
  /** Main garment color. */
  color: string;
  /** Darker shade for outline + details. */
  detail: string;
  pattern?: "stripes";
}

interface GarmentArtProps extends GarmentArtSpec {
  className?: string;
}

const OUTLINE = { strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" } as const;

function Tops({ kind, color, detail, pattern }: GarmentArtSpec) {
  switch (kind) {
    case "tee":
      return (
        <>
          <path
            d="M33 20 L41 15 Q48 21 55 15 L63 20 L79 31 L72 42 L64 36 L64 76 Q48 82 32 76 L32 36 L24 42 L17 31 Z"
            fill={color}
            stroke={detail}
            {...OUTLINE}
          />
          <path d="M41 15 Q48 24 55 15" fill="none" stroke={detail} {...OUTLINE} />
        </>
      );
    case "shirt":
      return (
        <>
          <path
            d="M33 20 L43 15 L48 21 L53 15 L63 20 L79 31 L72 42 L64 36 L64 79 Q48 84 32 79 L32 36 L24 42 L17 31 Z"
            fill={color}
            stroke={detail}
            {...OUTLINE}
          />
          <path d="M43 15 L48 26 L53 15" fill="none" stroke={detail} {...OUTLINE} />
          <line x1="48" y1="26" x2="48" y2="80" stroke={detail} strokeWidth="1.5" />
          {[36, 46, 56, 66].map((y) => (
            <circle key={y} cx="48" cy={y} r="1.4" fill={detail} />
          ))}
        </>
      );
    case "knit":
      return (
        <>
          <path
            d="M32 22 Q48 15 64 22 L78 32 L74 60 L66 57 L66 76 Q48 82 30 76 L30 57 L22 60 L18 32 Z"
            fill={color}
            stroke={detail}
            {...OUTLINE}
          />
          <path d="M41 20 Q48 26 55 20" fill="none" stroke={detail} {...OUTLINE} />
          {pattern === "stripes" &&
            [40, 50, 60].map((y) => (
              <line key={y} x1="31" y1={y} x2="65" y2={y} stroke={detail} strokeWidth="3.5" opacity="0.75" />
            ))}
        </>
      );
    case "coat":
      return (
        <>
          <path
            d="M33 18 L44 16 L48 24 L52 16 L63 18 L76 28 L71 44 L65 39 L65 80 L31 80 L31 39 L25 44 L20 28 Z"
            fill={color}
            stroke={detail}
            {...OUTLINE}
          />
          <path d="M42 18 L48 34 L54 18" fill="none" stroke={detail} {...OUTLINE} />
          <line x1="48" y1="34" x2="48" y2="80" stroke={detail} strokeWidth="1.5" />
        </>
      );
    case "jacket":
      return (
        <>
          <path
            d="M33 20 L42 16 L48 22 L54 16 L63 20 L77 30 L70 42 L64 37 L64 68 Q48 72 32 68 L32 37 L26 42 L19 30 Z"
            fill={color}
            stroke={detail}
            {...OUTLINE}
          />
          <path d="M42 16 L48 28 L54 16" fill="none" stroke={detail} {...OUTLINE} />
          <line x1="48" y1="28" x2="48" y2="68" stroke={detail} strokeWidth="1.5" />
          <rect x="37" y="42" width="8" height="7" rx="1.5" fill="none" stroke={detail} strokeWidth="1.5" />
          <rect x="51" y="42" width="8" height="7" rx="1.5" fill="none" stroke={detail} strokeWidth="1.5" />
          <line x1="33" y1="63" x2="63" y2="63" stroke={detail} strokeWidth="1.5" />
        </>
      );
    case "shell":
      return (
        <>
          <path d="M37 23 Q48 6 59 23 Q48 17 37 23 Z" fill={color} stroke={detail} {...OUTLINE} />
          <path
            d="M33 22 L63 22 L77 32 L70 44 L64 39 L64 74 Q48 79 32 74 L32 39 L26 44 L19 32 Z"
            fill={color}
            stroke={detail}
            {...OUTLINE}
          />
          <line x1="48" y1="24" x2="48" y2="74" stroke={detail} strokeWidth="1.5" strokeDasharray="3 2.5" />
        </>
      );
    case "hoodie":
      return (
        <>
          <path d="M37 23 Q48 6 59 23 Q48 17 37 23 Z" fill={color} stroke={detail} {...OUTLINE} />
          <path
            d="M33 22 L63 22 L77 32 L70 44 L64 39 L64 74 Q48 79 32 74 L32 39 L26 44 L19 32 Z"
            fill={color}
            stroke={detail}
            {...OUTLINE}
          />
          <path d="M45 25 L44 35 M51 25 L52 35" fill="none" stroke={detail} strokeWidth="1.5" />
          <path d="M40 56 L56 56 L58 68 L38 68 Z" fill="none" stroke={detail} strokeWidth="1.5" strokeLinejoin="round" />
        </>
      );
    default:
      return null;
  }
}

function Bottoms({ kind, color, detail }: GarmentArtSpec) {
  switch (kind) {
    case "trousers":
      return (
        <>
          <path
            d="M36 16 L60 16 L63 46 L61 80 L51 80 L48 40 L45 80 L35 80 L33 46 Z"
            fill={color}
            stroke={detail}
            {...OUTLINE}
          />
          <line x1="35" y1="23" x2="61" y2="23" stroke={detail} strokeWidth="1.5" />
        </>
      );
    case "jeans":
      return (
        <>
          <path
            d="M36 16 L60 16 L63 46 L61 80 L51 80 L48 40 L45 80 L35 80 L33 46 Z"
            fill={color}
            stroke={detail}
            {...OUTLINE}
          />
          <line x1="35" y1="23" x2="61" y2="23" stroke="#c9a86b" strokeWidth="1.3" strokeDasharray="2.5 2" />
          <path d="M37 27 Q42 32 46 28" fill="none" stroke="#c9a86b" strokeWidth="1.3" strokeDasharray="2.5 2" />
          <path d="M59 27 Q54 32 50 28" fill="none" stroke="#c9a86b" strokeWidth="1.3" strokeDasharray="2.5 2" />
          <line x1="48" y1="23" x2="48" y2="38" stroke="#c9a86b" strokeWidth="1.3" strokeDasharray="2.5 2" />
        </>
      );
    case "skirt":
      return (
        <>
          <path d="M37 18 L59 18 L60 24 L69 76 Q48 82 27 76 L36 24 Z" fill={color} stroke={detail} {...OUTLINE} />
          <line x1="36" y1="24" x2="60" y2="24" stroke={detail} strokeWidth="1.5" />
          <path d="M41 26 L37 75 M48 26 L48 78 M55 26 L59 75" fill="none" stroke={detail} strokeWidth="1.3" opacity="0.7" />
        </>
      );
    case "shorts":
      return (
        <>
          <path
            d="M34 20 L62 20 L65 52 L51 52 L48 36 L45 52 L31 52 Z"
            fill={color}
            stroke={detail}
            {...OUTLINE}
          />
          <line x1="33" y1="26" x2="63" y2="26" stroke={detail} strokeWidth="1.5" />
        </>
      );
    default:
      return null;
  }
}

function ShoesAndAccessories({ kind, color, detail }: GarmentArtSpec) {
  switch (kind) {
    case "cap":
      return (
        <>
          <path d="M28 48 Q28 24 48 24 Q68 24 68 48 L68 50 L28 50 Z" fill={color} stroke={detail} {...OUTLINE} />
          <line x1="48" y1="24" x2="48" y2="50" stroke={detail} strokeWidth="1.3" opacity="0.8" />
          <path d="M26 50 Q48 60 70 50 L70 54 Q48 66 26 54 Z" fill={color} stroke={detail} {...OUTLINE} />
          <circle cx="48" cy="24" r="2" fill={detail} />
        </>
      );
    case "sneaker":
      return (
        <>
          <path
            d="M16 62 Q17 50 28 47 Q40 44 50 51 Q60 58 80 60 L80 66 L16 66 Z"
            fill={color}
            stroke={detail}
            {...OUTLINE}
          />
          <path d="M34 51 L42 57 M38 48 L46 54 M43 46 L50 52" stroke={detail} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M15 66 L81 66 Q82 72 76 72 L20 72 Q14 72 15 66 Z" fill="#ffffff" stroke={detail} {...OUTLINE} />
        </>
      );
    case "loafer":
      return (
        <>
          <path
            d="M16 62 Q20 52 34 52 Q48 52 58 56 Q68 60 80 62 L80 66 L16 66 Z"
            fill={color}
            stroke={detail}
            {...OUTLINE}
          />
          <path d="M34 54 Q44 49 52 56" fill="none" stroke={detail} strokeWidth="1.8" />
          <path d="M22 58 Q30 52 38 55" fill="none" stroke={detail} strokeWidth="1.3" opacity="0.7" />
          <path d="M15 66 L81 66 Q81 70 76 70 L20 70 Q15 70 15 66 Z" fill={detail} />
        </>
      );
    case "boot":
      return (
        <>
          <path
            d="M35 24 L57 24 L57 50 Q66 52 73 60 L75 66 L33 66 Q32 44 35 24 Z"
            fill={color}
            stroke={detail}
            {...OUTLINE}
          />
          <path d="M50 30 L56 30 L56 45 L50 45 Z" fill="none" stroke={detail} strokeWidth="1.3" opacity="0.8" />
          <path d="M31 66 L77 66 Q77 71 72 71 L36 71 Q31 71 31 66 Z" fill={detail} />
          <path d="M33 71 L45 71 L45 75 L36 75 Q33 75 33 71 Z" fill={detail} />
        </>
      );
    case "tote":
      return (
        <>
          <path d="M37 42 Q42 20 52 42" fill="none" stroke={detail} strokeWidth="2.5" />
          <path d="M44 42 Q52 20 60 42" fill="none" stroke={detail} strokeWidth="2.5" opacity="0.55" />
          <path d="M30 40 L66 40 L70 78 L26 78 Z" fill={color} stroke={detail} {...OUTLINE} />
          <line x1="28" y1="70" x2="68" y2="70" stroke={detail} strokeWidth="1.3" opacity="0.6" />
        </>
      );
    case "watch":
      return (
        <>
          <path d="M42 12 L54 12 L56 34 L40 34 Z" fill={color} stroke={detail} {...OUTLINE} />
          <path d="M40 62 L56 62 L54 84 L42 84 Z" fill={color} stroke={detail} {...OUTLINE} />
          <rect x="63" y="45" width="4" height="6" rx="1" fill={detail} />
          <circle cx="48" cy="48" r="16" fill={color} stroke={detail} strokeWidth="2" />
          <circle cx="48" cy="48" r="11.5" fill="#2e3338" />
          <path d="M48 48 L48 40 M48 48 L54 51" stroke="#e8eaec" strokeWidth="1.6" strokeLinecap="round" />
        </>
      );
    case "glasses":
      return (
        <>
          <path d="M18 44 L10 40" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M78 44 L86 40" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M42 46 Q48 41 54 46" fill="none" stroke={color} strokeWidth="2.5" />
          <rect x="18" y="40" width="24" height="18" rx="8" fill="#4a4a4a" stroke={color} strokeWidth="3" />
          <rect x="54" y="40" width="24" height="18" rx="8" fill="#4a4a4a" stroke={color} strokeWidth="3" />
        </>
      );
    case "pendant":
      return (
        <>
          <path d="M28 16 Q48 46 68 16" fill="none" stroke={color} strokeWidth="1.8" />
          <circle cx="48" cy="38" r="2.2" fill="none" stroke={detail} strokeWidth="1.5" />
          <circle cx="48" cy="47" r="6.5" fill={color} stroke={detail} strokeWidth="1.8" />
        </>
      );
    default:
      return null;
  }
}

/** One flat-lay garment illustration; pass the item's `art` spec. */
export function GarmentArt({ className, ...spec }: GarmentArtProps) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
      <ellipse cx="48" cy="85" rx="22" ry="3.5" fill="#000000" opacity="0.07" />
      <Tops {...spec} />
      <Bottoms {...spec} />
      <ShoesAndAccessories {...spec} />
    </svg>
  );
}
