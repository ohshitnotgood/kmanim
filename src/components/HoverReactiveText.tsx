import { For } from "solid-js";
import { twMerge } from 'tailwind-merge'

/**
 * Displays words with a hover-effect.
 *
 * Upon mouse-enter on a word (in a sentence), the colour changes from a lighter shade to a darker shade of gray.
 *
 * All the words are structured with `span` tags.
 *
 * If you want two or more words to have the hover effect at the same time, use the `\_/` special
 * character to join them.
 *
 * Line-breaks are ignored. If you want to implement a line-break, wrap it with a `<p>` tag.
 *
 * `p` tags have a `pb-5` applied to it which should work in most occasions.
 *
 * Links are not accepted. However, since all the words are wrapped in a `span` tag (the root tag
 * is also a `span` tag), you can get away by using an `a` tag
 *
 * ## How it works internally
 * This component only accepts string children. The string is split
 * with spaces as delimiters and each word then gets a hover-effect that
 * allows it to change colour upon cursor hover.
 *
 *
 *
 *
 * ## CSS Shenanigans
 *
 * Default text colour is `gray-400` and default hover colour is `gray-500`.
 *
 * Default animation duration is 200ms.
 *
 * These defaults can be overridden by providing a `class`. This class is, of course, safely merged with `twMerge`.
 *
 * `text-justify` does not work.
 *
 * @example
 * <HoverReactiveText>
 *     Hello\_/World and welcome to the largest student-run career fair in Kista.
 * </HoverReactiveText>
 *
 * // To add a hyperlink
 * <HoverReactiveText>
 *     You can learn more about it
 * </HoverReactiveText>
 * <a>here</a>
 *
 *
 * @param props.children String of words that need to be displayed
 * @param props.class Optional tailwind classes.
 * @todo text alignment does not work
 */
export default function HoverReactiveText(props: {children: string, class?: string}) {
    return (
        <For each={props.children.split(" ")}>{(each, _) =>
            <span>
                <span class={twMerge(`text-gray-400 dark:text-gray-300 select-none hover:text-gray-500 dark:hover:text-gray-200 transition-colours duration-200`, props.class)}>
                    {each.replace("\\_/", " ") + " "}
                </span>
            </span>
        }
        </For>
    )
}