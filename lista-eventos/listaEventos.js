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
        const dataHora = criarElemento('p', 'data-hora', `Data: ${evento.dateHour}`);
        const verDetalhesBtn = criarElemento('a', 'btn', 'Ver detalhes');
        verDetalhesBtn.href = `ver-detalhes/verDetalhes.html?eventId=${evento.id}`;

        novaData = dataHora.toLocaleString('pt-BR', { timezone: 'UTC' })
        console.log(novaData)

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
