<template>
  <div className="dark">
    <div class="from-gray-800 bg-gradient-to-t to-gray-900 w-screen h-screen flex flex-col">
      <Header />
      <div class="px-4">
        <h4 class="text-gray-400 w-full"> Session N°{{ myPlayer.pin }} </h4>
      </div>
      <div class="flex flex-col h-full w-full items-center justify-center px-4 gap-4">
        <Message v-for="(message, index) in messages" :key="index" v-bind:refName="'message-'+index" v-bind:text="message.text" v-bind:fromMe="message.fromMe" v-bind:avatar="message.avatar"></Message>
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
    }
  },
  async created() {
    // this.myPlayer = await this.$store.getters["player/getMyPlayer"];
    this.myPlayer = {name: localStorage.getItem('sessionName'), pin: localStorage.getItem('sessionPin')};
    if (this.myPlayer.name == null || this.myPlayer.pin == null) {
      this.$router.push({ path : '/' });
    }
  },

    mounted() {
        let message = {text: "Bienvenue dans la session N°" + this.myPlayer.pin + " !", fromMe: false, avatar: "drake-avatar"};
        this.messages.push(message);
    }
}
</script>