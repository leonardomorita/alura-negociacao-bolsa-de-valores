export function injetorDom(seletor: string) {
    return function(target: any, propertKey: string) {
        console.log(`Modificando prototype ${target.constructor.name} e adicionando getter para a propriedade ${propertKey}`);

        let elemento: HTMLElement;

        const getter = function() {
            if (!elemento) {
                console.log(`Buscando elemento do DOM com o seletor ${seletor} para injetar em ${propertKey}`);

                elemento = document.querySelector(seletor) as HTMLElement;
            }

            return elemento;
        }

        Object.defineProperty(
            target,
            propertKey,
            { get: getter }
        );
    }
}
