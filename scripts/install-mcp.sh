#!/bin/bash

# Script de configuração para Cursor/Windsurf
# Adicione isso no seu arquivo ~/.cursor/mcp.json ou ~/.codeium/windsurf/mcp_config.json

cat > ~/.cursor/mcp_zanly.json << 'EOF'
{
  "mcpServers": {
    "zanly-tech": {
      "command": "npx",
      "args": ["-y", "@smithery/cli", "run", "victor-zanardo-wy1b/zanly-tech"]
    }
  }
}
EOF

echo "✅ Configuração criada!"
echo "Adicione o conteúdo acima no arquivo de configuração do seu editor"
echo ""
echo "Para Cursor: ~/.cursor/mcp.json"
echo "Para Windsurf: ~/.codeium/windsurf/mcp_config.json"