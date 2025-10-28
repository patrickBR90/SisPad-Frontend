import React, { useState } from 'react';
import AdicionarProduto from './components/AdicionarProduto';
import BuscarProduto from './components/BuscarProduto';
import Carrinho from './components/Carrinho';
import Relatorio from './components/Relatorio';
import './App.css';

const API_URL = 'https://XXXX.onrender.com/api'; // Substitua pela URL do seu backend no Render

function App() {
  const [carrinho, setCarrinho] = useState([]); // Estado para itens no carrinho
  const [activeTab, setActiveTab] = useState('adicionar');

  const adicionarAoCarrinho = (produto, quantidade) => {
    setCarrinho([...carrinho, { ...produto, quantidade }]);
  };

  const limparCarrinho = () => setCarrinho([]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Sistema SisPad</h1>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'adicionar' ? 'active' : ''}`} onClick={() => setActiveTab('adicionar')}>Adicionar Produto</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'buscar' ? 'active' : ''}`} onClick={() => setActiveTab('buscar')}>Buscar Produto</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'carrinho' ? 'active' : ''}`} onClick={() => setActiveTab('carrinho')}>Carrinho / Venda</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'relatorio' ? 'active' : ''}`} onClick={() => setActiveTab('relatorio')}>Relatório</button>
        </li>
      </ul>
      <div className="tab-content mt-3">
        {activeTab === 'adicionar' && <AdicionarProduto apiUrl={API_URL} />}
        {activeTab === 'buscar' && <BuscarProduto apiUrl={API_URL} adicionarAoCarrinho={adicionarAoCarrinho} carrinho={carrinho} />}
        {activeTab === 'carrinho' && <Carrinho apiUrl={API_URL} carrinho={carrinho} limparCarrinho={limparCarrinho} />}
        {activeTab === 'relatorio' && <Relatorio apiUrl={API_URL} />}
      </div>
    </div>
  );
}

export default App;
