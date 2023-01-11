<template>
<div id="authentication-modal" tabindex="-1" aria-hidden="true" class="fixed w-full h-full z-50 p-4 overflow-x-hidden overflow-y-auto h-modal md:h-full flex items-center justify-center">
    <div class="absolute w-full h-full bg-gray-900 opacity-70" @click="$emit('close')"></div>
    <div class="relative w-full max-w-md md:h-auto">
        <div class="relative bg-white rounded-lg shadow">
            <div class="px-6 py-6 lg:px-8">
                <h3 class="text-xl font-medium text-gray-900">Rejoindre une session</h3>
                <p class="text-sm text-gray-400 mb-4"> Entrez le code de session fourni par votre guide pour rejoindre la session. </p>
                <div class="space-y-6">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Votre nom</label>
                        <input type="text" name="name" id="name" v-model="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Albert Tartenpion" required>
                    </div>
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Code de la session</label>
                        <div class="w-full flex justify-between">
                        <input ref="pinInputs" type="number" v-model="pin[0]" @keyup.enter="submit" @keyup="nextInput($event, 0)" @input="limitInput" maxlength="1" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 w-12 h-12 mr-2 text-center" placeholder="_" required>
                        <input ref="pinInputs" type="number" v-model="pin[1]" @keyup.enter="submit" @keyup="nextInput($event, 1)" @input="limitInput" maxlength="1" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 w-12 h-12 mr-2 text-center" placeholder="_" required>
                        <input ref="pinInputs" type="number" v-model="pin[2]" @keyup.enter="submit" @keyup="nextInput($event, 2)" @input="limitInput" maxlength="1" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 w-12 h-12 mr-2 text-center" placeholder="_" required>
                        <input ref="pinInputs" type="number" v-model="pin[3]" @keyup.enter="submit" @keyup="nextInput($event, 3)" @input="limitInput" maxlength="1" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 w-12 h-12 mr-2 text-center" placeholder="_" required>
                        </div>
                    </div>
                    <button :class="{'bg-gray-300': !allFieldsCompleted }" :disabled="!allFieldsCompleted" @click="submit" class="w-full text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Rejoindre la session</button>
                    <div class="text-sm font-medium text-gray-500">
                        Un problème? <a href="#" class="text-red-600 hover:underline">Centre d'aide</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            pin: ['','','',''],
            name: '',
        }
    },
    computed: {
        allFieldsCompleted() {
            return this.pin.every((item) => item !== '')
        },
    },
    methods: {
        nextInput(e, index) {
            if (e.target.value.length === 1) {
                if (index !== 3) {
                    e.target.nextElementSibling.focus()
                }
            }
        },
        limitInput(e) {
            if (e.target.value.length > 1) {
                e.target.value = e.target.value.slice(0, 1)
            }
        },
        submit() {
            let pin = this.pin.join('')
            if(pin === '1234'){
                //valid pin
                this.$emit('validate');
                localStorage.setItem('sessionPin', pin);
                localStorage.setItem('sessionName', this.name);
                let myPlayer = { name: this.name, pin: pin}
                this.$store.commit('player/setMyPlayer', myPlayer);
            }else{
                // invalid pin
                this.pin = ['','','','']
                // show an error message or shake the input
            }
        }
    }
}
</script>
