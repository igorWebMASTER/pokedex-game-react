export function getStatsIcon(stat: string) {
    const stats = {
      "hp": require('../../assets/images/sword.png'),
      "attack": require('../../assets/images/sword.png'),
      "defense": require('../../assets/images/shield.png'),
      "star": require('../../assets/images/plus.png'),
      "speed": require('../../assets/images/speed.png'),
      "special-attack": require('../../assets/images/sword.png'),
      "special-defense": require('../../assets/images/shield.png'),
    } as any;

    return stats[stat] || stats.attack;
 };