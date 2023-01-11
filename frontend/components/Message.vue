<template>
  <div>
    <div class="flex gap-3 w-screen px-4" :class="{ 'flex-row-reverse': fromMe }">
      <img class="w-10 h-10 rounded-full" :src="require(`@/static/${avatar}.png`)" />
      <div>
        <p :ref="refName" class="text-white" :class="{ 'text-right': fromMe }">
        </p>
      </div>
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
    let i = 0;
    let output = '';
    let timeout = 0;
    let typeChar = () => {
        if (i < this.text.length) {
            output += this.text[i];
            this.$refs[this.refName].innerHTML = output + '<span class="caret">|</span>';
            i++;
            timeout = Math.floor(Math.random() * (50 - 1 + 1) + 1);
            setTimeout(typeChar, timeout);
        } else {
            this.$refs[this.refName].innerHTML = output;
        }
    }
    typeChar();
}

  },

    mounted() {
        this.typeWriter()
    },
}
</script>