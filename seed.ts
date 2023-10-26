import { ChallengeType, DefinitionType, Language, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const VOCABULARY = [
  { 
    id: 'clo258dvv0000zo6x77v2c35d',
    chinese: "一", 
    roman: "yi", 
    pinyin: "yī", 
    audio: "/assets/1.mp3",
    deckId: "clo6dhqup0001zoc2zb24yue0"
  },
  {
    id: 'clo258dvv0001zo6xnwfhnmbv',
    chinese: "二",
    roman: ["er", "liang"],
    pinyin: ["èr", "liǎng"],
    audio: "/assets/2.mp3",
  },
  {
    id: 'clo258dvv0002zo6xrgk2hsqk',
    chinese: "三",
    roman: "san",
    pinyin: "sān",
    audio: "/assets/3.mp3"
  },
  {
    id: 'clo258dvv0003zo6xocyojtxq',
    chinese: "四",
    roman: "si", 
    pinyin: "sì",
    audio: "/assets/4.mp3"
  },
  {
    id: 'clo258dvv0004zo6xey5rbjgu',
    chinese: "五",
    roman: "wu", 
    pinyin: "wǔ",
    audio: "/assets/5.mp3"
  },
  {
    id: 'clo258dvv0005zo6xota6dbcy',
    chinese: "六",
    roman: "liu",
    pinyin: "liù",
    audio: "/assets/6.mp3"
  },
  {
    id: 'clo258dvv0006zo6x9hnxyzun',
    chinese: "七",
    roman: "qi", 
    pinyin: "qī",
    audio: "/assets/7.mp3"
  },
  {
    id: 'clo258dvv0007zo6xzg93datt',
    chinese: "八",
    roman: "ba", 
    pinyin: "bā",
    audio: "/assets/8.mp3"
  },
  {
    id: 'clo258dvv0008zo6xsyfd2yr5',
    chinese: "九",
    roman: "jiu",
    pinyin: "jiǔ",
    audio: "/assets/9.mp3"
  },
  {
    id: 'clo258dvv0009zo6xe87fsox3',
    chinese: "十",
    roman: "shi", 
    pinyin: "shí", 
    audio: "/assets/10.mp3"
  },
];

const CHALLENGES = [
  {
    id: "clo258dvv0000zo6x77v2c35d",
    type: ChallengeType.Text,
    input: Language.Chinese,
    output: Language.Roman,
    definitionId: "clo258dvv0000zo6x77v2c35d",
  },
];

const DECK = {
  id: "clo6dhqup0001zoc2zb24yue0",
  name: "Numbers",
  description: "Learn numbers",
}

async function main() {
  VOCABULARY.forEach(async (v) => {
    const { id, ...data } = v
    await prisma.definition.upsert({
      where: {
        id
      },
      create: {
        id: id,
        definition: DefinitionType.Vocabulary,
        data,
      },
      update: {
        data,
      }
    })
  })
  CHALLENGES.forEach(async (v) => {
    await prisma.challenge.upsert({
      where: {
        id: v.id,
      },
      create: v,
      update: v,
    });
  })
  await prisma.deck.upsert({
    where: {
      id: DECK.id,
    },
    create: DECK,
    update: DECK,
  });
  await prisma.deckChallenge.upsert({
    where: {
      deckId_challengeId: {
        deckId: DECK.id,
        challengeId: "clo258dvv0000zo6x77v2c35d",
      },
    },
    create: {
      deckId: DECK.id,
      challengeId: "clo258dvv0000zo6x77v2c35d",
    },
    update: {
      deckId: DECK.id,
      challengeId: "clo258dvv0000zo6x77v2c35d",
    },
  });
}

await main()