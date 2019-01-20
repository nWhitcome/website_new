//var socket = io('http://localhost:3000'); 

Vue.component('top_bar', {
	data: function () {
		return {
			selected: 'photos_text',
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
			<div v-bind:class="{projects_text_selected: selected == 'music_text', projects_text: selected != 'music_text'}" class="projects_text">Music</div>
		</div>
		<div id="top_bar_text">
			<div id="my_name">Nathan Whitcome</div>
			<div class="projects_text" v-bind:class="{projects_text_selected_clear: selected == 'projects_text', projects_text: selected != 'projects_text'}" @click="headingClicked(false, 'projects_text')">Projects</div>
			<div v-bind:class="{projects_text_selected_clear: selected == 'photos_text', projects_text: selected != 'photos_text'}" class="projects_text" @click="headingClicked(true, 'photos_text')">Photos</div>
			<div v-bind:class="{projects_text_selected_clear: selected == 'music_text', projects_text: selected != 'music_text'}" class="projects_text" @click="headingClicked(false, 'music_text')">Music</div>
		</div>
		<transition name="fade">
			<div v-if="selected != 'photos_text'" id="middle_content">
				<div v-if="selected == 'music_text'" id="middle_inner_content">
					<div class="info_card">
						<h1>Kaledoquiz 2018</h1>
						<p>KaledoQuiz is a competition put on every year by the radio station "the KURE" at Iowa State that involves a lot of trivia and projects in 
						order to earn points. One of the projects was to create a video with an original song or cover that was done without any conventional instruments. 
						I spent about 2.5 hours recording and creating this song using things I found on campus and in my room while my friend Austin directed and edited 
						the video. We had lots of fun making it, and it really pushed my creativity.<p>
							<iframe class="video_box" src="https://www.youtube.com/embed/I_DftkUpqmc" height="480" width="720" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
					</div>
				</div>
			</div>
		</transition>
	</div>
	`
})

Vue.component('background_image', {
	props: ['buttons_visible'],
	data: function () {
		return {
			picture_links: ['src/background_pictures/my_back_mountain.jpg', 
			'src/background_pictures/Badlands.jpg', 
			'src/background_pictures/Colorado_Top.jpg', 
			'src/background_pictures/Glacier1.jpg', 
			'src/background_pictures/Glacier2.jpg', 
			'src/background_pictures/Badlands2.jpg', 
			'src/background_pictures/Swing_Dance.jpg', 
			'src/background_pictures/Tetons1.jpg', 
			'src/background_pictures/Tetons2.jpg',
			'src/background_pictures/Tetons3.jpg',
			'src/background_pictures/River.jpg',
			'src/background_pictures/Campsite.jpg'],
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
		<transition-group name="fade" tag="div" style="display:flex; height: 100%; align-items: center; justify-content: space-between;" v-show="buttons_visible">
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