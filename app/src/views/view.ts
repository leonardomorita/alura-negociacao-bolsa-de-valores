// import { inspecionar } from '../decorators/inspecionar.js';
// import { logarTempoDeExcecucao } from '../decorators/logar-tempo-de-execucao.js';

export abstract class View<T> {
    protected elemento: HTMLElement

    constructor(seletor: string) {
        const elementoAux = document.querySelector(seletor);
        if (elementoAux) {
            this.elemento = document.querySelector(seletor) as HTMLElement;
        } else {
            throw Error(`O seletor ${seletor} não existe no DOM`);
        }
    }

    // @logarTempoDeExcecucao(true)
    // @inspecionar
    public update(model: T): void {
        let template = this.template(model);
        this.elemento.innerHTML = template;
    }

    protected abstract template(model: T): string;
}
