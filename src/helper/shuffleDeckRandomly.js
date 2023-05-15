import deckOfCards from '../data/deckOfCards.json'

const shuffleDeckRandomly = () => {
    for (let i = deckOfCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deckOfCards[i], deckOfCards[j]] = [deckOfCards[j], deckOfCards[i]];
    }
    return deckOfCards;
}

export default shuffleDeckRandomly;