import { Pagination } from '@/common/Pagination';
import { UserInfo } from '@/common/UserInfo';
import { Playlist } from '@/music/Playlist';
import { MusicResource } from '@/music/Resource';
import { Song } from '@/music/Song';
import { FakePlaylistPagination, FakeSongPagination } from './FakePagination';

export class FakeMusicResource implements MusicResource {
    name: string = 'fake';
    logo?: string | undefined;
    search(keyword: string): Pagination<Song> {
        return new FakeSongPagination(0, 50, 10);
    }
    searchPlaylist(keyword: string): Pagination<Playlist> {
        return new FakePlaylistPagination(0, 5, 10);
    }
    login(): Promise<UserInfo> {
        return Promise.resolve({
            username: 'y1j2x34',
            avatar: '',
            resource: this.name,
        } as UserInfo);
    }
}
