# Controle de páginas programáticas — DoctorChatBot

Gerado a partir de `src/data/landingPages.ts`. Atualizar aqui sempre que um nicho ou local novo for adicionado — não é lido pelo código, é só controle manual.

## Nicho: Clínicas Médicas (`clinicas-medicas`)

### Nível estado (20 páginas) — slug `chatbot-para-clinicas-medicas-{estado}`

| # | Estado | UF | Slug | Imagem | Parceiro (Codexy) |
|---|---|---|---|---|---|
| 1 | São Paulo | SP | `sao-paulo` | ✅ | ✅ piloto |
| 2 | Rio de Janeiro | RJ | `rio-de-janeiro` | ✅ | ✅ piloto |
| 3 | Minas Gerais | MG | `minas-gerais` | ✅ | — |
| 4 | Bahia | BA | `bahia` | ✅ | — |
| 5 | Rio Grande do Sul | RS | `rio-grande-do-sul` | ✅ | — |
| 6 | Paraná | PR | `parana` | ✅ | — |
| 7 | Pernambuco | PE | `pernambuco` | ✅ | — |
| 8 | Ceará | CE | `ceara` | — | — |
| 9 | Pará | PA | `para` | — | — |
| 10 | Santa Catarina | SC | `santa-catarina` | — | — |
| 11 | Maranhão | MA | `maranhao` | — | — |
| 12 | Goiás | GO | `goias` | — | — |
| 13 | Amazonas | AM | `amazonas` | — | — |
| 14 | Espírito Santo | ES | `espirito-santo` | — | — |
| 15 | Paraíba | PB | `paraiba` | — | — |
| 16 | Rio Grande do Norte | RN | `rio-grande-do-norte` | — | — |
| 17 | Mato Grosso | MT | `mato-grosso` | — | — |
| 18 | Alagoas | AL | `alagoas` | — | — |
| 19 | Piauí | PI | `piaui` | — | — |
| 20 | Distrito Federal | DF | `distrito-federal` | — | — |

### Nível cidade/capital (20 páginas) — slug `chatbot-para-clinicas-medicas-cidade-{capital}`

Ângulo de conteúdo diferente do nível estado (bairros/zonas da capital, não repete o texto da página de estado). Nenhuma tem imagem própria nem bloco de parceiro ainda — decisão: não escalar parceiro pra essa camada por enquanto (ver CLAUDE.md).

| # | Capital | UF | Estado (ref) | Slug |
|---|---|---|---|---|
| 1 | São Paulo | SP | `sao-paulo` | `cidade-sao-paulo` |
| 2 | Rio de Janeiro | RJ | `rio-de-janeiro` | `cidade-rio-de-janeiro` |
| 3 | Belo Horizonte | MG | `minas-gerais` | `cidade-belo-horizonte` |
| 4 | Salvador | BA | `bahia` | `cidade-salvador` |
| 5 | Porto Alegre | RS | `rio-grande-do-sul` | `cidade-porto-alegre` |
| 6 | Curitiba | PR | `parana` | `cidade-curitiba` |
| 7 | Recife | PE | `pernambuco` | `cidade-recife` |
| 8 | Fortaleza | CE | `ceara` | `cidade-fortaleza` |
| 9 | Belém | PA | `para` | `cidade-belem` |
| 10 | Florianópolis | SC | `santa-catarina` | `cidade-florianopolis` |
| 11 | São Luís | MA | `maranhao` | `cidade-sao-luis` |
| 12 | Goiânia | GO | `goias` | `cidade-goiania` |
| 13 | Manaus | AM | `amazonas` | `cidade-manaus` |
| 14 | Vitória | ES | `espirito-santo` | `cidade-vitoria` |
| 15 | João Pessoa | PB | `paraiba` | `cidade-joao-pessoa` |
| 16 | Natal | RN | `rio-grande-do-norte` | `cidade-natal` |
| 17 | Cuiabá | MT | `mato-grosso` | `cidade-cuiaba` |
| 18 | Maceió | AL | `alagoas` | `cidade-maceio` |
| 19 | Teresina | PI | `piaui` | `cidade-teresina` |
| 20 | Brasília | DF | `distrito-federal` | `cidade-brasilia` |

**Nota de risco (São Paulo, Rio de Janeiro, Brasília):** capital tem nome igual ou quase igual ao do estado (Brasília ≈ Distrito Federal). Página de capital usa ângulo hiperlocal (bairros/zonas) pra reduzir sobreposição com a página de estado, mas são os 3 pares com maior risco de canibalização de palavra-chave — se notar as duas páginas competindo pela mesma busca no Search Console, considerar fundir ou despriorizar uma das duas.

## Total atual

- 40 páginas (20 estado + 20 capital), 1 nicho.
- Teto combinado de 60 páginas antes de discutir de novo (ver CLAUDE.md) — sobra espaço pra ~20 páginas antes de precisar reavaliar.

## Próximo nicho (não iniciado)

Nenhum ainda. Se adicionar nicho novo, copiar o padrão de `CLINICAS_MEDICAS` em `src/data/landingPages.ts` e atualizar as duas tabelas acima.
