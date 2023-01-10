<template>
  <div>
    <div class="flex items-center gap-4">
      <img class="w-12 h-12 rounded-full" :src="require(`@/static/${avatar}.png`)" />
      <p :ref="refName" class="text-white font-bold" :class="{ 'text-right': fromMe }">
      </p>
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
  },
  methods: {
    typeWriter() {
        let i = 0
        let output = ''
        let intervalId = setInterval(() => {
            if (i < this.text.length) {
                output += this.text[i]
                this.$refs[this.refName].innerHTML =
                    output + '<span class="caret">|</span>'
                i++
            } else {
                clearInterval(intervalId)
                this.$refs[this.refName].innerHTML = output
            }
        }, 100)
    },
  },

    mounted() {
        this.typeWriter()
    },
}
</script>