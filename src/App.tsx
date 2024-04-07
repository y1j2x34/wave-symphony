import { IStaticMethods } from 'preline/preline';
import { useService } from '@vgerbot/solidium';
import { RsAPI } from './rs-api/RsAPI';
import { Slider } from './components/slider/Slider';
import { createSignal } from 'solid-js';
import { Player } from './components/player/Player';

declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}

export function App() {
    const api = useService(RsAPI);
    const [progress, setProgress] = createSignal(0);
    return (
        <div class="container md:mx-auto h-full">
            <header class="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
                <nav
                    class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
                    aria-label="Global"
                ></nav>
            </header>
            <main class="flex">
                {/* player container */}
                <section class="">
                    <Player></Player>
                </section>
                {/* main container */}
                <section class="flex-1"></section>
                <Slider
                    min={0}
                    max={500}
                    value={progress()}
                    label="Progress"
                    onChange={value => {
                        setProgress(value);
                    }}
                    wheelOffset={e => {
                        const unit = e.deltaY < 0 ? -1 : 1;
                        if (e.shiftKey) {
                            return 100 * unit;
                        }
                        return 10 * unit;
                    }}
                    helperText1={progress() + ''}
                    helperText2={500 + ''}
                ></Slider>
            </main>
        </div>
    );
}
