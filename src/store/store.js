import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
		bottom_visible: 0,
		winWidth: null,
		winHeight: null,
		full_screen: false,
	},
	mutations: {
		adjust_width_height(state, width, height){
			state.winWidth = width;
			state.winHeight = height;
		},
		toggle_full_screen(state){
			state.full_screen = !state.full_screen;
		}
	},
});