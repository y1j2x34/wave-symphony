import { AddToFavoritesButton } from './AddToFavoritesButton';
import { NextButton } from './NextButton';
import { PlayButton } from './PlayButton';
import { PlayerSpeed } from './PlayerSpeed';
import { PreviousButton } from './PreviousButton';
import { RewindButton } from './RewindButton';
import { SkipButton } from './SkipButton';

export function PlayerControl() {
    return (
        <div class="bg-slate-50 text-slate-500 transition-all duration-500 dark:bg-slate-600 dark:text-slate-200 rounded-b-xl flex items-center">
            <div class="flex-auto flex items-center justify-evenly">
                <AddToFavoritesButton></AddToFavoritesButton>
                <PreviousButton></PreviousButton>
                <RewindButton></RewindButton>
            </div>
            <PlayButton></PlayButton>
            <div class="flex-auto flex items-center justify-evenly">
                <SkipButton></SkipButton>
                <NextButton></NextButton>
                <PlayerSpeed></PlayerSpeed>
            </div>
        </div>
    );
}
