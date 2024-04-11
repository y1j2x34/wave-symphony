use crate::lyric::{self, LyricRole};
use std::collections::HashMap;
use std::fmt;
#[derive(PartialEq, Eq, Hash, Debug)]
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
    let lines = text.lines();
    println!("lines: {:?}", lines);
    lines.for_each(|line| {
        let line = line.trim();
        if line.len() == 0 {
            return;
        }

        let bracket_end_index_option = line.find("]");

        if let Some(end_index) = bracket_end_index_option {
            let bracket_start_index_option = line.find("[");
            if let Some(start_index) = bracket_start_index_option {
                let tag = &line[start_index + 1..end_index];
                let parse_result = parse_tag(tag);
                match parse_result {
                    Ok((t, v)) => match t {
                        TagType::Time => {
                            let [mm, ss, xx] = parse_time(v.as_str());
                            let milliseconds = mm * 60 * 1000 + ss * 1000 + xx * 100;
                            let mut content = &line[end_index + 1..];
                            let mut role = None;

                            if content.find("M:") != None {
                                role = Some(LyricRole::Male);
                                content = &content[2..];
                            } else if content.find("F:") != None {
                                role = Some(LyricRole::Female);
                                content = &content[2..];
                            } else if content.find("D:") != None {
                                role = Some(LyricRole::Duet);
                                content = &content[2..];
                            }
                            content = content.trim();

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
                            metadata_map.insert(t, v);
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
        Some(s) => {
            println!("offset value: {}", s);
            Some(s.parse::<u32>().unwrap())
        }
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
    let colon_index = tag
        .find(":")
        .expect(format!("Incorrect tag format, missing semicolon: {}", tag).as_str());

    let type_str = &tag[..colon_index];
    let ttype = TagType::from_str(type_str);
    if ttype == TagType::Unknown {
        let msg = format!("Unknown tag type: {}", type_str);
        return Err(SubtitleError(msg));
    }
    let value = &tag[colon_index + 1..];
    return Ok((ttype, String::from(value)));
}

fn parse_time(time: &str) -> [usize; 3] {
    let mut collect_num_chars = String::new();
    let mut times = [0, 0, 0];
    time.chars().for_each(|chr| {
        if chr == ':' {
            times[0] = collect_num_chars
                .parse::<usize>()
                .expect("Invalid mm number");
            collect_num_chars = String::new();
        } else if chr == '.' {
            times[1] = collect_num_chars
                .parse::<usize>()
                .expect("Invalid ss number");
            collect_num_chars = String::new();
        } else {
            collect_num_chars.push(chr);
        }
    });
    times[2] = collect_num_chars
        .parse::<usize>()
        .expect("Invalid xx number");
    return times;
}
