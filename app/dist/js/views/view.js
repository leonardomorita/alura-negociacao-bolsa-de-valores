export class View {
    constructor(seletor) {
        const elementoAux = document.querySelector(seletor);
        if (elementoAux) {
            this.elemento = document.querySelector(seletor);
        }
        else {
            throw Error(`O seletor ${seletor} não existe no DOM`);
        }
    }
    update(model) {
        let template = this.template(model);
        this.elemento.innerHTML = template;
    }
}
