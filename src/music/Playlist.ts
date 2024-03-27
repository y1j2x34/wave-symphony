import { Pagination } from '@/common/Pagination';
import { Song } from './Song';

export interface Playlist {
    title: string;
    author: string;
    count: number;
    list(): Promise<Pagination<Song>>;
}
