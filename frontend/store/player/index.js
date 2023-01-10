const getDefaultState = () => {
    return {
      myPlayer: {},
    };
  };

  export default {
    namespaced: true,
    initialiseStore(state) {
        if (localStorage.getItem('sessionName')) {
          state.myPlayer.name = localStorage.getItem('sessionName');
        }
        if (localStorage.getItem('sessionPin')) {
          state.myPlayer.pin = localStorage.getItem('sessionPin');
        }
    },
    state: getDefaultState(),
    mutations: {
      setMyPlayer(state, myPlayer) {
        state.myPlayer = myPlayer;
      },
    },
    actions: {
      setMyPlayer({ commit }, myPlayer) {
        commit("setMyPlayer", myPlayer);
      },
    },
    getters: {
      getMyPlayer: (state) => state.myPlayer,
    },
  };