use serde;

#[derive(serde::Serialize)]
pub enum LyricRole {
    /*
     * 女声
     */
    Male,
    Female,
    Duet,
}

impl LyricRole {
    fn from_str(s: &'static str) -> LyricRole {
        match s {
            "M" => LyricRole::Male,
            "F" => LyricRole::Female,
            "Duet" => LyricRole::Duet,
            _ => panic!("Unknown role: {}", s),
        }
    }
    fn to_str(&self) -> &'static str {
        match self {
            LyricRole::Male => "M",
            LyricRole::Female => "F",
            LyricRole::Duet => "D",
        }
    }
}

#[derive(serde::Serialize)]
pub struct Lyric {
    pub metadata: LyricMetadata,
    pub subtitles: Vec<LyricSubtitle>,
}

#[derive(serde::Serialize)]
pub struct LyricMetadata {
    pub al: Option<String>,
    pub ar: Option<String>,
    pub au: Option<String>,
    pub by: Option<String>,
    pub offset: Option<u32>,
    pub re: Option<String>,
    pub ti: Option<String>,
    pub ve: Option<String>,
}

#[derive(serde::Serialize)]
pub struct LyricSubtitle {
    pub time_str: String,
    pub time: usize,
    pub text: String,
    pub role: Option<LyricRole>,
}
