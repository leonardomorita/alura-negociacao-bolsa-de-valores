import { NegociacaoController } from './controllers/negociacao-controller.js';

const negociacaoController = new NegociacaoController();
const form = document.querySelector('.form');

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        negociacaoController.adicionar();
    });
} else {
    throw Error('Não foi possível carregar o elemento do formulário.');
}
