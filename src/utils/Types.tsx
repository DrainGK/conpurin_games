export interface TopType {
    title: string;
    desc: string;
    id: number;
    categorie: string;
    img: string;
    ELO: number;
    player: PlayerType[];
}

export interface CardType {
    title: string;
    desc: string;
    img: string;
}

export interface PlayerType {
    name: string;
    img: string;
    elo: number;
}