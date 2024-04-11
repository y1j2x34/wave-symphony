/**
 *
 */
export interface LyricSubtitle {
    /**
     * 歌词时间
     */
    time: number;
    /**
     * 歌词时间标签: [mm:ss.xx], 对应的，mm为分钟数，ss是秒数，xx是10ms数，time 是毫秒为单位的时间戳
     */
    time_str: string;
    /**
     * 歌词内容
     */
    text: string;
    /**
     * 歌词性别：M: 男性，F: 女性，D: 合唱
     */
    role?: 'Male' | 'Female' | 'Duet';
}
