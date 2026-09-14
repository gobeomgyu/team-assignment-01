import { members } from './data';
import { imagePath } from './paths';

interface Collection {
  kind: 'chain-badge' | 'griptok';
  name: string;
  label: string;
  description: string;
  story: string;
  image: string;
  imageSize: readonly [number, number];
  // Original image regions [x, y, width, height], keyed by stable member ID.
  crops: Record<number, readonly [number, number, number, number]>;
}

// Keep the supplied artwork intact and display each partner's region in the UI.
const collections: Collection[] = [
  {
    kind: 'chain-badge', name: '체인 배지', label: 'CHAIN BADGE',
    description: '작은 체인으로 이어지는 나의 파트너',
    story: '캐릭터와 겨울 풍경을 담은 두 배지가 작은 체인으로 이어져 있어요. 좋아하는 파트너의 모습을 일상 가까이에서 만나 보세요.',
    image: imagePath('products/chain-badges.png'),
    imageSize: [1536, 1024],
    crops: { 1: [300, 10, 780, 306], 2: [300, 330, 780, 300], 3: [300, 650, 780, 310] },
  },
  {
    kind: 'griptok', name: '그립톡', label: 'GRIPTOK',
    description: '손안에 쏙, 언제나 함께하는 파트너',
    story: '친구들에게 둘러싸인 캐릭터의 즐거운 모습을 그립톡에 담았어요. 휴대폰을 손에 쥘 때마다 좋아하는 파트너를 만나 보세요.',
    image: imagePath('products/griptoks.png'),
    imageSize: [2172, 724],
    crops: { 1: [0, 0, 724, 724], 2: [724, 0, 724, 724], 3: [1448, 0, 724, 724] },
  },
];

export const products = collections.flatMap(collection => members.map(member => ({
  id: `${collection.kind}-${member.id}`,
  memberId: member.id,
  name: `${member.conemonName} ${collection.name}`,
  collection: collection.label,
  kind: collection.kind,
  description: collection.description,
  detailDescription: `${member.conemonName}와 함께하는 작은 즐거움. ${collection.story}`,
  // Specifications remain placeholders until the team confirms them.
  details: [
    { label: '상품 구성', value: '더미 데이터' },
    { label: '크기', value: '더미 데이터' },
    { label: '소재', value: '더미 데이터' },
    { label: '상품 안내', value: '더미 데이터' },
  ],
  image: collection.image,
  imageSize: collection.imageSize,
  imageCrop: collection.crops[member.id],
  character: member.conemonName,
  color: member.color,
  background: member.softColor,
})));

export type Product = (typeof products)[number];
