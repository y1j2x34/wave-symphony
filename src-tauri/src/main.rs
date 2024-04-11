// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use lyric_parser::lyric_parser;

mod lyric;
mod lyric_parser;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, parse_lyric])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello: {}!", name)
}

#[tauri::command]
fn parse_lyric(s: &str) -> lyric::Lyric {
    lyric_parser(s)
}

#[cfg(test)]
mod tests {
    use super::lyric_parser;

    #[test]
    fn test_parser() {
        let result = lyric_parser(
            "
        [al:本歌所在的唱片集]
        [ar:演出者-歌手]
        [au:歌詞作者-作曲家]
        [by:此LRC文件的创建者]
        [offset:+5] 
        [re:创建此LRC文件的播放器或编辑器]
        [ti:歌词(歌曲)的标题]
        [ve:程序的版本]
        [00:12.00]第一行歌词
        [00:17.20]F: 第二行歌词
        [00:21.10]M: 第三行歌词
        [00:24.00]第四行歌词
        [00:28.25]D: 第五行歌词
        [00:29.02]第六行歌词
        ",
        );
        println!("result: {}", result)
    }
}
