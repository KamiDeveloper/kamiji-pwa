import type { SVGProps } from "react";

// 1. Rayo X Icon (24x24)
export const RayoXIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0.2 -0.8 38.6 38.6" width={24} height={24} {...props}>
        {/* Brackets */}
        <path fill="none" stroke="#1D2836" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m4.5 12v-3.9c0-1.1 0.9-2.1 1.9-2.1h3.7" />
        <path fill="none" stroke="#1D2836" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m27.3 6h3.6c1.1 0 2.1 0.8 2.1 1.9v4.1" />
        <path fill="none" stroke="#1D2836" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m9.5 35.5h-3.4c-1 0-1.7-0.8-1.7-1.8v-3.1" />
        <path fill="none" stroke="#1D2836" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m33 30.5v2.9c0 1.1-0.8 2.1-1.9 2.1h-3.9" />
        {/* Line */}
        <path fill="none" stroke="#946ED4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m3.4 20.1h30.7" />
        <path fill="none" stroke="#946ED4" strokeLinecap="round" strokeMiterlimit="10" d="m3.4 20.1h30.7" /> {/* Trazado duplicado en tu SVG original */}
        {/* Stars */}
        <path fill="none" stroke="#745EE0" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m22.6 1.5 0.4 1.3 1.6 0.6-1.5 0.6-0.5 1.5-0.3-1.5-1.8-0.6 1.7-0.5 0.4-1.4z" />
        <path fill="none" stroke="#70459B" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m3 25.9 0.3 1.1 1.1 0.4-1.1 0.4-0.3 1-0.3-1-1-0.4 1-0.4 0.3-1.1z" />
        <path fill="none" stroke="#745EE0" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m35.4 26.4 0.4 1.4 1.5 0.4-1.4 0.5-0.5 1.2-0.3-1.2-1.5-0.5 1.5-0.4 0.3-1.4z" />
        {/* Kanji */}
        <path fill="#1D2836" d="m13.2 15.1v2.5h1.2l0.6-0.5c0.3-0.2 0.9 0.2 1.3 0.6 0.3 0.4 0.5 0.7 0.2 1-0.2 1.1-0.1 6.5-1 9.2-0.4 1-1.4 1.2-2.4 1.1-0.2-0.9-0.7-1-1.1-1.1-0.5-0.2-0.4-0.9 0.2-0.8 1.3 0.2 1.7 0.3 1.9-1.5 0.3-1.4 0.4-4.8 0.4-7h-1.6c-0.1 4-0.8 7.4-3.2 10.2-0.4 0.4-0.9 0-0.6-0.5 1.7-4.2 2.1-6.5 2.2-13.2h-1.7c-0.4-0.1-0.8-1-0.1-1.3h2.7c0-1-0.2-2.1-0.4-2.9 0.1-0.9 2.6-0.6 2.2 0.4-0.1 0.6-0.1 1.6-0.1 2.5h1.1l0.5-0.6c0.4-0.4 2.1 0.9 1.5 1.5l-0.4 0.4h-3.4zm12.8-2.7c0.7 0.5 1.3 1.2 0.5 1.7h-7c-0.6 1.1-1.3 2.2-2.2 3.3-0.4 0.3-0.9-0.2-0.7-0.5 1.1-2 1.9-4.7 2.1-6.4 0.1-0.8 2.8 0 1.9 0.9l-0.5 1.3h4.4l0.7-0.6c0.1-0.1 0.4-0.1 0.8 0.3zm1.3 14.5c0.4 0.4 0.1 0.6-0.3 0.9s-0.5 1.2-1.4 0.6c-2.2-1.9-3.9-5.5-4.4-10.3-0.3 0.1-0.8 0.2-1 0.2v8.1l1.7-0.9c0.7-0.3 1 0.5 0.5 0.9l-2.7 2.5c-0.7 0.6-1.8-0.5-1.3-1.6v-8.8h-0.5c-0.5 0-0.7-1.1 0-1.1 1.8-0.2 4.5-1.2 5.4-2.2 0.5-0.6 2.3 0.7 1.7 1.2-0.5 0.4-1.6 0.8-2.5 1.2 0.1 1 0.5 2.3 1.1 3.5 0.9-0.7 1.5-1.4 1.9-2.2 0.2-0.7 2.1 0.5 1.2 1.1-0.5 0.5-1.7 1.2-3.1 2.2 0.9 1.8 2.1 3.3 3.7 4.7z" />
    </svg>
);

// 2. Zoom Kanji Icon (24x24)
export const ZoomKanjiIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="49.7 4.5 32.1 32.1" width={24} height={24} {...props}>
        {/* Kanji */}
        <path fill="#1D2836" d="m60.4 15.2v2h0.9l0.5-0.4c0.3-0.2 1.3 0.6 1.2 0.9-0.2 1.2-0.1 4.9-0.8 6.7-0.3 0.6-1.1 0.9-1.8 0.6-0.1-0.5-0.5-0.5-0.8-0.6-0.4-0.2-0.2-0.7 0.2-0.6 0.9 0.1 1.2 0.2 1.3-1.2 0.2-0.9 0.3-3.2 0.3-4.5h-1.1c-0.3 3-1 5.6-2.5 6.9-0.3 0.3-0.8 0-0.5-0.4 1.2-2.5 1.5-5.3 1.5-9.3h-1.1c-0.3-0.1-0.7-0.8 0-1.1h1.8c0-0.8-0.1-1.4-0.3-2 0-0.6 2.1-0.4 1.8 0.4v1.6h0.7l0.4-0.3c0.3-0.2 1.4 0.7 0.9 1.2l-0.2 0.2-2.4-0.1zm9.1-1.8c0.6 0.3 1 1 0.3 1.3h-4.7c-0.5 0.8-1 1.5-1.7 2.1-0.3 0.2-0.7-0.1-0.5-0.4 0.8-1.3 1.4-3 1.5-4.3 0.1-0.6 2 0 1.4 0.6l-0.3 1h3l0.4-0.4c0.1-0.2 0.4-0.1 0.6 0.1zm0.7 10c0.3 0.3 0.1 0.5-0.2 0.7-0.3 0.3-0.5 0.9-1.1 0.4-1.5-1.4-2.7-3.8-3-6.8l-0.4 0.1v6.7c-0.4 1-1.4 0.9-1.4 0v-6.5h-0.3c-0.4 0-0.8-0.8-0.2-0.9 1.3-0.2 3.2-1 3.9-1.7 0.4-0.4 1.8 0.6 1.3 0.9-0.3 0.3-1.1 0.5-1.8 0.8 0.1 0.7 0.4 1.5 0.7 2.3 0.6-0.5 1-1.1 1.2-1.5 0.2-0.5 1.7 0.4 1.1 0.9-0.3 0.3-1.2 0.9-2 1.5 0.4 1.1 1.3 2.2 2.2 3.1z" />
        {/* Handle */}
        <path fill="none" stroke="#1D2836" strokeWidth="1.7" strokeLinejoin="round" strokeMiterlimit="10" d="m73.3 26.6 6.6 6.3c0.6 0.6 0.6 1.6 0 2.2s-1.6 0.6-2.2 0l-6.3-6.3 1.9-2.2z" />
        {/* Glass */}
        <path fill="none" stroke="#1D2836" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m63.9 6c-6 0-11.9 4.9-12.3 11.6-0.2 6 3.9 13.1 12.3 13.1 6.4 0 11.9-4.7 12-12 0.2-6.1-4.9-12.7-12-12.7z" />
    </svg>
);

// 3. Swipe Right Learned (24x24)
export const SwipeRightLearnedIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="90.9 4.3 30.8 30.8" width={24} height={24} {...props}>
        <path fill="none" stroke="#57844E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m106.3 5.8c-7.3 0.2-13.3 5.9-13.6 12.9-0.2 7.7 5.6 14.8 13.6 14.9 7.4 0.2 13.6-5.5 13.7-13.1s-6-14.7-13.7-14.7z" />
        <path fill="none" stroke="#57844E" strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m100 20.2 4.3 4.3 8.6-8.7" />
    </svg>
);

// 4. Swipe Left Review (24x24)
export const SwipeLeftReviewIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="129.5 5.9 29.1 29.1" width={24} height={24} {...props}>
        <path fill="none" stroke="#E66400" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m151.5 7.4h-14.4c-1 0-1.9 0.8-1.9 1.8v23.3c0 1 1.1 1.6 1.9 1l6.2-4.8c0.6-0.5 1.2-0.5 1.8-0.1l6.2 4.7c0.8 0.7 2 0.3 1.7-0.9v-23.2c0-1-0.7-1.8-1.5-1.8z" />
    </svg>
);

// 5. Chuleta Global Icon (Magic Wand) (24x24)
export const ChuletaGlobalIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="24.4 49.2 30.1 30.1" width={24} height={24} {...props}>
        <path fill="none" stroke="#70459B" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m33.9 52.2 0.9 2.8 3.1 1-2.9 0.9-1.1 2.9-0.8-2.8-3.2-1.1 3.1-0.9 0.9-2.8z" />
        <path fill="none" stroke="#573585" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m41 62.2 2.3 2.5-12.4 12.9c-0.6 0.7-1.7 0.8-2.4 0.2s-0.8-1.6-0.1-2.4l12.5-13.2h0.1z" />
        <path fill="none" stroke="#573585" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m45.2 62.5-2.6-2.1 1.1-2c0.7-1.1 2.2-1.6 3.4-0.9 1.6 0.9 1.6 3.2-0.1 4.1l-1.8 0.9z" />
        <path fill="none" stroke="#70459B" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m43.1 50.7 0.4 1.4 1.4 0.4-1.4 0.5-0.4 1.3-0.4-1.3-1.7-0.5 1.7-0.5 0.4-1.3z" />
        <path fill="none" stroke="#70459B" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m48.3 67.3 0.5 1.7 1.7 0.6-1.7 0.6-0.5 1.8-0.5-1.7-1.8-0.6 1.8-0.6 0.5-1.8z" />
    </svg>
);

// 6. Nav Arrow Right (24x24)
export const NavArrowRightIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="70.8 56.0 20.7 20.7" width={24} height={24} {...props}>
        <path fill="none" stroke="#1D2836" strokeWidth="1.7" strokeLinecap="round" strokeMiterlimit="10" d="m72.3 66.2h17.7" />
        <path fill="none" stroke="#1D2836" strokeWidth="1.7" strokeLinecap="round" strokeMiterlimit="10" d="m82.2 58 7.6 7.6c0.3 0.3 0.3 0.9 0 1.1l-7.6 8" />
    </svg>
);

// 7. Nav Arrow Left (24x24)
export const NavArrowLeftIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="113.0 55.9 21.1 21.1" width={24} height={24} {...props}>
        <path fill="none" stroke="#1D2836" strokeWidth="1.6" strokeLinecap="round" strokeMiterlimit="10" d="m132.6 66.2-17.7 0.1" />
        <path fill="none" stroke="#1D2836" strokeWidth="1.7" strokeLinecap="round" strokeMiterlimit="10" d="m122.5 58.1-8 7.6c-0.3 0.3-0.3 0.9 0 1.1l7.6 8" />
    </svg>
);