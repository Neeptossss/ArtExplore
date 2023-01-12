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
      <div
        class="
          flex flex-col
          h-full
          w-full
          my-4
          gap-8
          max-h-full
          overflow-y-auto
        "
      >
        <Message
          v-for="(message, index) in messages"
          :key="index"
          v-bind:refName="'message-' + index"
          v-bind:text="message.text"
          v-bind:fromMe="message.fromMe"
          v-bind:avatar="message.avatar"
          v-on:finished="nextQuestion"
          v-on:enigma-validation="enigmaValidation"
          v-bind:answers="message.answers"
        ></Message>
        <div
          v-if="isCameraOpen"
          class="camera-box"
          :class="{ flash: isShotPhoto }"
        >
          <div class="camera-shutter" :class="{ flash: isShotPhoto }"></div>
          <video
            ref="camera"
            :width="450"
            :height="337.5"
            autoplay
          ></video>
        </div>
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
      questions_answers: [],
      question_index: 0,
      enigma_validation_message: {
        text: 'Pour me montrer que vous avez bien trouvé la bonne oeuvre vous devrez prendre une photo afin que je puisse vérifier',
        fromMe: false,
        avatar: 'drake-avatar',
        answers: [{ text: 'Prendre une photo', valid: 100 }],
      },
      isCameraOpen: false,
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
    await this.$axios
      .get(`/session/${this.myPlayer.pin}/getcurrentqa`)
      .then((response) => {
        this.questions = response.data
      })
  },

  mounted() {
    let message = {
      text: `Bonjour, je suis [NOM] et je vais vous accompagner dans votre visite du Musée des Arts Asiatiques de Nice, enchanté ${this.myPlayer.name} !<br><br>Bienvenue dans cet espace interactif afin de visiter le musée tout en s'amusant !`,
      fromMe: false,
      avatar: 'drake-avatar',
      answers: [{ text: 'Commencer', valid: 99 }],
    }
    this.messages.push(message)
    this.isTyping = true
  },

  methods: {
    async nextQuestion() {
      this.$nextTick(() => {
        const div = document.querySelector(
          '.flex.flex-col.h-full.w-full.my-4.gap-8.max-h-full.overflow-y-auto'
        )
        div.scrollTop = div.scrollHeight
      })
      this.isTyping = false
      if (this.question_index < this.questions.length) {
        let message = {
          text: this.questions[this.question_index].question.text,
          fromMe: false,
          avatar: 'drake-avatar',
          answers: this.questions[this.question_index].answers,
        }
        this.messages.push(message)
        this.isTyping = true
        this.question_index++
      } else {
        this.messages.push(this.enigma_validation_message)
        this.isTyping = true
      }
    },
    enigmaValidation() {
      this.isCameraOpen = true;
      const constraints = (window.constraints = {
        audio: false,
        video: true,
      })

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.$refs.camera.srcObject = stream
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
