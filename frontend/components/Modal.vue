<template>
<div id="authentication-modal" tabindex="-1" aria-hidden="true" class="fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-modal md:h-full flex items-center justify-center">
    <div class="relative w-full h-full max-w-md md:h-auto">
        <div class="relative bg-white rounded-lg shadow">
            <div class="px-6 py-6 lg:px-8">
                <h3 class="text-xl font-medium text-gray-900">Rejoindre une session</h3>
                <p class="text-sm text-gray-400 mb-4"> Entrez le code de session fourni par votre guide pour rejoindre la session. </p>
                <form class="space-y-6" action="#">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Votre nom</label>
                        <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="Albert Tartenpion" required>
                    </div>
                    <div>
                        <label for="session-code" class="block mb-2 text-sm font-medium text-gray-900">Code de session</label>
                        <input type="password" name="session-code" id="session-code" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" required>
                    </div>
                    <button type="submit" class="w-full text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Rejoindre la session</button>
                    <div class="text-sm font-medium text-gray-500">
                        Un problème? <a href="#" class="text-red-600 hover:underline">Centre d'aide</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>
