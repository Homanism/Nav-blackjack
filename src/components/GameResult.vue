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
                    <v-icon right size="55" color="orange" v-if="winner === 'i'">
                        mdi-crown
                    </v-icon>
                </h2>
                <span>Score: {{ myScore }}</span>
                <div class="participant-cards">
                    <GameCard v-for="(card, index) in myCards" :key="index" :card-data="card" openedCard
                        style="margin: 5px !important" />
                </div>
                <div v-if="winner==='i' && isBlackjack" class="blackjack">BLACKJACK <v-icon right color="red">mdi-thumb-up</v-icon></div>
            </div>
            <v-divider vertical></v-divider>
            <div class="participant-wrapper">
                <h2>
                    Magnus
                    <v-icon right size="55" color="orange" v-if="winner === 'opponent'">
                        mdi-crown
                    </v-icon>
                </h2>
                <span>Score: {{ opponentScore }}</span>
                <div class="participant-cards">
                    <GameCard v-for="(card, index) in opponentCards" :key="index" :card-data="card" openedCard
                        style="margin: 5px !important" />
                </div>
                <div v-if="winner==='opponent' && isBlackjack" class="blackjack">BLACKJACK <v-icon right color="red">mdi-thumb-up</v-icon></div>
            </div>
        </div>
        <v-btn color="red" dark class="mt-5" @click="$emit('startNewRound')">New Round</v-btn>
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
.container {
    width: 80%;
    border: 1px solid lightblue;
    border-radius: 15px;
    padding: 15px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container .winner-text {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.container .winner-text .winner-text-wrapper {
    width: 50%;
    text-align: center;
}

.container .winner-text .winner-text-wrapper span {
    font-weight: bold;
    font-size: 45px;
    color: rgb(255, 174, 0);
}

.container .participants {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.container .participants .participant-wrapper {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container .participants .participant-wrapper span {
    font-size: 24px;
    color: rgb(255, 255, 255);
}

.container .participants .participant-wrapper .participant-cards {
    display: flex;
    flex-wrap: wrap;
}

.blackjack {
    font-weight: bold;
    font-size: 32px;
    margin-top: 32px;
    color: red;
    display: flex;
    align-items: center;
}
</style>