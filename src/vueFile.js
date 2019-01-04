//var socket = io('http://localhost:3000'); 

Vue.component('top_bar', {
	data: function () {
		return {
			selected: null,
		}
	},
	methods: {
		onClickBack(event) {
			this.slide_direction = "slide_right";
			if (this.current_picture_index == 0) {
				this.current_picture_index = this.picture_links.length - 1;
			}
			else
				this.current_picture_index = this.current_picture_index - 1;
			clearInterval(this.current_timer);
			this.current_timer = setInterval(this.onClickForward, 10000);
		},
		onClickForward(event) {
			this.slide_direction = "slide_left";
			if (this.current_picture_index == this.picture_links.length - 1)
				this.current_picture_index = 0;
			else
				this.current_picture_index = this.current_picture_index + 1;
			clearInterval(this.current_timer);
			this.current_timer = setInterval(this.onClickForward, 10000);
		},
		headingClicked(buttonsVisible, text){
			this.$root.photo_buttons_visible = buttonsVisible;
			this.selected = text;
		}
	},
	template: `
	<div style="height: 100%;">
		<div id="top_bar_cutout">
			<div id="my_name">Nathan Whitcome</div>
			<div v-bind:class="{projects_text_selected: selected == 'projects_text', projects_text: selected != 'projects_text'}" class="projects_text">Projects</div>
			<div v-bind:class="{projects_text_selected: selected == 'photos_text', projects_text: selected != 'photos_text'}" class="projects_text">Photos</div>
		</div>
		<div id="top_bar_text">
			<div id="my_name">Nathan Whitcome</div>
			<div class="projects_text" v-bind:class="{projects_text_selected_clear: selected == 'projects_text', projects_text: selected != 'projects_text'}" @click="headingClicked(false, 'projects_text')">Projects</div>
			<div v-bind:class="{projects_text_selected_clear: selected == 'photos_text', projects_text: selected != 'photos_text'}" class="projects_text" @click="headingClicked(true, 'photos_text')">Photos</div>
		</div>
	</div>
	`
})

Vue.component('background_image', {
	props: ['buttons_visible'],
	data: function () {
		return {
			picture_links: ['background_pictures/my_back_mountain.jpg', 'background_pictures/Badlands.jpg', 'background_pictures/Colorado_Top.jpg', 'background_pictures/Glacier1.jpg', 'background_pictures/Glacier2.jpg', 'background_pictures/Badlands2.jpg', 'background_pictures/Swing_Dance.jpg', 'background_pictures/Tetons1.jpg', 'background_pictures/Tetons2.jpg'],
			current_picture_index: 0,
			current_timer: setInterval(this.onClickForward, 10000),
			slide_direction: "slide_left"
		}
	},
	methods: {
		onClickBack(event) {
			this.slide_direction = "slide_right";
			if (this.current_picture_index == 0) {
				this.current_picture_index = this.picture_links.length - 1;
			}
			else
				this.current_picture_index = this.current_picture_index - 1;
			clearInterval(this.current_timer);
			this.current_timer = setInterval(this.onClickForward, 10000);
		},
		onClickForward(event) {
			this.slide_direction = "slide_left";
			if (this.current_picture_index == this.picture_links.length - 1)
				this.current_picture_index = 0;
			else
				this.current_picture_index = this.current_picture_index + 1;
			clearInterval(this.current_timer);
			this.current_timer = setInterval(this.onClickForward, 10000);
		},
	},
	template: `
	<div style="height: 100%;">
		<transition-group :name="slide_direction" tag="div" class="outer_box" v-for="(item, index) in picture_links" :key="index" style=" animation-duration: 1s; animation-name: fadebackground;">
			<div class="outer_box" :key="item" v-show="index == current_picture_index" v-bind:style="{ 'background-image': 'url(' + picture_links[index] + ')' }"></div>
		</transition-group>
		<transition-group name="fadebackground" tag="div" style="display:flex; height: 100%; align-items: center; justify-content: space-between;" v-show="buttons_visible">
		    <div id="arrow_button_left" class="cutout_arrow" key="one" v-on:click="this.onClickBack">
			    <i style="font-size:65px;">chevron_left</i>			
		    </div>
		    <div id="arrow_button_right" class="cutout_arrow" key="two" v-on:click="this.onClickForward">
			    <i style="font-size:65px;padding-left: 5px;">chevron_right</i>					
		    </div>
		</transition-group>	
	</div>
	`
})

new Vue({
	el: '#app',
	data: function(){
		return {
			photo_buttons_visible: true,
		}
	},
	created: function () {
		window.addEventListener('resize', this.handleResize)
		this.handleResize();
	},
	methods: {
		handleResize() {
			this.winWidth = window.innerWidth;
			this.winHeight = window.innerHeight;
		}
	}
});