# Zanly Tech MCP

Servidor MCP (Model Context Protocol) da Zanly Tech - Um consultor virtual 24/7 especializado em bots, automatizações e sistemas web sob medida.

## O que é o MCP?

O [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) é um protocolo aberto que permite que ferramentas de IA se conectem a fontes de dados e serviços externos. Este servidor transforma a Zanly Tech em um assistente virtual disponível para qualquer cliente ou ferramenta que utilize o protocolo MCP.

## Funcionalidades

Este servidor MCP oferece 8 ferramentas para auxiliar prospects e clientes:

| Ferramenta | Descrição |
|------------|------------|
| `zanly_about` | Informações completas sobre a Zanly Tech |
| `zanly_cases` | Casos de sucesso e portfólio |
| `zanly_qualify` | Diagnóstico e qualificação de leads |
| `zanly_pricing` | Tabela de preços de serviços |
| `zanly_roi_calculator` | Calculadora de ROI para automação |
| `zanly_maturity_evaluator` | Avaliador de maturidade digital |
| `zanly_free_tools` | Ferramentas gratuitas disponíveis |
| `zanly_ebooks` | Catálogo de ebooks e infoprodutos |

## Uso Local

```bash
# Instalar dependências
npm install

# Iniciar o servidor
npm start
```

## Configuração no Smithery.ai

Este servidor está publicado no [Smithery.ai](https://smithery.ai/servers/victor-zanardo-wy1b/zanly-tech) e pode ser conectado diretamente a clientes MCP como:

- Claude Desktop
- Cursor
- Windsurf
- Outros clientes MCP

### Configuração STDIO (Recomendado)

Para clientes que suportam STDIO, configure:

```json
{
  "mcpServers": {
    "zanly-tech": {
      "command": "node",
      "args": ["index.js"],
      "env": {}
    }
  }
}
```

## Tecnologias

- **Runtime**: Node.js 18+
- **SDK**: @modelcontextprotocol/sdk
- **Validação**: Zod

## Sobre a Zanly Tech

A Zanly Tech é uma empresa especializada em soluções digitais sob medida:

- Bots de WhatsApp
- Automações (Zapier, Make, n8n)
- Sistemas Web
- E-commerce
- Landing Pages

**Contato**: https://zanly.com.br/contato

## Licença

MIT