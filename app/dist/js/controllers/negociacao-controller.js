var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView('#negociacoesView');
        this.mensagemView = new MensagemView('#mensagemView');
        this.negociacoesService = new NegociacoesServices();
        this.negociacoesView.update(this.negociacoes);
    }
    adicionar() {
        const negociacao = Negociacao.criarInstancia(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
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
    importarDados() {
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
    ehDiaUtil(data) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }
    limparFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = '1';
        this.inputValor.value = '0.0';
        this.inputData.focus();
    }
}
__decorate([
    injetorDom('#data')
], NegociacaoController.prototype, "inputData", void 0);
__decorate([
    injetorDom('#quantidade')
], NegociacaoController.prototype, "inputQuantidade", void 0);
__decorate([
    injetorDom('#valor')
], NegociacaoController.prototype, "inputValor", void 0);
__decorate([
    inspecionar,
    logarTempoDeExcecucao()
], NegociacaoController.prototype, "adicionar", null);
