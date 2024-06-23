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

        const nomeEvento = criarElemento('h2', 'nome-evento', evento.title);
        const codigoEvento = criarElemento('p', 'codigo-evento', `Código do evento: ${evento.id}`);
        const detalhesEvento = criarElemento('p', 'detalhes-evento', `Detalhes do evento: ${evento.details}`);
        const vagasDisponiveis = criarElemento('p', 'vagas-disponiveis', `Vagas Disponíveis: ${evento.maximumAttendees}`);

        divEvento.append(nomeEvento, codigoEvento, detalhesEvento, vagasDisponiveis);
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

    document.getElementById('criarEventoBtn').addEventListener('click', function() {
        // Redirecionar para a página de criar novo evento
        window.location.href = 'novo-evento/new-event.html';
    });
});
