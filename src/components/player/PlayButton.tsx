import { PlayerService } from '@/services/player/PlayerService';
import { useService } from '@vgerbot/solidium';
import { Show, Switch } from 'solid-js';

export function PlayButton() {
    const player = useService(PlayerService);

    return (
        <button
            type="button"
            class="bg-white text-slate-900 transition-all duration-500 dark:bg-slate-100 transition-all duration-500 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
            aria-label="Pause"
            onClick={() => {
                if (player.isPlaying) {
                    player.pause();
                } else if (player.isPaused) {
                    player.play();
                }
            }}
        >
            <Show when={player.isPlaying}>
                <svg width="30" height="32" fill="currentColor">
                    <rect x="6" y="4" width="4" height="24" rx="2"></rect>
                    <rect x="20" y="4" width="4" height="24" rx="2"></rect>
                </svg>
            </Show>
            <Show when={!player.isPlaying}>
                <svg width="30" height="32" fill="currentColor">
                    <path d="m10 12 8-6v12l-8-6Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </Show>
        </button>
    );
}
