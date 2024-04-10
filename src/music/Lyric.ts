import { LyricMetadata } from './LyricMetadata';
import { LyricSubtitle } from './LyricSubtitle';

export interface Lyric {
    metadata: LyricMetadata;
    subtitles: LyricSubtitle[];
}
