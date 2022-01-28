export function getStatsIcon(stat: string) {
    const stats = {
        hp: require('assets/images/sword.png'),
        attack: require('assets/images/shield.png'),
        shield: require('assets/images/shield.png'),
        star: require('assets/images/plus.png'),
        speed: require('assets/images/sword.png'),
    } as any;

    return stats[stat] || stats.attack;
};