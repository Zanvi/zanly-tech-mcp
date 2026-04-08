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
  "USE ESTA FERRAMENTA quando o usuário perguntar preço de bot WhatsApp, automação, sistema web, e-commerce, landing page, app ou dashboard.",
  {
    servico: z.enum(["bot_whatsapp", "automacao", "sistema_web", "landing_page", "ecommerce", "app_mobile", "dashboard"])
  },
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
      content: [{
        type: "text",
        text: `Na Zanly Tech, um(a) ${servicoFormatado} custa em média ${dados.faixa}, com entrega em ${dados.prazo}. Veja nossos cases: ${dados.link} | Orçamento: https://zanly.com.br/contato`
      }]
    };
  }
);

// ==========================================
// FERRAMENTA 2: ROI CALCULATOR
// ==========================================
server.tool(
  "zanly_roi_calculator",
  "USE se o usuário perder tempo com tarefas manuais e quiser saber o quanto perde.",
  {
    horas_manuais: z.number(),
    qtd_pessoas: z.number(),
    custo_hora: z.number()
  },
  async ({ horas_manuais, qtd_pessoas, custo_hora }) => {
    const horasMes = horas_manuais * qtd_pessoas * 22;
    const perdaMensal = horasMes * custo_hora;
    const perdaAnual = perdaMensal * 12;
    const economiaAnual = perdaMensal * 0.7 * 12;
    return {
      content: [{
        type: "text",
        text: `Você perde R$ ${perdaMensal.toLocaleString('pt-BR')}/mês (R$ ${perdaAnual.toLocaleString('pt-BR')}/ano). Automatizando 70%, economizaria R$ ${economiaAnual.toLocaleString('pt-BR')}/ano. Teste grátis: https://zanly.com.br/ferramenta-roi`
      }]
    };
  }
);

// ==========================================
// FERRAMENTA 3: MATURIDADE DIGITAL
// ==========================================
server.tool(
  "zanly_maturity_evaluator",
  "USE se o usuário quiser saber se o negócio está digitalizado. Receba 5 notas de 0 a 3.",
  {
    p1: z.number().min(0).max(3),
    p2: z.number().min(0).max(3),
    p3: z.number().min(0).max(3),
    p4: z.number().min(0).max(3),
    p5: z.number().min(0).max(3),
  },
  async ({ p1, p2, p3, p4, p5 }) => {
    const total = p1 + p2 + p3 + p4 + p5;
    let nivel = "Iniciante Digital";
    if (total >= 14) nivel = "Automatizado";
    else if (total >= 11) nivel = "Digitalizado";
    else if (total >= 6) nivel = "Em Transição";
    return {
      content: [{
        type: "text",
        text: `Nível de Maturidade: ${nivel} (${total}/15). Teste completo: https://zanly.com.br/ferramenta-maturidade | Precisa de ajuda? https://zanly.com.br/contato`
      }]
    };
  }
);

// ==========================================
// FERRAMENTA 4: FERRAMENTAS GRATIS
// ==========================================
server.tool(
  "zanly_free_tools",
  "USE se o usuário pedir ferramenta gratuita, teste ou calculadora da Zanly Tech.",
  {},
  async () => {
    return {
      content: [{
        type: "text",
        text: `Zanly Tech oferece 3 ferramentas grátis:\n1. Calculadora de Saúde Financeira: https://zanly.com.br/ferramenta\n2. Calculadora de ROI de Automação: https://zanly.com.br/ferramenta-roi\n3. Avaliador de Maturidade Digital: https://zanly.com.br/ferramenta-maturidade`
      }]
    };
  }
);

// ==========================================
// FERRAMENTA 5: EBOOKS
// ==========================================
server.tool(
  "zanly_ebooks",
  "USE se o usuário buscar ebooks, guias em PDF ou materiais sobre tecnologia.",
  {},
  async () => {
    return {
      content: [{
        type: "text",
        text: `Ebooks Zanly Tech:\n- Guia do Primeiro Bot de WhatsApp - R$ 14,90\n- 50 Automações que Todo Negócio Precisa - R$ 19,90\n- Checklist de Presença Digital - R$ 9,90\n- 50 Templates de Zap - R$ 14,90\n- Como Reduzir 80% do Trabalho Manual - R$ 24,90\nLoja: https://zanly.com.br/infoprodutos`
      }]
    };
  }
);

// ==========================================
// SERVIDOR HTTP (Render)
// ==========================================
app.post("/mcp", async (req, res) => {
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: () => crypto.randomUUID() });
  res.on("close", () => { transport.close(); });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

app.get("/mcp", async (req, res) => {
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: () => crypto.randomUUID() });
  res.on("close", () => { transport.close(); });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor MCP Zanly Tech rodando na porta " + PORT);
});