
# SisPad Frontend com React + Bootstrap
Projeto Integrador Univesp 2025


Interface web para o **Sistema de Ponto de Venda (PDV)** com carrinho, busca de produtos, vendas.

## Funcionalidades

- Adicionar produtos
- Buscar produto por nome
- Carrinho com lista de itens
- Registrar venda
- Relatório do dia
- **Gráfico de barras** com faturamento da semana

---

## Tecnologias

- **React 18**
- **Bootstrap 5**
- **Axios**
- **Chart.js** + **react-chartjs-2**
- **Render.com** (Static Site)

---

## Estrutura do Projeto
pdv-frontend/

├── public/

├── src/

│   ├── components/

│   │   ├── AdicionarProduto.js

│   │   ├── BuscarProduto.js

│   │   ├── Carrinho.js

│   │   └── Relatorio.js

│   ├── App.js

│   └── App.css

├── package.json

└── .env

# Deploy no Render

Crie um Static Site
Conecte ao repositório
Configure:

Build Command: npm install && npm run build

Publish Directory: build

Adicione REACT_APP_API_URL no painel
