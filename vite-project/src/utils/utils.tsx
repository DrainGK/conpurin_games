import { PlayerType } from "./Types";

export function shuffleArray<T>(arr: T[]): T[] {
    // Créer une copie pour ne pas muter l’original
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Échange entre copy[i] et copy[j]
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  
export function calculateProbability(eloA: number, eloB: number):number {
  return 1/(1 + Math.pow(10, (eloB - eloA)/400))
}

export function updateEloForBoth(
  winner: PlayerType,
  loser: PlayerType,
  K: number = 32
): void {
  // Calcul des probabilités pour chaque joueur
  const probWinner = calculateProbability(winner.elo, loser.elo);
  const probLoser = calculateProbability(loser.elo, winner.elo);

  // Met à jour les scores ELO
  winner.elo = Math.round(winner.elo + K * (1 - probWinner)); // Résultat 1 pour le gagnant
  loser.elo = Math.round(loser.elo + K * (0 - probLoser));    // Résultat 0 pour le perdant
}