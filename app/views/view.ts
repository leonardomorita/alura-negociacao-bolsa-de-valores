export abstract class View<T> {
    protected elemento: HTMLElement
    private escapar = false;

    constructor(seletor: string, escapar?: boolean) {
        const elementoAux = document.querySelector(seletor);
        if (elementoAux) {
            this.elemento = document.querySelector(seletor) as HTMLElement;
        } else {
            throw Error(`O seletor ${seletor} não existe no DOM`);
        }
        
        if (escapar) {
            this.escapar = escapar;
        }
    }

    public update(model: T): void {
        let template = this.template(model);

        if (this.escapar) {
            template = template.replace(/<script>[\s\S/]*?<\/script>/, ''); // Remover o tag script
        }

        this.elemento.innerHTML = template;
    }

    protected abstract template(model: T): string;
}
