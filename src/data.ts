import { imagePath } from './paths';

export type PokemonType = 'fire' | 'grass' | 'poison' | 'water';

export interface Member {
  id: number;
  name: string;
  pokemonName: string;
  englishName: string;
  no: string;
  desc: string;
  types: PokemonType[];
  height: string;
  category: string;
  genders: ('M' | 'F')[];
  weight: string;
  ability: string;
  abilityDescription: string;
  extraInfo1: string;
  extraInfo2: string;
  extraInfo3: string;
  image: string;
  imageSize: [number, number];
  color: string;
  softColor: string;
  introduction: string;
}

export const typeLabels: Record<PokemonType, string> = {
  fire: '불꽃', grass: '풀', poison: '독', water: '물',
};

// Temporary home copy. Replace these strings when the team introduction is ready.
export const homeIntroduction = {
  eyebrow: 'WELCOME TO OUR LITTLE WORLD',
  title: '서로 다른 우리가 만나,',
  highlight: '하나의 모험이 되다.',
  paragraphs: [
    '안녕하세요! 각자의 개성과 이야기를 가진 세 사람이 모였습니다.',
    '좋아하는 것도, 잘하는 것도 조금씩 다르지만 새로운 도전을 향한 마음은 같아요. 함께 배우고 성장하는 우리들의 이야기를 만나보세요.',
  ],
};

// Selection order: Charmander → Bulbasaur → Squirtle.
// Preserve existing member IDs for member.html links.
export const members: Member[] = [
  {
    id: 2,
    name: '한영민',
    pokemonName: '규이리',
    englishName: 'CHARMANDER',
    no: 'No. 0004',
    desc: '꼬리의 불꽃은 기분을 나타낸다. 즐거우면 흔들리고 화가 나면 맹렬히 불타오른다.',
    types: ['fire'],
    height: '178cm',
    category: 'ESFP',
    genders: ['M'],
    weight: '74kg',
    ability: '오뚜기',
    abilityDescription: '회복탄력성이 좋고 쉽게 좌절하지 않음',
    extraInfo1: '카리나와 대화',
    extraInfo2: '스위스 여행',
    extraInfo3: '여자 보다가 찍힘',
    image: imagePath('gyuiri.png'),
    imageSize: [325, 336],
    color: '#e66a35',
    softColor: '#fff0e6',
    introduction: '작은 불꽃, 커다란 열정',
  },
  {
    id: 1,
    name: '고범규',
    pokemonName: '익상해씨',
    englishName: 'BULBASAUR',
    no: 'No. 0001',
    desc: '태어났을 때부터 등에 이상한 씨앗이 심어져 있으며 몸과 함께 자란다고 한다.',
    types: ['grass', 'poison'],
    height: '170cm',
    category: 'INFJ',
    genders: ['M'],
    weight: '95kg',
    ability: '오타쿠',
    abilityDescription: '자신만의 세계에 빠져있다',
    extraInfo1: '이탈리아 베네치아에 갔다온 적이 있다.',
    extraInfo2: '지금까지 모은 프라모델의 개수가 30개를 넘는다.',
    extraInfo3: '지금까지 가본 나라가 6개국을 넘는다.',
    image: imagePath('iksanghaessi.png'),
    imageSize: [1254, 1254],
    color: '#43895c',
    softColor: '#edf5e9',
    introduction: '함께 자라는 우리들의 모험',
  },
  {
    id: 3,
    name: '최익준',
    pokemonName: '영부기',
    englishName: 'SQUIRTLE',
    no: 'No. 0007',
    desc: '위험해지면 등껍질에 숨어 몸을 보호한다. 입에서 물을 뿜어 공격한다.',
    types: ['water'],
    height: '171.999999999cm',
    category: '꼬마거북포켓몬',
    genders: ['M'],
    weight: '69kg',
    ability: '부족한',
    abilityDescription: 'HP가 줄어들면 물타입 기술의 위력이 올라간다.',
    extraInfo1: '열정적',
    extraInfo2: '부족함',
    extraInfo3: '성실함',
    image: imagePath('squirtle.png'),
    imageSize: [1288, 1222],
    color: '#3986ae',
    softColor: '#eaf4f9',
    introduction: '어디든 함께할 든든한 친구',
  },
];
