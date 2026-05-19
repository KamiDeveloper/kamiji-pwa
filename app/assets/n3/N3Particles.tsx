import type { SVGProps } from "react";

export type N3ParticleProps = SVGProps<SVGSVGElement>;

const N3_ELECTRIC_VIOLET = "#8A5CF6";
const N3_NEON_PINK = "#FF5CA7";
const N3_NEON_CYAN = "#00E5FF";
const N3_LIGHTNING_LILAC = "#DFC5F4";
const N3_LIGHTNING_STROKE = "#DFB9F2";

/**
 * N3 Particles — Adolescencia / Instituto
 *
 * Nota de diseño:
 * - `N3GeometricStarParticle` conserva el export name planeado, pero visualmente se cambió
 *   de estrella geométrica a una "rayoneada" para lograr mayor consistencia visual con el vibe N3.
 * - `N3CrystalParticle` implementa por ahora el diamante solicitado, aunque se planea reemplazarlo
 *   por un elemento más concordante con la identidad N3.
 * - `N3LightningParticle` cambió colores y forma hacia un rayo más familiar, porque la versión
 *   estrictamente solicitada se veía débil visualmente en escala pequeña.
 *
 * Los efectos glow deben aplicarse vía CSS, por ejemplo:
 * filter: drop-shadow(0 0 4px var(--color-primary));
 */

const baseSvgProps = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    focusable: false,
    preserveAspectRatio: "xMidYMid meet",
} as const;

export function N3LightningParticle({
    fill = N3_LIGHTNING_LILAC,
    ...props
}: N3ParticleProps) {
    return (
        <svg {...baseSvgProps} width={14} height={28} viewBox="0 0 24 45" {...props}>
            <g transform="translate(-820.960007 -2029.799996)">
                <g transform="translate(819.610007 2029.549996)">
                    <path
                        d="M19.7,0.5L1.6,24.7L10.7,25.4L5,45L24.8,19L13.8,18.7L19.7,0.5Z"
                        fill={fill}
                        stroke={N3_LIGHTNING_STROKE}
                        strokeWidth={1}
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>
            </g>
        </svg>
    );
}

export function N3GeometricStarParticle(props: N3ParticleProps) {
    return (
        <svg {...baseSvgProps} width={24} height={24} viewBox="0 0 32 37" fill="none" {...props}>
            <g transform="translate(-863.682727 -2034.60685)">
                <g transform="translate(819.610007 2029.549996)">
                    <path
                        d="M46.8,20.5C46.4,20.8 43.8,23.7 44.8,23.5L69.2,8.2C70.1,7.7 73.5,5.2 73.3,5.6C74.1,6.1 70.3,10 69.5,11.1L47.6,36C47.4,36.4 45.3,38.6 46.9,38C52.1,34.8 65.9,24 73.4,19.7C76.7,18 72.3,23.2 71.4,24.9C69.8,27.4 65.4,33.7 64,37.1C63.7,38 64.6,37.4 65.1,37.1C66.7,36.2 70.9,33.7 73.2,32.9C74.1,32.6 73.6,33.9 73.4,34.3C73.2,34.8 71,40.5 72.2,40.6"
                        fill="none"
                        stroke={N3_ELECTRIC_VIOLET}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>
            </g>
        </svg>
    );
}

export function N3PaperPlaneParticle(props: N3ParticleProps) {
    return (
        <svg {...baseSvgProps} width={28} height={22} viewBox="0 0 49 36" {...props}>
            <g transform="translate(-917.560007 -2036.199996)">
                <g transform="translate(819.610007 2029.549996)">
                    <path
                        d="M98.2,17.2L146.2,6.9L146.2,7.4L130,42L120.5,34L112.2,40.6L111.8,40.6L111.7,26.4L98.2,17.2Z"
                        fill={N3_NEON_PINK}
                        stroke="#F73D84"
                        strokeWidth={0.5}
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(819.610007 2029.549996)">
                    <path
                        d="M111.9,26.4L111.9,27.5L141,11.9L145.2,7.7L111.9,26.4Z"
                        fill="#FFD3D8"
                        fillRule="nonzero"
                    />
                </g>

                <g transform="translate(819.610007 2029.549996)">
                    <path
                        d="M116.2,29.7L129.7,41.9C129.7,41.9 130.029,42.252 130.206,42.295C130.46,42.358 130.615,42.076 130.615,42.076L146.025,7.172L116.2,29.7Z"
                        fill="#FF649C"
                        fillRule="nonzero"
                    />
                </g>

                <g transform="translate(819.610007 2029.549996)">
                    <path
                        d="M111.7,40.8C112,39.9 114.9,31 116.2,29.7L120.702,33.798L112.2,40.7L111.7,40.8Z"
                        fill="rgba(0, 0, 0, 0.2)"
                        fillRule="nonzero"
                    />
                </g>
            </g>
        </svg>
    );
}

export function N3CrystalParticle(props: N3ParticleProps) {
    return (
        <svg {...baseSvgProps} width={16} height={22} viewBox="0 0 19 41" {...props}>
            <g transform="translate(-981.905499 -2033.499921)">
                <g transform="translate(819.610007 2029.549996)">
                    <path
                        d="M163.4,14.9C162.6,16.1 162.4,17 162.7,21.6L163.7,34.4L167.7,18.5L163.4,16.4L171.5,4.2C169.9,4.5 166.6,10 163.4,14.9Z"
                        fill="#99F7FF"
                        opacity={0.85}
                        stroke="#A2D3EA"
                        strokeWidth={0.8}
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(819.610007 2029.549996)">
                    <path
                        d="M163.4,34.3C163.6,35.6 168.1,41.8 169.6,43.2C170.5,44 171.6,44.6 173.1,43.1C174.1,42.3 178.8,35.4 179.1,34.4C179.6,33.1 180.3,18.8 180.3,18.8C180.3,18.8 180,16.5 179.6,15.8C174.2,6.9 172.8,3.7 171.3,4.2C169.9,4.1 163.9,13.8 163.4,14.9C162.4,16.2 162.4,17.8 162.6,21.6C162.9,27.1 163.1,32.7 163.4,34.3Z"
                        fill={N3_NEON_CYAN}
                        opacity={0.85}
                        stroke={N3_ELECTRIC_VIOLET}
                        strokeWidth={0.8}
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(819.610007 2029.549996)">
                    <path
                        d="M171.5,4.2L167.7,18.6L175.7,18.6L172,4.2L171.5,4.2Z"
                        fill="#99F7FF"
                        opacity={0.85}
                        stroke={N3_ELECTRIC_VIOLET}
                        strokeWidth={0.8}
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(819.610007 2029.549996)">
                    <path
                        d="M175.7,18.6L179.1,34.4L179.9,26.7L180.3,19.7L179.858,16.3L175.7,18.6Z"
                        fill="#99F7FF"
                        opacity={0.85}
                        stroke={N3_ELECTRIC_VIOLET}
                        strokeWidth={0.8}
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(819.610007 2029.549996)">
                    <path
                        d="M163.4,34.3L170.5,36.3L172.9,36.3L179.1,34.4"
                        fill="none"
                        stroke={N3_ELECTRIC_VIOLET}
                        strokeWidth={0.8}
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(819.610007 2029.549996)">
                    <path
                        d="M163.4,16.4L167.7,18.6L175.8,18.6L179.834,16.3"
                        fill="none"
                        stroke={N3_ELECTRIC_VIOLET}
                        strokeWidth={0.8}
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(819.610007 2029.549996)">
                    <path
                        d="M171.5,4.2L167.7,18.6L170.5,41.5L170.7,44"
                        fill="none"
                        stroke={N3_ELECTRIC_VIOLET}
                        strokeWidth={0.8}
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(819.610007 2029.549996)">
                    <path
                        d="M172,4.2L175.7,18.6L172.9,36.3L171.5,44"
                        fill="none"
                        stroke={N3_ELECTRIC_VIOLET}
                        strokeWidth={0.8}
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>
            </g>
        </svg>
    );
}