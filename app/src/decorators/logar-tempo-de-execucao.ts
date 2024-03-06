export function logarTempoDeExcecucao() {
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: Array<any>) {
            const t1 = performance.now();

            const retorno = metodoOriginal.apply(this, args);

            const t2 = performance.now();
            console.log(`O tempo de execução do método ${propertyKey} foi: ${(t2 - t1) / 1000} segundos`);

            retorno;
        };

        return descriptor;
    }
}
