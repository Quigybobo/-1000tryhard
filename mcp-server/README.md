# 🤖 Trance Machine MCP Server

**AI-assisted pattern generation for Claude and other MCP-compatible AI assistants**

This MCP (Model Context Protocol) server exposes the Trance Machine Toolkit's pattern generators as tools that AI assistants can use to create professional trance/techno MIDI patterns via natural language.

---

## 🚀 WHAT IS THIS?

This is an **MCP server** that allows AI assistants (like Claude) to generate MIDI patterns for you using natural language commands.

Instead of:
1. Opening a web tool
2. Selecting options manually
3. Clicking generate
4. Downloading MIDI file

You can just say:
**"Generate a psytrance drop at 142 BPM in E phrygian dominant"**

And the AI will:
1. Generate kick pattern (psytrance style, 142 BPM)
2. Generate hi-hat pattern (driving 16ths)
3. Generate snare pattern (minimal)
4. Generate bassline (E phrygian dominant, psytrance rolling)
5. Save all MIDI files to your project folder

---

## 📦 INSTALLATION

### Prerequisites
- Node.js 18+ installed
- MCP-compatible AI assistant (Claude Desktop, etc.)

### Install Dependencies

```bash
cd mcp-server
npm install
```

---

## 🔧 SETUP

### Option 1: Claude Desktop (Recommended)

Add to your Claude Desktop config file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "trance-machine": {
      "command": "node",
      "args": ["/path/to/mcp-server/index.js"]
    }
  }
}
```

Replace `/path/to/mcp-server/index.js` with the actual path to this server.

### Option 2: Other MCP Clients

Use the standard MCP stdio transport. The server runs on stdin/stdout.

```bash
node index.js
```

---

## 🎵 AVAILABLE TOOLS

The server exposes 6 tools:

### 1. `generate_kick_pattern`

Generate kick drum patterns.

**Parameters:**
- `style` (optional): classic, rolling, psytrance, progressive, offbeat
- `bpm` (optional): 120-150 (default: 138)
- `bars` (optional): 1, 2, 4, 8 (default: 4)
- `variation` (optional): simple, medium, complex (default: medium)
- `save_path` (optional): File path to save MIDI

**Example:**
```
"Generate a psytrance kick at 142 BPM, 8 bars"
→ style=psytrance, bpm=142, bars=8
```

---

### 2. `generate_hihat_pattern`

Generate hi-hat patterns with open/closed variations.

**Parameters:**
- `style` (optional): classic, offbeat, rolling, triplet, minimal, psytrance
- `bpm` (optional): 120-150 (default: 138)
- `bars` (optional): 1, 2, 4, 8 (default: 4)
- `save_path` (optional): File path to save MIDI

**Example:**
```
"Generate classic 16th hi-hats with open hat accents at 138 BPM"
→ style=classic, bpm=138
```

---

### 3. `generate_snare_pattern`

Generate snare/clap patterns with ghost notes.

**Parameters:**
- `style` (optional): backbeat, tech, buildup, minimal, ghost, progressive
- `bpm` (optional): 120-150 (default: 138)
- `bars` (optional): 1, 2, 4, 8 (default: 4)
- `save_path` (optional): File path to save MIDI

**Example:**
```
"Generate a tech groove snare pattern with ghost notes"
→ style=tech
```

---

### 4. `generate_drumkit_pattern`

Generate complete drum kit (kick + hat + snare) for a specific genre.

**Parameters:**
- `genre` (optional): uplifting, tech, psytrance, progressive, minimal
- `bpm` (optional): 120-150 (default: 138)
- `bars` (optional): 1, 2, 4 (default: 4)
- `save_path` (optional): File path to save MIDI

**Example:**
```
"Generate uplifting trance drums at 138 BPM"
→ genre=uplifting, bpm=138
```

---

### 5. `generate_bassline_pattern`

Generate melodic bassline with scale selection.

**Parameters:**
- `style` (optional): rolling, stabs, psytrance, tech, progressive, minimal
- `root_note` (optional): C, C#, D, D#, E, F, F#, G, G#, A, A#, B (default: A)
- `scale` (optional): minor, major, harmonic, phrygian, dorian, mixolydian (default: minor)
- `octave` (optional): 1, 2, 3 (default: 2)
- `bpm` (optional): 120-150 (default: 138)
- `bars` (optional): 1, 2, 4, 8 (default: 4)
- `save_path` (optional): File path to save MIDI

**Example:**
```
"Generate a psytrance bassline in E phrygian dominant at 142 BPM"
→ style=psytrance, root_note=E, scale=phrygian, bpm=142
```

---

### 6. `generate_full_track`

Generate complete track with drums and bassline.

**Parameters:**
- `genre` (optional): uplifting, tech, psytrance, progressive, minimal (default: uplifting)
- `bpm` (optional): 120-150 (default: 138)
- `bars` (optional): 4, 8 (default: 8)
- `key` (optional): C, C#, D, D#, E, F, F#, G, G#, A, A#, B (default: A)
- `output_dir` (REQUIRED): Directory to save MIDI files

**Example:**
```
"Generate a full psytrance track at 142 BPM in E minor, save to my Ableton project"
→ genre=psytrance, bpm=142, key=E, output_dir=/path/to/project
```

---

## 💬 EXAMPLE CONVERSATIONS

### Example 1: Quick Drop

**User:** "I need a trance drop at 138 BPM"

**Claude (using MCP):**
```
I'll generate a complete trance drop for you.

[Uses generate_drumkit_pattern with genre=uplifting, bpm=138]
[Uses generate_bassline_pattern with style=progressive, root_note=A, scale=minor, bpm=138]

Done! I've generated:
1. Uplifting trance drums (kick, hat, snare) at 138 BPM
2. Progressive bassline in A minor at 138 BPM

Import these MIDI files into Ableton Live!
```

---

### Example 2: Psytrance Track

**User:** "Create a full psytrance track at 142 BPM in E phrygian dominant, save to /Users/me/Music/Ableton/Project/MIDI"

**Claude (using MCP):**
```
[Uses generate_full_track with:
  genre=psytrance,
  bpm=142,
  key=E,
  output_dir=/Users/me/Music/Ableton/Project/MIDI
]

Full psytrance track generated!

Files created:
1. /Users/me/Music/Ableton/Project/MIDI/psytrance-drums-142bpm.mid
2. /Users/me/Music/Ableton/Project/MIDI/psytrance-bass-Eminor-142bpm.mid

Settings:
- Genre: psytrance
- BPM: 142
- Key: E phrygian dominant (auto-selected for psytrance)
- Length: 8 bars

Import these MIDI files into Ableton Live!
```

---

### Example 3: Custom Arrangement

**User:** "I need:
- Classic 4-on-floor kick
- 16th note hi-hats with open accents
- Backbeat snare
- Progressive bassline in A minor
All at 138 BPM, 8 bars"

**Claude (using MCP):**
```
I'll generate each element separately for your custom arrangement.

[Uses generate_kick_pattern with style=classic, bpm=138, bars=8]
[Uses generate_hihat_pattern with style=classic, bpm=138, bars=8]
[Uses generate_snare_pattern with style=backbeat, bpm=138, bars=8]
[Uses generate_bassline_pattern with style=progressive, root_note=A, scale=minor, bpm=138, bars=8]

Generated all 4 patterns:
1. Classic 4-on-floor kick (8 bars, 138 BPM)
2. Classic 16th hi-hats with open accents (8 bars, 138 BPM)
3. Backbeat snare (8 bars, 138 BPM)
4. Progressive bassline in A minor (8 bars, 138 BPM)

Import these MIDI files into separate tracks in Ableton Live!
```

---

## 🎯 USE CASES

### 1. Quick Inspiration
"Generate some uplifting trance drums at 138 BPM"

### 2. Specific Requests
"I need a tech trance groove with syncopated snares and rolling kicks at 132 BPM"

### 3. Full Arrangements
"Create a complete progressive trance track at 130 BPM in D minor with evolving patterns"

### 4. Genre Exploration
"Generate a minimal techno pattern at 125 BPM with sparse drums and deep bass"

### 5. Build Variations
"Generate 3 variations of a psytrance kick: simple, medium, and complex"

---

## 🔧 TECHNICAL DETAILS

### MIDI Output
- Format: MIDI Format 0 (single track)
- Resolution: 96 ticks per quarter note
- Encoding: Variable-length delta time
- Note mapping: GM drum standard (kick=C1/36, snare=D1/38, etc.)

### Pattern Generation
All patterns are generated algorithmically based on:
- Genre conventions (trance, techno, psytrance, etc.)
- Musical theory (scales, intervals, rhythm)
- Production techniques (ghost notes, fills, accents)

### File Output
- Option 1: Returns base64-encoded MIDI data (for AI to handle)
- Option 2: Saves directly to specified path (if `save_path` provided)

---

## 🚀 DEVELOPMENT

### Run in Development Mode
```bash
npm run dev
```

This uses Node's `--watch` flag to auto-restart on file changes.

### Test the Server
```bash
node index.js
```

Then send MCP messages via stdin (for testing with MCP Inspector).

---

## 📝 NOTES

- **Ableton Live Intro Compatible:** All generated MIDI files work with Ableton Live Intro (no Max for Live required)
- **Universal:** MIDI files work with any DAW (FL Studio, Logic, Cubase, etc.)
- **No Audio:** This generates MIDI data only (note timing, not sound). Assign samples in your DAW.

---

## 🤝 INTEGRATION WITH WEB TOOLS

The MCP server uses the **same pattern generation logic** as the web tools, so patterns will sound identical. You can:
- Use MCP for quick AI-assisted generation
- Use web tools for visual editing and preview
- Combine both workflows!

---

## 🎵 HAPPY PRODUCING!

Now you can generate professional trance/techno patterns just by talking to Claude!

**Example:**
"Hey Claude, I'm stuck on my track. Generate me a psytrance drop with all the elements at 142 BPM and save it to my project folder."

Done! 🚀
