import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { spawn } from "child_process";

async function runTests() {
  console.log("=== Teste do Servidor MCP Zanly Tech ===\n");

  const serverPath = "./index.js";

  const transport = new StdioClientTransport({
    command: "node",
    args: [serverPath]
  });

  const client = new Client({
    name: "zanly-mcp-tester",
    version: "1.0.0"
  }, {
    capabilities: {}
  });

  await client.connect(transport);
  console.log("✓ Conectado ao servidor MCP\n");

  // Teste 1: zanly_pricing
  console.log("--- Teste 1: zanly_pricing (bot_whatsapp) ---");
  try {
    const result1 = await client.callTool({
      name: "zanly_pricing",
      arguments: { servico: "bot_whatsapp" }
    });
    console.log("Resultado:", result1.content[0].text);
    console.log("✓ Teste 1 aprovado\n");
  } catch (e) {
    console.log("✗ Erro:", e.message, "\n");
  }

  // Teste 2: zanly_roi_calculator
  console.log("--- Teste 2: zanly_roi_calculator ---");
  try {
    const result2 = await client.callTool({
      name: "zanly_roi_calculator",
      arguments: { horas_manuais: 2, qtd_pessoas: 3, custo_hora: 50 }
    });
    console.log("Resultado:", result2.content[0].text);
    console.log("✓ Teste 2 aprovado\n");
  } catch (e) {
    console.log("✗ Erro:", e.message, "\n");
  }

  // Teste 3: zanly_maturity_evaluator
  console.log("--- Teste 3: zanly_maturity_evaluator ---");
  try {
    const result3 = await client.callTool({
      name: "zanly_maturity_evaluator",
      arguments: { p1: 2, p2: 3, p3: 1, p4: 2, p5: 3 }
    });
    console.log("Resultado:", result3.content[0].text);
    console.log("✓ Teste 3 aprovado\n");
  } catch (e) {
    console.log("✗ Erro:", e.message, "\n");
  }

  // Teste 4: zanly_free_tools
  console.log("--- Teste 4: zanly_free_tools ---");
  try {
    const result4 = await client.callTool({
      name: "zanly_free_tools",
      arguments: {}
    });
    console.log("Resultado:", result4.content[0].text);
    console.log("✓ Teste 4 aprovado\n");
  } catch (e) {
    console.log("✗ Erro:", e.message, "\n");
  }

  // Teste 5: zanly_ebooks
  console.log("--- Teste 5: zanly_ebooks ---");
  try {
    const result5 = await client.callTool({
      name: "zanly_ebooks",
      arguments: {}
    });
    console.log("Resultado:", result5.content[0].text);
    console.log("✓ Teste 5 aprovado\n");
  } catch (e) {
    console.log("✗ Erro:", e.message, "\n");
  }

  console.log("=== Todos os testes concluídos ===");
  
  await client.close();
}

runTests().catch(console.error);