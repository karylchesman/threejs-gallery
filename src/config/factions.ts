import cabalBg from "../assets/cabal.jpg";
import dreadBg from "../assets/dread.jpg";
import fallenBg from "../assets/fallen.jpg";
import hiveBg from "../assets/hive.jpg";
import scornBg from "../assets/scorn.jpg";
import takenBg from "../assets/taken.jpg";
import vexBg from "../assets/vex.jpg";

export const FACTIONS = {
  cabal: {
    name: "Cabal",
    bg: cabalBg,
    description: `The Cabal are a militaristic, empire-building race resembling massive, armored war beasts. 
    They rely on brute force, advanced war machines, and disciplined tactics to conquer new territories. 
    Their leadership consists of Emperors, Generals, and elite Psions who manipulate time and space`,
  },
  dread: {
    name: "The Dread",
    bg: dreadBg,
    description: `The Dread are a mysterious new enemy faction created by the Witness. They include powerful 
    units like the Weaver, Husks, and Lurkers, each with unique abilities that challenge Guardians in new ways. 
    They seem to be fully devoted to the Witness's grand design, acting as its ultimate enforcers`,
  },
  fallen: {
    name: "Fallen (Eliksni)",
    bg: fallenBg,
    description: `The Fallen, or Eliksni, are nomadic, pirate-like scavengers who once had a thriving civilization. 
    After losing the favor of the Traveler, they became divided into Houses, each led by powerful Captains and Kells. 
    They are known for their agility, energy weapons, and ability to regenerate limbs`,
  },
  hive: {
    name: "Hive",
    bg: hiveBg,
    description: `The Hive are ancient, undead-like creatures devoted to the Darkness. They live in massive, gothic 
    fortresses and practice a philosophy of destruction, feeding off death to grow stronger. Ruled by god-like entities, 
    they constantly seek to expand their dominion through sacrifice and war`,
  },
  scorn: {
    name: "Scorn",
    bg: scornBg,
    description: `The Scorn are reanimated and mutated Fallen, brought back by dark rituals. They have abandoned traditional 
    Fallen hierarchy, instead following deranged leaders like Fikrul, the Fanatic. They are relentless, mindless killers who 
    attack in overwhelming numbers`,
  },
  taken: {
    name: "Taken",
    bg: takenBg,
    description: `The Taken are twisted versions of various enemies, corrupted by the Darkness. They possess shadowy, distorted 
    forms and enhanced abilities, serving powerful entities such as Oryx, Savathûn, and the Witness. Their behavior is erratic, 
    but they are highly coordinated in battle`,
  },
  vex: {
    name: "Vex",
    bg: vexBg,
    description: `The Vex are a cybernetic collective of machine-minds capable of manipulating time and reality. They operate 
    as a hive-mind, converting entire planets into mechanical landscapes. Their true nature is unknown, but they are believed 
    to exist across multiple timelines simultaneously`,
  },
};
