import { Negociacao } from '../models/negociacao.js';
export class NegociacoesServices {
    obterNegociacoesDoDia() {
        return fetch('http://localhost:8080/dados')
            .then(response => {
            return response.json();
        })
            .then((dados) => {
            return dados.map(dado => {
                return new Negociacao(new Date(), dado.vezes, dado.montante);
            });
        });
    }
}
