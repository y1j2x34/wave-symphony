use serde;

pub enum LyricSex {
    /*
    * 女声
    */
    Male,
    Female,
    Duet
}

impl LyricSex {
    fn from_str(s: &'static str) -> LyricSex {
        match s {
            "M" => LyricSex::Male,
            "F" => LyricSex::Female,
            "Duet" => LyricSex::Duet,
            _ => panic!("Unknown sex: {}", s),
        }
    }
    fn to_str(&self) -> &'static str {
        match self {
            LyricSex::Male => "M",
            LyricSex::Female => "F",
            LyricSex::Duet => "D",
        }
    }
}

#[derive(serde::Serialize)]
pub struct Lyric {
    metadata: LyricMetadata,
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

pub struct LyricSubtitle {
    time: String,
    text: String,
    sex: 
}
