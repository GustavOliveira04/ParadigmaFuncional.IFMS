document.getElementById("btnSalvar").addEventListener("click", async () => {

    try {
        const response = await axios.post('http://localhost:3000/api/dados', {nome, idade, proffisao});

        document.getElementById('mensagem').innerHTML =
        `<div class="alert alert-success">Dados salvos com sucesso!</div>`;
    }catch (error) {
        const errorMessage =
        error.respose?.data?.messagem || 'Erro ao salvar dados, Tente novamente';
        document.getElementById('mensagem').innerHTML =
        `<div class="alert alert-danger">${errorMessage}</div>`;
    }
});
