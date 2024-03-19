import {Accessor, createEffect, createSignal, Show} from "solid-js";
import {twMerge} from "tailwind-merge";


/**
 * Fade-out-in animation between two views.
 *
 * A `pre` and a `post` view must be provided along with a `beginTransition` accessor of type boolean. From a parent view,
 * when the `beginTransition` accessor is set to `true`, the transition begins.
 *
 *
 * ## How it works internally
 * Both the `pre` and the `post` views are shown using `solid-js` `Show` tags.
 *
 *
 * There are three internal `signal` components: the `preViewFadeOut`, the `preViewHidden` and the `postViewFadeIn`.
 *
 * `pre` is shown when `preViewHidden` is false and post is shown when `preViewHidden` is set to true.
 *
 * The `preViewFadeOut` initiates the fade-out animation of the `pre` view when the `beginTransition accessor` from the parent view
 * is set to `true`. After the animation is completed, `preViewHidden` is set to true (this animation lasts for 500ms
 * which is controlled by a `setTimeout`).
 *
 * When the `pre` is removed, the `post` is shown. The animation to fade-in the post begins after a slight delay (this delay
 * is controlled by a `setTimeout` of 0ms).
 *
 *
 * ## CSS Shenanigans
 * The fade-out-in animation is done using `classList` which is a `solid-js` feature to apply conditional CSS. When
 * `preFadeOut` is set to `true`, opacity of `pre` is gradually set to 0 over 500ms. Similarly, when `postViewFadeIn` is
 * set to `true`, the opacity is increased to `1` over 500ms.
 *
 *
 *
 * @example
 * const [animate, setAnimate] = createSignal(false);
 *
 * // Set animate to true when you want to begin the transition
 * setAnimate(true);
 * 
 * <ViewTransition pre={Pre} post={Post} beginTransition={animate} />
 *
 *
 * @summary Fade-out-in animation between two views.
 * @param props.pre View to present before transition
 * @param props.post View to present after transition
 * @param props.beginTransition Signal to begin transition
 */
export default function ViewTransition(props: { class?: string,  pre: any, post: any, beginTransition: Accessor<boolean> }) {
    const [preViewFadeOut, setPreViewFadeOut] = createSignal(false)
    const [preViewHidden, setPreViewHidden] = createSignal(false)
    createEffect(() => {
        if (props.beginTransition()) {
            setPreViewFadeOut(true)
            setTimeout(() => {
                setPreViewHidden(true)
            }, 500)
        }
    })

    const [postViewFadeIn, setPostViewFadeIn] = createSignal(false)
    createEffect(() => {
        if (preViewHidden()) {
            setTimeout(() => {
                setPostViewFadeIn(true)
            }, 0)
        }
    })

    return (
        <div class={twMerge(props.class, "w-screen h-fit")}>
            <Show when={!preViewHidden()}>
                <div class={`duration-500 transition-all`}
                     classList={{"opacity-0": preViewFadeOut(), "opacity-100": !preViewFadeOut()}}>
                    { props.pre }
                </div>
            </Show>
            <Show when={preViewHidden()}>
                <div class={`duration-500 transition-all`}
                     classList={{"opacity-100": postViewFadeIn(), "opacity-0": !postViewFadeIn()}}>
                    { props.post }
                </div>
            </Show>
        </div>
    )
}