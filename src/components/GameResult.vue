<template>
    <div class="container">
        <h1>RESULT:</h1>
        <div class="winner-text">
            <div class="winner-text-wrapper">
                <span v-if="winner === 'i'">Winner!</span>
            </div>
            <div class="winner-text-wrapper">
                <span v-if="winner === 'opponent'">Winner!</span>
            </div>
        </div>
        <div class="participants">
            <div class="participant-wrapper">
                <h2>
                    You 
                    <v-icon right color="success" v-if="winner === 'i'">
                        mdi-checkbox-marked-circle
                    </v-icon>
                </h2>
                <span>Score: {{ myScore }}</span>
                <div class="participant-cards">
                    <GameCard v-for="(card, index) in myCards" :key="index" :card-data="card" openedCard
                        style="margin: 5px !important" />
                </div>
                <div v-if="winner==='i' && isBlackjack" class="blackjack">BLACKJACK <v-icon right color="green">mdi-thumb-up</v-icon></div>
            </div>
            <v-divider vertical></v-divider>
            <div class="participant-wrapper">
                <h2>
                    Magnus
                    <v-icon right color="success" v-if="winner === 'opponent'">
                        mdi-checkbox-marked-circle
                    </v-icon>
                </h2>
                <span>Score: {{ opponentScore }}</span>
                <div class="participant-cards">
                    <GameCard v-for="(card, index) in opponentCards" :key="index" :card-data="card" openedCard
                        style="margin: 5px !important" />
                </div>
                <div v-if="winner==='opponent' && isBlackjack" class="blackjack">BLACKJACK <v-icon right color="green">mdi-thumb-up</v-icon></div>
            </div>
        </div>
        <v-btn color="green" dark class="mt-5" @click="$emit('startNewRound')">New Round</v-btn>
    </div>
</template>

<script>
import GameCard from './GameCard.vue';
export default {
    components: {
        GameCard
    },
    props: ['winner', 'myCards', 'opponentCards', 'myScore', 'opponentScore', 'isBlackjack']
}
</script>

<style>

</style>