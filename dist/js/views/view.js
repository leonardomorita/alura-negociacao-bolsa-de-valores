export class View {
    constructor(seletor, escapar) {
        this.escapar = false;
        const elementoAux = document.querySelector(seletor);
        if (elementoAux) {
            this.elemento = document.querySelector(seletor);
        }
        else {
            throw Error(`O seletor ${seletor} não existe no DOM`);
        }
        if (escapar) {
            this.escapar = escapar;
        }
    }
    update(model) {
        let template = this.template(model);
        if (this.escapar) {
            template = template.replace(/<script>[\s\S/]*?<\/script>/, '');
        }
        this.elemento.innerHTML = template;
    }
}
