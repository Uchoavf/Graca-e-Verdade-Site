#!/bin/bash
# Graça & Verdade — Iniciar servidor de desenvolvimento
# Uso: ./start-dev.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Carregar nvm se disponível
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

cd "$SCRIPT_DIR" || exit 1
echo "▶ Iniciando Graça & Verdade em http://localhost:3000"
exec npm run dev
