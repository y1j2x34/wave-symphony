use core::fmt;

use serde;

#[derive(serde::Serialize, Debug)]
pub enum LyricRole {
    /*
     * 女声
     */
    Male,
    Female,
    Duet,
}

impl LyricRole {
    #[warn(dead_code)]
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

impl fmt::Display for LyricRole {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.to_str())
    }
}

#[derive(serde::Serialize, Debug)]
pub struct Lyric {
    pub metadata: LyricMetadata,
    pub subtitles: Vec<LyricSubtitle>,
}

#[derive(serde::Serialize, Debug)]
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

#[derive(serde::Serialize, Debug)]
pub struct LyricSubtitle {
    pub time_str: String,
    pub time: usize,
    pub text: String,
    pub role: Option<LyricRole>,
}

impl fmt::Display for Lyric {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(
            f,
            "lyric:
                metadata:
                    {}
                subtitles: 
                    {:?}
        ",
            self.metadata, self.subtitles
        )
    }
}
impl fmt::Display for LyricMetadata {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(
            f,
            "
        al: {:?},
        ar: {:?},
        au: {:?},
        by: {:?},
        offset: {:?},
        re: {:?},
        ti: {:?},
        ve: {:?},
        ",
            self.al, self.ar, self.au, self.by, self.offset, self.re, self.ti, self.ve,
        )
    }
}

impl fmt::Display for LyricSubtitle {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "[{}] {:?} {}", self.time_str, self.role, self.text)
    }
}
