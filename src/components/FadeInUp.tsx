import {Accessor, createEffect, createSignal, Show} from "solid-js"
import {twMerge} from "tailwind-merge";

/**
 * Displays a view with a fade-in-up animation
 *
 * You can provide additional styling through the `class` property. Classes are safely added using `twMerge`.
 *
 * Optionally accepts `trigger: Accessor<string>` to begin the animation. If this is not provided, then the children are
 * rendered but hidden with `opacity-0`.
 * If this `trigger` property is provided, however, then the children are not rendered (not just hidden with opacity).
 *
 * You can provide a delay to begin the animation after a number of milliseconds. (This is useful when animation
 * components that are fired upon a scroll-event but each component must appear with a certain delay.)
 * By default, no delay is added.
 *
 *
 * ## How it works internally
 * Two `signals` are instantiated: `show` and `animate`. `animate()` begins the fade-up animation (of course it does).
 * `show()` is used to prevent the views from rendering before the `trigger` is set to `true`.
 *
 * If no `trigger` is provided, `show` is instantly set to `true` and `animate` is set to true after the provided `delay`
 * period is over.
 *
 *
 * ## CSS Shenanigans
 * The children is wrapped with the `relative` class. Their position is manipulated to make the animation happen.
 * When `animate` is set to false, `top-32` is applied to children. The animation takes `500ms` to complete.
 *
 *
 *
 * @param props.children The view that needs to be animated
 * @param props.delay The delay before the animation kicks off in milliseconds.
 * @param props.trigger Optional boolean typed accessor to begin the fade-in animation.
 * @param props.class Optional styling class.
 *
 * @example
 *
 * const [trigger, setTrigger] = createSignal(false);
 *
 * // Set trigger to true based on some event (such as a scroll-event).
 * setTrigger(true);
 *
 * <FadeInUp trigger={trigger}>
 *     Hello World!
 * </FadeInUp>
 *
 * // This component will render 500ms after the Hello World text.
 * <FadeInUp trigger={trigger} delay={500}>
 *     Hello Sweden!
 * </FadeInUp>
 *
 */
export default function FadeInUp(props: {children: any, delay?: number, class?: string, trigger?: Accessor<boolean>}) {
    const [show, setShow] = createSignal(false)
    const [animate, setAnimate] = createSignal(false)
    const delay = props.delay == undefined ? 0 : props.delay

    if (props.trigger == undefined) {
        setShow(true)
        setTimeout(() => {
            setAnimate(true)
        }, delay)
    } else {
        createEffect(() => {
            if (props.trigger!()) {
                setShow(true)
                setTimeout(() => {
                    setAnimate(true)
                }, delay)}
            }
        )
    }

    return (
        <Show when={show()}>
            <div class={twMerge(`transition-all duration-500 relative`, props.class)} classList={{"top-0 opacity-100": animate(), "top-32 opacity-0": !animate()}}>
                {props.children}
            </div>
        </Show>
    )
}