import React, { useState } from 'react';
import axios from 'axios';

function BuscarProduto({ apiUrl, adicionarAoCarrinho, carrinho }) {
  const [nome, setNome] = useState('');
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [mensagem, setMensagem] = useState('');

  const handleBuscar = async () => {
    try {
      const response = await axios.get(`${apiUrl}/produtos/${nome}`);
      setProduto(response.data);
      setMensagem('');
    } catch (error) {
      setMensagem('Produto não encontrado.');
      setProduto(null);
    }
  };

  const handleAdicionar = () => {
    if (produto && quantidade <= produto.quantidade && quantidade > 0) {
      adicionarAoCarrinho(produto, quantidade);
      setMensagem(`Adicionado ${quantidade} ${produto.nome} ao carrinho!`);
      setQuantidade(1);
      setProduto(null);
      setNome('');
    } else {
      setMensagem('Quantidade inválida ou estoque insuficiente.');
    }
  };

  return (
    <div>
      <h2>Buscar Produto</h2>
      <div className="mb-3">
        <label>Nome:</label>
        <input
          type="text"
          className="form-control"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button onClick={handleBuscar} className="btn btn-secondary mt-2">
          Buscar
        </button>
      </div>
      {produto && (
        <div>
          <p>
            <strong>{produto.nome}</strong> - R$ {Number(produto.preco).toFixed(2)} - Estoque:{' '}
            {produto.quantidade}
          </p>
          <div className="mb-3">
            <label>Quantidade:</label>
            <input
              type="number"
              className="form-control"
              value={quantidade}
              onChange={(e) => setQuantidade(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <button onClick={handleAdicionar} className="btn btn-success">
            Adicionar ao Carrinho
          </button>
        </div>
      )}
      {mensagem && <p className="mt-3">{mensagem}</p>}
      {/* Lista de itens no carrinho */}
      <div className="mt-4">
        <h3>Itens no Carrinho</h3>
        {carrinho.length === 0 ? (
          <p>Carrinho vazio.</p>
        ) : (
          <ul className="list-group">
            {carrinho.map((item, index) => (
              <li key={index} className="list-group-item">
                {item.nome} x {item.quantidade} - R$ {Number(item.preco * item.quantidade).toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default BuscarProduto;
