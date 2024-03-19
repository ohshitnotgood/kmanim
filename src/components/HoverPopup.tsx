import { Accessor, createEffect, createSignal, Show } from "solid-js";

/**
 * Displays provided `content` when the user hovers over `children`.
 *
 *
 * ## CSS Shenanigans
 * The root `div` is marked with `relative`. This root has two subcomponents: the `hoverContent` and the `mainContent`.
 *
 * The `mainContent` has `relative` positioning.
 *
 * ## How it works internally
 * Three signals are declared: `style`, `popupHidden` and `disabled`.
 *
 * Event-listeners are attached to the `mainContent`. MouseEnter, MouseLeave and MouseMove events are tracked.
 * MouseEnter and MouseLeave events are used to toggle between `popupHidden`.
 *
 * MouseMove event changes the position of the
 *
 * @param props.children The main content to be displayed
 * @param props.content The content on the hover-view
 * @param props.disable Optional boolean-typed accessor in case the hovering view needs to be disabled.
 * @author Praanto
 * @constructor
 */
export default function HoverPopup(props: {children: any, content: any, disable?: Accessor<boolean>}) {

    let mainContent: HTMLDivElement
    let hoverContent: HTMLDivElement

    const [style, setStyle] = createSignal("left: 0px; top: 0px")
    const [popupHidden, setPopupHidden] = createSignal(true)
    const [disabled, setDisabled] = createSignal(false)

    createEffect(() => {
        setDisabled(props.disable == undefined ? false : props.disable())
    })

    function onMouseEnter() {
        setPopupHidden(false)
        console.log("mouse enter")
    }

    function onMouseLeave() {
        setPopupHidden(true)
        console.log("mouse leave")
    }

    function onHover(e: MouseEvent) {
        setStyle(`left: ${e.x - mainContent.getBoundingClientRect().left - hoverContent.offsetWidth / 2.25}px; top: ${e.y - mainContent.getBoundingClientRect().top + 20}px`)
    }

    return (
        <div class={`relative`}>
            <Show when={!disabled()}>
                <div ref={hoverContent!} classList={{"hidden": popupHidden(), "block": !popupHidden()}} style={style()} class={`w-fit h-fit bg-white z-50 select-none text-center text-lg  tracking-tight whitespace-nowrap text-black absolute overflow-x-hidden border border-black rounded-full px-4`}>
                    { props.content }
                </div>
            </Show>
            <div ref={mainContent!}>
                <span class={`select-none relative z-0`} onmouseenter={onMouseEnter} onmouseleave={onMouseLeave} onmousemove={onHover}>
                    { props.children }
                </span>
            </div>
        </div>
    )
}