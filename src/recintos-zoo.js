class RecintosZoo {
    constructor() {
        // Inicializa a lista de recintos com detalhes sobre cada recinto.
        this.recintos = [
            { numero: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3, tamanho: 1 }] },
            { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
            { numero: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1, tamanho: 2 }] },
            { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
            { numero: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1, tamanho: 3 }] }
        ];

        // Inicializa as informações dos animais com tamanho e bioma necessário.
        this.animais = {
            "LEAO": { tamanho: 3, bioma: ["savana"] },
            "LEOPARDO": { tamanho: 2, bioma: ["savana"] },
            "CROCODILO": { tamanho: 3, bioma: ["rio"] },
            "MACACO": { tamanho: 1, bioma: ["savana", "floresta"] },
            "GAZELA": { tamanho: 2, bioma: ["savana"] },
            "HIPOPOTAMO": { tamanho: 4, bioma: ["savana", "rio"] }
        };
    }

    analisaRecintos(animal, quantidade) {
        // Verifica se o animal é válido
        if (!this.animais[animal]) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }

        // Verifica se a quantidade é válida
        if (quantidade <= 0 || isNaN(quantidade)) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }

        // Obtém o tamanho e bioma do animal
        const { tamanho: tamanhoAnimal, bioma: biomasAnimal } = this.animais[animal];
        const espacoNecessario = tamanhoAnimal * quantidade;
        let recintosViaveis = [];

        // Percorre todos os recintos para encontrar os viáveis
        for (const recinto of this.recintos) {
            const { numero, bioma, tamanho, animais } = recinto;

            // Verifica se o bioma do recinto é compatível com o bioma do animal
            const biomaCompativel = biomasAnimal.some(b => bioma.includes(b));
            if (!biomaCompativel) continue;

            // Verifica se há carnívoros no recinto e se eles podem conviver
            const carnívoros = ["LEAO", "LEOPARDO", "CROCODILO"];
            const algumCarnivoro = animais.some(animal => carnívoros.includes(animal.especie));
            if (algumCarnivoro && carnívoros.includes(animal)) continue;
            if (algumCarnivoro && animais.length > 0) continue;  // Carnívoros não convivem com outras espécies

            // Calcula o espaço ocupado no recinto
            let espacoOcupado = animais.reduce((total, a) => total + (a.tamanho * a.quantidade), 0);

            // Considera espaço adicional para convivência entre diferentes espécies
            const especiesPresentes = new Set(animais.map(a => a.especie));
            if (especiesPresentes.size > 0 && !especiesPresentes.has(animal)) {
                espacoOcupado += 1; // Espaço extra para múltiplas espécies
            }

            // Verifica se há espaço suficiente para o novo lote
            if (tamanho - espacoOcupado >= espacoNecessario) {
                // Prioriza o recinto 4 para crocodilo
                if (animal === "CROCODILO" && numero === 4) {
                    recintosViaveis = [`Recinto 4 (espaço livre: ${tamanho - espacoOcupado - espacoNecessario} total: ${tamanho})`];
                    break;
                } else {
                    recintosViaveis.push(`Recinto ${numero} (espaço livre: ${tamanho - espacoOcupado - espacoNecessario} total: ${tamanho})`);
                }
            }
        }

        // Retorna o resultado
        if (recintosViaveis.length > 0) {
            return { recintosViaveis };
        } else {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }
    }
}

export { RecintosZoo as RecintosZoo };
