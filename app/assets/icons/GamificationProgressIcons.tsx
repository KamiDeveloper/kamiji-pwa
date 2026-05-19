import type { SVGProps } from "react";

export type GamificationProgressIconProps = SVGProps<SVGSVGElement>;

const KAMI_VERMILION = "#C8382E";
const KAMI_NEUTRAL_GRAY = "#9AA0A6";
const KAMI_SKY_BLUE = "#A8D5FF";
const KAMI_WISE_GOLD = "#C89D4A";
const KAMI_RUST_RED = "#8E2D2A";
const KAMI_DARK_GRAY = "#3C4043";

const baseSvgProps = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    focusable: false,
    preserveAspectRatio: "xMidYMid meet",
} as const;

export function FireActiveIcon(props: GamificationProgressIconProps) {
    return (
        <svg {...baseSvgProps} width={24} height={24} viewBox="0 0 22 31" {...props}>
            <path
                d="M20.1,10.8C19.8,10.7 19.6,11 19.6,11.4C19.4,13.5 18.6,15.2 18,15.2C17.5,15 17,14.3 17.2,11.5C17.7,3.9 11.8,0.6 9.9,0.1C9.7,-0 9.5,0.2 9.7,0.4C12.3,6.2 6.8,10.5 6.4,14.6C5.4,13.3 5.9,9.2 5.8,9C5.7,8.8 5.5,8.8 5.4,9C3.5,12.2 1.6,15.2 1.7,19C1.3,25.4 5.3,29.9 11,31C11.3,31 11.2,30.9 11,30.8C7.1,29.4 6.3,25.1 7.7,22.1L9.3,23.9C9.4,24.1 9.5,24 9.6,23.8C10.1,21.6 11.3,19.4 11.7,16.9C12.8,19.1 14.4,21 14.6,23.7C14.6,24 14.8,24 15,23.8L16.5,21.4C18.4,24.6 17.2,29.4 13.5,30.8C13.3,30.9 13.3,31.1 13.5,31C19.4,30.9 23.5,26.5 23.5,20.9C23.5,16.8 21.5,13.9 20.1,10.8Z"
                transform="translate(-1.672468 -0.073401)"
                fill={KAMI_VERMILION}
                fillRule="nonzero"
            />
        </svg>
    );
}

export function FireInactiveIcon(props: GamificationProgressIconProps) {
    return (
        <svg {...baseSvgProps} width={24} height={24} viewBox="0 0 23 31" fill="none" {...props}>
            <path
                d="M63.8,11.1C63.6,13.5 62.6,15.5 61.7,15.3C60.8,15.1 60.5,13.9 60.6,11.8C60.8,5.1 56.1,1.6 53.8,0.6C56.2,7.2 51.4,10 49.9,15.3C48.9,14 48.9,11.4 49.4,9.4C47.5,12.5 45,16 45,20.9C45,26.3 48.3,29.7 53.3,30.7C50.6,29.1 49.6,25.6 51.1,22.3L52.8,24.4C53.3,21.3 54.6,19.3 55.6,16.9C56.4,19.3 58.5,21 58.6,24.4L60.4,21.8C62.1,24.5 61.6,28.6 58.1,30.7C62.7,30.1 66.9,26.8 66.9,21C66.9,16.6 65,14.3 63.8,11.1Z"
                transform="translate(-44.55 -0.15)"
                stroke={KAMI_NEUTRAL_GRAY}
                strokeWidth={0.9}
                strokeLinecap="round"
                strokeLinejoin="round"
                fillRule="nonzero"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}

export function StreakFreezeIcon(props: GamificationProgressIconProps) {
    return (
        <svg {...baseSvgProps} width={24} height={24} viewBox="0 0 29 31" {...props}>
            <g transform="translate(-86.8 -1.825567)">
                <path
                    d="M102.5,32C102.1,32 101.7,31.9 101.3,31.8L89.1,27.4C88,27 87.2,25.9 87,24.8L86.8,9.3C86.8,8.1 87.6,7 88.7,6.5L99.1,2.2C100,1.8 101.1,1.7 102.1,2L112.9,6.1C114.1,6.5 115.1,7.6 115.1,9L115.1,24.4C115.1,25.6 114.4,26.7 113.3,27.2L104,31.7C103.6,32 103.1,32 102.5,32ZM100.9,2.6C100.5,2.6 100.1,2.7 99.6,2.9L89,7.2C88.2,7.5 87.7,8.3 87.6,9.2L87.8,24.6C87.8,25.4 88.4,26.3 89.3,26.6L101.5,31C102.3,31.3 103.1,31.4 103.7,31L112.9,26.6C113.7,26.3 114.3,25.4 114.3,24.5L114.2,9C114.2,8.1 113.6,7.3 112.7,7L101.9,2.7C101.6,2.6 101.3,2.6 100.9,2.6Z"
                    fill={KAMI_SKY_BLUE}
                    fillRule="nonzero"
                />
                <path
                    d="M103.6,16C103.4,15 102.8,14.3 101.9,13.9L89.3,9.2C88.8,9 89.1,8.3 89.6,8.5L102.2,13.1C103.3,13.5 103.9,14.4 104.1,15.5C104.3,16 103.6,16.4 103.6,16Z"
                    fill={KAMI_SKY_BLUE}
                    fillRule="nonzero"
                />
                <path d="M103.4,30L103.5,17.6C103.5,17.1 104.2,17 104.1,17.6L104.1,29.6C104.1,30.2 103.4,30.5 103.4,30Z" fill={KAMI_SKY_BLUE} fillRule="nonzero" />
                <path d="M105.1,12.6L112.6,8.4C113.1,8.1 113.6,8.8 113.1,9L105.5,13.3C105.1,13.5 104.6,12.8 105.1,12.6Z" fill={KAMI_SKY_BLUE} fillRule="nonzero" />
                <path d="M101.8,4.3L109.3,7.6C109.9,7.8 110.3,7.2 109.6,6.9L101.8,4.2L101.8,4.3Z" fill={KAMI_SKY_BLUE} fillRule="nonzero" />
                <path d="M89.9,24.7L91.8,24.1C92.2,23.9 92.4,24.5 92,24.6L90.3,25.4C89.9,25.5 89.5,24.9 89.9,24.7Z" fill={KAMI_SKY_BLUE} fillRule="nonzero" />
                <path d="M89.1,21.1C89.1,21.5 89.6,21.3 89.6,21L89.8,11.4C89.8,11 89.1,10.8 89.1,11.4L89.1,21.1Z" fill={KAMI_SKY_BLUE} fillRule="nonzero" />
                <path d="M112.4,11.4L112.6,20.4C112.6,20.6 112.9,20.6 112.8,20.4L112.9,11.4C112.9,11.1 112.4,11 112.4,11.4Z" fill={KAMI_SKY_BLUE} fillRule="nonzero" />
                <path d="M105.6,22.5L111.4,24.9C112.1,25.1 112.5,24.5 111.8,24.3L105.6,22.4L105.6,22.5Z" fill={KAMI_SKY_BLUE} fillRule="nonzero" />
                <path
                    d="M100.6,19.3C100.5,19.3 100.4,19.5 100.4,19.7C100.4,20.4 100,20.9 99.7,20.9C99.5,20.8 99.4,20.4 99.5,19.2C99.7,16.5 97.6,14.5 96.6,14.3C97.6,16.8 95.6,18 95.3,19.7C94.9,19.2 95,17.5 94.9,17.5C94.9,17.4 94.8,17.5 94.8,17.6C94,18.8 93,20.3 93.1,22.2C93.1,24.5 94.9,26.3 96.8,26.6C96.9,26.6 96.9,26.5 96.8,26.5C95.5,25.8 95.3,24.1 95.9,22.9L96.5,23.7L96.6,23.6C96.8,22.7 97.3,22 97.4,21.1C97.8,22 98.5,22.7 98.5,23.9C98.5,24 98.6,24 98.7,23.9L99.3,23C100,24.1 99.7,26.1 98.3,26.6C98.2,26.6 98.2,26.7 98.3,26.7C100.4,26.9 102,25.7 102,23.5C102.2,21.9 101.3,20.6 100.6,19.3Z"
                    fill={KAMI_VERMILION}
                    fillRule="nonzero"
                />
            </g>
        </svg>
    );
}

export function DifficultyStarIcon({
    fill = "currentColor",
    stroke,
    strokeWidth,
    ...props
}: GamificationProgressIconProps) {
    const resolvedStroke = stroke ?? (fill === "none" ? "currentColor" : "none");

    return (
        <svg {...baseSvgProps} width={20} height={20} viewBox="0 0 28 26" {...props}>
            <path
                d="M161.2,13.1L152.7,12.6L149.3,4.2C149,3.5 148.2,3.5 147.8,4.2L144.4,12.6L135.5,13.1C134.7,13.2 134.4,14.1 135,14.5L141.8,19.9L139.5,28.4C139.4,29.1 140.2,29.6 140.7,29.3L148.4,24.6L155.9,29.3C156.6,29.7 157.3,29.2 157.2,28.5L155,20L161.6,14.7C162.4,14.3 162.1,13.2 161.2,13.1Z"
                transform="translate(-134.683243 -3.675)"
                fill={fill}
                stroke={resolvedStroke}
                strokeWidth={strokeWidth ?? (fill === "none" ? 1.4 : 0)}
                fillRule="nonzero"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}

export function PadlockIcon(props: GamificationProgressIconProps) {
    return (
        <svg {...baseSvgProps} width={24} height={24} viewBox="0 0 27 36" fill="none" {...props}>
            <g transform="translate(-176.144395 0.155605)">
                <path d="M196.5,30.8L182.6,30.8C181.6,30.8 180.8,30.1 180.8,29.1L180.8,17.2C180.8,16.3 181.6,15.4 182.6,15.4L196.5,15.4C197.4,15.4 198.3,16.2 198.3,17.2L198.3,29C198.3,30 197.4,30.8 196.5,30.8Z" stroke="currentColor" strokeWidth={0.93} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                <path d="M183.1,15.4L183.1,11.3C183.1,8 186,4.5 189.5,4.5C192.9,4.5 196,7.6 196.1,10.8L196,15.4" stroke="currentColor" strokeWidth={0.93} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                <path d="M185.9,15.4L186,11.3C186,9.4 187.6,7.6 189.6,7.6C191.6,7.6 193.2,9.3 193.2,11.2L193.2,15.3" stroke="currentColor" strokeWidth={0.93} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                <path d="M191.5,22C191.5,21 190.6,20.1 189.6,20.1C188.6,20.1 187.6,20.9 187.6,22C187.6,22.7 188,23.3 188.7,23.7L188.7,26.5C188.7,26.6 188.8,26.7 188.9,26.7L190.2,26.7C190.3,26.7 190.4,26.6 190.4,26.5L190.4,23.8C191.1,23.5 191.5,22.9 191.5,22Z" stroke="currentColor" strokeWidth={0.93} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
            </g>
        </svg>
    );
}

export function XPStarIcon(props: GamificationProgressIconProps) {
    return (
        <svg {...baseSvgProps} width={24} height={24} viewBox="0 0 34 31" {...props}>
            <g transform="translate(0 -1.487884)">
                <g transform="translate(-1.7 1.562884)">
                    <path d="M17.4,0.9L13.9,10.5C13.8,10.8 13.6,11 13.3,11L4,11.8C3.4,11.8 3.1,12.6 3.6,13L10.3,19C10.5,19.2 10.6,19.5 10.5,19.7L8.5,29.4C8.4,30 9.1,30.4 9.6,30.1L17.2,25C17.5,24.8 17.8,24.8 18,25L26.5,30C27,30.3 27.6,29.9 27.5,29.3L25.2,20.1C25.1,19.8 25.2,19.5 25.4,19.4L33.1,12.9C33.6,12.5 33.3,11.8 32.7,11.7L22.8,11C22.5,11 22.3,10.8 22.2,10.6L18.4,0.9C18.4,0.3 17.6,0.3 17.4,0.9Z" fill={KAMI_WISE_GOLD} fillRule="nonzero" />
                    <path d="M17.9,16.9L27.5,29.9L18.2,24.6C18,24.5 17.8,24.5 17.6,24.6L8.8,30L17.9,16.9L11.2,19.3L3.5,12.4L17.9,16.9Z" fill="#B98135" fillRule="nonzero" />
                    <path d="M17.9,16.9L33,12.4L25.2,19.1L17.9,16.9Z" fill="#B98135" fillRule="nonzero" />
                    <path d="M17.9,0.6L18,16.9L22,11.3L17.9,0.6Z" fill="#B98135" fillRule="nonzero" />
                    <path d="M17.9,16.9L27.5,29.9L18.2,24.6C18,24.5 17.8,24.5 17.5,24.6L9.1,30L17.9,16.9Z" fill="#A86C2A" fillRule="nonzero" />
                    <path d="M17.4,0.8L13.9,10.5C13.8,10.8 13.6,11 13.3,11L4,11.8C3.4,11.8 3.1,12.5 3.6,12.8L10.5,19.1C10.7,19.3 10.8,19.6 10.7,19.8L8.8,29.4C8.7,30 9.3,30.4 9.8,30.1L17.3,25.1C17.6,24.9 17.9,24.7 18.2,24.9L26.5,30C27.1,30.3 27.6,29.9 27.5,29.4L25.2,20.1C25.1,19.8 25.2,19.5 25.4,19.4L33.1,12.9C33.6,12.6 33.3,11.8 32.7,11.8L22.8,11C22.5,11 22.3,10.8 22.3,10.6L18.4,0.8C18.4,0.3 17.6,0.3 17.4,0.8Z" fill="none" stroke="#9A6825" strokeWidth={1} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M8.2,5L9.3,7.1" fill="none" stroke="#D8A648" strokeWidth={1} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    <path d="M2.2,8.5L3.8,9.6" fill="none" stroke="#D8A648" strokeWidth={1} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    <path d="M2.7,20.9L5.7,19.9" fill="none" stroke="#D8A648" strokeWidth={1} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    <path d="M26.3,7.1L27.6,5.1" fill="none" stroke="#D8A648" strokeWidth={1} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    <path d="M32.5,9.7L34.4,8.5" fill="none" stroke="#D8A648" strokeWidth={1} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    <path d="M30.8,19.8L34,20.8" fill="none" stroke="#D8A648" strokeWidth={1} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                </g>
            </g>
        </svg>
    );
}

export function TrophyIcon(props: GamificationProgressIconProps) {
    return (
        <svg {...baseSvgProps} width={24} height={24} viewBox="0 0 32 30" fill="none" {...props}>
            <g transform="translate(-56.696463 -3.862884)">
                <g transform="translate(-1.7 1.562884)">
                    <path d="M84.6,5.7L88.6,5.7C89.2,5.7 89.6,6.4 89.6,7C89.6,11.3 87.8,15.6 81.5,17.7" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M64,5.7L60,5.7C59.5,5.7 58.9,6.2 58.9,6.9C58.8,11.2 60.8,15.7 67.5,17.7" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M80.7,29.1C79.1,28.3 76.4,26.5 76.5,23.3C76.6,22.5 76.9,21.8 77.5,21.5C79.3,20.6 84.5,17.3 84.6,3.3C84.6,3 84.3,2.8 84.1,2.8L64.6,2.8C64.3,2.8 64,3.1 64.1,3.3C64.2,17.3 69.4,20.4 71.5,21.5C72.2,21.8 72.6,22.5 72.6,23.3C72.6,26.5 70.4,28.1 68.2,29.3" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M81.4,31.8L67.5,31.8C67.2,31.8 66.9,31.5 66.9,31.2L66.9,29.8C66.9,29.5 67.2,29.2 67.5,29.2L81.4,29.2C81.7,29.2 82.1,29.5 82.1,29.8L82.1,31.2C82.1,31.5 81.8,31.8 81.4,31.8Z" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                </g>
            </g>
        </svg>
    );
}

export function MilestoneN5ToriiIcon(props: GamificationProgressIconProps) {
    return (
        <svg {...baseSvgProps} width={24} height={24} viewBox="0 0 39 30" fill="none" {...props}>
            <g transform="translate(-110.7 -4.243021)">
                <g transform="translate(-1.7 1.562884)">
                    <path d="M149.8,3.2C146.7,3.9 140.9,4.9 131.7,5C123.3,5 117.6,4.2 113.6,3.3C113.2,3.2 112.9,3.3 112.9,3.6C113,5.3 113.8,7.7 115.2,8.3C117.2,8.9 124.6,9.6 131.7,9.6C137.5,9.6 145.1,9.1 147.9,8.4C149.3,8.4 150.2,5.7 150.3,3.6C150.4,3.4 150.1,3.1 149.8,3.2Z" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M117.3,8.914L117.3,10.3C117.3,10.5 117.6,10.7 117.8,10.7L126.1,10.9L126.1,9.5" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M145.6,8.8L145.6,10.588C145.6,10.788 140,10.7 136.3,10.8L136.3,9.6" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M119.7,11.1L118.8,28.3L122.9,28.3L123.6,11.1" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M139.1,11.1L139.8,28.3L144,28.3L142.9,11.1" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M119.54,13.4L115.9,13.5C115.6,13.5 115.4,13.7 115.4,13.9L115.4,16.2C115.4,16.5 115.6,16.6 115.9,16.6L119.374,16.537" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M143.2,13.5L146.9,13.5C147.2,13.5 147.4,13.7 147.4,13.9L147.4,16.2C147.4,16.5 147.2,16.6 146.9,16.6L143.4,16.6" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M123.598,13.4L139,13.4" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M123.4,16.5L139.1,16.5" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M123,31.7L118,31.7C117.7,31.7 117.6,31.5 117.6,31.3L117.7,28.8C117.7,28.5 117.9,28.4 118.1,28.4L123,28.4C123.3,28.4 123.5,28.6 123.5,28.8L123.5,31.3C123.4,31.5 123.3,31.7 123,31.7Z" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M144.4,31.7L139.4,31.7C139.1,31.7 138.9,31.5 138.9,31.3L138.9,28.8C138.9,28.6 139.1,28.4 139.4,28.4L144.3,28.4C144.6,28.4 144.8,28.6 144.8,28.8L144.8,31.3C144.8,31.5 144.6,31.7 144.4,31.7Z" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M136.3,9.6L136.3,13.4" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M136.3,9.6L136.3,13.4" transform="matrix(1 0 0 0.947368 -10.123829 0.705263)" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                </g>
            </g>
        </svg>
    );
}

export function MilestoneN4PencilIcon(props: GamificationProgressIconProps) {
    return (
        <svg {...baseSvgProps} width={24} height={24} viewBox="0 0 36 37" fill="none" {...props}>
            <g transform="translate(-164.775062 0)">
                <g transform="translate(-1.7 1.562884)">
                    <path d="M196.3,5.4L195.1,4.3C194,3.2 192.3,3.2 191.2,4.2L174.6,20.9L171.5,30L180.6,26.9L196.3,10.3C197.801,8.681 197.709,6.528 196.3,5.4Z" stroke="currentColor" strokeWidth={1} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M174.569,20.951C174.569,20.951 175.304,21.768 175.514,22.218C175.736,22.693 175.9,23.8 175.9,23.8C175.9,23.8 177.6,24.617 178.3,25.2C179,25.783 180.1,27.3 180.1,27.3" stroke="currentColor" strokeWidth={1} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M176.5,23.7L189.5,10.7" stroke="currentColor" strokeWidth={1} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M187.1,8.1L192.7,13.8" stroke="currentColor" strokeWidth={1} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M189.2,6.3L194.6,11.7" stroke="currentColor" strokeWidth={1} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M172.682,26.507L175.2,28.9" stroke="currentColor" strokeWidth={1} fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                </g>
            </g>
        </svg>
    );
}

export function MilestoneN3CrystalIcon(props: GamificationProgressIconProps) {
    return (
        <svg {...baseSvgProps} width={24} height={24} viewBox="0 0 26 33" fill="none" {...props}>
            <g transform="translate(-727.365892 -483.413294)">
                <g transform="translate(725.810892 483.063294)">
                    <path d="M10.2,32.8L5.5,27.7L2,13.5L10.2,4L18.9,13.4L15.4,27.7L10.2,32.8Z" stroke="currentColor" strokeWidth={0.89} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M2.1,13.7L7.3,15.023L12.9,18.9L18.7,13.7" stroke="currentColor" strokeWidth={0.89} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M7.3,15.2L10.3,32.6L12.9,18.9" stroke="currentColor" strokeWidth={0.89} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M18.1,5.6C21.4,5.6 22.5,7.4 22.7,10.5C22.9,7.4 24.3,5.6 27,5.6C24.5,5.4 22.9,4.1 22.6,0.7C22.4,3.6 21.2,5.4 18.1,5.6Z" stroke="currentColor" strokeWidth={0.7} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                </g>
                <path d="M736.014,487.2L733.111,498.195" stroke="currentColor" strokeWidth={1} strokeMiterlimit={1.5} vectorEffect="non-scaling-stroke" />
            </g>
        </svg>
    );
}

export function MilestoneN2TargetIcon(props: GamificationProgressIconProps) {
    return (
        <svg {...baseSvgProps} width={24} height={24} viewBox="0 0 30 30" fill="none" {...props}>
            <g transform="translate(-776.765892 -486.718294)">
                <g transform="translate(725.810892 483.063294)">
                    <circle cx={66.1} cy={18.5} r={3.3} stroke="currentColor" strokeWidth={0.96} vectorEffect="non-scaling-stroke" />
                    <circle cx={66.1} cy={18.6} r={6.8} stroke="currentColor" strokeWidth={0.96} vectorEffect="non-scaling-stroke" />
                    <path d="M66.3,7.015C61.174,6.643 54.3,10.6 54.3,18.5C54.3,24.7 58.6,29.9 66.1,30C71.8,30.1 77.5,26.3 77.7,18.6C77.8,10.9 70.743,6.873 66.3,7.015Z" stroke="currentColor" strokeWidth={0.89} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M66.2,11.8L66.254,7.011L66.3,4.1" stroke="currentColor" strokeWidth={0.89} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M51.4,18.5L59.3,18.5" stroke="currentColor" strokeWidth={0.89} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M72.9,18.5L80.5,18.5" stroke="currentColor" strokeWidth={0.89} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                    <path d="M66.2,25.9L66.2,32.5" stroke="currentColor" strokeWidth={0.89} strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero" vectorEffect="non-scaling-stroke" />
                </g>
            </g>
        </svg>
    );
}

export function MilestoneN1HankoIcon(props: GamificationProgressIconProps) {
    return (
        <svg {...baseSvgProps} width={28} height={28} viewBox="0 0 31 30" {...props}>
            <g transform="translate(-827.510892 -487.863294)">
                <g transform="translate(725.810892 483.063294)">
                    <path d="M102.1,18.7C101.2,18 102.1,18.7 102.1,17.6L102.4,17.5L102.2,17C102.7,15.5 102.4,16 102.7,14.9L102.9,15.1C103.6,12.7 105.8,9.9 107.9,8.3L108.1,8.4C108.3,7.8 109.2,7.2 109.9,6.7L110,6.8C110.5,6.5 112.1,5.5 112.9,5.7L112.9,5.5C114,5.2 113.2,5.3 114.1,5L114.3,5.2L114.9,4.9C116.6,5.1 115.8,4.7 117.5,5L117.4,4.8C118.1,5.1 119.3,4.6 120.3,5.1L120,5.2C121.1,5.3 121,5.6 121.8,5.7L121.9,5.5C124,6.1 125.9,7.2 127.5,8.5L127.6,8.4C128.1,9.1 129.1,9.9 129.4,10.2L129.3,10.2C130.3,11.5 130.8,12.4 130.9,12.6L131.1,12.4L131.5,13.6L130.9,13.3L131.4,13.8C131.9,14.6 131.7,13.6 131.8,13.9C132.2,15.4 132.6,16.8 131.9,16.2L132.4,18.4L132.2,18.4C132.3,19.1 132.3,19.9 132.3,20.7L132.3,22.1C132.1,23.1 131.9,24.1 131.6,25.1L131.9,25C131.3,25.9 130.3,29 129.5,29L128.9,30C127.7,30.8 128.4,30.9 126.6,31.7L126.9,32C126.2,32.3 124.1,33.3 123.1,33.2L123.1,33.4C120.9,33.9 118.7,34.4 116.5,34.1L116.5,34.2C115,34 113.6,33.7 112.2,33.3L112.2,33.2C111.3,33 110.5,32.6 109.8,32.1L109.1,32C107.5,30.9 105.4,29.5 104.4,27.5L104.1,27.6C103.6,26.5 102.4,24.3 102.1,22.8L102.3,22.9C101.6,21.6 102.2,20.5 101.8,19.1L102.1,18.7Z" fill={KAMI_RUST_RED} fillRule="nonzero" />
                    <path d="M119.8,7.3C113.2,6.1 106.2,9.7 104.3,15.9L105,15.1C101.7,22.4 106.7,31.8 116.3,32.2C128.3,32.8 133.9,20.3 128.1,12.3C126.2,9.8 123.5,8 120.5,7.3C120.3,7.3 119.8,7.2 119.8,7.3ZM119.6,6.7C130.6,7.7 135.3,20.4 128.5,28C122.4,35 110.2,34.1 106,26C101.2,16.9 108.9,5.9 119.6,6.7Z" fill="white" fillRule="nonzero" />
                    <path d="M106.4,25C108,23.6 110,19.6 110.9,17C110.2,17.2 109.5,17.5 108.9,17.8C108.4,18 106.6,16.6 106.9,16.2C108.3,16 109.7,15.6 111.1,15C111.1,14 111.2,11.4 110.5,10.4C109.8,9.1 113.1,10 113.1,11.4C112.8,12.3 112.7,13.3 112.7,14.3L113.1,14.2C114.1,13.9 115.5,15.4 114.2,15.8L112.6,16.3L112.6,17.9C113.7,18.1 115.5,18.8 114.3,20.5C113.6,21 113.3,20.2 112.6,19.4L112.5,25.8C113,29.7 111.4,30 110.5,26.6L110.7,25.6C111,24.2 111,22.8 111,21.4C109.7,23.2 108.6,25 106.7,25.2L106.4,25ZM121.5,24.6C123.4,25.5 125.3,25.9 124.9,28.8C123.9,28.9 122.7,27.3 120.7,26.1C118.9,27.6 116.5,29.1 113.8,28.2C115.7,27.7 117.5,26.7 118.9,25.3C118.3,24.5 116.1,24.8 116.5,23.3L117.6,21.3L115.2,22.2C114.3,22.3 113.2,21.1 113.4,20.8L118.2,19.8C118.6,18.1 118.5,17 118.1,16.4C118.5,15.6 120.7,16.9 120.6,17.6L119.7,19.7L120.9,19.4L120.8,18.9L121.5,18.9L121.7,19.3L124.2,19C124.9,19 125.4,18.2 126.4,18.7C128.2,19.4 128.4,21.1 126.7,20.9C125.9,20.7 125,20.7 123.6,20.7C123.2,22.1 122.4,23.4 121.5,24.6ZM114.4,12.3C116.9,12.7 118.1,15.1 117.1,16.5C115.7,17.4 115.1,13.9 114.3,12.7L114.4,12.3ZM119.7,15.3C118.7,14.6 118.8,12.6 117.6,11.3L117.9,10.9C120,11.3 121.5,13.2 120.5,14.9L119.7,15.3ZM120.5,16.5C121.4,15.4 123.3,11.8 122.8,11.1C123,10.6 123.4,10.4 123.7,10.4C124.5,10.9 125.9,11.8 125.6,12.7C124.1,14.1 122.2,17.4 120.5,16.5ZM118.9,21.2L118.4,23.2L120,23.8C120.6,22.9 121.1,21.9 121.4,20.8L118.9,21.2Z" fill="white" fillRule="nonzero" />
                </g>
            </g>
        </svg>
    );
}

export function BadgeLockedSilhouetteIcon(props: GamificationProgressIconProps) {
    return (
        <svg {...baseSvgProps} width={40} height={40} viewBox="0 0 26 33" {...props}>
            <path
                d="M165.629,2.8C165.329,2.8 164.8,2.9 164.6,3.1C161.4,5.2 157.4,6.4 154,6.9C153.5,6.9 152.8,7.1 152.8,8.4L152.8,20.5C152.8,26.6 156.8,31.4 165.2,35.3C165.6,35.4 166.1,35.4 166.5,35.3C173.8,31.9 178.5,27.6 178.5,20.5L178.5,8.2C178.5,7.6 178,7 177.4,7C174.2,6.6 169.64,5.241 166.601,3.301C166.265,3.087 166.129,2.8 165.629,2.8Z"
                transform="translate(-878.610892 -485.863294) translate(725.810892 483.063294)"
                fill={KAMI_DARK_GRAY}
                fillRule="nonzero"
            />
        </svg>
    );
}