import type { SVGProps } from "react";

export type N2ParticleProps = SVGProps<SVGSVGElement>;

const N2_PROFESSIONAL_BLUE = "#4286F4";
const N2_NEUTRAL_GRAY = "#9AA0A6";
const N2_SOFT_GOLD = "#E0B868";

/**
 * N2 Particles — Universidad / Profesional
 *
 * Nota:
 * Este set se usará temporalmente como placeholder.
 * En el futuro se reemplazará por un nuevo set de partículas definitivo
 * para N2, una vez se complete el rediseño visual final de esta etapa.
 */

const baseSvgProps = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    focusable: false,
    preserveAspectRatio: "xMidYMid meet",
} as const;

export function N2CrosshairParticle(props: N2ParticleProps) {
    return (
        <svg {...baseSvgProps} width={24} height={24} viewBox="0 0 66 67" fill="none" {...props}>
            <g transform="translate(-768.709141 -2115.258814)">
                <g transform="translate(771.973753 2120.623426)">
                    <circle
                        cx={28.7}
                        cy={28.2}
                        r={8}
                        stroke={N2_PROFESSIONAL_BLUE}
                        strokeWidth={1}
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(771.973753 2120.623426)">
                    <circle
                        cx={28.7}
                        cy={28}
                        r={21.6}
                        stroke={N2_PROFESSIONAL_BLUE}
                        strokeWidth={1}
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(771.973753 2120.623426)">
                    <path
                        d="M28.7,0.3L28.7,12.1"
                        stroke={N2_PROFESSIONAL_BLUE}
                        strokeWidth={1}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(771.973753 2120.623426)">
                    <path
                        d="M28.7,44L28.7,55.5"
                        stroke={N2_PROFESSIONAL_BLUE}
                        strokeWidth={1}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(771.973753 2120.623426)">
                    <path
                        d="M2.4,28L13.2,28"
                        stroke={N2_PROFESSIONAL_BLUE}
                        strokeWidth={1}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(771.973753 2120.623426)">
                    <path
                        d="M45,28L56.9,28"
                        stroke={N2_PROFESSIONAL_BLUE}
                        strokeWidth={1}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>
            </g>
        </svg>
    );
}

export function N2TechLineParticle(props: N2ParticleProps) {
    return (
        <svg {...baseSvgProps} width={36} height={8} viewBox="0 0 104 22" fill="none" {...props}>
            <g transform="translate(-876.814151 -2138.060013)">
                <g transform="translate(771.973753 2120.623426)">
                    <path
                        d="M114.8,28.3L198,28.3"
                        stroke={N2_NEUTRAL_GRAY}
                        strokeWidth={1}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(771.973753 2120.623426)">
                    <path
                        d="M114.9,28.3C114.9,29.6 113.8,30.7 112.5,30.7C111.2,30.7 110.1,29.6 110.1,28.3C110.1,27 111.2,25.9 112.5,25.9C113.9,25.9 114.9,27 114.9,28.3Z"
                        stroke={N2_PROFESSIONAL_BLUE}
                        strokeWidth={1}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(771.973753 2120.623426)">
                    <path
                        d="M202.9,28.3C202.9,29.6 201.8,30.7 200.5,30.7C199.2,30.7 198.1,29.6 198.1,28.3C198.1,27 199.2,25.9 200.5,25.9C201.9,25.9 202.9,27 202.9,28.3Z"
                        stroke={N2_PROFESSIONAL_BLUE}
                        strokeWidth={1}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(771.973753 2120.623426)">
                    <path
                        d="M141.7,28.3L170.1,28.3"
                        stroke={N2_NEUTRAL_GRAY}
                        strokeWidth={1.6}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>
            </g>
        </svg>
    );
}

export function N2TargetSquareParticle(props: N2ParticleProps) {
    return (
        <svg {...baseSvgProps} width={20} height={20} viewBox="0 0 51 51" fill="none" {...props}>
            <g transform="translate(-1027.366985 -2123.430001)">
                <g transform="translate(771.973753 2120.623426)">
                    <rect
                        x={263.4}
                        y={10.3}
                        width={34.4}
                        height={35.7}
                        stroke={N2_SOFT_GOLD}
                        strokeWidth={1}
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="matrix(0.7071,0.7071,-0.7071,0.7071,873.5934,1930.836626)">
                    <rect
                        x={268.4}
                        y={15.3}
                        width={24.3}
                        height={24.3}
                        stroke={N2_SOFT_GOLD}
                        strokeWidth={1}
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(771.973753 2120.623426)">
                    <circle
                        cx={280.6}
                        cy={28.2}
                        r={2.5}
                        stroke={N2_SOFT_GOLD}
                        strokeWidth={1}
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>
            </g>
        </svg>
    );
}