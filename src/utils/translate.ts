export function translateType(type: string) {
    switch (type) {
        case 'normal':
            return 'Normal';
        case 'fighting':
            return 'Lutador';
        case 'flying':
            return 'Voador';
        case 'poison':
            return 'Venenoso';
        case 'ground':
            return 'Terra';
        case 'rock':
            return 'Pedra';
        case 'bug':
            return 'Inseto';
        case 'ghost':
            return 'Fantasma';
        case 'steel':
            return 'Aço';
        case 'fire':
            return 'Fogo';
        case 'water':
            return 'Água';
        case 'grass':
            return 'Planta';
        case 'electric':
            return 'Elétrico';
        case 'psychic':
            return 'Psíquico';
        case 'ice':
            return 'Gelo';
        case 'dragon':
            return 'Dragão';
        case 'dark':
            return 'Noturno';
        case 'fairy':
            return 'Fada';
        default:
            return 'Desconhecido';
    }
}

export function translateStats(stat: any) {

    if (stat === "special-atack") {
        return "specialAtack";
    }

    const stats = {
        "hp": "HP",
        "attack": "Ataque",
        "shield": "Defesa",
        "defense": "Defesa",
        "special-attack": "Ataque Especial",
        "special-defense": "Defesa Especial",
        "speed": "Velocidade",
    } as any;

    return stats[stat] || "";
};