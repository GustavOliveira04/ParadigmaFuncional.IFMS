  // Variável para armazenar os dados carregados da API
  let dadosRecebidos = [];

  // Função para renderizar a tabela com os dados informados
  function renderTable(dados) {
    const tabela = document.getElementById('tabelaDados');
    const tbody = tabela.querySelector('tbody');
    tbody.innerHTML = ''; // Limpa dados anteriores
    dados.forEach(dado => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${dado.idPessoa}</td>
        <td>${dado.nome}</td>
        <td>${dado.idade}</td>
        <td>${dado.profissao}</td>
      `;
      tbody.appendChild(row);
    });

    // Exibe a tabela se houver dados; caso contrário, oculta-a
    tabela.style.display = dados.length > 0 ? 'table' : 'none';
  }

  // Função que aplica o filtro usando o valor do campo "filtroIdade"
  function aplicarFiltro() {
    const filtroValue = document.getElementById('filtroIdade').value;
    let dadosFiltrados = dadosRecebidos;
    if (filtroValue) {

      // Filtra os dados para incluir apenas os registros com idade >= filtroValue
      dadosFiltrados = dadosRecebidos.filter(dado => Number(dado.idade) >= Number(filtroValue));
    }
    renderTable(dadosFiltrados);
  }

  // Evento de clique para carregar os dados via API
  document.getElementById('btnCarregar').addEventListener('click', async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/getdados');

      // Supondo que a resposta possua um objeto "dados"
      dadosRecebidos = response.data.dados;

      // Aplica o filtro (caso o campo já tenha algum valor) e renderiza a tabela
      aplicarFiltro();
      document.getElementById('mensagem').innerHTML =
        '<div class="alert alert-info">Dados carregados com sucesso!</div>';
    } catch (error) {
      document.getElementById('mensagem').innerHTML =
        '<div class="alert alert-danger">Erro ao carregar os dados. Tente novamente.</div>';
    }
  });

  // Evento onchange para o campo de filtro, que chama a função aplicarFiltro()

  document.getElementById('filtroIdade').addEventListener('change', aplicarFiltro);

  // Evento para salvar os dados do formulário via API
  document.getElementById('btnSalvar').addEventListener('click', async () => {

    // Captura os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const idade = Number(document.getElementById('idade').value);
    const profissao = document.getElementById('profissao').value;

    try {
      const response = await axios.post('http://localhost:3000/api/dados', { nome, idade, profissao });
      document.getElementById('mensagem').innerHTML =
        '<div class="alert alert-success">Dados salvos com sucesso!</div>';
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Erro ao salvar os dados. Tente novamente.';
      document.getElementById('mensagem').innerHTML =
        `<div class="alert alert-danger">${errorMessage}</div>`;
    }
  });


