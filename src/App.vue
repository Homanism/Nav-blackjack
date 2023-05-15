<template>
    <v-app>
<h1>Hello Nav!</h1>
    </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import GameCard from './components/GameCard.vue';
import GameResult from './components/GameResult.vue';
import axios from 'axios';

export default {
    name: 'App',

    components: {
        AppBar,
        GameCard,
        GameResult
    },



};
</script>

<style>


</style>
