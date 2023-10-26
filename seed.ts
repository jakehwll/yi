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
    type: ChallengeType.text,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0000zo6x77v2c35d",
  },
  {
    id: "clo258dvv0001zo6xnwfhnmbv",
    type: ChallengeType.text,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0001zo6xnwfhnmbv",
  },
  {
    id: "clo258dvv0002zo6xrgk2hsqk",
    type: ChallengeType.text,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0002zo6xrgk2hsqk",
  },
  {
    id: "clo258dvv0003zo6xocyojtxq",
    type: ChallengeType.text,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0003zo6xocyojtxq",
  },
  {
    id: "clo258dvv0004zo6xey5rbjgu",
    type: ChallengeType.text,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0004zo6xey5rbjgu",
  },
  {
    id: "clo258dvv0005zo6xota6dbcy",
    type: ChallengeType.text,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0005zo6xota6dbcy",
  },
  {
    id: "clo258dvv0006zo6x9hnxyzun",
    type: ChallengeType.text,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0006zo6x9hnxyzun",
  },
  {
    id: "clo258dvv0007zo6xzg93datt",
    type: ChallengeType.text,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0007zo6xzg93datt",
  },
  {
    id: "clo258dvv0008zo6xsyfd2yr5",
    type: ChallengeType.text,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0008zo6xsyfd2yr5",
  },
  {
    id: "clo258dvv0009zo6xe87fsox3",
    type: ChallengeType.text,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0009zo6xe87fsox3",
  },
  {
    id: "clo258dvv0000zo6x77v2c36d",
    type: ChallengeType.audio,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0000zo6x77v2c35d",
  },
  {
    id: "clo258dvv0011zo6xnwfhnmbv",
    type: ChallengeType.audio,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0001zo6xnwfhnmbv",
  },
  {
    id: "clo258dvv0002zo6xrgk3hsqk",
    type: ChallengeType.audio,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0002zo6xrgk2hsqk",
  },
  {
    id: "clo258dvv0013zo6xocyojtxq",
    type: ChallengeType.audio,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0003zo6xocyojtxq",
  },
  {
    id: "clo258dvv0004zo6xey6rbjgu",
    type: ChallengeType.audio,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0004zo6xey5rbjgu",
  },
  {
    id: "clo258dvv0005zo4xota6dbcy",
    type: ChallengeType.audio,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0005zo6xota6dbcy",
  },
  {
    id: "clo258dvv0006zo7x9hnxyzun",
    type: ChallengeType.audio,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0006zo6x9hnxyzun",
  },
  {
    id: "clo258dvv0207zo6xzg93datt",
    type: ChallengeType.audio,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0007zo6xzg93datt",
  },
  {
    id: "clo258dvv0018zo6xsyfd2yr5",
    type: ChallengeType.audio,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0008zo6xsyfd2yr5",
  },
  {
    id: "clo258dvv0009zo6xe87fsox3",
    type: ChallengeType.audio,
    input: Language.chinese,
    output: Language.roman,
    definitionId: "clo258dvv0009zo6xe87fsox3",
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
  await prisma.deck.upsert({
    where: {
      id: DECK.id,
    },
    create: DECK,
    update: DECK,
  });
  // CHALLENGES.forEach(async (v) => {
  //   const beep = await prisma.challenge.upsert({
  //     where: {
  //       id: v.id,
  //     },
  //     create: v,
  //     update: v,
  //   });
  // })
  await Promise.all(CHALLENGES.map(async (v) => {
    await prisma.challenge.upsert({
      where: {
        id: v.id,
      },
      create: v,
      update: v,
    });
    await prisma.deckChallenge.upsert({
      where: {
        deckId_challengeId: {
          deckId: DECK.id,
          challengeId: v.id,
        }
      },
      create: {
        deckId: DECK.id,
        challengeId: v.id,
      },
      update: {
        deckId: DECK.id,
        challengeId: v.id,
      }
    })
  }))
}

await main()