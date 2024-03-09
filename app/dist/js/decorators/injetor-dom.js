export function injetorDom(seletor) {
    return function (target, propertKey) {
        console.log(`Modificando prototype ${target.constructor.name} e adicionando getter para a propriedade ${propertKey}`);
        let elemento;
        const getter = function () {
            if (!elemento) {
                console.log(`Buscando elemento do DOM com o seletor ${seletor} para injetar em ${propertKey}`);
                elemento = document.querySelector(seletor);
            }
            return elemento;
        };
        Object.defineProperty(target, propertKey, { get: getter });
    };
}
