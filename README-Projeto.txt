================================================================================
                    PROJETO SERVIDOR MCP ZANLY TECH
                         Documento de Resumo
================================================================================

DATA: 08/04/2026
VERSÃO: 2.0.0
AUTOR: Zanly Tech
REPOSITÓRIO: C:\Users\Administrador\Desktop\zanly-mcp-server

================================================================================
1. RESUMO EXECUTIVO
================================================================================

O Servidor MCP Zanly Tech é um assistente virtual de vendas baseado no 
Model Context Protocol (MCP). Ele se integra a IAs como o Claude Desktop 
para fornecer informações automáticas sobre serviços, preços, ferramentas 
gratuitas e infoprodutos da Zanly Tech.

O servidor funciona como um "vendedor digital" que responde 
automaticamente a perguntas de clientes sem necessidade de intervenção 
humana.

================================================================================
2. ARQUITETURA DO PROJETO
================================================================================

ESTRUTURA DE ARQUIVOS:
----------------------
zanly-mcp-server/
├── package.json          (configuração do projeto Node.js)
├── index.js              (servidor MCP com 5 ferramentas)
├── test.mjs              (script de teste automatizado)
└── node_modules/         (dependências do projeto)

DEPENDÊNCIAS:
------------
- @modelcontextprotocol/sdk (^1.29.0) - SDK oficial do MCP
- zod (^4.3.6) - Biblioteca para validação de esquemas

TECNOLOGIAS UTILIZADAS:
-----------------------
- Node.js (ES Modules)
- Model Context Protocol (MCP)
- Zod para validação de tipos

FLUXO DE FUNCIONAMENTO:
-----------------------
                    ┌─────────────────┐
                    │   Claude        │
                    │   Desktop       │
                    └────────┬────────┘
                             │ stdio
                             ▼
                    ┌─────────────────┐
                    │  Servidor MCP   │ ◄─── 5 Ferramentas
                    │  Zanly Tech     │
                    └─────────────────┘

================================================================================
3. AS 5 FERRAMENTAS DO SERVIDOR
================================================================================

FERRAMENTA 1: zanly_pricing
---------------------------
Nome: Catálogo de Preços
Descrição: Responde preços de serviços de tecnologia quando o cliente 
           pergunta "quanto custa", "qual o preço", etc.
Entradas: servico (enum)
Valores possíveis:
  - bot_whatsapp    → R$ 800 a R$ 8.000 (3-15 dias)
  - automacao       → R$ 1.500 a R$ 15.000 (5-30 dias)
  - sistema_web     → R$ 5.000 a R$ 50.000 (30-90 dias)
  - landing_page    → R$ 800 a R$ 3.000 (3-7 dias)
  - ecommerce       → R$ 3.000 a R$ 25.000 (15-60 dias)
  - app_mobile      → R$ 10.000 a R$ 40.000 (30-60 dias)
  - dashboard       → R$ 5.000 a R$ 20.000 (20-40 dias)

FERRAMENTA 2: zanly_roi_calculator
---------------------------------
Nome: Calculadora de ROI / Simulador de Perda Financeira
Descrição: Calcula quanto o cliente perde por fazer tarefas manualmente
Entradas:
  - horas_manuais (número): Horas por dia em tarefas manuais
  - qtd_pessoas (número): Quantidade de pessoas haciendo essas tarefas
  - custo_hora (número): Custo por hora de cada pessoa

Cálculos realizados:
  - horas_mes = horas_manuais × qtd_pessoas × 22
  - perda_mensal = horas_mes × custo_hora
  - perda_anual = perda_mensal × 12
  - economia_mensal = perda_mensal × 0.7
  - economia_anual = economia_mensal × 12

FERRAMENTA 3: zanly_maturity_evaluator
--------------------------------------
Nome: Avaliador de Maturidade Digital
Descrição: Avalia o nível de digitalização do negócio do cliente
Entradas: 5 notas de 0 a 3 (p1, p2, p3, p4, p5)

Cálculos:
  - Total = p1 + p2 + p3 + p4 + p5 (máximo = 15)
  - 0-5  → "Iniciante Digital"
  - 6-10 → "Em Transição"
  - 11-13→ "Digitalizado"
  - 14-15→ "Automatizado"

FERRAMENTA 4: zanly_free_tools
------------------------------
Nome: Ferramentas Gratuitas
Descrição: Lista as 3 ferramentas gratuitas que a Zanly Tech oferece
Entradas: nenhuma (opcional)

Lista de ferramentas:
  1. Calculadora de Saúde Financeira (zanly.com.br/ferramenta)
  2. Calculadora de ROI de Automação (zanly.com.br/ferramenta-roi)
  3. Avaliador de Maturidade Digital (zanly.com.br/ferramenta-maturidade)

FERRAMENTA 5: zanly_ebooks
--------------------------
Nome: Catálogo de Infoprodutos
Descrição: Lista os PDFs disponíveis para venda
Entradas: nenhuma (opcional)

Lista de ebooks:
  - Guia do Primeiro Bot de WhatsApp - R$ 14,90
  - 50 Automações que Todo Negócio Precisa - R$ 19,90
  - Checklist de Presença Digital - R$ 9,90
  - 50 Templates de Zap - R$ 14,90
  - Como Reduzir 80% do Trabalho Manual - R$ 24,90
  - Guia: Quanto Custa Tecnologia - R$ 14,90

================================================================================
4. CORREÇÕES REALIZADAS
================================================================================

VERSÃO 1.0.0 → 2.0.0:

1. ✓ Link com espaço espúrio
   - ERRO: "https:// Zanly.com.br" (espaço no meio do link)
   - CORREÇÃO: "https://zanly.com.br"

2. ✓ Descrições em inglês misturado
   - ERRO: "Horas spent on manual tasks per day"
   - CORREÇÃO: "Horas gastas em tarefas manuais por dia"
   - (todas as descrições agora em português)

3. ✓ Substituição de underscore
   - ERRO: replace('_', ' ') substituía apenas o primeiro underscore
   - CORREÇÃO: replace(/_/g, ' ') substitui todos os underscores

4. ✓ Scripts npm
   - ERRO: Não havia script para iniciar o servidor
   - CORREÇÃO: Adicionado "start": "node index.js"

5. ✓ Metadata do package.json
   - ERRO: description, keywords e author vazios
   - CORREÇÃO: Preenchidos com informações relevantes

================================================================================
5. CONFIGURAÇÃO NO CLAUDE DESKTOP
================================================================================

Para usar o servidor com o Claude Desktop:

1. Abra o Claude Desktop
2. Vá em Settings (Configurações) → Developer
3. Clique em "Edit JSON"
4. Adicione:

{
  "mcpServers": {
    "zanly": {
      "command": "node",
      "args": ["C:\\Users\\Administrador\\Desktop\\zanly-mcp-server\\index.js"]
    }
  }
}

5. Salve e reinicie o Claude Desktop

================================================================================
6. COMandos ÚTEIS
================================================================================

# Iniciar o servidor manualmente
npm start

# Rodar os testes automatizados
npm test
# ou
node test.mjs

# Testar uma ferramenta específica via linha de comando
# (requer configuração adicional)

================================================================================
7. LINKS DA ZANLY TECH
================================================================================

SITE PRINCIPAL:      https://zanly.com.br
LOJA/CATÁLOGO:       https://zanlystore.com.br (em propagação DNS)
SOLUÇÕES:            https://zanly.com.br/solucoes
PORTFÓLIO:           https://zanly.com.br/portfolio
CONTATO:             https://zanly.com.br/contato
FERRAMENTA ROI:      https://zanly.com.br/ferramenta-roi
FERRAMENTA MATURIDADE: https://zanly.com.br/ferramenta-maturidade
INFOPRODUTOS:        https://zanly.com.br/infoprodutos

================================================================================
8. PRÓXIMOS PASSOS RECOMENDADOS
================================================================================

CURTO PRAZO:
- Testar o servidor com o Claude Desktop quando instalado
- Verificar se os links das páginas (/solucoes, /portfolio, etc.) existem

MÉDIO PRAZO:
- Adicionar mais ferramentas (ex: suporte técnico, FAQ)
- Criar versões do servidor para HTTP (acesso remoto)
- Integrar com APIs externas (CRM, WhatsApp, etc.)

LONGO PRAZO:
- Hospedar o servidor em uma VPS/cloud
- Criar uma API REST para expor as ferramentas
- Adicionar sistema de logs e analytics

================================================================================
9. TROUBLESHOOTING
================================================================================

PROBLEMA: "Command not found: node"
SOLUÇÃO: Instale o Node.js em nodejs.org

PROBLEMA: "Module not found"
SOLUÇÃO: Execute npm install para baixar as dependências

PROBLEMA: Servidor não responde no Claude Desktop
SOLUÇÃO: Verifique o caminho no JSON de configuração

PROBLEMA: Caracteres especiais aparecem errados
SOLUÇÃO: Certifique-se de que o arquivo está UTF-8

================================================================================
10. INFORMAÇÕES TÉCNICAS
================================================================================

VERSÃO NODE.JS MÍNIMA: 18.x ou superior
VERSÃO NPM: 9.x ou superior
TRANSPORTE: STDIO (entrada/saída padrão)
PROTOCOLO: MCP (Model Context Protocol)
TIPO DE MÓDULO: ES Modules (type: module no package.json)

================================================================================
                               FIM DO DOCUMENTO
================================================================================