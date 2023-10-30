import {
  ChallengeType,
  DefinitionType,
  InputType,
  PrismaClient,
} from "@prisma/client";

const prisma = new PrismaClient()

const VOCABULARY = [
  {
    id: "clo258dvv0000zo6x77v2c35d",
    chinese: "一",
    reading: "yi",
    pinyin: "yī",
    meaning: "one",
    audio: "/assets/1.mp3",
    deckId: "clo6dhqup0001zoc2zb24yue0",
  },
  {
    id: "clo258dvv0001zo6xnwfhnmbv",
    chinese: "二",
    reading: ["er", "liang"],
    pinyin: ["èr", "liǎng"],
    meaning: "two",
    audio: "/assets/2.mp3",
  },
  {
    id: "clo258dvv0002zo6xrgk2hsqk",
    chinese: "三",
    reading: "san",
    pinyin: "sān",
    meaning: "three",
    audio: "/assets/3.mp3",
  },
  {
    id: "clo258dvv0003zo6xocyojtxq",
    chinese: "四",
    reading: "si",
    pinyin: "sì",
    meaning: "four",
    audio: "/assets/4.mp3",
  },
  {
    id: "clo258dvv0004zo6xey5rbjgu",
    chinese: "五",
    reading: "wu",
    pinyin: "wǔ",
    meaning: "five",
    audio: "/assets/5.mp3",
  },
  {
    id: "clo258dvv0005zo6xota6dbcy",
    chinese: "六",
    reading: "liu",
    pinyin: "liù",
    meaning: "six",
    audio: "/assets/6.mp3",
  },
  {
    id: "clo258dvv0006zo6x9hnxyzun",
    chinese: "七",
    reading: "qi",
    pinyin: "qī",
    meaning: "seven",
    audio: "/assets/7.mp3",
  },
  {
    id: "clo258dvv0007zo6xzg93datt",
    chinese: "八",
    reading: "ba",
    pinyin: "bā",
    meaning: "eight",
    audio: "/assets/8.mp3",
  },
  {
    id: "clo258dvv0008zo6xsyfd2yr5",
    chinese: "九",
    reading: "jiu",
    pinyin: "jiǔ",
    meaning: "nine",
    audio: "/assets/9.mp3",
  },
  {
    id: "clo258dvv0009zo6xe87fsox3",
    chinese: "十",
    reading: "shi",
    pinyin: "shí",
    meaning: "ten",
    audio: "/assets/10.mp3",
  },
];

const CHALLENGES = [
  {
    id: "clo258dvv0000zo6x77v2c35d",
    type: ChallengeType.text,
    input: InputType.reading,
    definitionId: "clo258dvv0000zo6x77v2c35d",
  },
  {
    id: "clo258dvv0001zo6xnwfhnmbv",
    type: ChallengeType.text,
    input: InputType.reading,
    definitionId: "clo258dvv0001zo6xnwfhnmbv",
  },
  {
    id: "clo258dvv0002zo6xrgk2hsqk",
    type: ChallengeType.text,
    input: InputType.reading,
    definitionId: "clo258dvv0002zo6xrgk2hsqk",
  },
  {
    id: "clo258dvv0003zo6xocyojtxq",
    type: ChallengeType.text,
    input: InputType.reading,
    definitionId: "clo258dvv0003zo6xocyojtxq",
  },
  {
    id: "clo258dvv0004zo6xey5rbjgu",
    type: ChallengeType.text,
    input: InputType.reading,
    definitionId: "clo258dvv0004zo6xey5rbjgu",
  },
  {
    id: "clo258dvv0005zo6xota6dbcy",
    type: ChallengeType.text,
    input: InputType.reading,
    definitionId: "clo258dvv0005zo6xota6dbcy",
  },
  {
    id: "clo258dvv0006zo6x9hnxyzun",
    type: ChallengeType.text,
    input: InputType.reading,
    definitionId: "clo258dvv0006zo6x9hnxyzun",
  },
  {
    id: "clo258dvv0007zo6xzg93datt",
    type: ChallengeType.text,
    input: InputType.reading,
    definitionId: "clo258dvv0007zo6xzg93datt",
  },
  {
    id: "clo258dvv0008zo6xsyfd2yr5",
    type: ChallengeType.text,
    input: InputType.reading,
    definitionId: "clo258dvv0008zo6xsyfd2yr5",
  },
  {
    id: "clo258dvv0009zo6xe87fsox3",
    type: ChallengeType.text,
    input: InputType.reading,
    definitionId: "clo258dvv0009zo6xe87fsox3",
  },
  // audio
  {
    id: "clo258dvv0000zo6x77v2c36d",
    type: ChallengeType.audio,
    input: InputType.reading,
    definitionId: "clo258dvv0000zo6x77v2c35d",
  },
  {
    id: "clo258dvv0011zo6xnwfhnmbv",
    type: ChallengeType.audio,
    input: InputType.reading,
    definitionId: "clo258dvv0001zo6xnwfhnmbv",
  },
  {
    id: "clo258dvv0002zo6xrgk3hsqk",
    type: ChallengeType.audio,
    input: InputType.reading,
    definitionId: "clo258dvv0002zo6xrgk2hsqk",
  },
  {
    id: "clo258dvv0013zo6xocyojtxq",
    type: ChallengeType.audio,
    input: InputType.reading,
    definitionId: "clo258dvv0003zo6xocyojtxq",
  },
  {
    id: "clo258dvv0004zo6xey6rbjgu",
    type: ChallengeType.audio,
    input: InputType.reading,
    definitionId: "clo258dvv0004zo6xey5rbjgu",
  },
  {
    id: "clo258dvv0005zo4xota6dbcy",
    type: ChallengeType.audio,
    input: InputType.reading,
    definitionId: "clo258dvv0005zo6xota6dbcy",
  },
  {
    id: "clo258dvv0006zo7x9hnxyzun",
    type: ChallengeType.audio,
    input: InputType.reading,
    definitionId: "clo258dvv0006zo6x9hnxyzun",
  },
  {
    id: "clo258dvv0207zo6xzg93datt",
    type: ChallengeType.audio,
    input: InputType.reading,
    definitionId: "clo258dvv0007zo6xzg93datt",
  },
  {
    id: "clo258dvv0018zo6xsyfd2yr5",
    type: ChallengeType.audio,
    input: InputType.reading,
    definitionId: "clo258dvv0008zo6xsyfd2yr5",
  },
  {
    id: "clo258dvv0009zo6xe87fsox3",
    type: ChallengeType.audio,
    input: InputType.reading,
    definitionId: "clo258dvv0009zo6xe87fsox3",
  },
  // english
  {
    id: "clo258dvv0000zo6x77v2c351",
    type: ChallengeType.text,
    input: InputType.meaning,
    definitionId: "clo258dvv0000zo6x77v2c35d",
  },
  {
    id: "clo258dvv0001zo6xnwfhnmb1",
    type: ChallengeType.text,
    input: InputType.meaning,
    definitionId: "clo258dvv0001zo6xnwfhnmbv",
  },
  {
    id: "clo258dvv0002zo6xrgk2hsq1",
    type: ChallengeType.text,
    input: InputType.meaning,
    definitionId: "clo258dvv0002zo6xrgk2hsqk",
  },
  {
    id: "clo258dvv0003zo6xocyojtx1",
    type: ChallengeType.text,
    input: InputType.meaning,
    definitionId: "clo258dvv0003zo6xocyojtxq",
  },
  {
    id: "clo258dvv0004zo6xey5rbjg1",
    type: ChallengeType.text,
    input: InputType.meaning,
    definitionId: "clo258dvv0004zo6xey5rbjgu",
  },
  {
    id: "clo258dvv0005zo6xota6dbc1",
    type: ChallengeType.text,
    input: InputType.meaning,
    definitionId: "clo258dvv0005zo6xota6dbcy",
  },
  {
    id: "clo258dvv0006zo6x9hnxyzu1",
    type: ChallengeType.text,
    input: InputType.meaning,
    definitionId: "clo258dvv0006zo6x9hnxyzun",
  },
  {
    id: "clo258dvv0007zo6xzg93dat1",
    type: ChallengeType.text,
    input: InputType.meaning,
    definitionId: "clo258dvv0007zo6xzg93datt",
  },
  {
    id: "clo258dvv0008zo6xsyfd2yr1",
    type: ChallengeType.text,
    input: InputType.meaning,
    definitionId: "clo258dvv0008zo6xsyfd2yr5",
  },
  {
    id: "clo258dvv0009zo6xe87fsox1",
    type: ChallengeType.text,
    input: InputType.meaning,
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
        definition: DefinitionType.vocabulary,
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