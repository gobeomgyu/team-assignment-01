import { imagePath } from './paths';

export type ConemonType = 'fire' | 'grass' | 'poison' | 'water';

export interface Member {
  id: number;
  name: string;
  conemonName: string;
  englishName: string;
  no: string;
  desc: string;
  types: ConemonType[];
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

export const typeLabels: Record<ConemonType, string> = {
  fire: '불꽃', grass: '풀', poison: '독', water: '물',
};

// Temporary home copy. Replace these strings when the team introduction is ready.
export const homeIntroduction = {
  eyebrow: 'WELCOME TO OUR CONE JOURNEY',
  title: '서로 다른 우리가 만나,',
  highlight: '하나의 모험이 되다.',
  paragraphs: [
    '각자의 개성과 이야기를 가진 세 사람이 모였습니다.<br />좋아하는 것도, 잘하는 것도 조금씩 다르지만 새로운 도전을 향한 마음은 같아요. 함께 배우고 성장하는 우리들의 이야기를 만나보세요.',
  ],
};

// Selection order: Charmander → Bulbasaur → Squirtle.
// Preserve existing member IDs for member.html links.
export const members: Member[] = [
  {
    id: 2,
    name: '한영민',
    conemonName: '규이리',
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
    extraInfo1: '카리나와 얼굴을 마주보고 대화를 해봤다',
    extraInfo2: '스위스 여행을 해봤다',
    extraInfo3: '왼쪽의 사진은 여자를 보다가 찍혔다',
    image: imagePath('gyuiri.png'),
    imageSize: [325, 336],
    color: '#e66a35',
    softColor: '#fff0e6',
    introduction: '작은 불꽃, 커다란 열정',
  },
  {
    id: 1,
    name: '고범규',
    conemonName: '익상해씨',
    englishName: 'BULBASAUR',
    no: 'No. 0039',
    desc: '태어났을 때부터 똘기가 몸에 서려있었다. 눈에 빛나는 부분에서 빔을 발사해 공격한다.',
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
    introduction: '까면 깔수록 나오는 미친 똘끼',
  },
  {
    id: 3,
    name: '최익준',
    conemonName: '영부기',
    englishName: 'SQUIRTLE',
    no: 'No. 0040',
    desc: '수영은 잘 못하지만 물을 좋아하며 헛소리를 듣거나 할 때 흥겨워 한다. .',
    types: ['water'],
    height: '171.999999999cm',
    category: 'INFP',
    genders: ['M'],
    weight: '69kg',
    ability: '부족한',
    abilityDescription: '부족하다는 밑밥을 깔아두어 든든하다',
    extraInfo1: '인도를 가봤다',
    extraInfo2: '한정훈에서 한영민으로 개명을 한적이 있다',
    extraInfo3: '야생 멧돼지를 1M 앞에서 마주친 적이 있다.',
    image: imagePath('squirtle.png'),
    imageSize: [1288, 1222],
    color: '#3986ae',
    softColor: '#eaf4f9',
    introduction: '어디든 함께할 든든한 친구',
  },
];
