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
