import type { Song } from '@/music/Song';
import { Signal } from '@vgerbot/solidium';
import { PlayerStatus } from './PlayerStatus';

export class PlayerService {
    @Signal
    song?: Song;
    @Signal
    progress: number = 0;
    @Signal
    status: PlayerStatus = PlayerStatus.STOPPED;

    get isPaused() {
        return this.status === PlayerStatus.PAUSED;
    }

    get isPlaying() {
        return this.status === PlayerStatus.PLAYING;
    }

    get isStopped() {
        return this.status === PlayerStatus.STOPPED;
    }

    setSong(song: Song) {
        this.progress = 0;
        this.status = PlayerStatus.PAUSED;
    }

    pause() {
        if (this.status === PlayerStatus.PAUSED) {
            return;
        }
        //
    }

    play() {
        if (!this.isPaused) {
            return;
        }
    }
}
