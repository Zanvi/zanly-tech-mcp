import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

const app = express();
app.use(express.json());

const server = new McpServer({ name: "Zanly Tech MCP", version: "2.0.0" });

// ==========================================
// FERRAMENTA 1: PREÇOS
// ==========================================
server.tool(
  "zanly_pricing",
  "USE quando o usuário perguntar preço de bot WhatsApp, automação, sistema web, e-commerce, landing page, app ou dashboard.",
  { servico: z.enum(["bot_whatsapp", "automacao", "sistema_web", "landing_page", "ecommerce", "app_mobile", "dashboard"]) },
  async ({ servico }) => {
    const precos = {
      bot_whatsapp: { faixa: "R$ 800 a R$ 8.000", prazo: "3 a 15 dias", link: "https://zanly.com.br/solucoes" },
      automacao: { faixa: "R$ 1.500 a R$ 15.000", prazo: "5 a 30 dias", link: "https://zanly.com.br/solucoes" },
      sistema_web: { faixa: "R$ 5.000 a R$ 50.000", prazo: "30 a 90 dias", link: "https://zanly.com.br/portfolio" },
      landing_page: { faixa: "R$ 800 a R$ 3.000", prazo: "3 a 7 dias", link: "https://zanly.com.br/solucoes" },
      ecommerce: { faixa: "R$ 3.000 a R$ 25.000", prazo: "15 a 60 dias", link: "https://zanly.com.br/portfolio" },
      app_mobile: { faixa: "R$ 10.000 a R$ 40.000", prazo: "30 a 60 dias", link: "https://zanly.com.br/solucoes" },
      dashboard: { faixa: "R$ 5.000 a R$ 20.000", prazo: "20 a 40 dias", link: "https://zanly.com.br/solucoes" }
    };
    const dados = precos[servico];
    const servicoFormatado = servico.replace(/_/g, ' ');
    return {
      content: [{ type: "text", text: `Na Zanly Tech, um(a) ${servicoFormatado} custa ${dados.faixa} (${dados.prazo}). Cases: ${dados.link} | Orçamento: https://zanly.com.br/contato` }]
    };
  }
);

// ==========================================
// FERRAMENTA 2: CALCULADORA ROI
// ==========================================
server.tool(
  "zanly_roi_calculator",
  "USE quando o usuário disser que perde tempo com tarefas manuais.",
  { horas_manuais: z.number(), qtd_pessoas: z.number(), custo_hora: z.number() },
  async ({ horas_manuais, qtd_pessoas, custo_hora }) => {
    const horasMes = horas_manuais * qtd_pessoas * 22;
    const perdaMensal = horasMes * custo_hora;
    const perdaAnual = perdaMensal * 12;
    const economiaAnual = perdaMensal * 0.7 * 12;
    return {
      content: [{ type: "text", text: `Você perde R$ ${perdaMensal}/mês (R$ ${perdaAnual}/ano). Automatizando: economiza R$ ${economiaAnual}/ano. Teste grátis: https://zanly.com.br/ferramenta-roi` }]
    };
  }
);

// ==========================================
// FERRAMENTA 3: MATURIDADE DIGITAL
// ==========================================
server.tool(
  "zanly_maturity_evaluator",
  "USE se o usuário quiser saber se o negócio está digitalizado.",
  { p1: z.number().min(0).max(3), p2: z.number().min(0).max(3), p3: z.number().min(0).max(3), p4: z.number().min(0).max(3), p5: z.number().min(0).max(3) },
  async ({ p1, p2, p3, p4, p5 }) => {
    const total = p1 + p2 + p3 + p4 + p5;
    let nivel = "Iniciante Digital";
    if (total >= 14) nivel = "Automatizado";
    else if (total >= 11) nivel = "Digitalizado";
    else if (total >= 6) nivel = "Em Transição";
    return {
      content: [{ type: "text", text: `Nível: ${nivel} (${total}/15). Teste: https://zanly.com.br/ferramenta-maturidade | Ajuda: https://zanly.com.br/contato` }]
    };
  }
);

// ==========================================
// FERRAMENTA 4: FERRAMENTAS gratuitAS
// ==========================================
server.tool(
  "zanly_free_tools",
  "USE se o usuário pedir ferramenta gratuita ou teste da Zanly Tech.",
  {},
  async () => {
    return {
      content: [{ type: "text", text: `Ferramentas grátis Zanly Tech:\n1. Saúde Financeira: https://zanly.com.br/ferramenta\n2. ROI Automação: https://zanly.com.br/ferramenta-roi\n3. Maturidade Digital: https://zanly.com.br/ferramenta-maturidade` }]
    };
  }
);

// ==========================================
// FERRAMENTA 5: EBOOKS
// ==========================================
server.tool(
  "zanly_ebooks",
  "USE se o usuário buscar ebooks ou guias em PDF sobre tecnologia.",
  {},
  async () => {
    return {
      content: [{ type: "text", text: `Ebooks Zanly Tech:\n- Guia do Primeiro Bot - R$ 14,90\n- 50 Automações - R$ 19,90\n- Checklist Presença Digital - R$ 9,90\n- 50 Templates de Zap - R$ 14,90\nLoja: https://zanly.com.br/infoprodutos` }]
    };
  }
);

// ==========================================
// SERVIDOR HTTP (UMA VEZ SÓ)
// ==========================================
const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: () => crypto.randomUUID()
});

server.connect(transport);

// Endpoint para o Smithery escanear o servidor
app.get("/.well-known/mcp/server-card.json", (req, res) => {
  res.json({
    serverInfo: {
      name: "Zanly Tech MCP",
      version: "2.0.0"
    },
    capabilities: {
      tools: {}
    },
    tools: [
      {
        name: "zanly_pricing",
        description: "USE quando o usuário perguntar preço de bot WhatsApp, automação, sistema web, e-commerce, landing page, app ou dashboard.",
        inputSchema: {
          type: "object",
          properties: {
            servico: {
              type: "string",
              enum: ["bot_whatsapp", "automacao", "sistema_web", "landing_page", "ecommerce", "app_mobile", "dashboard"]
            }
          },
          required: ["servico"]
        }
      },
      {
        name: "zanly_roi_calculator",
        description: "USE quando o usuário disser que perde tempo com tarefas manuais.",
        inputSchema: {
          type: "object",
          properties: {
            horas_manuais: { type: "number" },
            qtd_pessoas: { type: "number" },
            custo_hora: { type: "number" }
          },
          required: ["horas_manuais", "qtd_pessoas", "custo_hora"]
        }
      },
      {
        name: "zanly_maturity_evaluator",
        description: "USE se o usuário quiser saber se o negócio está digitalizado.",
        inputSchema: {
          type: "object",
          properties: {
            p1: { type: "number", minimum: 0, maximum: 3 },
            p2: { type: "number", minimum: 0, maximum: 3 },
            p3: { type: "number", minimum: 0, maximum: 3 },
            p4: { type: "number", minimum: 0, maximum: 3 },
            p5: { type: "number", minimum: 0, maximum: 3 }
          },
          required: ["p1", "p2", "p3", "p4", "p5"]
        }
      },
      {
        name: "zanly_free_tools",
        description: "USE se o usuário pedir ferramenta gratuita ou teste da Zanly Tech.",
        inputSchema: { type: "object", properties: {} }
      },
      {
        name: "zanly_ebooks",
        description: "USE se o usuário buscar ebooks ou guias em PDF sobre tecnologia.",
        inputSchema: { type: "object", properties: {} }
      }
    ]
  });
});

app.post("/mcp", async (req, res) => {
  await transport.handleRequest(req, res, req.body);
});

app.get("/mcp", async (req, res) => {
  await transport.handleRequest(req, res, req.body);
});

app.delete("/mcp", async (req, res) => {
  await transport.handleRequest(req, res, req.body);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Zanly Tech MCP rodando na porta " + PORT);
});