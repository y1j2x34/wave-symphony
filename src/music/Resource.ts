import { Pagination } from '@/common/Pagination';
import { Song } from './Song';
import { UserInfo } from '@/common/UserInfo';
import { Playlist } from './Playlist';

export interface MusicResource {
    name: string;
    logo?: string;
    search(keyword: string): Pagination<Song>;
    searchPlaylist(keyword: string): Pagination<Playlist>;
    login(): Promise<UserInfo>;
}
