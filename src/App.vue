<template>
    <v-app>
        <AppBar :is-my-turn="isMyTurn" :my-score="myScore" :opponent-score="opponentScore" />

        <v-main class="mt-5">
            <div v-if="!winner">
                <div class="game-proccess">
                    <div class="game-proccess-block">
                        <div class="score">Score: {{ myScore }}</div>
                        <h2>You</h2>
                        <div class="picked-cards">
                            <GameCard v-for="(card, index) in myCards" :key="index" :card-data="card" />
                        </div>
                    </div>
                    <v-divider vertical></v-divider>
                    <div class="game-proccess-block">
                        <div class="score">Score: {{ opponentScore }}</div>
                        <h2>Magnus</h2>
                        <div class="picked-cards">
                            <GameCard v-for="(card, index) in opponentCards" :key="index" :card-data="card"
                                :hide-card="index === 0 && hideOpponentFirstCard" />
                        </div>
                    </div>
                </div>
                <div class="game-control-btns" v-if="myCards.length > 0">
                    <v-btn color="info" @click="hit" :disabled="!isMyTurn">Hit</v-btn>
                    <v-btn color="info" class="ml-2" @click="stay">Stay</v-btn>
                </div>
                <div class="game-control-btns" v-else>
                    <v-btn color="orange" depressed dark @click="hit">Deal</v-btn>
                </div>
            </div>
            <GameResult v-if="winner" :winner="winner" :is-blackjack="isBlackjack" :myCards="myCards"
                :opponentCards="opponentCards" :myScore="myScore" :opponentScore="opponentScore"
                @startNewRound="setNewRound" />
        </v-main>

        <v-dialog v-model="drawDialog" max-width="290">
            <v-card>
                <v-card-title class="text-h5">
                    Draw...
                </v-card-title>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="green" dark depressed @click="closeDrawDialog">
                        New Round
                    </v-btn>

                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import GameCard from './components/GameCard.vue';
import GameResult from './components/GameResult.vue';
import shuffleDeckRandomly from './helper/shuffleDeckRandomly.js';
import axios from 'axios'

export default {
    name: 'App',

    components: {
        AppBar,
        GameCard,
        GameResult
    },

    data: () => ({
        deckOfCards: [],
        isMyTurn: true,
        myScore: 0,
        opponentScore: 0,
        myCards: [],
        opponentCards: [],
        winner: null,
        hideOpponentFirstCard: true,
        drawDialog: false,
        isBlackjack: false
    }),

    methods: {
        setDeck() {
            const randomDeck = shuffleDeckRandomly();
            this.setNewRound();

            randomDeck.forEach(card => {
                if (card.value === "J" || card.value === "Q" || card.value === "K") {
                    this.deckOfCards.push({ ...card, score: 10 })
                }
                else if (card.value === "A") {
                    this.deckOfCards.push({ ...card, score: 11 })
                }
                else {
                    this.deckOfCards.push({ ...card, score: Number(card.value) })
                }
            });

            for (let i = 0; i < 2; i++) {
                this.myCards.push(this.deckOfCards[0]);
                this.myScore += this.deckOfCards[0].score;
                this.deckOfCards.shift();
            }
            for (let i = 0; i < 2; i++) {
                this.opponentCards.push(this.deckOfCards[0]);
                if (i !== 0) {
                    this.opponentScore += this.deckOfCards[0].score;
                }
                this.deckOfCards.shift();
            }

            this.findWinner();
        },

        hit() {
            if (this.myCards.length === 0) {
                this.setDeck();
                return;
            }
            this.myCards.push(this.deckOfCards[0]);
            this.myScore += this.deckOfCards[0].score;
            this.deckOfCards.shift();
            this.findWinner();
        },

        stay() {
            this.isMyTurn = false;
            if (this.hideOpponentFirstCard) {
                this.opponentScore += this.opponentCards[0].score;
            }
            this.hideOpponentFirstCard = false;
            this.findWinner();
            this.drawDialog = this.isDraw;
            if (!this.winner && !this.isDraw) {
                do {
                    this.opponentCards.push(this.deckOfCards[0]);
                    this.opponentScore += this.deckOfCards[0].score;
                    this.deckOfCards.shift();
                    this.findWinner();
                } while (this.opponentScore <= this.myScore && this.winner === null);
                this.isMyTurn = true;
            }
        },

        setNewRound() {
            this.deckOfCards = [];
            this.myScore = 0;
            this.opponentScore = 0;
            this.myCards = [];
            this.opponentCards = [];
            this.hideOpponentFirstCard = true;
            this.winner = null;
            this.isMyTurn = true;
            this.isBlackjack = false;
        },

        findWinner() {
            if (this.opponentScore > 21) this.winner = "i";
            if (this.myScore > 21) this.winner = "opponent"

            if (this.myScore === 21) {
                this.winner = "i"
                if (this.myCards.length === 2) {
                    this.isBlackjack = true;
                }
            }

            if (this.opponentScore >= 17 && this.opponentScore <= 21 && this.opponentScore > this.myScore) {
                if (this.opponentCards.length === 2 && this.opponentScore === 21) {
                    this.isBlackjack = true;
                }
                this.winner = "opponent"
            }
        },

        closeDrawDialog() {
            this.setNewRound();
            this.drawDialog = false;
        }
    },

    async mounted() {
        const response = await axios.get("https://blackjack.ekstern.dev.nav.no/shuffle");
        console.log(response)
    },

    computed: {
        isDraw() {
            return this.myScore > 16 && this.myScore < 21
                && this.opponentScore > 16 && this.opponentScore < 21
                && this.opponentScore === this.myScore;
        }
    },

    watch: {
        winner() {
            if (this.winner !== null && this.hideOpponentFirstCard) {
                this.opponentScore += this.opponentCards[0].score;
            }
        }
    }
};
</script>

<style>
body {
    font-family: sans-serif;
}

.game-control-btns {
    width: 80%;
    margin: 20px auto;
    display: flex;
    justify-content: start;
}

.game-proccess {
    width: 80%;
    min-height: 200px;
    margin: 40px auto;
    border: 1px solid lightblue;
    border-radius: 10px;
    display: flex;
}

.game-proccess .game-proccess-block {
    width: 50%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.game-proccess .game-proccess-block .score {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -36px;
    font-weight: normal;
    color: black;
    font-size: 24px;
}

.game-proccess .game-proccess-block .picked-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: start !important;
}
</style>
