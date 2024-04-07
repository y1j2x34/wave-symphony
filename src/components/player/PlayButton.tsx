import { PlayerService } from '@/services/player/PlayerService';
import { useService } from '@vgerbot/solidium';
import { Show, Switch } from 'solid-js';

export function PlayButton() {
    const player = useService(PlayerService);

    return (
        <button
            type="button"
            class="group hover:bg-white text-slate-900 transition-all duration-500 dark:bg-slate-100 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
            aria-label="Pause"
            onClick={() => {
                if (player.isPlaying) {
                    player.pause();
                } else {
                    player.play();
                }
            }}
        >
            <Show when={player.isPlaying}>
                <svg
                    width="30"
                    height="32"
                    fill="currentColor"
                    class="opacity-0 group-hover:opacity-100 transition-all"
                >
                    <rect x="6" y="4" width="4" height="24" rx="2"></rect>
                    <rect x="20" y="4" width="4" height="24" rx="2"></rect>
                </svg>
            </Show>
            <Show when={!player.isPlaying}>
                <svg
                    width="30"
                    height="32"
                    fill="currentColor"
                    class="opacity-0 group-hover:opacity-100 transition-all"
                >
                    <g transform="matrix(0.35614236,0,0,-0.31011198,-3688.5482,5221.6785)" stroke="none" id="g8">
                        <path
                            d="m 10377.551,16825.065 c -1.302,-0.418 -2.654,-1.93 -3.244,-3.579 -0.546,-1.512 -0.51,0.842 -0.51,-34.941 0,-35.85 0,-33.507 0.527,-35.109 0.361,-0.956 1.469,-2.491 2.172,-2.957 1.222,-0.796 2.55,-0.944 3.722,-0.418 0.501,0.238 6.191,4.637 20.717,16.069 11.012,8.665 20.361,16.027 20.78,16.368 1.757,1.44 2.623,3.43 2.623,5.993 0,2.497 -0.843,4.471 -2.505,5.856 -1.91,1.614 -40.867,32.174 -41.34,32.437 -0.451,0.24 -0.739,0.359 -1.568,0.359 -0.554,0 -1.171,0 -1.374,-0.06 z"
                            id="path6"
                            style="stroke-width:0.0107866"
                        />
                    </g>
                </svg>
            </Show>
        </button>
    );
}
