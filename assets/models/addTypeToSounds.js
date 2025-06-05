const fs = require("fs");

const inputFile = "sounds.json"; // Your input file
const outputFile = "sounds_with_type.json"; // Output file

// Keywords for different "type" detection
const voiceKeywords = [
  "speech",
  "talking",
  "narration",
  "monologue",
  "babbling",
  "whisper",
  "shout",
  "yell",
  "scream",
  "laughter",
  "giggle",
  "chuckle",
  "cry",
  "sob",
  "moan",
  "wail",
  "sigh",
  "sing",
  "choir",
  "chant",
  "mantra",
  "hum",
  "bellow",
  "whoop",
  "whimper",
  "groan",
  "grunt",
  "whistle",
  "sneeze",
  "snore",
  "cough",
  "throat",
  "yodel",
  "rapping",
  "snicker",
  "snicker",
  "sobbing",
  "laugh",
  "debate",
  "reading",
  "shouting",
  "storytelling",
  "whispering",
  "screaming",
  "conversation",
];

const animalKeywords = [
  "animal",
  "bark",
  "meow",
  "cat",
  "dog",
  "whinny",
  "neigh",
  "moo",
  "bleat",
  "goat",
  "horse",
  "oink",
  "pig",
  "roar",
  "growl",
  "purr",
  "hiss",
  "caterwaul",
  "livestock",
  "sheep",
  "turkey",
  "duck",
  "goose",
  "crow",
  "fowl",
];

const musicKeywords = [
  "music",
  "instrument",
  "guitar",
  "piano",
  "harp",
  "banjo",
  "ukulele",
  "drum",
  "keyboard",
  "organ",
  "choir",
  "opera",
  "jazz",
  "rock",
  "saxophone",
  "violin",
  "fiddle",
  "mandolin",
  "sitar",
  "song",
  "marimba",
  "xylophone",
  "trumpet",
  "synth",
  "electronic",
  "flute",
  "clarinet",
  "orchestra",
  "brass",
  "sitar",
  "sitar",
  "saxophone",
];

const natureKeywords = [
  "nature",
  "water",
  "rain",
  "wind",
  "stream",
  "river",
  "ocean",
  "bird",
  "fire",
  "thunder",
  "leaves",
  "frog",
  "cricket",
  "bee",
  "mosquito",
  "thunderstorm",
  "waterfall",
  "waves",
  "insect",
  "snail",
  "rustle",
  "crack",
  "chirp",
  "buzz",
  "flow",
  "drip",
];

const environmentKeywords = [
  "environment",
  "city",
  "work",
  "loud",
  "quiet",
  "annoying",
  "vehicle",
  "car",
  "train",
  "plane",
  "bus",
  "truck",
  "traffic",
  "engine",
  "machine",
  "mechanical",
  "factory",
  "alarm",
  "phone",
  "tool",
  "applause",
  "door",
  "clock",
  "microwave",
  "fan",
  "click",
];

// Helper: lowercase, then check if any keyword is present
function includesKeyword(str, keywords) {
  if (!str) return false;
  str = str.toLowerCase();
  return keywords.some((keyword) => str.includes(keyword));
}

// Main logic to assign "type"
function getType(entry) {
  // Priority: voice > animal > music > nature > environment > unknown
  const d = entry.display_name || "";
  const c = entry.classification || "";
  if (includesKeyword(d, voiceKeywords) || includesKeyword(c, voiceKeywords)) return "voice";
  if (includesKeyword(d, animalKeywords) || includesKeyword(c, animalKeywords)) return "animal";
  if (includesKeyword(d, musicKeywords) || includesKeyword(c, musicKeywords)) return "music";
  if (includesKeyword(d, natureKeywords) || includesKeyword(c, natureKeywords)) return "nature";
  if (includesKeyword(d, environmentKeywords) || includesKeyword(c, environmentKeywords))
    return "environment";
  return "unknown";
}

// Read, modify, write
const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));
const updated = data.map((entry) => ({
  ...entry,
  type: getType(entry),
}));

fs.writeFileSync(outputFile, JSON.stringify(updated, null, 2));
console.log(`Added 'type' to all entries. Saved as ${outputFile}.`);
