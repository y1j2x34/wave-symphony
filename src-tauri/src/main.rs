// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod lyric;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, parseLyric])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello: {}!", name)
}

#[tauri::command]
fn parseLyric(s: &str) -> lyric::Lyric {
    lyric::Lyric {}
}
