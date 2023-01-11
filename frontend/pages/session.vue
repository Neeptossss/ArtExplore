<template>
  <div className="dark">
    <div
      class="
        from-gray-800
        bg-gradient-to-t
        to-gray-900
        w-screen
        h-screen
        flex flex-col
      "
    >
      <Header />
      <div class="px-4">
        <h4 class="text-gray-400 w-full">Session N°{{ myPlayer.pin }}</h4>
      </div>
      <div class="flex flex-col h-full w-full mt-4 gap-4">
        <transition name="fade">
        <Message
          v-for="(message, index) in messages"
          :key="index"
          v-bind:refName="'message-' + index"
          v-bind:text="message.text"
          v-bind:fromMe="message.fromMe"
          v-bind:avatar="message.avatar"
        ></Message>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SessionPage',
  data() {
    return {
      myPlayer: {},
      messages: [],
      isTyping: false,
    }
  },
  async created() {
    // this.myPlayer = await this.$store.getters["player/getMyPlayer"];
    this.myPlayer = {
      name: localStorage.getItem('sessionName'),
      pin: localStorage.getItem('sessionPin'),
    }
    if (this.myPlayer.name == null || this.myPlayer.pin == null) {
      this.$router.push({ path: '/' })
    }
  },

  mounted() {
    let message = {
      text: `Bonjour, je suis [NOM] et je vais vous accompagner dans votre visite du Musée des Arts Asiatiques de Nice, enchanté ${this.myPlayer.name} !<br><br>Bienvenue dans cet espace interactif afin de visiter le musée tout en s'amusant ! Veuillez prendre en photo l'entrée du musée afin de vérifier que tout fonctionne bien.`,
      fromMe: false,
      avatar: 'drake-avatar',
    }
    this.messages.push(message)
  },
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
