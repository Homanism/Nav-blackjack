<template>
    <v-card class="ma-1" width="95" height="136" style="cursor: pointer;">
        <img
          alt="Game Logo"
          :src="cardImageURL"
          transition="scale-transition"
          @click="openCard"
          style="height: 100%;"
        />
    </v-card>
</template>

<script>
export default {
    props: {
        cardData: Object,
        hideCard: Boolean
    },
    data: () => ({
        reveal: false,
    }),
    methods: {
        openCard() {
            this.$emit('openCard', this.cardData);
        }
    },
    computed: {
        cardImageURL() {
            if (this.hideCard) {
                return "/cards/BACK.png";
            }
            return "/cards/" + this.cardData.value + "-" + this.cardData.suit + ".png";
        }
    }
}
</script>

<style>
.v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}

.card-suit {
    color: gray;
    font-size: 12px;
    margin-top: 2px;
}

.card-value {
    font-weight: normal;
    font-size: 32px;
}
</style>