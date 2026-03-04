import { Player, COUNTRIES } from '@/data/players';
import { cn } from '@/lib/utils';

interface PlayerCardProps {
  player: Player;
  collected: boolean;
  isNew?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

const rarityStyles = {
  common: 'border-border',
  rare: 'border-gold-dark',
  legendary: 'border-gold card-shine',
};

const rarityBadge = {
  common: '',
  rare: '⭐',
  legendary: '⭐⭐⭐',
};

const positionColors: Record<string, string> = {
  GOL: 'bg-amber-600/80',
  ZAG: 'bg-blue-600/80',
  LAT: 'bg-blue-500/80',
  MEI: 'bg-emerald-600/80',
  ATA: 'bg-red-600/80',
};

export function PlayerCard({ player, collected, isNew, onClick, size = 'md' }: PlayerCardProps) {
  const country = COUNTRIES[player.countryCode];
  const isSm = size === 'sm';

  if (!collected) {
    return (
      <div
        className={cn(
          'rounded-lg border-2 border-dashed border-border/50 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-muted-foreground/40',
          isSm ? 'h-36 w-24' : 'h-56 w-40'
        )}
        onClick={onClick}
      >
        <span className={cn('text-muted-foreground/40 font-display', isSm ? 'text-lg' : 'text-2xl')}>
          #{player.id}
        </span>
        <span className="text-muted-foreground/30 text-[10px] mt-1 text-center px-1 leading-tight">
          {player.name}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-lg border-2 relative overflow-hidden cursor-pointer transition-all hover:scale-105 hover:-translate-y-1',
        rarityStyles[player.rarity],
        isNew && 'animate-flip-in',
        isSm ? 'h-36 w-24' : 'h-56 w-40'
      )}
      style={{
        background: `linear-gradient(145deg, hsl(${country?.color || '0 0% 30%'} / 0.9), hsl(var(--card)))`,
      }}
      onClick={onClick}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-2 pt-1.5">
        <span className={cn('font-display font-bold text-primary', isSm ? 'text-sm' : 'text-lg')}>
          {player.rating}
        </span>
        <span className="text-xs">{country?.flag}</span>
      </div>

      {/* Player silhouette area */}
      <div className={cn('flex items-center justify-center', isSm ? 'h-14' : 'h-24')}>
        <div className={cn(
          'rounded-full bg-foreground/10 flex items-center justify-center font-display font-bold text-foreground/60',
          isSm ? 'w-10 h-10 text-sm' : 'w-16 h-16 text-xl'
        )}>
          {player.number}
        </div>
      </div>

      {/* Name & info */}
      <div className="px-2 pb-2 space-y-1">
        <h3 className={cn(
          'font-display font-bold leading-tight text-foreground truncate',
          isSm ? 'text-[10px]' : 'text-xs'
        )}>
          {player.name}
        </h3>
        <div className="flex items-center gap-1">
          <span className={cn(
            'text-[9px] px-1.5 py-0.5 rounded font-medium text-foreground',
            positionColors[player.position] || 'bg-muted'
          )}>
            {player.position}
          </span>
          {player.rarity !== 'common' && (
            <span className="text-[9px]">{rarityBadge[player.rarity]}</span>
          )}
        </div>
        {!isSm && (
          <p className="text-[9px] text-muted-foreground truncate">{player.country}</p>
        )}
      </div>

      {/* Duplicate count could go here */}
    </div>
  );
}
