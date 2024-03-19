import { createSignal, type Component } from 'solid-js';
import FadeInUp from './components/FadeInUp';

const App: Component = () => {
    const [animationTrigger, setAnimationTrigger] = createSignal(false);

    function triggerAnimation() {
        setAnimationTrigger(true)
    }

    return (
        <div class="font-bold">
            <button onclick={triggerAnimation}>
                Trigger FadeInUp animation
            </button>

            <FadeInUp class='font-mono text-red-600' delay={0} trigger={animationTrigger}>
                FADE IN UP
            </FadeInUp>
        </div>
    );
};

export default App;
