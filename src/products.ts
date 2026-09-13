import { members } from './data';

// Temporary catalog: replace these examples with the real product details and images.
const collections = [
  { kind: 'photocard', name: '포토카드', label: 'PHOTO CARD', description: '지갑 속에 간직하는 작은 파트너' },
  { kind: 'sticker', name: '원형 스티커', label: 'CIRCLE STICKER', description: '평범한 하루에 붙이는 작은 즐거움' },
  { kind: 'poster', name: '미니 포스터', label: 'MINI POSTER', description: '나의 공간을 채우는 우리들의 이야기' },
] as const;

export const products = collections.flatMap(collection => members.map(member => ({
  id: `${collection.kind}-${member.id}`,
  name: `${member.pokemonName} ${collection.name}`,
  collection: collection.label,
  kind: collection.kind,
  description: collection.description,
  image: member.image,
  character: member.pokemonName,
  no: member.no,
  color: member.color,
  background: member.softColor,
})));
