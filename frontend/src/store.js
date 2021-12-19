import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
export default createStore({
    state: {
        user: {'jwt': ""},
        showUploadNotification: false
    },
    mutations: {
        updateUser(state, value){
            state.user = value;
        },
        toggleUploadNotification(state){
            state.showUploadNotification = !state.showUploadNotification;
        }
    },
    actions: {

    },
    getters: {
        isAuthenticated: state => {
            return state.user.jwt !== "";
        },
        showNotification: state => {
            return state.showUploadNotification;
        }
    },
    plugins: [createPersistedState()],
})
