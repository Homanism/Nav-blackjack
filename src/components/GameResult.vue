<template>
    <div class="container">
        <h1>RESULT:</h1>
       
    </div>
</template>

<script>
// import GameCard from './GameCard.vue';
export default {
    components: {
        // GameCard
    },
    props: ['winner', 'myCards', 'opponentCards', 'myScore', 'opponentScore', 'isBlackjack']
}
</script>

<style>

</style>