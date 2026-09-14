import { members } from './data';

// Temporary catalog: replace these examples with the real product details and images.
const collections = [
  { kind: 'photocard', name: '포토카드', label: 'PHOTO CARD', description: '지갑 속에 간직하는 작은 파트너' },
  { kind: 'sticker', name: '원형 스티커', label: 'CIRCLE STICKER', description: '평범한 하루에 붙이는 작은 즐거움' },
  { kind: 'poster', name: '미니 포스터', label: 'MINI POSTER', description: '나의 공간을 채우는 우리들의 이야기' },
] as const;

export const products = collections.flatMap(collection => members.map(member => ({
  id: `${collection.kind}-${member.id}`,
  memberId: member.id,
  name: `${member.conemonName} ${collection.name}`,
  collection: collection.label,
  kind: collection.kind,
  description: collection.description,
  // Placeholder copy and specifications for the product detail view.
  detailDescription: `${member.conemonName}와 함께하는 작은 즐거움. 일상 속 소중한 순간을 담아 오래도록 간직해 보세요. 나만의 공간과 하루에 파트너의 이야기를 더해 보세요.`,
  details: [
    { label: '상품 구성', value: '더미 데이터' },
    { label: '크기', value: '더미 데이터' },
    { label: '소재', value: '더미 데이터' },
    { label: '상품 안내', value: '더미 데이터' },
  ],
  image: member.image,
  character: member.conemonName,
  no: member.no,
  color: member.color,
  background: member.softColor,
})));

export type Product = (typeof products)[number];
