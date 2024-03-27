import { Song } from './Song';

export interface Podcast {
    name: string;
    url: string;
    list(): Promise<Song[]>;
}
