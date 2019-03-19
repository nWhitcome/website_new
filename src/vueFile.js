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
			<div v-bind:class="{projects_text_selected: selected == 'resume_text', projects_text: selected != 'resume_text'}" class="projects_text">Résumé</div>
		</div>
		<div id="top_bar_text">
			<div id="my_name">Nathan Whitcome</div>
			<div class="projects_text" v-bind:class="{projects_text_selected_clear: selected == 'projects_text', projects_text: selected != 'projects_text'}" @click="headingClicked(false, 'projects_text')">Projects</div>
			<div v-bind:class="{projects_text_selected_clear: selected == 'photos_text', projects_text: selected != 'photos_text'}" class="projects_text" @click="headingClicked(true, 'photos_text')">Photos</div>
			<div v-bind:class="{projects_text_selected_clear: selected == 'music_text', projects_text: selected != 'music_text'}" class="projects_text" @click="headingClicked(false, 'music_text')">Music</div>
			<div v-bind:class="{projects_text_selected_clear: selected == 'resume_text', projects_text: selected != 'resume_text'}" class="projects_text" @click="headingClicked(false, 'resume_text')">Résumé</div>
		</div>
		<transition name="fade">
			<div v-if="selected != 'photos_text'" id="middle_content">
				<music_page v-if="selected == 'music_text'"></music_page>
				<resume_page v-else-if="selected == 'resume_text'"></resume_page>
				<projects_page v-else-if="selected == 'projects_text'"></projects_page>
			</div>
		</transition>
	</div>
	`
})

Vue.component('resume_page', {
	template: `
	<div id="middle_inner_content">
		<div class="info_card">
			<div class="inner_box">
				<h1>Nathan Whitcome | GPA: 3.13</h1>
				<div class="small_image_holder">
					<img src="src/resume_pictures/CSS3_logo_and_wordmark.svg.png" class="resume_image">
					<img src="src/resume_pictures/HTML.png" class="resume_image">
					<img src="src/resume_pictures/Git-Logo-Black.png" class="resume_image">
					<img src="src/resume_pictures/java_logo_640.jpg" class="resume_image">
					<img src="src/resume_pictures/nodejs-new-white.png" class="resume_image">
					<img src="src/resume_pictures/React.png" class="resume_image">
					<img src="src/resume_pictures/SQL.png" class="resume_image">
					<img src="src/resume_pictures/vue.png" class="resume_image">
				</div>
				<div class="button_bar" style="padding: 0 0 10px;">
					<div class="github_image no_select" onclick="window.open('https://github.com/nWhitcome/','mywindow');">Github</div>
					<div class="linkedin_button no_select" onclick="window.open('https://www.linkedin.com/in/nathan-whitcome-310977149/','mywindow');">Linkedin</div>
				</div>
				<div id="resume_content">
						<h2>Objective</h2>
						<p class="par_padding">Find a Spring or Summer 2019 internship or
						co-op in the computer engineering field</p>
						<br>

						<h2>Education</h2>
						<p class="par_padding"><b>Iowa State University, Ames IA</b><br>
						(Expected Graduation May 2020)
						Bachelor of Science, Computer Engineering<br>
						GPA: 3.13<br>
						Major GPA: 3.81</p>
						<br>

						<h2>Leadership/Volunteer Experience</h2>
						<p class="par_padding"><b>Boy Scouts of America</b><br>
						Eagle Scout, 12 years of experience<br>
						<ul>
							<li>Organized two food drives</li>
							<li>Served at blood drives, Feed My Starving Children, eagle projects, etc.</li>
							<li>Senior Patrol Leader for over a year</li>
						</ul>
						</p>
						<br>

						<h2>Relevant Classes/Experience</h2>
						<p class="par_padding"><b>Hack ISU</b><br>
						Spring 2017<br>
						Spring 2018<br>
						Fall 2019<br><br>
						<b>Iowa State Classes</b><br>
						CPR E 281 - Digital Logic and Circuit Design<br>
						CPR E 288 - Embedded Systems Programming<br>
						CS 228 - Java Data Systems and Structures<br>
						CS 311 - Algorithm Analysis
						</p><br>
					
					
						<h2>Contact Info</h2>
						<p class="par_padding">
						&#119;&#104;&#105;&#116;&#099;&#111;&#109;&#101;&#064;&#105;&#097;&#115;&#116;&#097;&#116;&#101;&#046;&#101;&#100;&#117;
						</p><br>

						<h2>Work Experience</h2>
						<p class="par_padding">
						<b>Power Electronics International</b><br>
						Web Design Internship (Summer 2018)
						<ul>
							<li>Programming: Node Js, Python, HTML, CSS, Vue Js, and JavaScript</li>
						</ul>
						IT Work (Summer 2017)<br><br>
						<b>ISU Dining</b><br>
						Dining Staff (Fall 2016 - Spring 2017)
						<p><br>

						<h2>Technical Skills</h2>
						<p class="par_padding"><b>Web Design</b><br>
						Vue Js, Node Js, Socket.io, NPM, HTML, CSS<br><br>
						<b>Others</b><br>
						C, Java, Python, SQL, and JavaScript
						Embedded Systems Programming
						</p><br>

						<h2>Other Interests</h2>
						<p class="par_padding">
						Boxing (Fall 2018)<br>
						Audio Engineering Society (Spring 2017)<br><br>
						<b>Music</b><br>
						Self-taught multi-instrumentalist (2012 - Present)<br>
						Open Mic Night (2016 - Present)
						</p>
				</div>
			</div>
		</div>
	</div>
	`
});

Vue.component('projects_page', {
	template: `
	<div id="middle_inner_content">
		<div class="info_card">
			<div class="inner_box">
				<div class="button_bar">
					<h1>Pathfinder</h1>
					<div class="github_image no_select" onclick="window.open('https://github.com/nWhitcome/hackisu2018','mywindow');">Github</div>
					<div class="github_image_red no_select" onclick="window.open('https://hackisu2018dev.herokuapp.com/','mywindow');" style="">Webpage</div>
				</div>
				<p>Pathfinder is my project from Hack ISU 2018 using the Google Maps API. I had no idea what I wanted to do going in but decided to make something that had to do with running 
				after being inspired by my girlfriend. Hack ISU is a 36-hour competition, so I did as much development as I could in that time. I had never used the maps API before but I did 
				have a lot of experience with Javascript. The app allows the user to put in a mileage number and a direction, generating a path of close to that length for the user to run on. 
				This could prevent runners from getting bored and could keep them safe from predators that may memorize their path.<br><br></p>

				<h2>Issues</h2>
				<ol>
					<li><b>The app sometimes produces an error stating that no results were returned.</b> I know why this error is happening but I haven't had time to do any further development to fix it. 
					I might overhaul the entire system at some point in the near future, so it might not be worth fixing right now anyways.</li>
					<li><b>The Google Maps API isn't very good for what I'm doing here.</b> This causes a number of problems:
					<ul>
						<li>It always looks for the shortest path to a specific place, which meant that it was always returning 
						a path that was a straight line. I had to do a lot of work to get around this and it still comes out very inefficient.</li>
						<li><b>Creating a looping path is almost impossible.</b> The Google Maps API sends data to their servers and returns a path, so I all I can do is process the data 
						they have given to me. It only takes a few relevant parameters:
						<ul>
							<li>start point</li>
							<li>end point</li>
							<li>waypoints - places to hit on the way from the beginning to the end</li>
						</ul>
						I have very little freedom in what I can send to be processed. Creating a looping path would require me to try a bunch of different options, which would be very 
						inefficient and would take a very long time if I have to keep sending Google data and waiting for a response.
						</li>
					</ul>
				</ol><br>
				<h2>Future Development</h2>
				<p>I haven't changed much of this program since I created due to a heavy workload. I really want to work on it since I know it could make the lives of a lot of people 
				a little bit easier. I hope to solve the problems listed above by grabbing shapefiles from OpenStreetMaps and using that data to generate paths, which would give me a lot 
				more control over how I process the data and would allow me to create looping paths. It would also be a lot faster because I would not have to send anything to Google or 
				wait for a response. I also got my brother <a href="http://www.davidwhitcome.com">David Whitcome</a> involved, so we might work on the project together at some point in the future.</p>
				</p>
				<iframe src="https://hackisu2018dev.herokuapp.com/" id="pathfinder_iframe"></iframe>
			</div>
		</div>
	</div>
	`
});

Vue.component('music_page', {
	template: `
	<div id="middle_inner_content">
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
	`
});


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
				'src/background_pictures/Campsite.jpg',
				'src/background_pictures/Tetons_album.jpg'],
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

