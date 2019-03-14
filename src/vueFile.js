//var socket = io('http://localhost:3000'); 

const store = new Vuex.Store({
	state: {
		bottom_visible: 0,
		current_picture_index: 0,
	},
	mutations: {
	},
})

Vue.component('top_bar', {
	data: function () {
		return {
			selected: 'photos_text',
		}
	},
	methods: {
		headingClicked(buttonsVisible, text) {
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
						<div class="inner_box">
						<h1>Kaleidoquiz</h1>
						<p>KaleidoQuiz is a competition put on every year by the radio station "the KURE" at Iowa State that involves a lot of trivia and projects in 
						order to earn points. There is always a musical video challenge that I participate in.</p>
						<br>
						<h2>2019</h2>
						<p>The musical challenge for 2019 involved creating a diss track about ourselves. There was another Nathan in our group that knows how to rap pretty well, so him and I
						teamed up to make the song and video below. I made a simple trap beat in about 20 minutes while he wrote some disses. I then recorded his voice, mixing and mastering it
						while him and another teammate of mine recorded a video for it.
						<br>
						<br>
						My music production skills improved an incredible amount compared to the year before. Writing music on a weekly basis also really helped me write something
						that worked for what we were trying to accomplish.</p>
						<br>
						<br>
						<h2>2018</h2>
						<p>I worked with my teammate Ausin to create a music video where the prompt was to create a song that didn't use any instruments. I recorded all of the sound in the
						video from my dorm room and put them together in Ableton Live. Austin and I then went out and recorded a video for it, creating a robot helmet for me to wear.
						<br>
						<br>
						It was a lot of fun and really made me think very creatively. I'm proud of how it came out especially since we only had six hours to do the whole thing.</p>
							<iframe class="video_box" src="https://www.youtube.com/embed/I_DftkUpqmc" height="480" width="720" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
						</div>
					</div>
					<div class="info_card">
						<div class="inner_box">
						<h1>Tetrad</h1>
						<p>Tetrad was a band I started with my friends right before my senior year of high school. 
						<br>
						<br>
						I played guitar and did back up vocals, as well as writing the guitar and bass parts while helping write vocal lines and lyrics on occasion.
						We did relatively well, winning the battle of the bands for Cary, IL and getting second at regionals with an opportunity to go to state.
						 Unfortunately, the band isn't around anymore, but we did record some music on our own as well as in a studio.
						  We finished an EP called "It Came From the Basement!" since we wrote almost all of the music in our drummer's basement.
						   Our music can be found on most streaming services by clicking on the links below.</p>
						</div>
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
	created: function () {
		this.$store.commit('setTimer')
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
	store,
	data: function () {
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

