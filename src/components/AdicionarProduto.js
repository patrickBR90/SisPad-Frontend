import React, { useState } from 'react';
import axios from 'axios';

function AdicionarProduto({ apiUrl }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${apiUrl}/produtos`, {
      nome,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade),
    });
    setMensagem(`Produto adicionado com sucesso! ID: ${response.data.id}`);
    setNome('');
    setPreco('');
    setQuantidade('');
  } catch (error) {
    console.error('Erro detalhado:', error.response || error.message); // ← Adicione
    setMensagem(`Erro ao adicionar produto: ${error.message}`);
  }
};

  return (
    <div>
      <h2>Adicionar Produto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nome:</label>
          <input type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Preço:</label>
          <input type="number" className="form-control" value={preco} onChange={(e) => setPreco(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Quantidade:</label>
          <input type="number" className="form-control" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Adicionar</button>
      </form>
      {mensagem && <p className="mt-3">{mensagem}</p>}
    </div>
  );
}


export default AdicionarProduto;
