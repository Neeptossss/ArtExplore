<template>
  <div className="dark">
    <div class="from-gray-800 bg-gradient-to-t to-gray-900 w-screen h-screen flex flex-col">
      <Header />
      <TheCanvas />
      <div class="flex flex-col h-full w-full items-center justify-center gap-4 px-8 relative">
        <button class="w-full bg-red-600 rounded-md p-4 text-white font-bold" @click="showModal = true">
          <i class="bx bxs-compass"></i> Commencez l'aventure !
        </button>
        <nuxt-link to="/leaderboard" class="w-full border-red-600 border-2 rounded-md p-4 text-white text-center font-bold">
          <i class="bx bxs-bar-chart-alt-2"></i> Tableau des scores
        </nuxt-link>
      </div>
      <transition name="fade">
        <Modal v-if="showModal" @close="showModal = false" @validate="redirectSession" />
      </transition>
    </div>
  </div>
</template>

<script>
import TheCanvas from '../components/TheCanvas.vue';
export default {
    name: "IndexPage",
    data() {
        return {
            showModal: false
        };
    },
    methods: {
        redirectSession() {
            this.showModal = false;
            this.$router.push({ path: "/session" });
        }
    },
    components: { TheCanvas }
}
</script>


<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>