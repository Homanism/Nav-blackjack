<template>
    <v-app-bar app color="green" dark height="80px">
        <div class="d-flex align-center">
            <v-img alt="Game Logo" class="shrink mr-2" contain src="../assets/blackjack-logo.png"
                transition="scale-transition" width="40" />
                <v-img alt="Game Logo" class="shrink mr-2" contain 
                src="https://www.ks.no/imagevault/publishedmedia/ma93si0vhch37c7sars5/Logo_NAV.png"
                transition="scale-transition" width="70" />

            <h2>Velkommen til Homan BlackJack!</h2>

        </div>
    </v-app-bar>
</template>

<script>
export default {
    props: ['isMyTurn']
}
</script>