import { DefinitionType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const VOCABULARY = [
  { 
    chinese: "一", 
    roman: "yi", 
    pinyin: "yī", 
    audio: "/assets/1.mp3" },
  {
    chinese: "二",
    roman: ["er", "liang"],
    pinyin: ["èr", "liǎng"],
    audio: "/assets/2.mp3",
  },
  {
    chinese: "三",
    roman: "san",
    pinyin: "sān",
    audio: "/assets/3.mp3"
  },
  {
    chinese: "四",
    roman: "si", 
    pinyin: "sì",
    audio: "/assets/4.mp3"
  },
  {
    chinese: "五",
    roman: "wu", 
    pinyin: "wǔ",
    audio: "/assets/5.mp3"
  },
  {
    chinese: "六",
    roman: "liu",
    pinyin: "liù",
    audio: "/assets/6.mp3"
  },
  {
    chinese: "七",
    roman: "qi", 
    pinyin: "qī",
    audio: "/assets/7.mp3"
  },
  {
    chinese: "八",
    roman: "ba", 
    pinyin: "bā",
    audio: "/assets/8.mp3"
  },
  {
    chinese: "九",
    roman: "jiu",
    pinyin: "jiǔ",
    audio: "/assets/9.mp3"
  },
  {
    chinese: "十",
    roman: "shi", 
    pinyin: "shí", 
    audio: "/assets/10.mp3" },
];

async function main() {
  await prisma.definition.createMany({
    // data: [
    //   {
    //     definition: DefinitionType.Vocabulary,
    //     data: {
    //       chinese: "",
    //       english: "",
    //       pinyin: "",
    //       audio: ""
    //     },
    //   },
    // ],
    data: VOCABULARY.map((v) => ({
      definition: DefinitionType.Vocabulary,
      data: v,
    })),
  });
}

await main()