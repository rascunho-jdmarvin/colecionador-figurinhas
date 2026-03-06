

# Plano MVP - Plataforma de Figurinhas com Fidelidade

## Visao Geral

Transformar o protótipo atual em um produto real com autenticação, múltiplos álbuns, quiz diário, sistema de trocas e figurinhas geolocalizadas de estabelecimentos. Backend com Supabase (Cloud).

---

## Arquitetura de Telas

```text
/login          -> Login/Cadastro (usuário ou estabelecimento)
/home           -> Lista de álbuns disponíveis + stats do usuário
/album/:id      -> Álbum específico (atual Copa do Mundo, etc.)
  - aba Pacotes (abrir card diário)
  - aba Álbum (visualizar coleção + trocar)
/quiz           -> Jogador do Dia (dicas progressivas)
/dashboard      -> Painel do estabelecimento (criar figurinhas, ver métricas)
```

---

## Banco de Dados (Supabase)

**Tabelas principais:**

- `profiles` - dados do usuário (nome, avatar, tipo: user/establishment)
- `user_roles` - roles separadas (user, establishment, admin) conforme regras de segurança
- `albums` - álbuns disponíveis (Copa do Mundo, Libertadores, etc.)
- `album_players` - figurinhas de cada álbum (nome, nome alternativo/caricatura, raridade, país, posição, imagem)
- `user_collections` - figurinhas coletadas por usuário por álbum (com contagem de duplicatas)
- `daily_packs` - controle de 1 abertura por dia por usuário
- `trades` - sistema de trocas entre usuários
- `quiz_daily` - jogador do dia + dicas
- `quiz_attempts` - tentativas do usuário no quiz
- `establishment_stickers` - figurinhas especiais criadas por estabelecimentos (com lat/lng para geolocalização, desconto/produto vinculado)

**RLS:** Cada tabela com políticas restritivas. Roles via função `has_role()` security definer.

---

## Funcionalidades por Fase

### Fase 1 - Infraestrutura (primeiro passo)
- Conectar Supabase/Cloud
- Criar schema do banco (migrations)
- Autenticação com email (login/cadastro com seleção de tipo: usuário ou estabelecimento)
- Tela de login com UI

### Fase 2 - Home + Álbuns
- Tela Home com lista de álbuns (cards visuais)
- Stats do usuário (total coletado, dias seguidos, etc.)
- Navegação para álbum específico
- Migrar dados atuais de Copa do Mundo para o banco

### Fase 3 - Abertura de Pacotes (refatorar)
- Limite de 1 pack/dia (controlado no banco)
- Animação de abertura existente mantida
- Salvar cards no `user_collections`
- Desbloqueio de packs extras via quiz/desafios

### Fase 4 - Álbum + Trocas
- Visualização do álbum (refatorar componente atual para ler do banco)
- Sistema de trocas: listar duplicatas, propor troca, aceitar/recusar
- Nomes alternativos e caricaturas nos cards (campo `nickname` em `album_players`)

### Fase 5 - Quiz Jogador do Dia
- Tela de quiz com dicas progressivas (país, posição, clube, rating, etc.)
- 1 jogador por dia (igual para todos)
- Acertar = ganhar 1 figurinha bônus
- Máximo de tentativas por dia

### Fase 6 - Painel do Estabelecimento
- Dashboard para criar figurinhas especiais com desconto/produto vinculado
- Definir localização (lat/lng) do estabelecimento
- Figurinhas só aparecem para usuários próximos (Geolocation API do browser + filtro no banco)

---

## Detalhes Técnicos

- **Geolocalização**: Browser Geolocation API para obter coordenadas do usuário. Query no Supabase filtrando por distância (PostGIS ou cálculo simples lat/lng).
- **Nomes alternativos**: Campo `nickname` na tabela `album_players` (ex: "A Besta Enjaulada" para Cristiano).
- **Imagens/caricaturas**: Campo `image_url` em `album_players`. Inicialmente placeholder, designers fazem upload depois via Storage do Supabase.
- **1 pack por dia**: Tabela `daily_packs` com `user_id + date` unique constraint. RLS impede múltiplas aberturas.
- **Quiz**: Edge function ou tabela `quiz_daily` preenchida diariamente. Dicas reveladas progressivamente no frontend.

---

## Primeira Implementação

Vou começar pela **Fase 1**: conectar Supabase, criar o schema do banco, e montar a tela de login com seleção de tipo (usuário/estabelecimento). Depois seguimos fase por fase.

Preciso que você **conecte o Supabase** (ou ative o Lovable Cloud) para eu prosseguir com a criação do banco de dados.

