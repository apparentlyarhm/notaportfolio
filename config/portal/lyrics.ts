// lyrics of the portal credits song - still alive.
// this is one to one copy of the original time data at https://github.com/errorer/Portal_StillAlive_Python
// also, the credits section is omitted here, as it's not needed

export interface LyricLine {
    words: string | number; // The lyric line to display. if its a number then its ascii art index
    time: number; // Time in milliseconds when this line should appear
    interval: number; // Duration to display the line (optional)
    mode: 'LYRIC_NEWLINE' | 'START_MUSIC' | 'DRAW_ART' | 'CLEAR_LYRICS' | 'LYRIC_NONEWLINE' | 'END'; // Mode of the line
}

// A direct translation of the data structure
// i like to think of this copying the timeline from a premiere pro project
export const timelineEvents: LyricLine[] = [
    // { words, time, interval, mode }
    { words: "Forms FORM-29827281-12:", time: 0, interval: -1, mode: 'LYRIC_NEWLINE' },
    { words: "Test Assessment Report", time: 200, interval: -1, mode: 'LYRIC_NEWLINE' },
    { words: "\x00\x00\x00\x00\x00\x00\x00", time: 400, interval: -1, mode: 'LYRIC_NEWLINE' },
    { words: "", time: 710, interval: 0, mode: 'START_MUSIC' },
    { words: "This was a triumph.", time: 730, interval: 2,  mode: 'LYRIC_NEWLINE' },
    // We don't need a separate mode for ASCII art, just a different data type
    { words: "I'm making a note here:", time: 1123, interval: 2, mode: 'LYRIC_NEWLINE' },
    { words: "HUGE SUCCESS.", time: 1347, interval: 1.7, mode: 'LYRIC_NEWLINE' },
    { words: "It's hard to overstate", time: 1627, interval: -1, mode: 'LYRIC_NEWLINE' },
    { words: "my satisfaction.", time: 1873, interval: 2.6, mode: 'LYRIC_NEWLINE' },
    { words: "Aperture Science", time: 2350, interval: 1.8, mode: 'LYRIC_NEWLINE' },
    { words: 0, time: 2350, interval: 0, mode: 'DRAW_ART' }, // ASCII art index 0
    { words: "We do what we must", time: 2733, interval: 1.6, mode: 'LYRIC_NEWLINE' },
    { words: "because we can.", time: 2910, interval: 1.5, mode: 'LYRIC_NEWLINE' },
    { words: "For the good of all of us.", time: 3237, interval: -1, mode: 'LYRIC_NEWLINE' },
    { words: 1, time: 3500, interval: 0, mode: 'DRAW_ART' }, // ASCII art index 1
    { words: "Except the ones who are dead.", time: 3567, interval: -1, mode: 'LYRIC_NEWLINE' },
    { words: "ENDENDENDENDENDENDENDEND", time: 4000, interval: 1, mode: 'END' },
];