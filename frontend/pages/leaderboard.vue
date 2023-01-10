<template>
  <div className="dark">
    <div class="from-gray-800 bg-gradient-to-t to-gray-900 w-screen h-screen flex flex-col">
      <Header />
      <div class="flex flex-col h-full w-full items-center justify-center px-8 gap-4">
        <nuxt-link to="/" class="w-full border-red-600 border-2 rounded-md p-4 text-white text-center font-bold">
          <i class="bx bxs-chevron-left"></i> Retour au menu
        </nuxt-link>
        <div class="w-full flex flex-col items-center justify-center bg-gray-700 rounded-md p-4">
            <h1 class="text-white font-bold mb-4"> Tableau des scores </h1>
            <ul class="w-full text-left">
                <li v-for="(player, index) in players" v-bind="player" :key="index" class="w-full text-white flex justify-between">
                    <p> {{ index + 1 }}. </p>
                    <p> {{ player.name }} </p>
                    <p> {{ player.score }} </p>
                </li>
                <hr class="my-4">
                <li class="w-full text-white flex justify-between">
                    <p> {{ myPlayer.position }}. </p>
                    <p> {{ myPlayer.name }} </p>
                    <p> {{ myPlayer.score }} </p>
                </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeaderboardPage',
  data() {
    return {
        players: [],
        myPlayer: {name: "Moi", score: 400, position: 125}
    }
  },
    async mounted() {
        let i = 0
        while (i < 9) {
            i++
            this.players.push({name: "Albert", score: 850})
        }
    }
}
</script>