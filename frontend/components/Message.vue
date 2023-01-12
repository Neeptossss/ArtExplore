<template>
  <div>
    <div
      class="flex gap-3 w-screen px-4"
      :class="{ 'flex-row-reverse': fromMe }"
    >
      <img
        class="w-10 h-10 rounded-full"
        :src="require(`@/static/${avatar}.png`)"
      />
      <div>
        <p
          :ref="refName"
          class="text-white"
          :class="{ 'text-right': fromMe }"
        ></p>
      </div>
    </div>
    <div
      v-show="finished"
      class="mt-4 grid grid-cols-2 gap-4 px-4"
      :class="{ 'grid-cols-1': answers.length === 1 }"
    >
      <button
        v-for="(answer, index) in answers"
        :key="index"
        class="bg-gray-800 text-white rounded-md p-2"
        v-bind:class="{ 'opacity-50 cursor-not-allowed': selectedIndex === index }"
        @click.prevent="selectAnswer(answer, index)"
      >
        {{ answer.text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    text: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    fromMe: {
      type: Boolean,
      required: true,
    },
    refName: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      finished: false,
      selectedIndex: -1,
    }
  },
  methods: {
    typeWriter() {
      let i = 0
      let output = ''
      let timeout = 0
      let typeChar = () => {
        if (i === this.text.length && this.answers === null)
          this.$emit('finished')
        if (i === this.text.length && this.answers !== null)
          this.finished = true
        if (i < this.text.length) {
          output += this.text[i]
          this.$refs[this.refName].innerHTML =
            output + '<span class="caret">|</span>'
          i++
          timeout = Math.floor(Math.random() * (50 - 1 + 1) + 1)
          setTimeout(typeChar, timeout)
        } else {
          this.$refs[this.refName].innerHTML = output
        }
      }
      typeChar()
    },
    selectAnswer(answer, index) {
      if (this.selectedIndex !== index) {
        this.selectedIndex = index
        if (answer.valid === 99) this.$emit('finished');
        if (answer.valid === 1) {
          this.markAsCorrect();
          this.$emit('finished');
        }
        if (answer.valid === 0) this.markAsWrong();
      }
    },
    markAsWrong() {
      this.$refs[this.refName].classList.add('text-red-500')
    },
    markAsCorrect() {
      this.$refs[this.refName].classList.add('text-green-500')
    },
  },
  mounted() {
    this.typeWriter()
    console.log(this.answers)
  },
}
</script>