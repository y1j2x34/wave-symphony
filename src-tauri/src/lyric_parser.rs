use crate::lyric::{self, LyricRole};
use std::collections::HashMap;
use std::fmt;
#[derive(PartialEq, Eq, Hash)]
enum TagType {
    Time,
    Al,
    Ar,
    Au,
    By,
    Offset,
    Re,
    Ti,
    Ve,
    Unknown,
}

impl TagType {
    fn from_str(value: &str) -> Self {
        match value {
            "al" => TagType::Al,
            "ar" => TagType::Ar,
            "au" => TagType::Au,
            "by" => TagType::By,
            "offset" => TagType::Offset,
            "re" => TagType::Re,
            "ti" => TagType::Ti,
            "ve" => TagType::Ve,
            _ => {
                let num_result = value.parse::<i32>();
                return match num_result {
                    Ok(_) => TagType::Time,
                    _ => TagType::Unknown,
                };
            }
        }
    }
    fn to_string(&self) -> Option<String> {
        match *self {
            TagType::Al => Some(String::from("al")),
            TagType::Ar => Some(String::from("ar")),
            TagType::Au => Some(String::from("au")),
            TagType::By => Some(String::from("by")),
            TagType::Offset => Some(String::from("offset")),
            TagType::Re => Some(String::from("re")),
            TagType::Ti => Some(String::from("ti")),
            TagType::Ve => Some(String::from("ve")),
            _ => None,
        }
    }
}

#[derive(Debug, Clone)]
struct SubtitleError(String);

pub fn lyric_parser(text: &str) -> lyric::Lyric {
    let mut metadata_map: HashMap<TagType, String> = HashMap::new();
    let mut subtitles: Vec<lyric::LyricSubtitle> = Vec::new();
    text.split(r"[\r\n]").for_each(|line| {
        let bracket_end_index_option = line.find("]");

        if let Some(end_index) = bracket_end_index_option {
            let bracket_start_index_option = line.find("[");
            if let Some(start_index) = bracket_start_index_option {
                let tag = &line[start_index + 1..end_index];
                let parse_result = parse_tag(tag);
                match parse_result {
                    Ok((t, v)) => match t {
                        TagType::Time => {
                            let pieces = v.split(r"[:.]").collect::<Vec<&str>>();
                            if pieces.len() != 3 {
                                println!("Invalid subtitle time: {}", line)
                            }
                            let mm = pieces[0].parse::<usize>().unwrap();
                            let ss = pieces[1].parse::<usize>().unwrap();
                            let xx = pieces[2].parse::<usize>().unwrap();
                            let milliseconds = mm * 60 * 1000 + ss * 1000 + xx * 100;
                            let content = &line[end_index..];
                            let mut role = None;

                            if content.find("M:") != None {
                                role = Some(LyricRole::Male);
                            } else if content.find("F:") != None {
                                role = Some(LyricRole::Female)
                            } else if content.find("D:") != None {
                                role = Some(LyricRole::Duet)
                            }

                            subtitles.push(lyric::LyricSubtitle {
                                time_str: String::from(tag),
                                time: milliseconds,
                                text: String::from(content),
                                role: role,
                            })
                        }
                        TagType::Unknown => {
                            println!("Unknown type tag: {}, line: {}", tag, line);
                        }
                        _ => {
                            let value = t.to_string().unwrap();
                            metadata_map.insert(t, value);
                        }
                    },
                    Err(SubtitleError(msg)) => {
                        println!("{}", msg)
                    }
                }
            } else {
                println!("Incorrect line: {}", line);
            }
        } else {
            println!("Incorrect line: {}", line);
        }
    });
    let al = metadata_map.get(&TagType::Al);
    let ar = metadata_map.get(&TagType::Ar);
    let au = metadata_map.get(&TagType::Au);
    let by = metadata_map.get(&TagType::By);
    let offset = metadata_map.get(&TagType::Offset);
    let re = metadata_map.get(&TagType::Re);
    let ti = metadata_map.get(&TagType::Ti);
    let ve = metadata_map.get(&TagType::Ve);
    let offset_num = match offset {
        Some(s) => Some(s.parse::<u32>().unwrap()),
        None => None,
    };
    lyric::Lyric {
        metadata: lyric::LyricMetadata {
            al: deref_opt_ref_string(al),
            ar: deref_opt_ref_string(ar),
            au: deref_opt_ref_string(au),
            by: deref_opt_ref_string(by),
            offset: offset_num,
            re: deref_opt_ref_string(re),
            ti: deref_opt_ref_string(ti),
            ve: deref_opt_ref_string(ve),
        },
        subtitles: subtitles,
    }
}

fn deref_opt_ref_string(value: Option<&String>) -> Option<String> {
    match value {
        Some(v) => Some(String::from(v.as_str())),
        None => None,
    }
}

impl fmt::Display for SubtitleError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.0)
    }
}

fn parse_tag<'a>(tag: &'a str) -> Result<(TagType, String), SubtitleError> {
    let pieces = tag.split(":").collect::<Vec<&str>>();
    if pieces.len() != 2 {
        let msg = format!("Incorrect tag format, missing semicolon: {}", tag);
        return Err(SubtitleError(msg));
    }
    let type_str = pieces[0];
    let ttype = TagType::from_str(type_str);
    if ttype == TagType::Unknown {
        let msg = format!("Unknown tag type: {}", type_str);
        return Err(SubtitleError(msg));
    }
    let value = pieces[1];
    return Ok((ttype, String::from(value)));
}
