document.addEventListener('DOMContentLoaded', function() {

    var url = 'http://localhost:8080/events/';

    function obterEventosDoBanco() {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao obter eventos: ' + response.statusText);
                }
                return response.json();
            })
            .then(eventos => {
                eventos.forEach(evento => {
                  adicionarEvento(evento)  
                });               
            })
            .catch(error => console.error('Erro ao obter eventos', error));
    }

    // Função para criar e adicionar os eventos ao DOM
    function adicionarEvento(evento) {

        const divEvento = document.createElement('div');
        divEvento.classList.add('evento');

        const dataDoBackend = evento.dateHour;
        const dataConvertida = new Date(dataDoBackend);

        const dia = dataConvertida.getDate().toString().padStart(2, '0');
        const mes = (dataConvertida.getMonth() + 1).toString().padStart(2, '0'); // Janeiro é 0!
        const ano = dataConvertida.getFullYear();

        const horas = dataConvertida.getHours().toString().padStart(2, '0');
        const minutos = dataConvertida.getMinutes().toString().padStart(2, '0');

        const dataFormatada = `${dia}/${mes}/${ano} - ${horas}:${minutos}`;

        const nomeEvento = criarElemento('h2', 'nome-evento', evento.title);
        const codigoEvento = criarElemento('p', 'codigo-evento', `Código do evento: ${evento.id}`);
        const detalhesEvento = criarElemento('p', 'detalhes-evento', `Detalhes do evento: ${evento.details}`);
        const dataHora = criarElemento('p', 'data-hora', `Data/Hora: ${dataFormatada}`);
        const verDetalhesBtn = criarElemento('a', 'btn', 'Ver detalhes');
        verDetalhesBtn.href = `ver-detalhes/verDetalhes.html?eventId=${evento.id}`;


        divEvento.append(nomeEvento, codigoEvento, detalhesEvento, dataHora, verDetalhesBtn);
        document.getElementById('eventos').appendChild(divEvento);
    }

    function criarElemento(tagName, className, textContent) {
        const elemento = document.createElement(tagName);
        elemento.classList.add(className);
        elemento.textContent = textContent;
        return elemento;
    }

    // Chamando a função para adicionar os eventos ao DOM
    obterEventosDoBanco();
});

document.getElementById('criarEventoBtn').addEventListener('click', function() {
    // Redirecionar para a página de criar novo evento
    window.location.href = '../novo-evento/new-event.html';
});
