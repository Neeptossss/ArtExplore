<template>
  <div className="dark">
    <div class="from-gray-800 bg-gradient-to-t to-gray-900 w-screen h-screen flex flex-col">
      <Header />
      <div class="flex flex-col h-full w-full items-center justify-center gap-4 px-8">
        <button class="w-full bg-red-600 rounded-md p-4 text-white font-bold" @click="showModal = true">
          <i class="bx bxs-compass"></i> Commencez l'aventure !
        </button>
        <button class="w-full border-red-600 border-2 rounded-md p-4 text-white font-bold">
          <i class="bx bxs-bar-chart-alt-2"></i> Tableau des scores
        </button>
      </div>
      <transition name="fade">
        <Modal v-if="showModal" @close="showModal = false" />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      showModal: false
    }
  }
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