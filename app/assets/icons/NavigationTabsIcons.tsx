import type { SVGProps } from "react";

export type NavigationTabIconProps = SVGProps<SVGSVGElement>;

const commonIconProps = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: 24,
    height: 24,
    "aria-hidden": true,
    focusable: false,
} as const;

/**
 * KamiJi Navigation Icons
 *
 * Base grid: 24x24
 * Stroke base: 2px
 * Style: N5 rounded / kawaii-friendly
 *
 * Usage:
 * <HomeTabInactiveIcon className="size-6 text-muted-foreground" />
 * <HomeTabActiveIcon className="size-6 text-primary" />
 */

export function HomeTabInactiveIcon(props: NavigationTabIconProps) {
    return (
        <svg {...commonIconProps} {...props} fill="none">
            <path
                d="M3.6 11.25 12 3.65l8.4 7.6"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
            <path
                d="M5.55 10.65v8.2c0 .9.7 1.6 1.6 1.6h2.95v-5.25c0-.8.65-1.45 1.45-1.45h.9c.8 0 1.45.65 1.45 1.45v5.25h2.95c.9 0 1.6-.7 1.6-1.6v-8.2"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}

export function HomeTabActiveIcon(props: NavigationTabIconProps) {
    return (
        <svg {...commonIconProps} {...props}>
            <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.15 3.35a1.3 1.3 0 0 1 1.7 0l7.8 7.05a1.28 1.28 0 0 1-1.7 1.9l-.35-.3v6.85a2.1 2.1 0 0 1-2.1 2.1h-3.15a.75.75 0 0 1-.75-.75v-4.9a.6.6 0 0 0-.6-.6.6.6 0 0 0-.6.6v4.9a.75.75 0 0 1-.75.75H7.5a2.1 2.1 0 0 1-2.1-2.1V12l-.35.3a1.28 1.28 0 0 1-1.7-1.9l7.8-7.05Z"
            />
        </svg>
    );
}

export function LeerTabInactiveIcon(props: NavigationTabIconProps) {
    return (
        <svg {...commonIconProps} {...props} fill="none">
            <path
                d="M4.6 6.2c0-.75.6-1.35 1.35-1.35 2.55 0 4.55.7 6.05 2.15v12.15c-1.5-1.45-3.5-2.15-6.05-2.15-.75 0-1.35.6-1.35 1.35V6.2Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
            <path
                d="M19.4 6.2c0-.75-.6-1.35-1.35-1.35-2.55 0-4.55.7-6.05 2.15v12.15c1.5-1.45 3.5-2.15 6.05-2.15.75 0 1.35.6 1.35 1.35V6.2Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}

export function LeerTabActiveIcon(props: NavigationTabIconProps) {
    return (
        <svg {...commonIconProps} {...props}>
            <path
                fill="currentColor"
                d="M5.9 4.55c2.2 0 3.95.55 5.35 1.7.25.2.4.5.4.82v12.55c0 .35-.42.55-.7.33-1.32-1.05-2.95-1.55-5.05-1.55-.55 0-1 .45-1 1v.55c0 .55-.45 1-1 1s-1-.45-1-1V6.55c0-1.1.9-2 2-2h1Z"
            />
            <path
                fill="currentColor"
                d="M18.1 4.55c-2.2 0-3.95.55-5.35 1.7-.25.2-.4.5-.4.82v12.55c0 .35.42.55.7.33 1.32-1.05 2.95-1.55 5.05-1.55.55 0 1 .45 1 1v.55c0 .55.45 1 1 1s1-.45 1-1V6.55c0-1.1-.9-2-2-2h-1Z"
            />
        </svg>
    );
}

export function RepasoTabInactiveIcon(props: NavigationTabIconProps) {
    return (
        <svg {...commonIconProps} {...props} fill="none">
            <path
                d="M19.4 7.25v4.15H15.25"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
            <path
                d="M18.75 11.4A7.15 7.15 0 0 0 6.7 6.25L5.1 7.85"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
            <path
                d="M4.6 16.75V12.6h4.15"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
            <path
                d="M5.25 12.6A7.15 7.15 0 0 0 17.3 17.75l1.6-1.6"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}

export function RepasoTabActiveIcon(props: NavigationTabIconProps) {
    return (
        <svg {...commonIconProps} {...props} fill="none">
            <path
                d="M19.4 7.25v4.15H15.25"
                stroke="currentColor"
                strokeWidth={2.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
            <path
                d="M18.75 11.4A7.15 7.15 0 0 0 6.7 6.25L5.1 7.85"
                stroke="currentColor"
                strokeWidth={2.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
            <path
                d="M4.6 16.75V12.6h4.15"
                stroke="currentColor"
                strokeWidth={2.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
            <path
                d="M5.25 12.6A7.15 7.15 0 0 0 17.3 17.75l1.6-1.6"
                stroke="currentColor"
                strokeWidth={2.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}

export function ProgresoTabInactiveIcon(props: NavigationTabIconProps) {
    return (
        <svg {...commonIconProps} {...props} fill="none">
            <rect
                x={4.25}
                y={12.15}
                width={3.8}
                height={7.35}
                rx={1.25}
                stroke="currentColor"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
            />
            <rect
                x={10.1}
                y={8.35}
                width={3.8}
                height={11.15}
                rx={1.25}
                stroke="currentColor"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
            />
            <rect
                x={15.95}
                y={4.45}
                width={3.8}
                height={15.05}
                rx={1.25}
                stroke="currentColor"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}

export function ProgresoTabActiveIcon(props: NavigationTabIconProps) {
    return (
        <svg {...commonIconProps} {...props}>
            <rect x={4.25} y={12.15} width={3.8} height={7.35} rx={1.25} fill="currentColor" />
            <rect x={10.1} y={8.35} width={3.8} height={11.15} rx={1.25} fill="currentColor" />
            <rect x={15.95} y={4.45} width={3.8} height={15.05} rx={1.25} fill="currentColor" />
        </svg>
    );
}

export function PreferenciasTabInactiveIcon(props: NavigationTabIconProps) {
    return (
        <svg {...commonIconProps} {...props} fill="none">
            <path
                d="M19.45 12.95c.04-.31.06-.63.06-.95s-.02-.64-.06-.95l2.02-1.58c.2-.16.26-.45.13-.67l-1.9-3.3a.55.55 0 0 0-.68-.24l-2.38.96a7.75 7.75 0 0 0-1.65-.95l-.36-2.53A.55.55 0 0 0 14.08 2.3h-4.16a.55.55 0 0 0-.55.44l-.36 2.53c-.59.24-1.14.56-1.65.95l-2.38-.96a.55.55 0 0 0-.68.24L2.4 8.8c-.13.22-.07.51.13.67l2.02 1.58c-.04.31-.06.63-.06.95s.02.64.06.95L2.53 14.53a.55.55 0 0 0-.13.67l1.9 3.3c.13.23.4.33.68.24l2.38-.96c.51.39 1.06.71 1.65.95l.36 2.53c.04.25.26.44.55.44h4.16c.29 0 .51-.19.55-.44l.36-2.53c.59-.24 1.14-.56 1.65-.95l2.38.96c.28.09.55-.01.68-.24l1.9-3.3a.55.55 0 0 0-.13-.67l-2.02-1.58Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
            <circle
                cx={12}
                cy={12}
                r={3.25}
                stroke="currentColor"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}

export function PreferenciasTabActiveIcon(props: NavigationTabIconProps) {
    return (
        <svg {...commonIconProps} {...props}>
            <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.45 12.95c.04-.31.06-.63.06-.95s-.02-.64-.06-.95l2.02-1.58c.2-.16.26-.45.13-.67l-1.9-3.3a.55.55 0 0 0-.68-.24l-2.38.96a7.75 7.75 0 0 0-1.65-.95l-.36-2.53A.55.55 0 0 0 14.08 2.3h-4.16a.55.55 0 0 0-.55.44l-.36 2.53c-.59.24-1.14.56-1.65.95l-2.38-.96a.55.55 0 0 0-.68.24L2.4 8.8c-.13.22-.07.51.13.67l2.02 1.58c-.04.31-.06.63-.06.95s.02.64.06.95L2.53 14.53a.55.55 0 0 0-.13.67l1.9 3.3c.13.23.4.33.68.24l2.38-.96c.51.39 1.06.71 1.65.95l.36 2.53c.04.25.26.44.55.44h4.16c.29 0 .51-.19.55-.44l.36-2.53c.59-.24 1.14-.56 1.65-.95l2.38.96c.28.09.55-.01.68-.24l1.9-3.3a.55.55 0 0 0-.13-.67l-2.02-1.58ZM12 15.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z"
            />
        </svg>
    );
}