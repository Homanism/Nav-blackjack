<template>
    <v-app>
        <AppBar :is-my-turn="isMyTurn" :my-score="myScore" :opponent-score="opponentScore" />

    
    <GameCard v-for="(card, index) in myCards" :key="index" :card-data="card" />

    <GameResult v-if="winner" :winner="winner" :is-blackjack="isBlackjack" :myCards="myCards"
                :opponentCards="opponentCards" :myScore="myScore" :opponentScore="opponentScore"
                @startNewRound="setNewRound" />
      
    </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import GameCard from './components/GameCard.vue';
import GameResult from './components/GameResult.vue';
// import shuffleDeckRandomly from './helper/shuffleDeckRandomly.js';
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

    },

    async mounted() {
        const response = await axios.get("https://blackjack.ekstern.dev.nav.no/shuffle");
        console.log(response)
    },

    computed: {

    },

    watch: {

    }
};
</script>

<style>

</style>
