import React from 'react';
import axios from 'axios';

function Carrinho({ apiUrl, carrinho, limparCarrinho }) {
  const total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  const handleRegistrarVenda = async () => {
    try {
      for (const item of carrinho) {
        await axios.post(`${apiUrl}/vendas`, { produto_id: item.id, quantidade: item.quantidade });
      }
      alert('Venda registrada com sucesso! Total: R$ ' + total);
      limparCarrinho();
    } catch (error) {
      alert('Erro ao registrar venda: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Carrinho</h2>
      {carrinho.length === 0 ? (
        <p>Carrinho vazio.</p>
      ) : (
        <>
          <ul className="list-group">
            {carrinho.map((item, index) => (
              <li key={index} className="list-group-item">
                {item.nome} x {item.quantidade} - R$ {item.preco * item.quantidade}
              </li>
            ))}
          </ul>
          <p className="mt-3"><strong>Total: R$ {total.toFixed(2)}</strong></p>
          <button onClick={handleRegistrarVenda} className="btn btn-primary">Registrar Venda</button>
        </>
      )}
    </div>
  );
}

export default Carrinho;