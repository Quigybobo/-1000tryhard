// MIDI Pattern Generator Module
// Generates MIDI file data for trance/techno patterns

// MIDI note numbers
const KICK_NOTE = 36;  // C1
const HAT_CLOSED_NOTE = 42;  // C#1
const HAT_OPEN_NOTE = 46;  // A#1
const SNARE_NOTE = 38;  // D1
const CLAP_NOTE = 39;  // D#1

// Scale intervals
const SCALES = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  harmonic: [0, 2, 3, 5, 7, 8, 11],
  phrygian: [0, 1, 4, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  mixolydian: [0, 2, 4, 5, 7, 9, 10]
};

const NOTE_VALUES = {
  'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5,
  'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11
};

// Generate variable-length delta time
function writeVarLen(value) {
  const bytes = [];
  bytes.push(value & 0x7F);
  value >>= 7;

  while (value > 0) {
    bytes.unshift((value & 0x7F) | 0x80);
    value >>= 7;
  }

  return bytes;
}

// Generate MIDI file from events
function generateMIDIFile(events, bpm) {
  const ticksPerQuarterNote = 96;

  // Sort events by tick
  events.sort((a, b) => a.tick - b.tick);

  // Build MIDI track
  const trackData = [];
  let currentTick = 0;

  events.forEach(event => {
    const delta = event.tick - currentTick;
    currentTick = event.tick;

    trackData.push(...writeVarLen(delta));

    if (event.type === 'noteOn') {
      trackData.push(0x90, event.note, event.velocity);
    } else if (event.type === 'noteOff') {
      trackData.push(0x80, event.note, 0);
    } else if (event.type === 'endOfTrack') {
      trackData.push(0xFF, 0x2F, 0x00);
    }
  });

  // Build complete MIDI file
  const tempoMPQ = Math.round(60000000 / bpm);

  const header = [
    0x4D, 0x54, 0x68, 0x64, // "MThd"
    0x00, 0x00, 0x00, 0x06, // Header length
    0x00, 0x00, // Format 0
    0x00, 0x01, // 1 track
    (ticksPerQuarterNote >> 8) & 0xFF, ticksPerQuarterNote & 0xFF
  ];

  const tempoEvent = [
    0x00, // Delta time
    0xFF, 0x51, 0x03, // Tempo meta event
    (tempoMPQ >> 16) & 0xFF,
    (tempoMPQ >> 8) & 0xFF,
    tempoMPQ & 0xFF
  ];

  const fullTrackData = [...tempoEvent, ...trackData];
  const trackLength = fullTrackData.length;

  const track = [
    0x4D, 0x54, 0x72, 0x6B, // "MTrk"
    (trackLength >> 24) & 0xFF,
    (trackLength >> 16) & 0xFF,
    (trackLength >> 8) & 0xFF,
    trackLength & 0xFF,
    ...fullTrackData
  ];

  return new Uint8Array([...header, ...track]);
}

// Generate kick pattern
export function generateKickMIDI(style, bpm, bars, variation) {
  const ticksPerQuarterNote = 96;
  const ticksPer16th = ticksPerQuarterNote / 4;
  const steps = bars * 16;
  const events = [];

  const pattern = [];

  // Generate pattern based on style
  switch (style) {
    case 'classic':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        [0, 4, 8, 12].forEach(i => pattern.push(offset + i));
        if (variation === 'medium' || variation === 'complex') {
          [14, 15].forEach(i => pattern.push(offset + i));
        }
        if (variation === 'complex') {
          [6, 10].forEach(i => pattern.push(offset + i));
        }
      }
      break;

    case 'rolling':
      for (let i = 0; i < steps; i += 2) {
        pattern.push(i);
      }
      break;

    case 'psytrance':
      for (let i = 0; i < steps; i++) {
        pattern.push(i);
      }
      break;

    case 'progressive':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        [0, 4, 8, 12].forEach(i => pattern.push(offset + i));
        const fillDensity = bar / bars;
        if (fillDensity > 0.5) {
          [6, 10, 14, 15].forEach(i => pattern.push(offset + i));
        }
      }
      break;

    case 'offbeat':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        [2, 6, 10, 14].forEach(i => pattern.push(offset + i));
      }
      break;
  }

  // Convert pattern to MIDI events
  pattern.forEach(step => {
    const tick = step * ticksPer16th;
    const velocity = step % 4 === 0 ? 127 : 100;
    const duration = ticksPer16th;

    events.push({ tick, type: 'noteOn', note: KICK_NOTE, velocity });
    events.push({ tick: tick + duration, type: 'noteOff', note: KICK_NOTE, velocity: 0 });
  });

  events.push({ tick: steps * ticksPer16th, type: 'endOfTrack' });

  return generateMIDIFile(events, bpm);
}

// Generate hi-hat pattern
export function generateHatMIDI(style, bpm, bars) {
  const ticksPerQuarterNote = 96;
  const ticksPer16th = ticksPerQuarterNote / 4;
  const steps = bars * 16;
  const events = [];

  const closedPattern = [];
  const openPattern = [];

  switch (style) {
    case 'classic':
      for (let i = 0; i < steps; i++) {
        closedPattern.push(i);
      }
      for (let bar = 0; bar < bars; bar++) {
        [7, 15].forEach(i => openPattern.push(bar * 16 + i));
      }
      break;

    case 'offbeat':
      for (let i = 1; i < steps; i += 2) {
        closedPattern.push(i);
      }
      break;

    case 'rolling':
      for (let i = 0; i < steps; i++) {
        closedPattern.push(i);
      }
      break;

    case 'triplet':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        [0, 1, 3, 4, 6, 7, 9, 10, 12, 13, 15].forEach(i => closedPattern.push(offset + i));
      }
      break;

    case 'minimal':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        [2, 6, 10, 14].forEach(i => closedPattern.push(offset + i));
      }
      break;

    case 'psytrance':
      for (let i = 0; i < steps; i++) {
        closedPattern.push(i);
      }
      for (let bar = 0; bar < bars; bar++) {
        [3, 7, 11, 15].forEach(i => openPattern.push(bar * 16 + i));
      }
      break;
  }

  // Convert to MIDI events
  closedPattern.forEach(step => {
    const tick = step * ticksPer16th;
    const velocity = 100;
    const duration = Math.floor(ticksPer16th * 0.3);

    events.push({ tick, type: 'noteOn', note: HAT_CLOSED_NOTE, velocity });
    events.push({ tick: tick + duration, type: 'noteOff', note: HAT_CLOSED_NOTE, velocity: 0 });
  });

  openPattern.forEach(step => {
    const tick = step * ticksPer16th;
    const velocity = 90;
    const duration = Math.floor(ticksPer16th * 0.8);

    events.push({ tick, type: 'noteOn', note: HAT_OPEN_NOTE, velocity });
    events.push({ tick: tick + duration, type: 'noteOff', note: HAT_OPEN_NOTE, velocity: 0 });
  });

  events.push({ tick: steps * ticksPer16th, type: 'endOfTrack' });

  return generateMIDIFile(events, bpm);
}

// Generate snare pattern
export function generateSnareMIDI(style, bpm, bars) {
  const ticksPerQuarterNote = 96;
  const ticksPer16th = ticksPerQuarterNote / 4;
  const steps = bars * 16;
  const events = [];

  const snarePattern = [];
  const clapPattern = [];
  const ghostPattern = [];

  switch (style) {
    case 'backbeat':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        [4, 12].forEach(i => snarePattern.push(offset + i));
      }
      break;

    case 'tech':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        [4, 10, 12].forEach(i => snarePattern.push(offset + i));
        [2, 6, 14].forEach(i => ghostPattern.push(offset + i));
      }
      break;

    case 'buildup':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        if (bar < bars / 2) {
          [4, 12].forEach(i => snarePattern.push(offset + i));
        } else {
          for (let i = 0; i < 16; i += 2) {
            snarePattern.push(offset + i);
          }
        }
      }
      break;

    case 'minimal':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        clapPattern.push(offset + 4);
      }
      break;

    case 'ghost':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        [4, 12].forEach(i => snarePattern.push(offset + i));
        [1, 2, 6, 9, 10, 14].forEach(i => ghostPattern.push(offset + i));
      }
      break;

    case 'progressive':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        [4, 12].forEach(i => snarePattern.push(offset + i));
        if (bar >= bars / 2) {
          [6, 10, 14, 15].forEach(i => snarePattern.push(offset + i));
        }
      }
      break;
  }

  // Convert to MIDI events
  snarePattern.forEach(step => {
    const tick = step * ticksPer16th;
    const velocity = 110;
    const duration = Math.floor(ticksPer16th * 0.5);

    events.push({ tick, type: 'noteOn', note: SNARE_NOTE, velocity });
    events.push({ tick: tick + duration, type: 'noteOff', note: SNARE_NOTE, velocity: 0 });
  });

  clapPattern.forEach(step => {
    const tick = step * ticksPer16th;
    const velocity = 105;
    const duration = Math.floor(ticksPer16th * 0.4);

    events.push({ tick, type: 'noteOn', note: CLAP_NOTE, velocity });
    events.push({ tick: tick + duration, type: 'noteOff', note: CLAP_NOTE, velocity: 0 });
  });

  ghostPattern.forEach(step => {
    const tick = step * ticksPer16th;
    const velocity = 40;
    const duration = Math.floor(ticksPer16th * 0.3);

    events.push({ tick, type: 'noteOn', note: SNARE_NOTE, velocity });
    events.push({ tick: tick + duration, type: 'noteOff', note: SNARE_NOTE, velocity: 0 });
  });

  events.push({ tick: steps * ticksPer16th, type: 'endOfTrack' });

  return generateMIDIFile(events, bpm);
}

// Generate complete drum kit pattern
export function generateDrumKitMIDI(genre, bpm, bars) {
  const ticksPerQuarterNote = 96;
  const ticksPer16th = ticksPerQuarterNote / 4;
  const steps = bars * 16;
  const events = [];

  const kickPattern = [];
  const hatClosedPattern = [];
  const hatOpenPattern = [];
  const snarePattern = [];

  switch (genre) {
    case 'uplifting':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        [0, 4, 8, 12].forEach(i => kickPattern.push(offset + i));
        for (let i = 0; i < 16; i++) hatClosedPattern.push(offset + i);
        [7, 15].forEach(i => hatOpenPattern.push(offset + i));
        [4, 12].forEach(i => snarePattern.push(offset + i));
      }
      break;

    case 'tech':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        for (let i = 0; i < 16; i += 2) kickPattern.push(offset + i);
        [1, 3, 5, 7, 9, 11, 13, 15].forEach(i => hatClosedPattern.push(offset + i));
        [4, 10, 12].forEach(i => snarePattern.push(offset + i));
      }
      break;

    case 'psytrance':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        for (let i = 0; i < 16; i++) kickPattern.push(offset + i);
        for (let i = 0; i < 16; i++) hatClosedPattern.push(offset + i);
        [3, 7, 11, 15].forEach(i => hatOpenPattern.push(offset + i));
        [4].forEach(i => snarePattern.push(offset + i));
      }
      break;

    case 'progressive':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        [0, 4, 8, 12].forEach(i => kickPattern.push(offset + i));
        [0, 1, 3, 4, 6, 7, 9, 10, 12, 13, 15].forEach(i => hatClosedPattern.push(offset + i));
        [4, 12].forEach(i => snarePattern.push(offset + i));
        if (bar >= bars / 2) {
          [14, 15].forEach(i => snarePattern.push(offset + i));
        }
      }
      break;

    case 'minimal':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        [0, 4, 8, 12].forEach(i => kickPattern.push(offset + i));
        [2, 6, 10, 14].forEach(i => hatClosedPattern.push(offset + i));
        [4].forEach(i => snarePattern.push(offset + i));
      }
      break;
  }

  // Convert to MIDI events
  kickPattern.forEach(step => {
    const tick = step * ticksPer16th;
    events.push({ tick, type: 'noteOn', note: KICK_NOTE, velocity: 127 });
    events.push({ tick: tick + ticksPer16th, type: 'noteOff', note: KICK_NOTE, velocity: 0 });
  });

  hatClosedPattern.forEach(step => {
    const tick = step * ticksPer16th;
    const duration = Math.floor(ticksPer16th * 0.3);
    events.push({ tick, type: 'noteOn', note: HAT_CLOSED_NOTE, velocity: 100 });
    events.push({ tick: tick + duration, type: 'noteOff', note: HAT_CLOSED_NOTE, velocity: 0 });
  });

  hatOpenPattern.forEach(step => {
    const tick = step * ticksPer16th;
    const duration = Math.floor(ticksPer16th * 0.8);
    events.push({ tick, type: 'noteOn', note: HAT_OPEN_NOTE, velocity: 90 });
    events.push({ tick: tick + duration, type: 'noteOff', note: HAT_OPEN_NOTE, velocity: 0 });
  });

  snarePattern.forEach(step => {
    const tick = step * ticksPer16th;
    const duration = Math.floor(ticksPer16th * 0.5);
    events.push({ tick, type: 'noteOn', note: SNARE_NOTE, velocity: 110 });
    events.push({ tick: tick + duration, type: 'noteOff', note: SNARE_NOTE, velocity: 0 });
  });

  events.push({ tick: steps * ticksPer16th, type: 'endOfTrack' });

  return generateMIDIFile(events, bpm);
}

// Generate bassline pattern
export function generateBasslineMIDI(style, rootNote, scale, octave, bpm, bars) {
  const ticksPerQuarterNote = 96;
  const ticksPer16th = ticksPerQuarterNote / 4;
  const steps = bars * 16;
  const events = [];

  // Get scale notes
  const rootValue = NOTE_VALUES[rootNote];
  const scaleIntervals = SCALES[scale];
  const baseNote = 12 * octave + rootValue;

  const scaleNotes = [];
  for (let oct = 0; oct < 2; oct++) {
    for (let interval of scaleIntervals) {
      scaleNotes.push(baseNote + interval + (oct * 12));
    }
  }

  const pattern = [];

  switch (style) {
    case 'rolling':
      for (let i = 0; i < steps; i++) {
        const noteIndex = i % scaleNotes.length;
        pattern.push({ step: i, note: scaleNotes[noteIndex] });
      }
      break;

    case 'stabs':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        const root = scaleNotes[0];
        const fifth = scaleNotes[4 % scaleNotes.length];
        pattern.push({ step: offset, note: root });
        pattern.push({ step: offset + 4, note: fifth });
        pattern.push({ step: offset + 8, note: root });
        pattern.push({ step: offset + 12, note: fifth });
      }
      break;

    case 'psytrance':
      for (let i = 0; i < steps; i += 2) {
        const noteIndex = Math.floor(i / 4) % scaleNotes.length;
        pattern.push({ step: i, note: scaleNotes[noteIndex] });
      }
      break;

    case 'tech':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        const root = scaleNotes[0];
        pattern.push({ step: offset, note: root });
        pattern.push({ step: offset + 6, note: scaleNotes[2] });
        pattern.push({ step: offset + 10, note: scaleNotes[1] });
        pattern.push({ step: offset + 14, note: root });
      }
      break;

    case 'progressive':
      for (let i = 0; i < steps; i += 2) {
        const barProgress = (i % 32) / 32;
        let noteIndex;
        if (barProgress < 0.5) {
          noteIndex = Math.floor(barProgress * scaleNotes.length * 2);
        } else {
          noteIndex = scaleNotes.length - Math.floor((barProgress - 0.5) * scaleNotes.length * 2) - 1;
        }
        pattern.push({ step: i, note: scaleNotes[Math.max(0, Math.min(scaleNotes.length - 1, noteIndex))] });
      }
      break;

    case 'minimal':
      for (let bar = 0; bar < bars; bar++) {
        const offset = bar * 16;
        pattern.push({ step: offset, note: scaleNotes[0] });
        pattern.push({ step: offset + 7, note: scaleNotes[1] });
      }
      break;
  }

  // Convert to MIDI events
  pattern.forEach(p => {
    const tick = p.step * ticksPer16th;
    const velocity = p.step % 4 === 0 ? 110 : 90;
    const duration = ticksPer16th;

    events.push({ tick, type: 'noteOn', note: p.note, velocity });
    events.push({ tick: tick + duration, type: 'noteOff', note: p.note, velocity: 0 });
  });

  events.push({ tick: steps * ticksPer16th, type: 'endOfTrack' });

  return generateMIDIFile(events, bpm);
}
