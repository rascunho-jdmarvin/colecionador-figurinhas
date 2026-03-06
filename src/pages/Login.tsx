import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, User, Store, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register state
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regRole, setRegRole] = useState<'user' | 'establishment'>('user');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn(loginEmail, loginPassword);
    setIsLoading(false);
    if (error) {
      toast.error('Erro ao entrar: ' + error.message);
    } else {
      navigate('/home');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signUp(regEmail, regPassword, regName, regRole);
    setIsLoading(false);
    if (error) {
      toast.error('Erro ao cadastrar: ' + error.message);
    } else {
      toast.success('Conta criada! Verifique seu email para confirmar.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="w-10 h-10 text-primary" />
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground tracking-wider leading-none">
            STICKR
          </h1>
          <p className="text-[10px] text-primary font-display tracking-[0.3em]">
            COLECIONE & GANHE
          </p>
        </div>
      </div>

      <Card className="w-full max-w-md bg-card border-border">
        <Tabs defaultValue="login">
          <CardHeader className="pb-2">
            <TabsList className="w-full grid grid-cols-2 bg-secondary">
              <TabsTrigger value="login" className="font-display tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                ENTRAR
              </TabsTrigger>
              <TabsTrigger value="register" className="font-display tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                CADASTRAR
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent>
            {/* LOGIN */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Senha</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full font-display tracking-wider" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'ENTRAR'}
                </Button>
              </form>
            </TabsContent>

            {/* REGISTER */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Role selection */}
                <div className="space-y-2">
                  <Label>Tipo de conta</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRegRole('user')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        regRole === 'user'
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      <User className={`w-8 h-8 ${regRole === 'user' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`font-display text-sm tracking-wider ${regRole === 'user' ? 'text-primary' : 'text-muted-foreground'}`}>
                        COLECIONADOR
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegRole('establishment')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        regRole === 'establishment'
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      <Store className={`w-8 h-8 ${regRole === 'establishment' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`font-display text-sm tracking-wider ${regRole === 'establishment' ? 'text-primary' : 'text-muted-foreground'}`}>
                        ESTABELECIMENTO
                      </span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-name">
                    {regRole === 'user' ? 'Seu nome' : 'Nome do estabelecimento'}
                  </Label>
                  <Input
                    id="reg-name"
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder={regRole === 'user' ? 'João Silva' : 'Pizzaria do Zé'}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Senha</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    minLength={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full font-display tracking-wider" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'CRIAR CONTA'}
                </Button>
              </form>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      <p className="text-muted-foreground text-xs mt-6 text-center max-w-sm">
        Colecione figurinhas especiais e ganhe descontos nos seus estabelecimentos favoritos.
      </p>
    </div>
  );
}
