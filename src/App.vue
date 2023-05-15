<template>
    <v-app>
        <AppBar :is-my-turn="isMyTurn" :my-score="myScore" :opponent-score="opponentScore" />

    </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
// import GameCard from './components/GameCard.vue';
// import GameResult from './components/GameResult.vue';
// import axios from 'axios';

export default {
    name: 'App',

    components: {
        AppBar,
        // GameCard,
        // GameResult
    },



};
</script>

<style>


</style>
