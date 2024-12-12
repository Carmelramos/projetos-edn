/*
Contexto do Projeto

Objetivo: Exibir o clima atual de uma cidade selecionada pelo usuário, incluindo temperatura, condições do tempo, umidade e velocidade do vento.

Ferramentas Utilizadas:
HTML5: Estrutura do formulário e exibição dos dados.
JavaScript/jQuery: Para realizar a chamada AJAX e manipular o DOM dinamicamente.
API OpenWeatherMap: Fornece os dados meteorológicos em tempo real.
CSS: Organização dos elementos para melhor usabilidade

DOC: https://openweathermap.org/current

USING: https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br

*/

$('#enviar').on('click', function () {
    const apiKey = '281a15b6e495a15f13858c8dc08a65ed';
    const city = $('#city').val();

    // Verifica se uma cidade foi selecionada
    if (city) {
        // URL da API com a cidade selecionada
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

        // Requisição AJAX para a API OpenWeatherMap
        $.ajax({
            url: url,
            type: 'GET',
            success: function (data) {
                // Extraindo informações importantes da resposta
                const temperatura = data.main.temp;
                const condicao = data.weather[0].description;
                const umidade = data.main.humidity;
                const vento = data.wind.speed;

                // Exibindo os dados na div "result"
                $('#result').html(`
                    <h2>Clima em ${city}</h2>
                    <p><strong>Temperatura:</strong> ${temperatura}°C</p>
                    <p><strong>Condição:</strong> ${condicao}</p>
                    <p><strong>Umidade:</strong> ${umidade}%</p>
                    <p><strong>Velocidade do Vento:</strong> ${vento} km/h</p>
                `);
            },
            error: function (erro) {
                // Exibir mensagem de erro
                $('#result').html('<p>Erro ao obter os dados do clima. Tente novamente.</p>');
                console.error('Erro na requisição:', erro);
            }
        });
    } else {
        // Mensagem de alerta caso nenhuma cidade tenha sido selecionada
        $('#result').html('<p>Por favor, selecione uma cidade.</p>');
    }
});
