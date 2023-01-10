<template>
  <div class="bg-gray-900 w-screen h-screen" className="dark">
    <Header />
    <div class="flex h-100 w-100 items-center justify-center">
      <button class="bg-red-600 rounded-md p-4 text-white font-bold">
        <i class="bx bxs-compass"></i> Commencez l'aventure !
      </button>
    </div>
    <Tutorial />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
