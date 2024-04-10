import { createSignal } from 'solid-js';
import { Slider } from '../slider/Slider';

export function PlayingMusicInfo() {
    const [progress, setProgress] = createSignal(0);
    return (
        <div class="pt-5 pb-2 px-5 bg-white dark:bg-slate-500">
            <div class="overflow-hidden w-40 h-40 rounded-full mb-5 mx-auto">
                <img class="block w-full h-full" alt="Album" src="https://picsum.photos/200"></img>
            </div>
            <div class="flex flex-col mb-5 gap-2">
                <div class="flex">
                    <h4 class="text-slate-900 transition-all duration-500 dark:text-slate-50 text-lg">放荡</h4>
                </div>
                <p class="opacity-80 text-slate-500 transition-all duration-500 dark:text-slate-200 text-sm leading-6 truncate">
                    人們在看著，你在興波作浪，
                </p>
                <p class="text-slate-500 transition-all duration-500 dark:text-slate-200 text-sm leading-6 truncate">
                    人們在看著，你在興波作浪，
                </p>
                <p class="opacity-80 text-slate-500 transition-all duration-500 dark:text-slate-200 text-sm leading-6 truncate">
                    人們在看著，你在興波作浪，
                </p>
                <div class="text-cyan-500 transition-all duration-500 dark:text-cyan-400 text-sm leading-6">
                    <a href="#" class="hover:cursor-pointer">
                        张国荣
                    </a>
                    -
                    <a class="text-cyan-600" href="#">
                        LESLIE
                    </a>
                </div>
            </div>
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
        </div>
    );
}
