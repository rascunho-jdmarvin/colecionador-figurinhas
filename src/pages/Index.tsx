import { useState, useCallback } from 'react';
import { Player } from '@/data/players';
import { PackOpening } from '@/components/PackOpening';
import { AlbumView } from '@/components/AlbumView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Package, Trophy } from 'lucide-react';

const Index = () => {
  const [collection, setCollection] = useState<Set<number>>(new Set());
  const [duplicates, setDuplicates] = useState<Record<number, number>>({});
  const [packsOpened, setPacksOpened] = useState(0);
  const [activeTab, setActiveTab] = useState('pack');

  const handleCardsCollected = useCallback((cards: Player[]) => {
    setCollection(prev => {
      const next = new Set(prev);
      const newDupes = { ...duplicates };

      cards.forEach(card => {
        if (next.has(card.id)) {
          newDupes[card.id] = (newDupes[card.id] || 0) + 1;
        } else {
          next.add(card.id);
        }
      });

      setDuplicates(newDupes);
      return next;
    });
    setPacksOpened(p => p + 1);
  }, [duplicates]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-primary" />
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground tracking-wider leading-none">
                COPA DO MUNDO
              </h1>
              <p className="text-[10px] text-primary font-display tracking-[0.3em]">
                ÁLBUM DE FIGURINHAS
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-display text-sm text-muted-foreground">Coleção</p>
            <p className="font-display text-lg font-bold text-primary">
              {collection.size}/43
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-card border border-border mb-6">
            <TabsTrigger
              value="pack"
              className="font-display tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Package className="w-4 h-4 mr-2" />
              PACOTES
            </TabsTrigger>
            <TabsTrigger
              value="album"
              className="font-display tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              ÁLBUM
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pack">
            <PackOpening
              onCardsCollected={handleCardsCollected}
              packsOpened={packsOpened}
            />
          </TabsContent>

          <TabsContent value="album">
            <AlbumView collection={collection} duplicates={duplicates} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
