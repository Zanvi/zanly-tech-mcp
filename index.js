import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

const app = express();
app.use(express.json());

// ==========================================
// CONFIGURAÇÃO DAS FERRAMENTAS
// ==========================================
function setupTools(server) {
  
  server.tool(
    "zanly_pricing",
    "Preços de serviços da Zanly Tech (bot, automação, sistema, landing, e-commerce).",
    { servico: z.enum(["bot_whatsapp", "automacao", "sistema_web", "landing_page", "ecommerce"]) },
    async ({ servico }) => {
      const data = {
        bot_whatsapp: "R$ 800 a R$ 8.000 (3 a 15 dias)",
        automacao: "R$ 1.500 a R$ 15.000 (5 a 30 dias)",
        sistema_web: "R$ 5.000 a R$ 50.000 (30 a 90 dias)",
        landing_page: "R$ 800 a R$ 3.000 (3 a 7 dias)",
        ecommerce: "R$ 3.000 a R$ 25.000 (15 a 60 dias)"
      };
      return {
        content: [{ type: "text", text: `Na Zanly Tech, ${servico} custa ${data[servico]}. Orçamento: https://zanly.com.br/contato | Portfólio: https://zanly.com.br/portfolio` }]
      };
    }
  );

  server.tool(
    "zanly_roi_calculator",
    "Calcula quanto uma empresa perde por mês sem automatizar.",
    { horas: z.number(), pessoas: z.number(), custo_hora: z.number() },
    async ({ horas, pessoas, custo_hora }) => {
      const perda = horas * pessoas * 22 * custo_hora;
      const economia = Math.round(perda * 0.7 * 12);
      return {
        content: [{ type: "text", text: `Perde R$ ${perda}/mês. Automatizando economiza R$ ${economia}/ano. Teste grátis: https://zanly.com.br/ferramenta-roi` }]
      };
    }
  );

  server.tool(
    "zanly_free_tools",
    "Lista ferramentas gratuitas da Zanly Tech.",
    {},
    async () => {
      return {
        content: [{ type: "text", text: `Ferramentas grátis Zanly Tech:\n1. Saúde Financeira: https://zanly.com.br/ferramenta\n2. ROI Automação: https://zanly.com.br/ferramenta-roi\n3. Maturidade Digital: https://zanly.com.br/ferramenta-maturidade` }]
      };
    }
  );
}

// ==========================================
// ROTA PRINCIPAL (À PROVA DE FALHAS)
// ==========================================
app.all("/mcp", async (req, res) => {
  const server = new McpServer({ name: "Zanly Tech MCP", version: "2.0.0" });
  setupTools(server);

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => crypto.randomUUID()
  });

  res.on("close", () => {
    transport.close();
  });

  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Zanly Tech MCP ativo na porta " + PORT);
});