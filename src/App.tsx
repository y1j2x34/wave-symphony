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
    api.parse_lyric({
        lyric: `
        [al:本歌所在的唱片集]
        [ar:演出者-歌手]
        [au:歌詞作者-作曲家]
        [by:此LRC文件的创建者]
        [offset:+5] 
        [re:创建此LRC文件的播放器或编辑器]
        [ti:歌词(歌曲)的标题]
        [ve:程序的版本]
        [00:12.00]第一行歌词
        [00:17.20]F: 第二行歌词
        [00:21.10]M: 第三行歌词
        [00:24.00]第四行歌词
        [00:28.25]D: 第五行歌词
        [00:29.02]第六行歌词
        `,
    }).then(console.log);
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
