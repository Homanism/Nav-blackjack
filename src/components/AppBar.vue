<template>
    <v-app-bar app color="#0B6623" dark height="80px">
        <div class="d-flex align-center">
            <v-img alt="Game Logo" class="shrink mr-2" contain src="../assets/blackjack-logo.png"
                transition="scale-transition" width="40" />
                
                <v-img alt="Game Logo" class="shrink mr-2" contain 
                src="https://www.ks.no/imagevault/publishedmedia/ma93si0vhch37c7sars5/Logo_NAV.png"
                transition="scale-transition" width="70" />

                <h2>Velkommen til Homan BlackJack!</h2>

            <div class="ml-10 d-flex">
                <div>
                    <v-chip label :disabled="!isMyTurn" class="ma-2" color="red" text-color="white">
                        <v-icon left>
                            mdi-account-circle-outline
                        </v-icon>
                        Your turn
                    </v-chip>
                </div>
                <div>
                    <v-chip label :disabled="isMyTurn" class="ma-2" color="red" text-color="white">
                        <v-icon left>
                            mdi-account-circle-outline
                        </v-icon>
                        Magnus's turn
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