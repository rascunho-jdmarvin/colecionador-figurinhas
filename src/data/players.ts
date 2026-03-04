export interface Player {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  position: string;
  number: number;
  rating: number;
  group: string;
  rarity: 'common' | 'rare' | 'legendary';
}

export const COUNTRIES: Record<string, { name: string; flag: string; color: string }> = {
  BRA: { name: 'Brasil', flag: '🇧🇷', color: '55 90% 50%' },
  ARG: { name: 'Argentina', flag: '🇦🇷', color: '200 70% 55%' },
  FRA: { name: 'França', flag: '🇫🇷', color: '225 70% 45%' },
  GER: { name: 'Alemanha', flag: '🇩🇪', color: '0 0% 15%' },
  ESP: { name: 'Espanha', flag: '🇪🇸', color: '0 80% 50%' },
  POR: { name: 'Portugal', flag: '🇵🇹', color: '145 60% 35%' },
  ENG: { name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '0 70% 45%' },
  ITA: { name: 'Itália', flag: '🇮🇹', color: '215 65% 45%' },
  NED: { name: 'Holanda', flag: '🇳🇱', color: '20 90% 50%' },
  URU: { name: 'Uruguai', flag: '🇺🇾', color: '210 70% 45%' },
  MEX: { name: 'México', flag: '🇲🇽', color: '145 55% 35%' },
  JPN: { name: 'Japão', flag: '🇯🇵', color: '0 70% 45%' },
  KOR: { name: 'Coreia do Sul', flag: '🇰🇷', color: '0 65% 45%' },
  USA: { name: 'EUA', flag: '🇺🇸', color: '220 70% 40%' },
  MAR: { name: 'Marrocos', flag: '🇲🇦', color: '0 70% 40%' },
  SEN: { name: 'Senegal', flag: '🇸🇳', color: '145 60% 35%' },
};

export const PLAYERS: Player[] = [
  // Brasil
  { id: 1, name: 'Vinícius Jr.', country: 'Brasil', countryCode: 'BRA', position: 'ATA', number: 7, rating: 92, group: 'A', rarity: 'legendary' },
  { id: 2, name: 'Rodrygo', country: 'Brasil', countryCode: 'BRA', position: 'ATA', number: 11, rating: 86, group: 'A', rarity: 'rare' },
  { id: 3, name: 'Casemiro', country: 'Brasil', countryCode: 'BRA', position: 'MEI', number: 5, rating: 85, group: 'A', rarity: 'rare' },
  { id: 4, name: 'Marquinhos', country: 'Brasil', countryCode: 'BRA', position: 'ZAG', number: 4, rating: 86, group: 'A', rarity: 'rare' },
  { id: 5, name: 'Alisson', country: 'Brasil', countryCode: 'BRA', position: 'GOL', number: 1, rating: 89, group: 'A', rarity: 'rare' },
  { id: 6, name: 'Raphinha', country: 'Brasil', countryCode: 'BRA', position: 'ATA', number: 10, rating: 85, group: 'A', rarity: 'common' },

  // Argentina
  { id: 7, name: 'Lionel Messi', country: 'Argentina', countryCode: 'ARG', position: 'ATA', number: 10, rating: 95, group: 'A', rarity: 'legendary' },
  { id: 8, name: 'Julián Álvarez', country: 'Argentina', countryCode: 'ARG', position: 'ATA', number: 9, rating: 85, group: 'A', rarity: 'common' },
  { id: 9, name: 'Enzo Fernández', country: 'Argentina', countryCode: 'ARG', position: 'MEI', number: 24, rating: 85, group: 'A', rarity: 'rare' },
  { id: 10, name: 'Lautaro Martínez', country: 'Argentina', countryCode: 'ARG', position: 'ATA', number: 22, rating: 87, group: 'A', rarity: 'rare' },
  { id: 11, name: 'E. Martínez', country: 'Argentina', countryCode: 'ARG', position: 'GOL', number: 23, rating: 88, group: 'A', rarity: 'rare' },

  // França
  { id: 12, name: 'Kylian Mbappé', country: 'França', countryCode: 'FRA', position: 'ATA', number: 10, rating: 94, group: 'B', rarity: 'legendary' },
  { id: 13, name: 'Antoine Griezmann', country: 'França', countryCode: 'FRA', position: 'ATA', number: 7, rating: 86, group: 'B', rarity: 'rare' },
  { id: 14, name: 'Aurélien Tchouaméni', country: 'França', countryCode: 'FRA', position: 'MEI', number: 8, rating: 85, group: 'B', rarity: 'common' },
  { id: 15, name: 'Theo Hernández', country: 'França', countryCode: 'FRA', position: 'LAT', number: 22, rating: 85, group: 'B', rarity: 'common' },

  // Alemanha
  { id: 16, name: 'Jamal Musiala', country: 'Alemanha', countryCode: 'GER', position: 'MEI', number: 10, rating: 88, group: 'B', rarity: 'rare' },
  { id: 17, name: 'Florian Wirtz', country: 'Alemanha', countryCode: 'GER', position: 'MEI', number: 17, rating: 87, group: 'B', rarity: 'rare' },
  { id: 18, name: 'Manuel Neuer', country: 'Alemanha', countryCode: 'GER', position: 'GOL', number: 1, rating: 86, group: 'B', rarity: 'common' },
  { id: 19, name: 'Joshua Kimmich', country: 'Alemanha', countryCode: 'GER', position: 'MEI', number: 6, rating: 87, group: 'B', rarity: 'rare' },

  // Espanha
  { id: 20, name: 'Lamine Yamal', country: 'Espanha', countryCode: 'ESP', position: 'ATA', number: 19, rating: 88, group: 'C', rarity: 'legendary' },
  { id: 21, name: 'Pedri', country: 'Espanha', countryCode: 'ESP', position: 'MEI', number: 8, rating: 87, group: 'C', rarity: 'rare' },
  { id: 22, name: 'Rodri', country: 'Espanha', countryCode: 'ESP', position: 'MEI', number: 16, rating: 90, group: 'C', rarity: 'rare' },
  { id: 23, name: 'Gavi', country: 'Espanha', countryCode: 'ESP', position: 'MEI', number: 6, rating: 83, group: 'C', rarity: 'common' },

  // Portugal
  { id: 24, name: 'Cristiano Ronaldo', country: 'Portugal', countryCode: 'POR', position: 'ATA', number: 7, rating: 88, group: 'C', rarity: 'legendary' },
  { id: 25, name: 'Bruno Fernandes', country: 'Portugal', countryCode: 'POR', position: 'MEI', number: 8, rating: 87, group: 'C', rarity: 'rare' },
  { id: 26, name: 'Bernardo Silva', country: 'Portugal', countryCode: 'POR', position: 'MEI', number: 10, rating: 88, group: 'C', rarity: 'rare' },
  { id: 27, name: 'Rafael Leão', country: 'Portugal', countryCode: 'POR', position: 'ATA', number: 17, rating: 85, group: 'C', rarity: 'common' },

  // Inglaterra
  { id: 28, name: 'Jude Bellingham', country: 'Inglaterra', countryCode: 'ENG', position: 'MEI', number: 10, rating: 90, group: 'D', rarity: 'legendary' },
  { id: 29, name: 'Bukayo Saka', country: 'Inglaterra', countryCode: 'ENG', position: 'ATA', number: 7, rating: 87, group: 'D', rarity: 'rare' },
  { id: 30, name: 'Phil Foden', country: 'Inglaterra', countryCode: 'ENG', position: 'ATA', number: 11, rating: 87, group: 'D', rarity: 'rare' },
  { id: 31, name: 'Declan Rice', country: 'Inglaterra', countryCode: 'ENG', position: 'MEI', number: 4, rating: 86, group: 'D', rarity: 'common' },

  // Itália
  { id: 32, name: 'Gianluigi Donnarumma', country: 'Itália', countryCode: 'ITA', position: 'GOL', number: 1, rating: 86, group: 'D', rarity: 'common' },
  { id: 33, name: 'Nicolò Barella', country: 'Itália', countryCode: 'ITA', position: 'MEI', number: 18, rating: 86, group: 'D', rarity: 'rare' },

  // Holanda
  { id: 34, name: 'Virgil van Dijk', country: 'Holanda', countryCode: 'NED', position: 'ZAG', number: 4, rating: 88, group: 'E', rarity: 'rare' },
  { id: 35, name: 'Cody Gakpo', country: 'Holanda', countryCode: 'NED', position: 'ATA', number: 11, rating: 84, group: 'E', rarity: 'common' },

  // Uruguai
  { id: 36, name: 'Federico Valverde', country: 'Uruguai', countryCode: 'URU', position: 'MEI', number: 15, rating: 88, group: 'E', rarity: 'rare' },
  { id: 37, name: 'Darwin Núñez', country: 'Uruguai', countryCode: 'URU', position: 'ATA', number: 9, rating: 84, group: 'E', rarity: 'common' },

  // Japão
  { id: 38, name: 'Takefusa Kubo', country: 'Japão', countryCode: 'JPN', position: 'ATA', number: 11, rating: 82, group: 'F', rarity: 'common' },

  // Coreia do Sul
  { id: 39, name: 'Son Heung-min', country: 'Coreia do Sul', countryCode: 'KOR', position: 'ATA', number: 7, rating: 87, group: 'F', rarity: 'rare' },

  // EUA
  { id: 40, name: 'Christian Pulisic', country: 'EUA', countryCode: 'USA', position: 'ATA', number: 10, rating: 83, group: 'F', rarity: 'common' },

  // Marrocos
  { id: 41, name: 'Achraf Hakimi', country: 'Marrocos', countryCode: 'MAR', position: 'LAT', number: 2, rating: 86, group: 'G', rarity: 'rare' },

  // Senegal
  { id: 42, name: 'Sadio Mané', country: 'Senegal', countryCode: 'SEN', position: 'ATA', number: 10, rating: 84, group: 'G', rarity: 'common' },

  // México
  { id: 43, name: 'Hirving Lozano', country: 'México', countryCode: 'MEX', position: 'ATA', number: 22, rating: 80, group: 'G', rarity: 'common' },
];

export const PACK_SIZE = 5;
export const PACK_COST = 0; // Free packs for now

export function getRandomPack(allPlayers: Player[]): Player[] {
  const shuffled = [...allPlayers].sort(() => Math.random() - 0.5);
  // Weight by rarity
  const weighted = shuffled.sort((a, b) => {
    const rarityWeight = { common: 0, rare: 1, legendary: 2 };
    return rarityWeight[a.rarity] - rarityWeight[b.rarity];
  });
  
  // Pick 5 with slight bias toward common
  const pack: Player[] = [];
  const available = [...allPlayers];
  
  for (let i = 0; i < PACK_SIZE; i++) {
    const rand = Math.random();
    let pool: Player[];
    
    if (rand < 0.55) {
      pool = available.filter(p => p.rarity === 'common');
    } else if (rand < 0.88) {
      pool = available.filter(p => p.rarity === 'rare');
    } else {
      pool = available.filter(p => p.rarity === 'legendary');
    }
    
    if (pool.length === 0) pool = available;
    
    const picked = pool[Math.floor(Math.random() * pool.length)];
    pack.push(picked);
  }
  
  return pack;
}
