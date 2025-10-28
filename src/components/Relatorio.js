import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Relatorio({ apiUrl }) {
  const [relatorio, setRelatorio] = useState({
    vendas: [],
    faturamento: 0,
    faturamentoSemanal: { dias: [], valores: [] },
  });

  useEffect(() => {
    const fetchRelatorio = async () => {
      try {
        const response = await axios.get(`${apiUrl}/relatorio`);
        const vendas = response.data.vendas.map(venda => ({
          ...venda,
          total: Number(venda.total),
        }));
        const faturamento = Number(response.data.faturamento);
        const faturamentoSemanal = {
          dias: response.data.faturamentoSemanal.dias,
          valores: response.data.faturamentoSemanal.valores.map(Number),
        };
        setRelatorio({ vendas, faturamento, faturamentoSemanal });
      } catch (error) {
        console.error('Erro ao carregar relatório:', error);
      }
    };
    fetchRelatorio();
  }, [apiUrl]);

  // Configuração do gráfico
  const chartData = {
    labels: relatorio.faturamentoSemanal.dias.map(dia =>
      new Date(dia).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit' })
    ),
    datasets: [
      {
        label: 'Faturamento (R$)',
        data: relatorio.faturamentoSemanal.valores,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Faturamento Semanal' },
    tooltip: {
      callbacks: {
        label: (context) => `R$ ${context.parsed.y.toFixed(2)}`
      }
    }
  },
  scales: {
    y: { beginAtZero: true, title: { display: true, text: 'R$' } },
    x: { title: { display: true, text: 'Dia' } }
  }
  };

  return (
    <div>
      <h2>Relatório de Vendas do Dia</h2>
      {relatorio.vendas.length === 0 ? (
        <p>Nenhuma venda hoje.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {relatorio.vendas.map((venda, index) => (
                <tr key={index}>
                  <td>{venda.nome}</td>
                  <td>{venda.quantidade}</td>
                  <td>R$ {Number(venda.total).toFixed(2)}</td>
                  <td>{new Date(venda.data).toLocaleString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            <strong>Faturamento Total: R$ {Number(relatorio.faturamento).toFixed(2)}</strong>
          </p>
        </>
      )}
      <div className="mt-5">
        <h3>Faturamento Semanal</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default Relatorio;

