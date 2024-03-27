export interface Song {
    title: string;
    artist: string;
    albums: string;
    length: string;
    modified: number;
    created: number;
    bitRate: number;
    file: {
        name: string;
        size: number;
        type: string;
    };
    score: number;
}
