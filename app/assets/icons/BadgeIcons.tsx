import type { SVGProps } from "react";

export type BadgeIconProps = SVGProps<SVGSVGElement>;

const KAMI_WISE_GOLD = "#C89D4A";
const KAMI_VERMILION = "#C8382E";
const KAMI_PURPLE = "#7747E5";

const baseSvgProps = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 40,
    height: 40,
    "aria-hidden": true,
    focusable: false,
    preserveAspectRatio: "xMidYMid meet",
} as const;

export function BadgeLecturaIcon(props: BadgeIconProps) {
    return (
        <svg {...baseSvgProps} viewBox="0 0 51 59" {...props}>
            <g transform="translate(-651.259417 -392.909645)">
                <g transform="translate(656.896824 396.947051)">
                    <path
                        d="M22,6.7L34.9,11.1C36.3,11.5 37.5,12.9 37.5,14.4L37.5,36.3C37.5,37.6 36.7,38.9 35.5,39.5C32.5,41.2 28,43.4 20.6,46.5C19.9,46.8 18.7,46.8 18,46.5L4.1,39.9C2.7,39.3 1.9,38.1 1.9,36.6L1.9,14.3C1.9,13 3,11.7 4.1,11.3L16.3,6.75"
                        fill="none"
                        stroke={KAMI_WISE_GOLD}
                        strokeWidth={1.5}
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M16.3,6.7L19.1,3.5L22,6.7L19.1,9.9L16.3,6.7Z"
                        fill="none"
                        stroke={KAMI_WISE_GOLD}
                        strokeWidth={1.5}
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M18.5,19.4C17.4,18.2 15.1,16.5 11.3,16.5C10.2,16.5 9.2,16.7 8,17L8,33.6C9,33.4 10,33.2 11,33.2C14.5,33.2 16.9,34.5 18.5,35.8L18.5,19.4Z"
                        fill={KAMI_WISE_GOLD}
                        fillRule="nonzero"
                    />
                    <path
                        d="M19.6,19.4L19.6,35.8C21.2,34.6 23.6,33.3 27.1,33.3C28.1,33.3 29.1,33.4 30.4,33.6L30.4,17C29.4,16.7 28.3,16.5 27,16.5C23.5,16.5 21,17.9 19.6,19.4Z"
                        fill={KAMI_WISE_GOLD}
                        fillRule="nonzero"
                    />
                    <path
                        d="M32.5,19.1L31.7,19.1L31.7,35C30.4,34.7 29,34.5 27.6,34.5C25,34.5 22,35.3 19.7,37.1L18.6,37.1C16.5,35.5 13.7,34.5 10.8,34.5C9.5,34.5 8.3,34.7 7,35L7,19.1L6.1,19.1C5.9,19.1 5.8,19.2 5.8,19.3L5.8,36.4C5.8,36.6 6,36.6 6.1,36.6C7.8,36.2 9.4,35.8 10.9,35.8C13.5,35.8 16.1,36.3 18.1,38.2L20.1,38.2C21.9,36.6 24.5,35.8 27.5,35.8C29,35.8 30.6,36.1 32.6,36.6C32.8,36.7 32.9,36.6 32.9,36.4L32.8,19.3C32.9,19.2 32.7,19.1 32.5,19.1Z"
                        fill={KAMI_WISE_GOLD}
                        fillRule="nonzero"
                    />
                </g>
            </g>
        </svg>
    );
}

export function BadgeKanjiIcon(props: BadgeIconProps) {
    return (
        <svg {...baseSvgProps} viewBox="0 0 52 59" {...props}>
            <g transform="translate(-706.159417 -392.909645)">
                <g transform="translate(656.896824 396.947051)">
                    <path
                        d="M77.6,6.7L90.5,11C91.9,11.4 93.2,12.7 93.2,14.3L93.2,36.3C93.2,37.6 92.5,38.8 91.3,39.5C88.3,41.2 83.8,43.4 76.4,46.5C75.6,46.8 74.6,46.8 73.7,46.5L59.2,40C57.9,39.4 56.8,38.2 56.8,36.5L56.8,14.5C56.8,13 57.8,11.7 59.3,11.2L72.2,6.7"
                        fill="none"
                        stroke={KAMI_WISE_GOLD}
                        strokeWidth={1.5}
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M72.4,6.7L75,3.5L77.6,6.7L75,9.9L72.4,6.7Z"
                        fill="none"
                        stroke={KAMI_WISE_GOLD}
                        strokeWidth={1.5}
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M76.3,18.1C76.6,17.3 76.7,17 76.7,16.5C76.7,15.4 74.9,14.2 72.8,14.2C72.4,14.2 72.1,14.5 72.4,14.8C73.4,15.8 73.8,16.9 74.3,18.2C72,18.5 69.6,18.8 68.2,19C67.9,18.1 67.1,17.5 66.8,17.7C66.6,17.8 66.7,17.9 66.6,18.4C66.5,19.3 65.8,20.7 64.9,21.6C64.2,22.4 65.3,24.4 66.3,24.3C67.2,24.1 67.8,22.2 68,20.7C68.3,20.8 68.7,21 69.1,21C71.8,20.5 78.4,19.4 80.7,19.4C81.3,19.4 81.3,19.6 81.2,19.9L80,21.9C79.9,22.2 80.4,22.4 80.6,22.2C81.9,21.8 83.3,20.7 84.5,20.6C85.9,20.7 86.1,19.9 85.2,18.8C84.6,18.1 83.2,17 82.4,17C82.1,17.1 81.5,17.4 81.4,17.4L76.3,18.1ZM76.5,27.9C76.4,27.7 76.3,27.3 76.1,27.1C77.2,26.2 78.5,24.9 79.9,24.1C81.1,23.6 79.6,22.2 78.1,21.4C77.6,21.1 77.1,21.6 76.6,21.7C74.6,22.1 70.9,22.8 69.3,22.6C68.4,23.1 70.4,25.1 71.3,24.9C72.9,24.2 75.6,23.6 76.7,23.5C76.8,23.6 76.1,24.9 75.4,26.2C74.9,26.2 74.4,25.9 73.7,25.9C73.3,25.9 73.1,26.4 73.4,26.6C73.8,27 74.1,27.6 74.2,28.3C71.4,28.7 66.4,29.4 64.5,29.2C63.6,29.1 63.6,29.9 64.2,30.5C65.6,31.9 66,32.1 67,31.8C68.7,31.4 72,30.8 74.5,30.5C74.6,32.3 74.6,35.8 73.7,36.3L70.9,35.8C69.3,35.8 73.2,37.8 73.8,39.5C74.5,40.9 76.9,39.3 76.9,36.7C77.2,35 76.9,31.8 76.7,30.3C80.1,29.9 82.6,29.8 85.2,30.1C87.2,30.3 85.8,27.7 83.8,27C82.4,27.3 81.5,27.6 76.5,28.1L76.5,27.9Z"
                        fill={KAMI_WISE_GOLD}
                        fillRule="nonzero"
                    />
                </g>
            </g>
        </svg>
    );
}

export function BadgeConstanciaIcon(props: BadgeIconProps) {
    return (
        <svg {...baseSvgProps} viewBox="0 0 51 59" {...props}>
            <g transform="translate(-761.759417 -392.909645)">
                <g transform="translate(656.896824 396.947051)">
                    <path
                        d="M133.663,6.75L146,11.1C147.2,11.5 147.9,12.7 147.9,14L147.9,36.3C147.9,37.5 147.2,38.7 146.2,39.3C143.4,41 139.2,43.3 132.5,46.1C131.7,46.6 130.6,46.9 129.5,46.5L115,40C113.8,39.4 112.5,38.1 112.5,36.5L112.4,14.3C112.5,13 113.4,11.7 114.7,11.3L128.23,6.75"
                        fill="none"
                        stroke={KAMI_VERMILION}
                        strokeWidth={1.5}
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M128.1,6.9L131,3.5L133.813,6.75L131.1,10L128.1,6.9Z"
                        fill="none"
                        stroke={KAMI_VERMILION}
                        strokeWidth={1.5}
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M137.6,23.1C137.4,22.6 137.1,22.6 137.1,23.3C137,25.3 136.1,26.6 135.7,26.6C135.1,26.4 134.7,25.3 135,23.8C135.4,18.4 130.9,15.2 129.2,14.5C129,14.4 128.6,14.5 129,15C130.4,17.9 128.9,20.6 128,22C127.4,22.9 126.7,24.1 126.4,25.3C125.6,24.6 125.6,22.8 125.5,22.1C125.4,21.8 125.4,21.8 125.1,22.2C123.9,23.9 121.8,26.6 121.2,29.9C120.7,36.1 125.1,39.9 130.4,40.1C128.6,39.6 126.4,37.4 127.1,34.4L127.6,32.7C127.8,33.6 128.2,34.1 129,34.5C128.9,32.5 129.6,30.6 131.9,28.9C131.4,30.4 132.6,33.1 133.2,34.7C133.9,34.4 134.5,33.6 134.6,32.9C136.6,37.4 133.1,39.7 131.7,40.1C135.5,40.1 140.1,37.5 140.1,31.4C140,27.9 138.1,25.1 137.6,23.1Z"
                        fill={KAMI_VERMILION}
                        fillRule="nonzero"
                    />
                </g>
            </g>
        </svg>
    );
}

export function BadgeNivelIcon(props: BadgeIconProps) {
    return (
        <svg {...baseSvgProps} viewBox="0 0 51 59" {...props}>
            <g transform="translate(-651.259417 -442.809645)">
                <g transform="translate(656.896824 396.947051)">
                    <path
                        d="M21.9,56.6L35.1,60.8C36.4,61.3 37.5,62.6 37.5,64L37.5,86.1C37.5,87.5 36.6,88.9 35.4,89.5C32.5,91.1 27.9,93.3 20.6,96.4C19.7,96.8 18.7,96.8 17.9,96.5L4,89.7C2.6,89.2 1.9,88 1.9,86.4L1.9,64C1.9,62.7 2.9,61.3 4.1,60.9L16.086,56.8"
                        fill="none"
                        stroke={KAMI_WISE_GOLD}
                        strokeWidth={1.5}
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M16.086,56.6L19,53.4L22,56.6L19,59.5L16.086,56.6Z"
                        fill="none"
                        stroke={KAMI_WISE_GOLD}
                        strokeWidth={1.5}
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M27.4,72L19.5,63.7C19.3,63.5 18.9,63.5 18.7,63.8L10.7,72.1C10.4,72.5 10.6,72.8 11.1,72.8L14.7,72.8C14.9,72.8 15,73 15,73.1L15,78.7C15,78.9 15.2,79.1 15.4,79.1L22.8,79.1C23,79.1 23.1,79 23.1,78.7L23.1,72.9L27.1,72.9C27.6,73 27.7,72.5 27.4,72Z"
                        fill={KAMI_WISE_GOLD}
                        fillRule="nonzero"
                    />
                    <path
                        d="M24.7,81.9C24.7,81.5 24.1,81.1 23.5,81.1L15,81.1C14.5,81.1 13.9,81.5 13.8,81.9L13.8,84C13.8,84.2 14,84.3 14.1,84.3L23.9,84.3C24.2,84.3 24.2,84.2 24.4,84L24.7,81.9Z"
                        fill={KAMI_WISE_GOLD}
                        fillRule="nonzero"
                    />
                    <path
                        d="M25.9,87.1C25.9,86.6 25.4,86.1 24.9,86.1L13.4,86.1C12.9,86.1 12.3,86.6 12.3,87.1L12.3,88.9C12.3,89.1 12.5,89.3 12.7,89.3L25.6,89.3C25.8,89.3 25.9,89.2 25.9,88.9L25.9,87.1Z"
                        fill={KAMI_WISE_GOLD}
                        fillRule="nonzero"
                    />
                </g>
            </g>
        </svg>
    );
}

export function BadgeEspecialIcon(props: BadgeIconProps) {
    return (
        <svg {...baseSvgProps} viewBox="0 0 52 59" {...props}>
            <g transform="translate(-706.159417 -443.009645)">
                <g transform="translate(656.896824 396.947051)">
                    <path
                        d="M77.6,56.989L90.6,60.8C91.9,61.2 93.2,62.5 93.2,64.1L93.2,86.2C93.2,87.6 92.4,88.9 91.3,89.5C88.2,91.3 83.6,93.4 76.4,96.4C75.5,96.8 74.6,96.8 73.6,96.4L59.1,90C57.9,89.4 56.8,88.2 56.8,86.5L56.8,64.3C56.8,63 57.7,61.6 59.2,61.1L72.1,57"
                        fill="none"
                        stroke={KAMI_PURPLE}
                        strokeWidth={1.5}
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M72.2,56.9L75,53.6L77.6,56.8L75,59.9L72.2,56.9Z"
                        fill="none"
                        stroke={KAMI_PURPLE}
                        strokeWidth={1.5}
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M75.5,66.2C75.3,65.9 74.7,65.8 74.5,66.5L72.1,73.4L65.1,73.8C64.6,73.8 64.5,74.5 64.9,74.7L70.2,79.1L68.4,86.4C68.4,86.9 68.9,87.3 69.5,86.9L75,83.2L80.5,86.9C81.1,87.3 81.5,87.1 81.4,86.4L79.5,79.5L85,74.9C85.5,74.5 85.4,73.8 84.6,73.8L77.8,73.4L75.5,66.2Z"
                        fill={KAMI_PURPLE}
                        fillRule="nonzero"
                    />
                    <path d="M64.9,67.6L64.5,65.6L64.2,65.6L63.6,67.6L61.7,68.1L61.7,68.3L63.6,68.9L64.2,71.1L64.5,71.1L65.1,69L67,68.4L67,68.2L64.9,67.6Z" fill={KAMI_PURPLE} fillRule="nonzero" />
                    <path d="M86.4,67.6L85.8,65.6L85.6,65.6L85,67.6L82.9,68.1L82.9,68.3L84.9,68.9L85.6,71.1L85.8,71.1L86.4,68.9L88.5,68.3L88.5,68.2L86.4,67.6Z" fill={KAMI_PURPLE} fillRule="nonzero" />
                    <path d="M86.4,84.7L85.8,82.7L85.6,82.8L85.1,84.7L83.1,85.2L83.1,85.4L85,85.9L85.5,87.9L85.6,88L86.2,85.9L88.2,85.3L88.2,85.2L86.4,84.7Z" fill={KAMI_PURPLE} fillRule="nonzero" />
                    <path d="M65.1,84.7L64.5,82.7L64.4,82.7L63.8,84.7L61.8,85.2L61.8,85.4L63.8,85.9L64.4,87.9L64.6,87.9L65.1,85.9L66.8,85.4L66.8,85.2L65.1,84.7Z" fill={KAMI_PURPLE} fillRule="nonzero" />
                </g>
            </g>
        </svg>
    );
}

export function BadgeKamiChanIcon(props: BadgeIconProps) {
    return (
        <svg {...baseSvgProps} viewBox="0 0 37 52" {...props}>
            <g transform="translate(-768.646824 -443.009645)">
                <g transform="translate(656.896824 396.947051)">
                    <path
                        d="M133.6,56.9L145.9,60.7C147.2,61.1 147.9,62.4 147.9,63.8L147.9,86.4C147.8,87.6 147.2,88.9 146.1,89.4C143.4,91.1 138.9,93.4 132.5,96.1C131.5,96.6 130.6,97.1 129.1,96.6L114.9,90C113.7,89.5 112.5,88 112.5,86.5L112.5,64.4C112.5,63 113.5,61.5 114.9,61L128.1,56.8"
                        fill="none"
                        stroke={KAMI_WISE_GOLD}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M127.9,57L131,53.6L133.747,56.989L131,59.9L127.9,57Z"
                        fill="none"
                        stroke={KAMI_WISE_GOLD}
                        strokeWidth={1.5}
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeMiterlimit={10}
                        fillRule="nonzero"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M120.2,65L118.9,76.2L120.9,75C120.7,74.1 121.6,68.6 122,68.6C122.4,68.6 125.7,72.2 125.9,72.4L127.6,71.9C127.6,71.5 120.6,64.2 120.2,64.7"
                        fill={KAMI_WISE_GOLD}
                        fillRule="nonzero"
                    />
                    <path
                        d="M139.9,64.9C139.2,65.5 133.9,71.3 134,71.5L135.6,72.1C135.6,71.9 139,68.5 139.2,68.6C139.6,68.6 140.1,73.9 140.1,74.9L141.7,76.2L141.1,69.9L140.7,65C140.7,64.5 140.4,64.5 139.9,64.9Z"
                        fill={KAMI_WISE_GOLD}
                        fillRule="nonzero"
                    />
                    <path
                        d="M129.2,69.1L131,71.4L132.6,69L130.9,66.6L129.2,69.1Z"
                        fill={KAMI_WISE_GOLD}
                        fillRule="nonzero"
                    />
                    <path
                        d="M128.1,84.4C126.6,79.2 122.6,76.9 119.7,76.6L118.9,77.2C119.9,78.1 121.7,79.4 122.4,80.3C120.2,79.5 118.5,79.4 118.2,80.1C118.1,80.9 122.9,81.5 127.5,87.1L129.7,90.2L129.6,89.2C129.6,89.2 129.1,86.5 128.1,84.4Z"
                        fill={KAMI_WISE_GOLD}
                        fillRule="nonzero"
                    />
                    <path
                        d="M128.1,84.4C126.6,79.2 122.6,76.9 119.7,76.6L118.9,77.2C119.9,78.1 121.7,79.4 122.4,80.3C120.2,79.5 118.5,79.4 118.2,80.1C118.1,80.9 122.9,81.5 127.5,87.1L129.7,90.2L129.6,89.2C129.6,89.2 129.1,86.5 128.1,84.4Z"
                        transform="matrix(-1 0 0 1 260.72285 -0.06248)"
                        fill={KAMI_WISE_GOLD}
                        fillRule="nonzero"
                    />
                </g>
            </g>
        </svg>
    );
}