import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, BookOpen, Brain, LogOut, Store } from 'lucide-react';

interface Album {
  id: string;
  name: string;
  description: string | null;
  cover_image_url: string | null;
}

export default function Home() {
  const { user, displayName, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    supabase.from('albums').select('*').eq('is_active', true).then(({ data }) => {
      if (data) setAlbums(data);
    });
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-primary" />
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground tracking-wider leading-none">
                STICKR
              </h1>
              <p className="text-[10px] text-primary font-display tracking-[0.3em]">
                COLECIONE & GANHE
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Olá, <span className="text-foreground font-medium">{displayName || 'Colecionador'}</span>
            </span>
            {userRole === 'establishment' && (
              <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')} className="font-display text-xs tracking-wider">
                <Store className="w-4 h-4 mr-1" />
                PAINEL
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card
            className="bg-card border-border cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => navigate('/quiz')}
          >
            <CardContent className="flex flex-col items-center gap-3 py-6">
              <Brain className="w-10 h-10 text-primary" />
              <span className="font-display text-sm tracking-wider text-foreground">JOGADOR DO DIA</span>
              <span className="text-xs text-muted-foreground">Acerte e ganhe figurinhas</span>
            </CardContent>
          </Card>
          <Card
            className="bg-card border-border cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => albums.length > 0 && navigate(`/album/${albums[0]?.id}`)}
          >
            <CardContent className="flex flex-col items-center gap-3 py-6">
              <BookOpen className="w-10 h-10 text-accent" />
              <span className="font-display text-sm tracking-wider text-foreground">MEUS ÁLBUNS</span>
              <span className="text-xs text-muted-foreground">{albums.length} disponíveis</span>
            </CardContent>
          </Card>
        </div>

        {/* Albums list */}
        <div>
          <h2 className="font-display text-xl font-bold text-foreground tracking-wider mb-4">
            ÁLBUNS DISPONÍVEIS
          </h2>

          {albums.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="flex flex-col items-center gap-3 py-12">
                <BookOpen className="w-12 h-12 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">Nenhum álbum disponível ainda.</p>
                <p className="text-muted-foreground text-xs">Em breve teremos novidades!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {albums.map(album => (
                <Card
                  key={album.id}
                  className="bg-card border-border cursor-pointer hover:border-primary/50 transition-colors overflow-hidden"
                  onClick={() => navigate(`/album/${album.id}`)}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                      <Trophy className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg font-bold text-foreground tracking-wider truncate">
                        {album.name}
                      </h3>
                      {album.description && (
                        <p className="text-sm text-muted-foreground truncate">{album.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
