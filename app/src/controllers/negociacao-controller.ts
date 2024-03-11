import { injetorDom } from '../decorators/injetor-dom.js';
import { inspecionar } from '../decorators/inspecionar.js';
import { logarTempoDeExcecucao } from '../decorators/logar-tempo-de-execucao.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesServices } from '../services/negociacoes-service.js';
import { imprimir } from '../utils/imprimir.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {
    @injetorDom('#data')
    private inputData: HTMLInputElement;

    @injetorDom('#quantidade')
    private inputQuantidade: HTMLInputElement;

    @injetorDom('#valor')
    private inputValor: HTMLInputElement;
    
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService = new NegociacoesServices();

    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }    

    @inspecionar
    @logarTempoDeExcecucao()
    public adicionar(): void {
        const negociacao = Negociacao.criarInstancia(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );

        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('As negociações são aceitas apenas em dias utéis');
            return;
        }

        this.negociacoes.adicionar(negociacao);
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('A negociação foi adicionada com sucesso');

        imprimir(negociacao, this.negociacoes);

        this.limparFormulario();
    }

    public importarDados(): void {
        this.negociacoesService
            .obterNegociacoesDoDia()
            .then(negociacoesDeHoje => {
                return negociacoesDeHoje.filter(negociacaoDeHoje => {
                    return !this.negociacoes
                        .listar()
                        .some(negociacao => negociacao.ehIgual(negociacaoDeHoje));
                });
            })
            .then(negociacoesDoDia => {
                for (let negociacao of negociacoesDoDia) {
                    this.negociacoes.adicionar(negociacao);
                }

                this.negociacoesView.update(this.negociacoes);
            });
    }

    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '1';
        this.inputValor.value = '0.0';

        this.inputData.focus();
    }
}
