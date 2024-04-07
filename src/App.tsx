import { IStaticMethods } from 'preline/preline';
import { useService } from '@vgerbot/solidium';
import { RsAPI } from './rs-api/RsAPI';
import { Slider } from './components/slider/Slider';
import { createSignal } from 'solid-js';
import { PlayerControl } from './components/player/PlayerControl';
import { DarkModeSwitcher } from './components/dark-mode/DarkModeSwitcher';
import { PlayingMusicInfo } from './components/player/PlayingMusicInfo';

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
                <DarkModeSwitcher></DarkModeSwitcher>
            </header>
            <main class="flex gap-2">
                {/* player container */}
                <section class="w-[25rem] m-5">
                    <PlayingMusicInfo></PlayingMusicInfo>
                    <PlayerControl></PlayerControl>
                </section>
                {/* main container */}
                <section class="flex-1"></section>
            </main>
            <footer></footer>
        </div>
    );
}
