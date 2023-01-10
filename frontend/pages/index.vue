<template>
  <div className="dark">
    <div class="bg-gray-900 w-screen h-screen flex flex-col">
      <Header />
      <div class="flex h-full w-full items-center justify-center">
        <button class="bg-red-600 rounded-md p-4 text-white font-bold" @click="showModal = true">
          <i class="bx bxs-compass"></i> Commencez l'aventure !
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