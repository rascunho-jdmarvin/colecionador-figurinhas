import { useState } from 'react';
import { Player, PLAYERS, getRandomPack } from '@/data/players';
import { PlayerCard } from './PlayerCard';
import { Button } from '@/components/ui/button';
import { Package, Sparkles } from 'lucide-react';

interface PackOpeningProps {
  onCardsCollected: (cards: Player[]) => void;
  packsOpened: number;
}

export function PackOpening({ onCardsCollected, packsOpened }: PackOpeningProps) {
  const [packCards, setPackCards] = useState<Player[]>([]);
  const [isOpening, setIsOpening] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);

  const openPack = () => {
    const cards = getRandomPack(PLAYERS);
    setPackCards(cards);
    setIsOpening(true);
    setRevealedCount(0);

    // Reveal cards one by one
    cards.forEach((_, i) => {
      setTimeout(() => {
        setRevealedCount(prev => prev + 1);
      }, 400 * (i + 1));
    });
  };

  const collectAndClose = () => {
    onCardsCollected(packCards);
    setPackCards([]);
    setIsOpening(false);
    setRevealedCount(0);
  };

  if (!isOpening) {
    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <div className="relative">
          <div className="w-48 h-64 rounded-xl bg-gradient-to-br from-gold-dark via-gold to-gold-light pack-glow flex flex-col items-center justify-center gap-3 cursor-pointer hover:scale-105 transition-transform"
               onClick={openPack}>
            <Package className="w-16 h-16 text-primary-foreground" />
            <span className="font-display text-xl font-bold text-primary-foreground tracking-wider">
              PACOTE
            </span>
            <span className="font-display text-sm text-primary-foreground/80">
              5 FIGURINHAS
            </span>
          </div>
          <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-gold animate-pulse" />
        </div>

        <Button
          onClick={openPack}
          size="lg"
          className="font-display text-lg tracking-wider bg-primary text-primary-foreground hover:bg-gold-light"
        >
          ABRIR PACOTE
        </Button>

        <p className="text-muted-foreground text-sm">
          Pacotes abertos: <span className="text-primary font-bold">{packsOpened}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <h2 className="font-display text-2xl font-bold text-primary tracking-wider">
        NOVAS FIGURINHAS!
      </h2>

      <div className="flex flex-wrap gap-4 justify-center">
        {packCards.map((card, i) => (
          <div key={`${card.id}-${i}`} className={i < revealedCount ? '' : 'opacity-0'}>
            <PlayerCard
              player={card}
              collected={true}
              isNew={i < revealedCount}
              size="md"
            />
          </div>
        ))}
      </div>

      {revealedCount >= packCards.length && (
        <Button
          onClick={collectAndClose}
          size="lg"
          className="font-display text-lg tracking-wider bg-accent text-accent-foreground hover:bg-pitch-light mt-4"
        >
          COLAR NO ÁLBUM
        </Button>
      )}
    </div>
  );
}
