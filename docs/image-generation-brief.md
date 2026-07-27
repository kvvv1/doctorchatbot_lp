# Brief de imagens — 20 páginas "Clínicas Médicas × Estado"

Pra Codex (ou qualquer gerador de imagem). Objetivo: 20 hero images únicas visualmente — não é só trocar nome do estado no texto, a imagem também precisa parecer de outro lugar, senão reforça sinal de conteúdo clonado.

## Estilo base (repetir em todo prompt, só troca a variável do estado)

```
Ilustração digital flat/vetorial, estilo clean corporativo saúde-tech.
Cena: recepção de clínica médica moderna, tons predominantes azul petróleo
(#146B70) e branco, luz natural, sem texto na imagem, sem logotipos reais,
sem rostos de pessoas reais/reconhecíveis (usar silhuetas ou personagens
ilustrados genéricos). Ao fundo, elemento sutil que remete à região:
{VARIAVEL_REGIONAL}. Proporção 16:9, alta resolução, sem marca d'água.
```

`{VARIAVEL_REGIONAL}` — usar só como referência estilística de fundo (silhueta/paleta/vegetação), nunca reproduzir marca, logo, obra arquitetônica protegida ou pessoa real:

| # | Estado (slug) | Variável regional (estilo, não landmark literal) |
|---|---|---|
| 1 | São Paulo (`sao-paulo`) | skyline genérico de metrópole, prédios altos cinza-azulados |
| 2 | Rio de Janeiro (`rio-de-janeiro`) | silhueta de morros verdes ao fundo, luz quente de litoral |
| 3 | Minas Gerais (`minas-gerais`) | colinas suaves, arquitetura colonial estilizada ao longe |
| 4 | Bahia (`bahia`) | paleta mais quente, elementos de litoral tropical, vegetação de coqueiro estilizada |
| 5 | Rio Grande do Sul (`rio-grande-do-sul`) | campo aberto, luz mais fria/cinza, arquitetura europeia estilizada |
| 6 | Paraná (`parana`) | araucárias estilizadas ao fundo, luz de clima temperado |
| 7 | Pernambuco (`pernambuco`) | litoral nordestino, tons de areia clara e azul turquesa |
| 8 | Ceará (`ceara`) | dunas estilizadas, luz forte de sol, paleta areia/azul |
| 9 | Pará (`para`) | vegetação amazônica estilizada, verde denso ao fundo |
| 10 | Santa Catarina (`santa-catarina`) | litoral sul, arquitetura de praia estilizada, tons pastéis |
| 11 | Maranhão (`maranhao`) | luz quente, arquitetura colonial colorida estilizada ao fundo |
| 12 | Goiás (`goias`) | cerrado estilizado, tons terrosos, céu aberto |
| 13 | Amazonas (`amazonas`) | rio largo ao fundo, vegetação densa, paleta verde-azulada |
| 14 | Espírito Santo (`espirito-santo`) | litoral com morros, paleta verde-azul suave |
| 15 | Paraíba (`paraiba`) | luz nordestina, tons terrosos claros |
| 16 | Rio Grande do Norte (`rio-grande-do-norte`) | dunas e litoral, paleta clara |
| 17 | Mato Grosso (`mato-grosso`) | pantanal/cerrado estilizado, tons verdes e dourados |
| 18 | Alagoas (`alagoas`) | litoral tropical claro, paleta turquesa |
| 19 | Piauí (`piaui`) | tons terrosos/cerrado, luz quente |
| 20 | Distrito Federal (`distrito-federal`) | linhas arquitetônicas modernistas estilizadas (sem reproduzir prédio real específico), paleta neutra |

## Especificação de output

- Formato: `.webp` (fallback `.jpg`), 1600×900px, otimizado < 200KB.
- Nome do arquivo: `public/images/clinicas-medicas/{slug-do-estado}.webp` — bate com o slug de `StateInfo` em `landingPages.ts`.
- Alt text (gerar junto, varia por estado): `"Recepção de clínica médica moderna em {Estado} — DoctorChatBot"`.
- 1 imagem OG separada por página é opcional na v1 — pode reusar a hero como OG image (`og-image` = mesma arte, crop 1200×630).

## Ordem de entrega sugerida

Gerar em lotes de 5 (bate com deploy incremental) — ordem da tabela acima já é por prioridade (SP/RJ/MG/BA primeiro = maior volume de busca/tráfego pago esperado).

Depois de gerar, colocar os arquivos em `public/images/clinicas-medicas/` com o nome exato do slug — o build já vai referenciar por convenção, sem precisar editar código por imagem.
