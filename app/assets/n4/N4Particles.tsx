import type { SVGProps } from "react";

export type N4ParticleProps = SVGProps<SVGSVGElement>;

const N4_SKY_BLUE = "#7EC8F8";
const N4_BLUE_STROKE = "#4A90E2";
const N4_SCHOOL_YELLOW = "#FFD166";
const N4_CHALK_GREEN = "#95D5B2";
const N4_WARM_WHITE = "#FAF9F6";
const N4_ERASER_PINK = "#FBA4BB";
const N4_GRAPHITE = "#3C4043";
const N4_WOOD = "#FFE2B8";

const baseSvgProps = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    focusable: false,
    preserveAspectRatio: "xMidYMid meet",
} as const;

export function N4PencilParticle(props: N4ParticleProps) {
    return (
        <svg {...baseSvgProps} width={14} height={44} viewBox="0 0 20 54" {...props}>
            <g transform="translate(-817.973407 -1965.118357)">
                <g transform="translate(816.459926 1964.968159)">
                    <path
                        d="M20.1,8.9L11.4,6L12.3,2.6C12.7,1.3 14,0.2 15.4,0.5L18.6,1.3C20.4,1.8 21.2,3 20.9,4.5L20.1,8.9Z"
                        fill={N4_ERASER_PINK}
                        stroke="#F27C88"
                        strokeWidth={0.6}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(816.459926 1964.968159)">
                    <path
                        d="M1.9,43.1L2.9,52.5C3,53 3.4,53.1 3.6,52.7L9.2,45.5L1.9,43.1Z"
                        fill={N4_WOOD}
                        stroke="#F7D1A4"
                        strokeWidth={0.6}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(816.459926 1964.968159)">
                    <path
                        d="M2.4,49L2.9,52.5C3,53 3.4,53.1 3.6,52.7L5.5,50.1C4.8,49.3 3.4,49 2.4,49Z"
                        fill={N4_GRAPHITE}
                        stroke={N4_GRAPHITE}
                        strokeWidth={0.6}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(816.459926 1964.968159)">
                    <path
                        d="M9.2,45.5L19.5,10.4L10.9,7.6L1.9,42.5C1.4,44.1 3.2,44.5 3.9,43.5C4.6,45.1 7.1,45.9 7.8,44.5C8.1,45.4 9,45.5 9.2,45.5Z"
                        fill={N4_SCHOOL_YELLOW}
                        stroke={N4_SCHOOL_YELLOW}
                        strokeWidth={0.6}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(816.459926 1964.968159)">
                    <path
                        d="M6.9,44.9L16.5,9.8L13.6,8.9L4.1,43.5C4.5,44.4 5.9,45.4 6.9,44.9Z"
                        fill="#FFDA75"
                        fillRule="nonzero"
                    />
                </g>

                <g transform="translate(816.459926 1964.968159)">
                    <path
                        d="M19.789,10.461L10.7,7.5L11,6.1L20.248,9.009L19.789,10.461Z"
                        fill={N4_WARM_WHITE}
                        fillRule="nonzero"
                    />
                </g>

                <g transform="translate(816.459926 1964.968159)">
                    <path
                        d="M19.6,9.6L11,7.1"
                        fill="none"
                        stroke={N4_WARM_WHITE}
                        strokeWidth={0.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>
            </g>
        </svg>
    );
}

export function N4NotebookParticle(props: N4ParticleProps) {
    return (
        <svg {...baseSvgProps} width={28} height={34} viewBox="0 0 45 51" {...props}>
            <g transform="translate(-857.437482 -1967.048209)">
                <g transform="translate(816.459926 1964.968159)">
                    <path
                        d="M78.5,6.1L51,6.1C49.2,6.1 47.8,7.6 47.8,9.3L47.8,45.5C47.8,47.3 49.2,48.5 51,48.5L78.6,48.5C80.4,48.5 81.8,47.3 81.8,45.5L81.8,9.4C81.8,7.6 80.3,6.1 78.5,6.1Z"
                        fill={N4_SKY_BLUE}
                        stroke={N4_BLUE_STROKE}
                        strokeWidth={0.8}
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />

                    {[14.6, 19.5, 24.3, 29.1, 33.8, 38.5, 43.3].map((y) => (
                        <path
                            key={y}
                            d={`M54.4,${y}L78.4,${y}`}
                            fill="none"
                            stroke="rgba(74, 144, 226, 0.3)"
                            strokeWidth={0.75}
                            strokeLinecap="round"
                            fillRule="nonzero"
                            vectorEffect="non-scaling-stroke"
                        />
                    ))}

                    <path
                        d="M48.1,11C46.9,11 45.5,11.4 45.5,12.6C45.5,13.9 48,14 48,14"
                        fill="none"
                        stroke={N4_BLUE_STROKE}
                        strokeWidth={0.9}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                    <circle cx={50.4} cy={12.3} r={1.1} fill={N4_BLUE_STROKE} />
                </g>

                <g transform="translate(816.519893 1965.068159)">
                    <path
                        d="M48.04,10.9C49.24,10.9 50.34,11.2 50.34,12.4"
                        fill="none"
                        stroke={N4_BLUE_STROKE}
                        strokeWidth={0.9}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(816.459926 1964.968159)">
                    <path d="M48.1,17.4C46.9,17.4 45.5,17.9 45.5,19C45.5,20.3 48,20.4 48,20.4" fill="none" stroke={N4_BLUE_STROKE} strokeWidth={0.9} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <circle cx={50.4} cy={18.6} r={1.1} fill={N4_BLUE_STROKE} />
                </g>

                <g transform="translate(816.499945 1971.46826)">
                    <path d="M48.04,10.9C49.24,10.9 50.34,11.2 50.34,12.4" fill="none" stroke={N4_BLUE_STROKE} strokeWidth={0.9} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                </g>

                <g transform="translate(816.459926 1964.968159)">
                    <path d="M48.1,23.8C46.9,23.7 45.5,24.2 45.5,25.4C45.5,26.7 48,26.8 48,26.8" fill="none" stroke={N4_BLUE_STROKE} strokeWidth={0.9} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <circle cx={50.4} cy={24.9} r={1.1} fill={N4_BLUE_STROKE} />
                </g>

                <g transform="translate(816.475009 1977.868159)">
                    <path d="M48.04,10.9C49.24,10.9 50.34,11.2 50.34,12.4" fill="none" stroke={N4_BLUE_STROKE} strokeWidth={0.9} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                </g>

                <g transform="translate(816.459926 1964.968159)">
                    <path d="M48.1,30.1C46.9,30 45.5,30.6 45.5,31.6C45.5,32.9 48,33.1 48,33.1" fill="none" stroke={N4_BLUE_STROKE} strokeWidth={0.9} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <circle cx={50.4} cy={31.1} r={1.1} fill={N4_BLUE_STROKE} />
                </g>

                <g transform="translate(816.410089 1984.167086)">
                    <path d="M48.04,10.9C49.24,10.9 50.34,11.2 50.34,12.4" fill="none" stroke={N4_BLUE_STROKE} strokeWidth={0.9} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                </g>

                <g transform="translate(816.459926 1964.968159)">
                    <path d="M48.1,35.9C46.9,35.8 45.5,36.4 45.5,37.6C45.5,38.9 48,38.9 48,38.9" fill="none" stroke={N4_BLUE_STROKE} strokeWidth={0.9} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <circle cx={50.4} cy={37} r={1.1} fill={N4_BLUE_STROKE} />
                </g>

                <g transform="translate(816.410089 1989.968159)">
                    <path d="M48.04,10.9C49.24,10.9 50.34,11.2 50.34,12.4" fill="none" stroke={N4_BLUE_STROKE} strokeWidth={0.9} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                </g>

                <g transform="translate(816.459926 1964.968159)">
                    <path d="M48.1,42.1C46.9,42 45.5,42.5 45.5,43.6C45.5,45 48,45 48,45" fill="none" stroke={N4_BLUE_STROKE} strokeWidth={0.9} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <circle cx={50.4} cy={43.1} r={1.1} fill={N4_BLUE_STROKE} />
                </g>

                <g transform="translate(816.410089 1996.16197)">
                    <path d="M48.04,10.9C49.24,10.9 50.34,11.2 50.34,12.4" fill="none" stroke={N4_BLUE_STROKE} strokeWidth={0.9} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                </g>
            </g>
        </svg>
    );
}

export function N4PaperclipParticle(props: N4ParticleProps) {
    return (
        <svg {...baseSvgProps} width={10} height={28} viewBox="0 0 21 32" fill="none" {...props}>
            <g transform="translate(-919.032495 -1977.157334)">
                <g transform="translate(816.459926 1964.968159)">
                    <path
                        d="M110.4,16.8L105.1,37.1C104.5,40 106.4,43.1 109.5,43.6C112.5,43.9 115.2,42.4 116,39.4L121,19C121.6,16.1 119.9,13.1 116.9,12.8C114.1,12.4 111.1,14 110.4,16.8Z"
                        stroke={N4_CHALK_GREEN}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(816.459926 1964.968159)">
                    <path
                        d="M108.1,36.1L111.8,22.1C112.1,20.6 113.4,19.5 115,19.8C116.5,20 117.5,21.5 117.1,23L113.8,37.4"
                        stroke={N4_CHALK_GREEN}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="miter"
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>
            </g>
        </svg>
    );
}

export function N4RulerParticle(props: N4ParticleProps) {
    return (
        <svg {...baseSvgProps} width={48} height={12} viewBox="0 0 57 18" {...props}>
            <g transform="translate(-958.759926 -1987.048209)">
                <g transform="translate(816.459926 1964.968159)">
                    <path
                        d="M196.9,25.9L144.6,25.9C143.6,25.9 142.7,26.8 142.7,27.8L142.7,36.8C142.7,37.8 143.5,38.8 144.6,38.8L196.8,38.8C197.8,38.8 198.5,37.9 198.5,36.9L198.5,27.8C198.5,26.8 197.8,25.9 196.9,25.9Z"
                        fill={N4_WARM_WHITE}
                        stroke={N4_SKY_BLUE}
                        strokeWidth={1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g transform="translate(816.459926 1964.968159)">
                    <path d="M150.3,26.1L150.3,30" fill="none" stroke={N4_BLUE_STROKE} strokeWidth={0.8} strokeLinejoin="miter" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M158.4,26.1L158.4,30" fill="none" stroke={N4_BLUE_STROKE} strokeWidth={0.8} strokeLinejoin="miter" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M166.7,26.1L166.7,31.5" fill="none" stroke={N4_BLUE_STROKE} strokeWidth={0.8} strokeLinejoin="miter" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M175.6,30L175.6,26.1" fill="none" stroke={N4_BLUE_STROKE} strokeWidth={0.8} strokeLinejoin="miter" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M183.6,30L183.6,26.1" fill="none" stroke={N4_BLUE_STROKE} strokeWidth={0.8} strokeLinejoin="miter" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M191.4,30L191.4,26.1" fill="none" stroke={N4_BLUE_STROKE} strokeWidth={0.8} strokeLinejoin="miter" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                </g>
            </g>
        </svg>
    );
}