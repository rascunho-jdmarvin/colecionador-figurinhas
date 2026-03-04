import { Player, PLAYERS, COUNTRIES } from '@/data/players';
import { PlayerCard } from './PlayerCard';
import { Progress } from '@/components/ui/progress';

interface AlbumViewProps {
  collection: Set<number>;
  duplicates: Record<number, number>;
}

export function AlbumView({ collection, duplicates }: AlbumViewProps) {
  // Group players by country
  const grouped = PLAYERS.reduce<Record<string, Player[]>>((acc, player) => {
    if (!acc[player.countryCode]) acc[player.countryCode] = [];
    acc[player.countryCode].push(player);
    return acc;
  }, {});

  const totalCards = PLAYERS.length;
  const collectedCards = collection.size;
  const progress = (collectedCards / totalCards) * 100;

  const totalDuplicates = Object.values(duplicates).reduce((sum, d) => sum + d, 0);

  return (
    <div className="space-y-8">
      {/* Progress header */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-xl font-bold text-foreground tracking-wider">
            MEU ÁLBUM
          </h2>
          <span className="font-display text-lg text-primary font-bold">
            {collectedCards}/{totalCards}
          </span>
        </div>
        <Progress value={progress} className="h-3" />
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{Math.round(progress)}% completo</span>
          <span>{totalDuplicates} figurinhas repetidas</span>
        </div>
      </div>

      {/* Country sections */}
      {Object.entries(grouped).map(([code, players]) => {
        const country = COUNTRIES[code];
        const countryCollected = players.filter(p => collection.has(p.id)).length;

        return (
          <div key={code} className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{country?.flag}</span>
              <h3 className="font-display text-lg font-bold text-foreground tracking-wide">
                {country?.name || code}
              </h3>
              <span className="text-sm text-muted-foreground ml-auto font-display">
                {countryCollected}/{players.length}
              </span>
              {countryCollected === players.length && (
                <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded font-bold font-display">
                  COMPLETO ✓
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {players.map(player => (
                <div key={player.id} className="relative">
                  <PlayerCard
                    player={player}
                    collected={collection.has(player.id)}
                    size="sm"
                  />
                  {(duplicates[player.id] || 0) > 0 && (
                    <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      +{duplicates[player.id]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
