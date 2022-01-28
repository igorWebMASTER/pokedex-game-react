export const getColorOfTypePokemon = (type: string) => {
    const types = {
        normal: '#00b300',
        bug: '#87950C',
        dark: '#413831',
        dragon: "#7361D1",
        eletric: "#E08D00",
        fairy: "#E29FE6",
        fighting: "#852816",
        fire: "#CF2C03",
        flying: "#8FA1FF",
        ghost: "#6969AF",
        grass: "#94AF32",
        ground: "#C5A455",
        ice: "#B4EDF8",
        poison: "#924990",
        psychic: "#E25484",
        rock: "#5E491C",
        steel: "#7F8488",
        water: "#3B9BF1",
    } as any

    return types[type] || '#fff';
}