import {twMerge} from "tailwind-merge";

export default function HoverGIFText(props: { children: any, bg: string, class?: string }) {
    return (
        <span class={twMerge(`hover:text-transparent bg-clip-text transition-all duration-300`, props.class, props.bg)}>
            { props.children }
        </span>
    )
}