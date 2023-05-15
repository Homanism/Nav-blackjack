<template>
    <v-app-bar app color="primary" dark height="80px">
        <div class="d-flex align-center">
            <v-img alt="Game Logo" class="shrink mr-2" contain src="../assets/blackjack-logo.png"
                transition="scale-transition" width="40" />

            <h2>Velkommen til Homan BlackJack!</h2>

            <div class="ml-10 d-flex">
                <div>
                    <v-chip label :disabled="!isMyTurn" class="ma-2" color="orange" text-color="white">
                        <v-icon left>
                            mdi-account-circle-outline
                        </v-icon>
                        Your turn
                    </v-chip>
                </div>

            </div>
        </div>
    </v-app-bar>
</template>

<script>
export default {
    props: ['isMyTurn']
}
</script>