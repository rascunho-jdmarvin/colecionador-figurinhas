import { Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export default function Quiz() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/home')} className="font-display tracking-wider">
            ← VOLTAR
          </Button>
          <h1 className="font-display text-lg font-bold text-foreground tracking-wider">
            JOGADOR DO DIA
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="bg-card border-border">
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <Trophy className="w-16 h-16 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground tracking-wider">EM BREVE</h2>
            <p className="text-muted-foreground text-sm text-center max-w-sm">
              O Quiz Jogador do Dia estará disponível em breve. Acerte dicas progressivas e ganhe figurinhas bônus!
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
