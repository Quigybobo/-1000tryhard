#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { generateKickMIDI, generateHatMIDI, generateSnareMIDI, generateDrumKitMIDI, generateBasslineMIDI } from './pattern-generator.js';
import fs from 'fs/promises';
import path from 'path';

const server = new Server(
  {
    name: 'trance-machine',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool definitions
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'generate_kick_pattern',
        description: 'Generate a kick drum pattern for trance/techno music. Returns MIDI file data.',
        inputSchema: {
          type: 'object',
          properties: {
            style: {
              type: 'string',
              enum: ['classic', 'rolling', 'psytrance', 'progressive', 'offbeat'],
              description: 'Pattern style: classic (4-on-floor), rolling (8th notes), psytrance (constant 16ths), progressive (building fills), offbeat (syncopated)',
              default: 'classic'
            },
            bpm: {
              type: 'number',
              description: 'Beats per minute (120-150)',
              minimum: 120,
              maximum: 150,
              default: 138
            },
            bars: {
              type: 'number',
              enum: [1, 2, 4, 8],
              description: 'Number of bars (1, 2, 4, or 8)',
              default: 4
            },
            variation: {
              type: 'string',
              enum: ['simple', 'medium', 'complex'],
              description: 'Pattern complexity: simple (basic), medium (some fills), complex (many fills)',
              default: 'medium'
            },
            save_path: {
              type: 'string',
              description: 'Optional: Path to save MIDI file. If not provided, returns base64 data.'
            }
          },
          required: []
        }
      },
      {
        name: 'generate_hihat_pattern',
        description: 'Generate a hi-hat pattern with open/closed variations for trance/techno music. Returns MIDI file data.',
        inputSchema: {
          type: 'object',
          properties: {
            style: {
              type: 'string',
              enum: ['classic', 'offbeat', 'rolling', 'triplet', 'minimal', 'psytrance'],
              description: 'Pattern style: classic (16ths with opens), offbeat (8ths offbeat), rolling (constant 16ths), triplet (triplet feel), minimal (sparse), psytrance (driving)',
              default: 'classic'
            },
            bpm: {
              type: 'number',
              description: 'Beats per minute (120-150)',
              minimum: 120,
              maximum: 150,
              default: 138
            },
            bars: {
              type: 'number',
              enum: [1, 2, 4, 8],
              description: 'Number of bars (1, 2, 4, or 8)',
              default: 4
            },
            save_path: {
              type: 'string',
              description: 'Optional: Path to save MIDI file. If not provided, returns base64 data.'
            }
          },
          required: []
        }
      },
      {
        name: 'generate_snare_pattern',
        description: 'Generate a snare/clap pattern with ghost notes for trance/techno music. Returns MIDI file data.',
        inputSchema: {
          type: 'object',
          properties: {
            style: {
              type: 'string',
              enum: ['backbeat', 'tech', 'buildup', 'minimal', 'ghost', 'progressive'],
              description: 'Pattern style: backbeat (2 and 4), tech (syncopated), buildup (rolls), minimal (sparse), ghost (heavy ghost notes), progressive (evolving)',
              default: 'backbeat'
            },
            bpm: {
              type: 'number',
              description: 'Beats per minute (120-150)',
              minimum: 120,
              maximum: 150,
              default: 138
            },
            bars: {
              type: 'number',
              enum: [1, 2, 4, 8],
              description: 'Number of bars (1, 2, 4, or 8)',
              default: 4
            },
            save_path: {
              type: 'string',
              description: 'Optional: Path to save MIDI file. If not provided, returns base64 data.'
            }
          },
          required: []
        }
      },
      {
        name: 'generate_drumkit_pattern',
        description: 'Generate a complete drum kit pattern (kick + hihat + snare) for a specific genre. Returns MIDI file data.',
        inputSchema: {
          type: 'object',
          properties: {
            genre: {
              type: 'string',
              enum: ['uplifting', 'tech', 'psytrance', 'progressive', 'minimal'],
              description: 'Genre preset: uplifting (uplifting trance), tech (tech trance), psytrance, progressive, minimal (minimal techno)',
              default: 'uplifting'
            },
            bpm: {
              type: 'number',
              description: 'Beats per minute (120-150)',
              minimum: 120,
              maximum: 150,
              default: 138
            },
            bars: {
              type: 'number',
              enum: [1, 2, 4],
              description: 'Number of bars (1, 2, or 4)',
              default: 4
            },
            save_path: {
              type: 'string',
              description: 'Optional: Path to save MIDI file. If not provided, returns base64 data.'
            }
          },
          required: []
        }
      },
      {
        name: 'generate_bassline_pattern',
        description: 'Generate a melodic bassline pattern with scale selection for trance/techno music. Returns MIDI file data.',
        inputSchema: {
          type: 'object',
          properties: {
            style: {
              type: 'string',
              enum: ['rolling', 'stabs', 'psytrance', 'tech', 'progressive', 'minimal'],
              description: 'Pattern style: rolling (constant 16th notes), stabs (trance chords), psytrance (hypnotic), tech (syncopated), progressive (melodic), minimal (sparse)',
              default: 'rolling'
            },
            root_note: {
              type: 'string',
              enum: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
              description: 'Root note of the scale',
              default: 'A'
            },
            scale: {
              type: 'string',
              enum: ['minor', 'major', 'harmonic', 'phrygian', 'dorian', 'mixolydian'],
              description: 'Scale type: minor (natural minor), major, harmonic (harmonic minor), phrygian (phrygian dominant), dorian, mixolydian',
              default: 'minor'
            },
            octave: {
              type: 'number',
              enum: [1, 2, 3],
              description: 'Octave (1=low, 2=mid, 3=high)',
              default: 2
            },
            bpm: {
              type: 'number',
              description: 'Beats per minute (120-150)',
              minimum: 120,
              maximum: 150,
              default: 138
            },
            bars: {
              type: 'number',
              enum: [1, 2, 4, 8],
              description: 'Number of bars (1, 2, 4, or 8)',
              default: 4
            },
            save_path: {
              type: 'string',
              description: 'Optional: Path to save MIDI file. If not provided, returns base64 data.'
            }
          },
          required: []
        }
      },
      {
        name: 'generate_full_track',
        description: 'Generate a complete trance/techno track with drums and bassline. Creates multiple MIDI files.',
        inputSchema: {
          type: 'object',
          properties: {
            genre: {
              type: 'string',
              enum: ['uplifting', 'tech', 'psytrance', 'progressive', 'minimal'],
              description: 'Genre: uplifting (uplifting trance), tech (tech trance), psytrance, progressive, minimal (minimal techno)',
              default: 'uplifting'
            },
            bpm: {
              type: 'number',
              description: 'Beats per minute (120-150)',
              minimum: 120,
              maximum: 150,
              default: 138
            },
            bars: {
              type: 'number',
              enum: [4, 8],
              description: 'Number of bars (4 or 8)',
              default: 8
            },
            key: {
              type: 'string',
              enum: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
              description: 'Musical key (root note)',
              default: 'A'
            },
            output_dir: {
              type: 'string',
              description: 'Directory to save MIDI files. Required for full track generation.',
              required: true
            }
          },
          required: ['output_dir']
        }
      }
    ],
  };
});

// Tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'generate_kick_pattern': {
        const midiData = generateKickMIDI(
          args.style || 'classic',
          args.bpm || 138,
          args.bars || 4,
          args.variation || 'medium'
        );

        if (args.save_path) {
          await fs.writeFile(args.save_path, Buffer.from(midiData));
          return {
            content: [{
              type: 'text',
              text: `Kick pattern saved to: ${args.save_path}\nStyle: ${args.style}, BPM: ${args.bpm}, Bars: ${args.bars}, Variation: ${args.variation}`
            }]
          };
        }

        return {
          content: [{
            type: 'text',
            text: `Kick pattern generated!\nStyle: ${args.style || 'classic'}, BPM: ${args.bpm || 138}, Bars: ${args.bars || 4}\nMIDI data: ${midiData.length} bytes\nBase64: ${Buffer.from(midiData).toString('base64')}`
          }]
        };
      }

      case 'generate_hihat_pattern': {
        const midiData = generateHatMIDI(
          args.style || 'classic',
          args.bpm || 138,
          args.bars || 4
        );

        if (args.save_path) {
          await fs.writeFile(args.save_path, Buffer.from(midiData));
          return {
            content: [{
              type: 'text',
              text: `Hi-hat pattern saved to: ${args.save_path}\nStyle: ${args.style}, BPM: ${args.bpm}, Bars: ${args.bars}`
            }]
          };
        }

        return {
          content: [{
            type: 'text',
            text: `Hi-hat pattern generated!\nStyle: ${args.style || 'classic'}, BPM: ${args.bpm || 138}, Bars: ${args.bars || 4}\nMIDI data: ${midiData.length} bytes\nBase64: ${Buffer.from(midiData).toString('base64')}`
          }]
        };
      }

      case 'generate_snare_pattern': {
        const midiData = generateSnareMIDI(
          args.style || 'backbeat',
          args.bpm || 138,
          args.bars || 4
        );

        if (args.save_path) {
          await fs.writeFile(args.save_path, Buffer.from(midiData));
          return {
            content: [{
              type: 'text',
              text: `Snare pattern saved to: ${args.save_path}\nStyle: ${args.style}, BPM: ${args.bpm}, Bars: ${args.bars}`
            }]
          };
        }

        return {
          content: [{
            type: 'text',
            text: `Snare pattern generated!\nStyle: ${args.style || 'backbeat'}, BPM: ${args.bpm || 138}, Bars: ${args.bars || 4}\nMIDI data: ${midiData.length} bytes\nBase64: ${Buffer.from(midiData).toString('base64')}`
          }]
        };
      }

      case 'generate_drumkit_pattern': {
        const midiData = generateDrumKitMIDI(
          args.genre || 'uplifting',
          args.bpm || 138,
          args.bars || 4
        );

        if (args.save_path) {
          await fs.writeFile(args.save_path, Buffer.from(midiData));
          return {
            content: [{
              type: 'text',
              text: `Drum kit pattern saved to: ${args.save_path}\nGenre: ${args.genre}, BPM: ${args.bpm}, Bars: ${args.bars}`
            }]
          };
        }

        return {
          content: [{
            type: 'text',
            text: `Drum kit pattern generated!\nGenre: ${args.genre || 'uplifting'}, BPM: ${args.bpm || 138}, Bars: ${args.bars || 4}\nMIDI data: ${midiData.length} bytes\nBase64: ${Buffer.from(midiData).toString('base64')}`
          }]
        };
      }

      case 'generate_bassline_pattern': {
        const midiData = generateBasslineMIDI(
          args.style || 'rolling',
          args.root_note || 'A',
          args.scale || 'minor',
          args.octave || 2,
          args.bpm || 138,
          args.bars || 4
        );

        if (args.save_path) {
          await fs.writeFile(args.save_path, Buffer.from(midiData));
          return {
            content: [{
              type: 'text',
              text: `Bassline pattern saved to: ${args.save_path}\nStyle: ${args.style}, Key: ${args.root_note} ${args.scale}, Octave: ${args.octave}, BPM: ${args.bpm}, Bars: ${args.bars}`
            }]
          };
        }

        return {
          content: [{
            type: 'text',
            text: `Bassline pattern generated!\nStyle: ${args.style || 'rolling'}, Key: ${args.root_note || 'A'} ${args.scale || 'minor'}, Octave: ${args.octave || 2}, BPM: ${args.bpm || 138}, Bars: ${args.bars || 4}\nMIDI data: ${midiData.length} bytes\nBase64: ${Buffer.from(midiData).toString('base64')}`
          }]
        };
      }

      case 'generate_full_track': {
        const outputDir = args.output_dir;
        await fs.mkdir(outputDir, { recursive: true });

        const genre = args.genre || 'uplifting';
        const bpm = args.bpm || 138;
        const bars = args.bars || 8;
        const key = args.key || 'A';

        // Generate patterns based on genre
        const drumData = generateDrumKitMIDI(genre, bpm, Math.min(bars, 4));
        const bassData = generateBasslineMIDI(
          genre === 'psytrance' ? 'psytrance' : genre === 'tech' ? 'tech' : 'progressive',
          key,
          genre === 'psytrance' ? 'phrygian' : 'minor',
          2,
          bpm,
          bars
        );

        const drumPath = path.join(outputDir, `${genre}-drums-${bpm}bpm.mid`);
        const bassPath = path.join(outputDir, `${genre}-bass-${key}minor-${bpm}bpm.mid`);

        await fs.writeFile(drumPath, Buffer.from(drumData));
        await fs.writeFile(bassPath, Buffer.from(bassData));

        return {
          content: [{
            type: 'text',
            text: `Full ${genre} track generated!\n\nFiles created:\n1. ${drumPath}\n2. ${bassPath}\n\nSettings:\n- Genre: ${genre}\n- BPM: ${bpm}\n- Key: ${key} minor\n- Length: ${bars} bars\n\nImport these MIDI files into Ableton Live!`
          }]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error: ${error.message}`
      }],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Trance Machine MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
