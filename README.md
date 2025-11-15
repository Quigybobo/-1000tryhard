# 🎵 Trance Machine Toolkit

**Professional beat generators for Ableton Live • Audio preview in browser • MIDI export**

A complete suite of web-based MIDI pattern generators for trance, techno, and electronic music production. No installation required - just open in your browser and start creating!

---

## 🚀 WHAT YOU'VE GOT

A **fully functional** collection of 7 professional music production tools:

### Pattern Generators
1. **Kick Generator** - Powerful kick drum patterns
2. **Hi-Hat Generator** - Open/closed hi-hat grooves
3. **Snare Generator** - Snare, clap, and ghost note patterns
4. **Full Drum Kit** - Complete drum patterns (all instruments combined)
5. **Bassline Generator** - Scale-based melodic basslines

### Advanced Integrations
6. **Live MIDI Controller** - Real-time MIDI to Ableton Live (Web MIDI API)
7. **MCP Server** - AI-assisted pattern generation with Claude Desktop

Each tool features:
- ✅ **Audio Preview** - Hear patterns in your browser before exporting
- ✅ **Multi-Bar Support** - Up to 8 bars (128 steps)
- ✅ **Visual Editor** - Click to edit patterns manually
- ✅ **MIDI Export** - Real .mid files for any DAW
- ✅ **No Installation** - Pure HTML, works offline
- ✅ **100% Free** - No subscriptions, no limits

### NEW: Advanced Features
- ✅ **Web MIDI API** - Send MIDI directly to Ableton Live (no file export!)
- ✅ **MCP Integration** - Talk to Claude to generate patterns via natural language
- ✅ **Real-time Control** - Play patterns live into your DAW
- ✅ **AI-Assisted** - "Generate a psytrance drop at 142 BPM" → Done!

---

## 📂 FILES

### Main Files
- **`index.html`** - Landing page launcher (start here!)
- **`README.md`** - This file (comprehensive guide)

### Generators
- **`trance-kick-generator.html`** - Kick drum pattern generator
- **`trance-hihat-generator.html`** - Hi-hat pattern generator
- **`trance-snare-generator.html`** - Snare pattern generator
- **`trance-drumkit-generator.html`** - Full drum kit generator
- **`trance-bassline-generator.html`** - Bassline generator with scales

### Advanced Tools
- **`trance-live-controller.html`** - Real-time Web MIDI controller
- **`mcp-integration.html`** - MCP/AI integration info page
- **`mcp-server/`** - MCP server for Claude Desktop integration

### Documentation
- **`README.md`** - This file (main documentation)
- **`INTEGRATION-GUIDE.md`** - Integration options and setup
- **`mcp-server/README.md`** - MCP server documentation
- **`README-TRANCE-GENERATOR.md`** - Original kick generator docs (legacy)

---

## 🎯 QUICK START

### Step 1: Launch
1. Open **`index.html`** in your web browser (double-click it!)
2. Choose any tool card to open that generator
3. That's it - no installation needed!

### Step 2: Create
1. Set your **BPM** (120-150 for electronic music)
2. Choose a **pattern style** from the dropdown
3. Click **"Generate Pattern"** to create a pattern
4. Click **"Preview Sound"** to hear it in your browser

### Step 3: Customize (Optional)
- Click squares/notes in the grid to toggle them on/off
- Adjust settings (bars, variation, scale, etc.)
- Regenerate or tweak manually

### Step 4: Export to Ableton
1. Click **"Download MIDI"**
2. Open **Ableton Live**
3. **Drag the .mid file** into a MIDI track
4. Add **Impulse** or **Simpler** with your samples
5. **Start making music!**

---

## 🎛️ TOOL BREAKDOWN

### 1. Kick Generator 🥁

Create powerful kick drum patterns for trance/techno tracks.

**Features:**
- 5 pattern styles (Classic 4-on-Floor, Rolling Bass, Psytrance Power, Progressive Build, Offbeat Groove)
- BPM control (120-145)
- 3 variation levels (Simple, Medium, Complex)
- Multi-bar support (1-8 bars, up to 128 steps)
- Audio preview with synthesized kick
- Visual grid with accent highlighting

**Best For:**
- Classic trance 4-on-floor kicks
- Psytrance constant 16th notes
- Tech trance grooves
- Build-up fills

**MIDI Mapping:**
- Note: C1 (MIDI 36)
- Velocity: 127 (accents), 100 (fills)

---

### 2. Hi-Hat Generator 🎩

Perfect hi-hat grooves with open/closed variations.

**Features:**
- 6 pattern styles (Classic 16ths, Offbeat, Rolling, Triplet Feel, Minimal, Psytrance)
- Open/closed hi-hat support (3-state toggle: off/closed/open)
- Multi-bar support (1-8 bars)
- Audio preview with filtered noise synthesis
- Click any step to cycle: Off → Closed → Open → Off

**Best For:**
- Classic 16th note grooves
- Trance open hat accents
- Minimal techno patterns
- Psytrance driving hats

**MIDI Mapping:**
- Closed Hat: C#1 (MIDI 42)
- Open Hat: A#1 (MIDI 46)

---

### 3. Snare Generator 🥁

Snare patterns with ghost notes and dynamic fills.

**Features:**
- 6 pattern styles (Classic Backbeat, Tech Groove, Build-up Rolls, Minimal Claps, Ghost Heavy, Progressive)
- 4-state toggle: Off → Snare → Clap → Ghost Note → Off
- Velocity-sensitive (ghost notes = lower velocity)
- Build-up rolls for transitions
- Audio preview with noise + tone synthesis

**Best For:**
- Classic backbeat (2 and 4)
- Ghost note grooves
- Build-up rolls
- Minimal clap patterns

**MIDI Mapping:**
- Snare: D1 (MIDI 38)
- Clap: D#1 (MIDI 39)
- Ghost: D1 (velocity 40)

---

### 4. Full Drum Kit Generator 🎹

Complete drum patterns combining kick, hi-hat, and snare.

**Features:**
- 5 genre presets (Uplifting Trance, Tech Trance, Psytrance, Progressive, Minimal Techno)
- Three separate grids (kick, hi-hat, snare)
- Unified audio preview of all instruments
- Single MIDI file export with all instruments
- Pattern length support (1-4 bars)

**Best For:**
- Quick complete drum patterns
- Genre-specific grooves
- Full arrangement ideas
- Live performance patterns

**Genre Presets:**
- **Uplifting Trance** (138 BPM) - 4-on-floor kick, 16th hats with opens, backbeat snare
- **Tech Trance** (132 BPM) - Rolling kicks, syncopated hats, ghost note snares
- **Psytrance** (142 BPM) - Constant kicks, driving hats, minimal snares
- **Progressive** (128 BPM) - Evolving kicks, triplet hats, melodic fills
- **Minimal Techno** (125 BPM) - Sparse kicks, offbeat hats, clap accents

---

### 5. Bassline Generator 🎹

Scale-based melodic basslines for trance and techno.

**Features:**
- **Piano roll interface** - Visual note editing
- **6 scale types** - Minor, Major, Harmonic Minor, Phrygian Dominant, Dorian, Mixolydian
- **Root note selection** - All 12 chromatic notes
- **6 pattern styles** - Rolling, Stabs, Psytrance, Tech, Progressive, Minimal
- **Octave selection** - C1 (low), C2 (mid), C3 (high)
- **Multi-bar support** - Up to 8 bars (128 steps)
- **Audio preview** - Synth bass with sawtooth + lowpass filter
- **Scale display** - See current scale notes

**Best For:**
- Trance melodic basslines
- Psytrance rolling bass
- Tech groove basslines
- Progressive melodic phrases

**Pattern Styles:**
- **Rolling Bassline** - Constant 16th notes moving through scale
- **Trance Stabs** - Classic trance chords and sustained notes
- **Psytrance Rolling** - Fast, repetitive, hypnotic patterns
- **Tech Groove** - Minimal, syncopated grooves
- **Progressive Melodic** - Evolving melodic phrases
- **Minimal Techno** - Sparse, deep bass patterns

**Scale Examples:**
- **A Minor** (Trance classic) - A B C D E F G A
- **E Phrygian Dominant** (Psytrance) - E F G# A B C D E
- **C Major** (Uplifting) - C D E F G A B C

---

## 💡 PRO TIPS

### For Trance Production

**Uplifting Trance (138 BPM)**
1. Kick: Classic 4-on-Floor
2. Hi-Hats: Classic 16ths with open hat accents
3. Snare: Classic Backbeat
4. Bassline: Progressive Melodic in A Minor

**Tech Trance (130-135 BPM)**
1. Kick: Rolling Bass pattern
2. Hi-Hats: Offbeat or Rolling
3. Snare: Tech Groove with ghost notes
4. Bassline: Tech Groove in E Minor

**Psytrance (140-145 BPM)**
1. Kick: Psytrance Power (constant 16ths)
2. Hi-Hats: Psytrance (driving 16ths)
3. Snare: Minimal (let the kick dominate)
4. Bassline: Psytrance Rolling in E Phrygian Dominant

**Progressive Trance (128-132 BPM)**
1. Kick: Progressive Build
2. Hi-Hats: Triplet Feel
3. Snare: Progressive with fills
4. Bassline: Progressive Melodic with evolving patterns

### Workflow Tips

**Starting a Track:**
1. Use **Drum Kit Generator** for quick complete pattern
2. Export to Ableton and assign samples
3. Build variations using individual generators
4. Layer multiple kick patterns for thickness

**Building Arrangements:**
1. Generate **8-bar patterns** for full phrases
2. Create **variations** (Simple for intro, Complex for drops)
3. Use **Build-up Rolls** (snare) for transitions
4. Generate **multiple basslines** for verse/chorus/drop

**Maximizing Ableton Live Intro (16 tracks):**
1. Use **single MIDI track** with Impulse for drums
2. Assign all drum samples in one Impulse rack
3. Use **one track per MIDI file** (kick, hat, snare, bass)
4. Save tracks for effects/synths/vocals

**Layering Techniques:**
1. Export **2-3 kick variations**, layer with different samples
2. Combine **Simple + Complex** patterns for evolving grooves
3. Use **different octaves** for basslines (sub + mid layers)
4. Pan hats slightly for width

### Audio Preview Notes

**Important:**
- The in-browser preview uses **simple synthesis** for reference only
- Your exported MIDI will sound **much better** with real samples in Ableton
- Think of preview as a **"timing guide"** not final sound quality
- The synthesis mimics the character (kick=low thump, hat=crispy noise, etc.)

---

## 🛠️ TECHNICAL DETAILS

### MIDI File Format
- **Format:** MIDI Format 0 (single track)
- **Resolution:** 96 ticks per quarter note
- **Note Duration:** 1/16th note (24 ticks)
- **Encoding:** Variable-length delta time (supports up to 128 steps)

### Audio Synthesis (Web Audio API)

**Kick:**
- Sine wave oscillator (150 Hz → 40 Hz sweep)
- Exponential pitch decay (0.5s)
- Gain envelope for punch

**Hi-Hat:**
- White noise buffer with bandpass/highpass filter
- Closed: 7000 Hz highpass, 0.05s decay
- Open: 8000 Hz bandpass, 0.3s decay

**Snare:**
- Noise component (highpass 1000 Hz)
- Tone component (triangle wave 180 Hz → 100 Hz)
- Combined envelope for snap

**Bass:**
- Sawtooth oscillator
- Lowpass filter (800 Hz, Q=5)
- Quick attack (0.01s), medium decay (0.25s)

### Timing
- **Scheduler:** 25ms lookahead for precise timing
- **Visual Feedback:** requestAnimationFrame for smooth grid updates
- **BPM Range:** 120-150 (trance/techno sweet spot)

### Browser Compatibility
- ✅ Chrome/Edge (best performance)
- ✅ Firefox (fully supported)
- ✅ Safari (fully supported)
- ✅ Works offline (no internet required after loading)

---

## 🔥 ADVANCED TECHNIQUES

### Creating Full Tracks

**Method 1: Export Separate Parts**
1. Generate kick pattern (8 bars)
2. Generate hi-hat pattern (8 bars)
3. Generate snare pattern (8 bars)
4. Generate bassline (8 bars)
5. Import all to Ableton, assign samples, arrange

**Method 2: Use Drum Kit Generator**
1. Generate complete drum pattern with genre preset
2. Export single MIDI file
3. Import to Ableton Impulse
4. Add bassline from Bassline Generator
5. Refine and add effects

### Variation Building

**Intro (bars 1-8):**
- Kick: Simple variation
- Hats: Minimal or Classic 16ths
- Snare: Off or minimal claps
- Bass: Off or simple root notes

**Verse (bars 9-16):**
- Kick: Classic 4-on-floor
- Hats: Classic 16ths
- Snare: Classic Backbeat
- Bass: Rolling or Stabs

**Build-up (bars 17-24):**
- Kick: Progressive Build (increasing fills)
- Hats: Increase to Psytrance
- Snare: Build-up Rolls
- Bass: Ascending Progressive pattern

**Drop (bars 25-32):**
- Kick: Complex variation (full energy)
- Hats: Psytrance or Rolling (full intensity)
- Snare: Ghost Heavy
- Bass: Psytrance Rolling or full melodic

### Layering for Thickness

**Kick Layering:**
1. Generate "Simple" kick pattern
2. Generate "Complex" kick pattern
3. Assign different kick samples:
   - Track 1: Deep sub kick (simple pattern)
   - Track 2: Mid punch kick (complex pattern)
4. Mix to taste

**Bassline Layering:**
1. Generate bassline in C1 (sub bass)
2. Generate same pattern in C2 (mid bass)
3. Assign different synth patches:
   - Track 1: Pure sine sub
   - Track 2: Sawtooth with filter
4. Blend for massive bass

---

## 🎓 USAGE SCENARIOS

### Scenario 1: "I need a quick beat for my track"
**Solution:** Use **Drum Kit Generator**
1. Open `trance-drumkit-generator.html`
2. Select genre preset closest to your style
3. Set BPM to match your track
4. Click Generate → Preview → Download
5. Drag into Ableton, assign samples, done!

**Time:** 2 minutes

---

### Scenario 2: "I want custom drum patterns"
**Solution:** Use **individual generators**
1. Open `trance-kick-generator.html`, create kick (4-8 bars)
2. Open `trance-hihat-generator.html`, create hats (4-8 bars)
3. Open `trance-snare-generator.html`, create snare (4-8 bars)
4. Download all three MIDI files
5. Import to Ableton on separate tracks or one Impulse
6. Customize samples and mix

**Time:** 5-10 minutes

---

### Scenario 3: "I need a bassline for my drop"
**Solution:** Use **Bassline Generator**
1. Open `trance-bassline-generator.html`
2. Set root note to match your track key (e.g., A)
3. Choose scale (Natural Minor for dark, Major for uplifting)
4. Select style (Psytrance Rolling for high energy, Progressive for melodic)
5. Set octave (C1 for sub bass, C2 for mid bass)
6. Generate pattern (4-8 bars)
7. Preview → Download → Import to Ableton
8. Assign bass synth (Operator, Serum, Massive, etc.)

**Time:** 3-5 minutes

---

### Scenario 4: "I want to build a full 32-bar arrangement"
**Solution:** Combine all tools
1. Plan your arrangement structure (intro/verse/build/drop)
2. Generate drum patterns for each section using Drum Kit Generator:
   - Intro: Uplifting Trance, 1 bar, simple
   - Verse: Progressive, 2 bars, medium
   - Build: Tech Trance, 2 bars, complex
   - Drop: Psytrance, 4 bars, complex
3. Generate basslines for verse/drop using Bassline Generator
4. Import all MIDI to Ableton
5. Arrange on timeline (copy/paste sections)
6. Assign samples and effects
7. Mix and master

**Time:** 20-30 minutes

---

## 📖 TROUBLESHOOTING

### "The download button is disabled"
**Solution:** Click "Generate Pattern" first! The button enables after generation.

---

### "I can't hear the preview"
**Causes:**
1. Volume is muted (check computer volume!)
2. Browser blocked audio (some browsers require user interaction first)
3. Audio context not initialized (click Preview again)

**Solution:**
- Check volume levels
- Click Preview button (might need two clicks on first use)
- Try a different browser (Chrome recommended)

---

### "The preview sounds weird/bad"
**This is normal!** The in-browser preview uses simple synthesis for **timing reference only**. Your exported MIDI will sound professional when you assign real samples in Ableton.

The preview is meant to show you **when notes play**, not **how they'll sound** in your final track.

---

### "The MIDI file doesn't import to Ableton"
**Solution:**
1. Make sure you're dragging to a **MIDI track** (not audio track)
2. Check the file ends in `.mid`
3. Try dragging directly from downloads folder
4. If still failing, try a different browser

---

### "I don't hear any sound in Ableton"
**Solution:** MIDI files are just **note data** - you need a **sound source**:
1. Add **Impulse** to the MIDI track
2. Assign drum samples to the pads (C1, C#1, D1, etc.)
3. Or add **Simpler/Sampler** with your samples
4. Match MIDI note numbers to your instrument

---

### "The pattern seems off/wrong tempo"
**Check:**
1. Your Ableton project BPM matches the generator BPM
2. MIDI should auto-sync, but double-check tempo
3. Make sure you didn't accidentally warp the MIDI clip

---

### "I want longer patterns than 8 bars"
**Solution:**
1. Export multiple 8-bar patterns
2. Arrange them in sequence in Ableton
3. Copy/paste MIDI clips to extend length
4. Or let me know if you need 16-bar support - I can add it!

---

### "My Ableton Live Intro only has 16 tracks!"
**Solutions for 16-track limit:**
1. **Use Impulse**: Put all drums (kick/hat/snare) in ONE Impulse rack = 1 track
2. **Use Drum Rack**: Combine all drums in one Drum Rack = 1 track
3. **Freeze tracks**: Freeze finished parts to free up CPU
4. **Consolidate**: Export multiple MIDI files to one track if possible
5. **Prioritize**: Drums (1 track) + Bass (1 track) = only 2 tracks used!

---

## 🎉 YOU'RE READY TO CREATE!

You now have a complete toolkit for creating professional trance/techno/electronic patterns:

✅ **5 Generators** - Kick, Hi-hat, Snare, Full Drum Kit, Bassline
✅ **Audio Preview** - Hear before you export
✅ **MIDI Export** - Compatible with all DAWs
✅ **Multi-Bar Support** - Up to 8 bars (128 steps)
✅ **Scale-Based Basslines** - Musical and in-key
✅ **Genre Presets** - Quick professional patterns
✅ **100% Free & Offline** - No installation, no subscription

---

## 🆕 VERSION HISTORY

### Version 3.0 - Complete Toolkit (Current)
- ✨ **Bassline Generator** with piano roll and scale selection
- ✨ **Full Drum Kit Generator** with genre presets
- ✨ **Index/launcher page** for easy access
- ✨ All tools now complete and functional

### Version 2.0 - Audio Preview & Multi-Bar
- ✨ Audio preview for all drum generators
- ✨ Multi-bar support (1-8 bars, up to 128 steps)
- ✨ Visual playback feedback
- ✨ Hi-Hat and Snare generators added

### Version 1.0 - Initial Release
- 🎉 Kick Generator with MIDI export
- 🎉 5 pattern styles
- 🎉 BPM control

---

## 🤝 CONTRIBUTING & FEEDBACK

Found a bug? Have a feature request? Want to add your own generator?

**Contact:** Reach out through your preferred method!

**Feature Requests:**
- More pattern styles?
- Different genres (house, dubstep, etc.)?
- Chord progression generator?
- Arpeggiator tool?
- Pattern randomizer?
- Export to other formats (Ableton Live Set, FL Studio, etc.)?

Let me know what you'd like to see!

---

## 📜 LICENSE

**100% Free** - Use for personal or commercial music production!

No attribution required (but appreciated!)

Built with ❤️ for trance, techno, and electronic music producers everywhere.

---

## 🎵 HAPPY PRODUCING!

Open `index.html` and start creating professional patterns in seconds!

**Remember:** These are tools to inspire and speed up your workflow - use them as starting points, customize them, make them your own, and create amazing music! 🎶

---

**Built with:**
- Pure HTML/CSS/JavaScript
- Web Audio API for synthesis
- No dependencies, no frameworks
- Works 100% offline

**Perfect for:**
- Trance producers
- Techno artists
- Psytrance creators
- Ableton Live Intro users (maximize that 16-track limit!)
- Anyone who wants professional MIDI patterns fast

🚀 **Let's make some trance!**
