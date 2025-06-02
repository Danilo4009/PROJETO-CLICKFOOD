import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Container,
  RelatorioBox,
  Titulo,
  Filtros,
  Select,
  Botao,
  Totais,
  GraficoBox,
} from "./styled";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const mesesNomes = [
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto",
  "Setembro", "Outubro", "Novembro", "Dezembro",
];

export default function Relatorio() {
  const [relatorio, setRelatorio] = useState({});
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("2025");

  const buscarRelatorio = async () => {
    const params = {};
    if (mes) params.mes = mes;
    if (ano) params.ano = ano;

    try {
      const response = await axios.get("http://localhost:3000/relatorio-vendas", { params });
      setRelatorio(response.data);
    } catch (error) {
      console.error("Erro ao buscar relatório:", error);
    }
  };

  // Atualiza relatório sempre que mes ou ano mudarem
  useEffect(() => {
    buscarRelatorio();
  }, [mes, ano]);

  // Se não tiver vendasPorMes, retorna vazio
  if (!relatorio.vendasPorMes) {
    return <p>Carregando dados...</p>;
  }

  let labels = [];
  let valores = [];

  if (mes) {
    const mesIndex = parseInt(mes) - 1;
    const key = `${ano}-${mes.padStart(2, "0")}`;
    const valorMes = relatorio.vendasPorMes[key] || 0;

    labels = [mesesNomes[mesIndex]];
    valores = [valorMes];
  } else {
    labels = mesesNomes;
    valores = new Array(12).fill(0);

    Object.entries(relatorio.vendasPorMes).forEach(([mesAno, valor]) => {
      const [anoStr, mesStr] = mesAno.split("-");
      if (anoStr === ano) {
        const indiceMes = parseInt(mesStr) - 1;
        valores[indiceMes] = valor;
      }
    });
  }

  const dadosGrafico = {
    labels,
    datasets: [
      {
        label: "Total por mês (R$)",
        data: valores,
        backgroundColor: "#ea1d2c",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 300,
        ticks: {
          callback: (value) => `R$ ${value.toFixed(0)}`,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Container>
      <RelatorioBox>
        <Titulo>Relatório de Vendas</Titulo>

        <Filtros>
          <Select value={mes} onChange={(e) => setMes(e.target.value)}>
            <option value="">Todos os meses</option>
            {mesesNomes.map((nome, index) => (
              <option key={index + 1} value={index + 1}>{nome}</option>
            ))}
          </Select>

          <Select value={ano} onChange={(e) => setAno(e.target.value)}>
            <option value="2025">2025</option>
          </Select>

          {/* Pode remover o botão ou deixar, só que ele não é mais necessário */}
          {/* <Botao onClick={buscarRelatorio}>Filtrar</Botao> */}
        </Filtros>

        <Totais>
          <p><strong>Total Mensal:</strong> R$ {(Number(relatorio.totalFiltrado) || 0).toFixed(2)}</p>
          <p><strong>Total Anual:</strong> R$ {(Number(relatorio.totalGeral) || 0).toFixed(2)}</p>
        </Totais>

        <GraficoBox>
          <Bar data={dadosGrafico} options={options} />
        </GraficoBox>
      </RelatorioBox>
    </Container>
  );
}
