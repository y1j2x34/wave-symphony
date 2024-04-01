import { Pagination } from '@/common/Pagination';
import { Playlist } from '@/music/Playlist';
import { Song } from '@/music/Song';

export class FakeSongPagination implements Pagination<Song> {
    data(): Promise<Song[]> {
        return new Promise(resolve => {
            resolve(
                Array(this.pageSize)
                    .fill(0)
                    .map(_ => {
                        return {
                            title: 'Fake Song',
                            artist: 'Fake artist',
                            albums: '',
                            length: 140,
                            modified: Date.now(),
                            created: Date.now(),
                            bitRate: 0,
                            file: {
                                name: 'Fake file',
                                size: 1024 * 1024 * 1024 * 5,
                                type: 'ogg',
                            },
                            score: 0,
                        } as Song;
                    })
            );
        });
    }
    goto(pageIndex: number): Pagination<Song> {
        return new FakeSongPagination(pageIndex, this.pageCount, this.pageSize);
    }
    constructor(
        public readonly pageIndex: number = 0,
        public readonly pageCount: number = 50,
        public readonly pageSize: number = 10
    ) {}
}

export class FakePlaylistPagination implements Pagination<Playlist> {
    data(): Promise<Playlist[]> {
        return new Promise<Playlist[]>(resolve => {
            resolve(
                Array(this.pageSize)
                    .fill(0)
                    .map(_ => {
                        return {
                            title: 'Fake playlist',
                            author: 'Fake playlist author',
                            count: 100,
                            list() {
                                return Promise.resolve(new FakeSongPagination(0, 10, 10));
                            },
                        } as Playlist;
                    })
            );
        });
    }
    goto(pageIndex: number): Pagination<Playlist> {
        return new FakePlaylistPagination(pageIndex, this.pageCount, this.pageSize);
    }
    constructor(
        public pageIndex: number,
        public pageCount: number,
        public pageSize: number
    ) {}
}
