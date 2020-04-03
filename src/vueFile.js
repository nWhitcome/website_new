var socket = io(); 

const store = new Vuex.Store({
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
})

Vue.component('top_bar', {
	data: function () {
		return {
			selected: 'photos_text',
			menu_visible: false,
			bar_hidden: true,
			hamburger_hovered: false,
			mouse_down_hamb: false,
			top_hover: {
				pr: false,
				ph: false,
				mu: false,
				re: false,
			}
		}
	},
	methods: {
		headingClicked(buttonsVisible, text) {
			this.$root.photo_buttons_visible = buttonsVisible;
			this.selected = text;
			if(this.menu_visible){this.hamburgerClicked()};
		},
		hamburgerClicked() {
			this.menu_visible = !this.menu_visible;
		},
		change_bar(value){
			this.bar_hidden = value;
		},
		toggle_full_screen(){
			if(this.$store.state.full_screen == false){
				clearInterval(this.$parent.$children[0].current_timer);
			}
			else{
				this.$parent.$children[0].current_timer = setInterval(this.$parent.$children[0].next, 10000);
			}
			store.commit('toggle_full_screen');
		},
	},
	computed: {
		full_icon: function(){
			if(this.$store.state.full_screen){
				return "fullscreen_exit"
			}
			else{
				return "fullscreen"
			}
		}
	},
	template: `
	<div style="height: 100%;">
		<div id="top_bar_cutout" :class="{ 'bar_hide': !bar_hidden , 'bar_hide': $store.state.full_screen}">
		<div id="my_name" class='no_select' v-if="$store.state.winWidth > 900">Nathan Whitcome</div>
			<div id="my_name" class='no_select' v-else>NW</div>
			<div style="display:flex; align-items: center;" v-if="$store.state.winWidth > 600">
				<div v-bind:class="{projects_text_selected: (selected == 'projects_text' || top_hover.pr === true)}" class="projects_text">Projects</div>
				<div v-bind:class="{projects_text_selected_clear: (selected == 'photos_text' || top_hover.ph == true)}" class="projects_text">Photos</div>
				<div v-bind:class="{projects_text_selected_clear: (selected == 'music_text' || top_hover.mu == true)}" class="projects_text">Music</div>
				<div v-bind:class="{projects_text_selected_clear: (selected == 'resume_text' || top_hover.re == true)}" class="projects_text">Résumé</div>
			</div>
			<div v-else class='no_select hamburger_icon' v-bind:style="{'background-color:white':!mouse_down_hamb}" 
			v-bind:class="{'black_border':(hamburger_hovered && !mouse_down_hamb), 'black_clicked':mouse_down_hamb}">
				<i style='font-size:50px;'>menu</i>
			</div>
		</div>
		<div id="top_bar_text" :class="{ 'bar_hide': !bar_hidden, 'bar_hide': $store.state.full_screen}">
		<div id="my_name" class='no_select' v-if="$store.state.winWidth > 900">Nathan Whitcome</div>
			<div id="my_name" class='no_select' v-else>NW</div>
			<div style="display:flex; align-items: center;" v-if="$store.state.winWidth > 600">
				<div @mouseenter="top_hover.pr = true;" @mouseleave="top_hover.pr = false" class="projects_text" v-bind:class="{projects_text_selected_clear: (selected == 'projects_text' || top_hover.pr == true)}" @click="headingClicked(false, 'projects_text')">Projects</div>
				<div @mouseenter="top_hover.ph = true;" @mouseleave="top_hover.ph = false" v-bind:class="{projects_text_selected_clear: (selected == 'photos_text' || top_hover.ph == true)}" class="projects_text" @click="headingClicked(true, 'photos_text')">Photos</div>
				<div @mouseenter="top_hover.mu = true;" @mouseleave="top_hover.mu = false" v-bind:class="{projects_text_selected_clear: (selected == 'music_text' || top_hover.mu == true)}" class="projects_text" @click="headingClicked(false, 'music_text')">Music</div>
				<div @mouseenter="top_hover.re = true;" @mouseleave="top_hover.re = false" v-bind:class="{projects_text_selected_clear: (selected == 'resume_text' || top_hover.re == true)}" class="projects_text" @click="headingClicked(false, 'resume_text')">Résumé</div>
			</div>
			<div v-else v-bind:class="{'black_border_fill':(hamburger_hovered && !mouse_down_hamb), 'black_clicked_transp':mouse_down_hamb}" @mousedown="mouse_down_hamb = true" 
			@mouseup="mouse_down_hamb = false; console.log('Here')" @mouseenter="hamburger_hovered = true" @mouseleave="hamburger_hovered = false" @click='hamburgerClicked()' 
			class='no_select hamburger_icon'>
				<i style='font-size:50px; cursor: pointer;'>menu</i>
			</div>
		</div>
		<transition name="slide_left" v-if='menu_visible && $store.state.winWidth < 600'>
			<menu_overlay key='menu' :selected='selected' @headingClicked='headingClicked'></menu_overlay>
		</transition>
		<transition-group name="fade" tag="div" v-else-if="selected != 'photos_text'">
			<div :class="{ 'middle_reach': !bar_hidden, 'middle_top': bar_hidden}" id="middle_content" key='middle' >
				<music_page v-show="selected == 'music_text'" :bar_hidden="bar_hidden" @change_bar = "change_bar"></music_page>
				<resume_page v-show="selected == 'resume_text'" :bar_hidden="bar_hidden" @change_bar = "change_bar"></resume_page>
				<projects_page v-show="selected == 'projects_text'" :bar_hidden="bar_hidden" @change_bar = "change_bar"></projects_page>
			</div>
		</transition-group>
		<div id="fullscreen_icon" v-if="selected == 'photos_text'" @click="toggle_full_screen" :class="{ 'fullscreen_hide': $store.state.full_screen, 'fullscreen_here': !$store.state.full_screen }" class="no_select cutout_arrow">
			<i>{{full_icon}}</i>
		</div>
		<footer v-show="selected == 'photos_text'" :class="{ 'footer_hide': $store.state.full_screen }" id="bottom_bar_cutout">
			<div style="display: flex; flex-direction: column; padding-left: 20px; position: fixed; bottom: 0px; left: 0px; height: 100px; justify-content: center;">
				<div style="font-size: 20px;">{{this.$parent.$children[0].picture_links[1].location}}
				</div>
				<div style="font-size: 14px;">{{this.$parent.$children[0].picture_links[1].date}}
				</div>
			</div>
		</footer>
		<div v-show="selected == 'photos_text'" :class="{ 'footer_hide': $store.state.full_screen }" style="height: 100px; position: fixed; bottom: 0px; left: 0px; width: 500px; z-index: 5;" class="footer_text">
			<div style="display: flex; flex-direction: column; padding-left: 20px; position: fixed; bottom: 0px; left: 0px; height: 100px; justify-content: center;">
				<div style="font-size: 20px;">{{this.$parent.$children[0].picture_links[1].location}}
				</div>
				<div style="font-size: 14px;">{{this.$parent.$children[0].picture_links[1].date}}
				</div>
			</div>
		</div>
	</div>
	`
})

Vue.component('menu_overlay', {
	props:['selected'],
	methods:{
		headingClicked(buttonsVisible, text){
			this.$emit('headingClicked', buttonsVisible, text);
		}
	},
	template:
	`
	<div style='position: absolute; left: 0; right: 0; top: 110px; bottom: 0;'>
		<div id='menu_overlay'>
			<div style='position: absolute; top: 0px; bottom: 0px; padding-top: 50px;'>
				<div class='bar_item_wrap'>
					<div v-bind:class="{projects_text_selected: selected == 'projects_text', projects_text: selected != 'projects_text'}" class="projects_text menu_font">Projects</div>
				</div>
				<div class='bar_item_wrap'>
					<div v-bind:class="{projects_text_selected: selected == 'photos_text', projects_text: selected != 'photos_text'}" class="projects_text menu_font">Photos</div>
				</div>
				<div class='bar_item_wrap'>
					<div v-bind:class="{projects_text_selected: selected == 'music_text', projects_text: selected != 'music_text'}" class="projects_text menu_font">Music</div>
				</div>
				<div class='bar_item_wrap'>
					<div v-bind:class="{projects_text_selected: selected == 'resume_text', projects_text: selected != 'resume_text'}" class="projects_text menu_font">Résumé</div>
				</div>
			</div>
		</div>
		<div style='display: flex; justify-content: center; position: absolute; left: 0; right: 0; top: 0; bottom: 0;'>
			<div style='color: rgba(0, 0, 0, .4); position: absolute; top: 0px; bottom: 0px; display: flex; flex-direction: column; mix-blend-mode: normal; z-index: 7; padding-top: 50px;'>
				<div class='bar_item_wrap'>
					<div class="projects_text menu_font" v-bind:class="{projects_text_selected_clear: selected == 'projects_text', projects_text: selected != 'projects_text'}" @click="headingClicked(false, 'projects_text')">Projects</div>
				</div>
				<div class='bar_item_wrap'>
					<div v-bind:class="{projects_text_selected_clear: selected == 'photos_text', projects_text: selected != 'photos_text'}" class="projects_text menu_font" @click="headingClicked(true, 'photos_text')">Photos</div>
				</div>
				<div class='bar_item_wrap'>
					<div v-bind:class="{projects_text_selected_clear: selected == 'music_text', projects_text: selected != 'music_text'}" class="projects_text menu_font" @click="headingClicked(false, 'music_text')">Music</div>
				</div>
				<div class='bar_item_wrap'>
					<div v-bind:class="{projects_text_selected_clear: selected == 'resume_text', projects_text: selected != 'resume_text'}" class="projects_text menu_font" @click="headingClicked(false, 'resume_text')">Résumé</div>
				</div>
			</div>
		</div>
	</div>
	`
})

Vue.component('resume_page', {
	props: ['bar_hidden'],
	data: function(){
		return {
			lastScroll: 0,
		}
	},
	methods:{
		onScroll(){
			const current_scroll = this.$refs.scroll_content.scrollTop;
			if(Math.abs(current_scroll - this.lastScroll) < 120){
				return
			}
			this.$emit('change_bar', current_scroll < this.lastScroll);
			this.lastScroll = current_scroll;
			if(this.$refs.scroll_content.scrollTop == 0){
				this.$emit('change_bar', true);
			}
		}
	},
	mounted: function() {
		//this.$refs.scroll_content.addEventListener('scroll', this.onScroll)
	},
	template: `
	<div id="middle_inner_content" ref="scroll_content">
		<div class="info_card">
			<div class="inner_box">
			<div class="button_bar">
					<h1>Career Objective</h1>
					<p>As a programmer, it is important that I am always growing and adapting to the world around me. Languages come and go and I want to make sure 
					that I'm as up-to-date as aI can be in my career. I also want to make sure that my place of work follows my ethical code and that I feel fulfiilled at my job.
					 I'm pretty flexible in terms of what I like to do, as long as I can see my impact on the world and enjoy the work that I do.</p>
				</div>
			</div>
		</div>
		<div class="info_card">
			<div class="inner_box">
				<h1>Nathan Whitcome | GPA: 3.26</h1>
				<div class="small_image_holder">
					<img src="src/resume_pictures/CSS3_logo_and_wordmark.svg.png" class="resume_image">
					<img src="src/resume_pictures/HTML.png" class="resume_image">
					<img src="src/resume_pictures/Git-Logo-Black.png" class="resume_image">
					<img src="src/resume_pictures/java_logo_640.png" class="resume_image">
					<img src="src/resume_pictures/nodejs-new-white.png" class="resume_image">
					<img src="src/resume_pictures/React.png" class="resume_image">
					<img src="src/resume_pictures/SQL.png" class="resume_image">
					<img src="src/resume_pictures/vue.png" class="resume_image">
				</div>
				<div class="button_bar" style="padding: 0 0 10px;">
					<custom_button text_val="Github" r_val=85 g_val=85 b_val=85 link_value='https://github.com/nWhitcome/'></custom_button>
					<custom_button text_val="LinkedIn" r_val=72 g_val=117 b_val=180 link_value='https://www.linkedin.com/in/nathan-whitcome-310977149/'></custom_button>
				</div>
				<div id="resume_content">
						<h2>Education</h2>
						<p class="par_padding"><b>Iowa State University, Ames IA (2016 - May 2020)</b><br>
						Bachelor of Science, Computer Engineering<br>
						GPA: 3.26<br>
						Major GPA: 3.58</p>
						<br>

						<h2>Relevant Experience</h2>
						<p class="par_padding">
						<b>Hack ISU (2017 - 2019)</b><br>
						<b>Boy Scouts of America</b><br>
						Eagle Scout, 12 years of experience<br>
						<ul>
							<li>Organized two food drives</li>
							<li>Served at blood drives, Feed My Starving Children, eagle projects, etc.</li>
							<li>Senior Patrol Leader for over a year</li>
						</ul>
						</p>
						<br>

						<h2>Relevant Classes/Experience</h2>
						<p class="par_padding">
						<b>Iowa State Classes</b><br>
						CPR E 281 – Digital Logic and Circuit Design<br>
						CPR E 288 – Embedded Systems Programming<br>
						CS 106 – Web Design with HTML/CSS<br>
						CS 227 – Intro to Java Programming<br>
						CS 228 – Java Data Systems and Structures<br>
						CS 311 – Algorithm Analysis<br>
						CPR E 308 – Operating Systems<br>
						CS 363 – Introduction to Database Systems<br>
						CPR E 430 – Network Protocols and Security<br>
						CPR E 431 – Information Systems Security<br>
						CPR E 489 – Data Communications<br>
						LD ST 322 - Leadership in a Diverse Society
						</p><br>
					
					
						<h2>Contact Info</h2>
						<p class="par_padding">
						&#119;&#104;&#105;&#116;&#099;&#111;&#109;&#101;&#064;&#105;&#097;&#115;&#116;&#097;&#116;&#101;&#046;&#101;&#100;&#117;
						</p><br>

						<h2>Work Experience</h2>
						<p class="par_padding">
						<b>Power Electronics International</b><br>
						Web Design Internship (Summer 2018 - 2019)
						<ul>
							<li>Programming: Node Js, Python, HTML, CSS, Vue Js, and JavaScript</li>
							<li>Developed software for the PE Ultra Hub</li>
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
						Political Student Group (Fall 2019 - Present)<br>
						Boxing (Fall 2018)<br>
						Audio Engineering Society (Spring 2017)<br><br>
						<b>Music</b><br>
						Self-taught multi-instrumentalist (2012 - Present)<br>
						Open Mic Night (2016 - Present)
						</p>
				</div>
			</div>
		</div>
		<div class="info_card bottom_copyright"><p style="padding: 0">© 2019 Nathan Whitcome</p></div>
	</div>
	`
});

Vue.component('projects_page', {
	props: ['bar_hidden'],
	data: function(){
		return {
			lastScroll: 0,
		}
	},
	methods:{
		onScroll(){
			const current_scroll = this.$refs.scroll_content.scrollTop;
			if(Math.abs(current_scroll - this.lastScroll) < 120){
				return
			}
			this.$emit('change_bar', current_scroll < this.lastScroll);
			this.lastScroll = current_scroll;
			if(this.$refs.scroll_content.scrollTop == 0){
				this.$emit('change_bar', true);
			}
		}
	},
	mounted: function() {
		//this.$refs.scroll_content.addEventListener('scroll', this.onScroll)
	},
	template: `
	<div id="middle_inner_content" ref="scroll_content">
		<div class="info_card">
			<div class="inner_box">
				<div class="button_bar">
					<h1>CPR E 494 Reflections</h1>
				</div>
				<p>Below are a couple relections I did about my experience at Iowa State. I thought I'd put it all here since my webpage is getting kind of cluttered with all
				 those tabs at the top.</p>
				<h2>General Education</h2>
				<minimize_content html_insert="<iframe src='./src/senior_design/Cumulative_Reflection.pdf' class='general_iframe' frameBorder='0'></iframe>"></minimize_content>
				<br>
				<h2>Cumulative</h2>
				<minimize_content html_insert="<iframe src='./src/senior_design/GE_Reflection.pdf' class='general_iframe' frameBorder='0'></iframe>"></minimize_content>
			</div>
		</div>
		<div class="info_card">
			<div class="inner_box">
				<div class="button_bar">
					<h1>Senior Design Group 36</h1>
					<custom_button text_val="Webpage" r_val=168 g_val=56 b_val=59 link_value='http://sdmay20-36.sd.ece.iastate.edu/'></custom_button>
				</div>
				<p>The senior design project that I have been involved with this year is called Open-Source Prototyping of 5G Wireless Systems for UGV/UAV,
				which basically means that we are working on experimental 5G networking systems to be used in unmanned ground and air vehicles.</p>
				<p>My role in the project has changed as time has progressed. I started out as part of a team trying to get OpenAirInterface, or OAI, working,
				which is an open-source 5G simulation and testing software. I have switched over to using SUMO, which is a program that simulates traffic
				of vehicles on a given area, which we want to use to send data to be simulated over to OAI for testing. My job right now is to create software
				using visual C++ to give a visual representation of this data as well as where cell towers and devices that connect to those towers would be
				located.</p>
				<p>I've learned a lot about how incredibly difficult it can be to get open source code running. OAI requires very specific hardware and software
				 to even run, meaning I spent a couple dozen hours just trying to get it to work. Modifying the code has also been hard since it's not very well documented 
				 and there are hundreds of thousands of lines of code.</p>
				<p>The project doesn't involve very much coding, so I haven't learned a lot in that respect, but I have learned a lot about how wireless cell systems
				work. Right now I'm learning visual C++, which I have no experience with at all.</p>
				<p>Overall, this project is quite exciting for the future of wireless communication. The goal is to implement a new algorithm that would increase the reliability
				 and lower the latency of 5G systems, which means that things like remote surgery could be possible in the near future. Learning about 5G technology has
				 been interesting, although it is hard to work with since it's so new.</p>
				<minimize_content html_insert="<iframe src='./src/senior_design/PeerEvaluation.pdf' class='general_iframe' frameBorder='0'></iframe>"></minimize_content>
			</div>
		</div>
		<div class="info_card">
			<div class="inner_box">
				<div class="button_bar">
					<h1>Power Electronics International</h1>
				</div>
				<p>I spent two summers working at Power Electronics International in East Dundee, and I learned quite a bit about programming and working on a real project
				 in a way that I had not at school. I spent most of my time doing development of a project called the PE Hub that has just been announced. PEI sells 
				crane control motors, and this device allows people to get live updates about all of those drives at once from a laptop or phone.</p>
				<p>I did a lot of full-stack web deveopment for this project, which I had never done before up until that point. I learned about javascript 
				as well as how to use things like Node Project Manager and how to debug web applications. I worked on a team, so I did learn a good bit about working 
				with other people, although they were working on different areas of the project. The company is quite small, so I was able to meet with people in 
				other departments face-to-face to understand what our customers are really looking for in a product.</p>
				<p>I didn't do a dont of evaluations while I was there since it was such a small company, but I did give many presentations and walk-throughs of the project. 
				I learned that it's quite easy to talk about something when you're really passionate about it and know it like the back of your hand. Presntations have always 
				been easy for me, so it was an enjoyable experience. I don't have have any pictures or anything of the finished product since it's still under active development.</p>
			</div>
		</div>
		<div class="info_card">
			<div class="inner_box">
				<div class="button_bar">
					<h1>Pathfinder</h1>
					<custom_button text_val="Github" r_val=85 g_val=85 b_val=85 link_value='https://github.com/nWhitcome/hackisu2018'></custom_button>
					<custom_button text_val="Webpage" r_val=168 g_val=56 b_val=59 link_value='https://hackisu2018dev.herokuapp.com/'></custom_button>
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
						a path that was a straight line. I had to do a lot of work to get around this and it is still very inefficient.</li>
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
					</li>
				</ol><br>
				<h2>Future Development</h2>
				<p>I haven't changed much of this program since I created due to a heavy workload. I really want to work on it since I know it could make the lives of a lot of people 
				a little bit easier. I hope to solve the problems listed above by grabbing shapefiles from OpenStreetMaps and using that data to generate paths, which would give me a lot 
				more control over how I process the data and would allow me to create looping paths. It would also be a lot faster because I would not have to send anything to Google or 
				wait for a response. I also got my brother <a href="http://www.davidwhitcome.com">David Whitcome</a> involved, so we might work on the project together at some point in the future.</p>
				</p>
				<minimize_content html_insert="<iframe src='https://hackisu2018dev.herokuapp.com/' class='general_iframe' frameBorder='0'></iframe>"></minimize_content>
			</div>
		</div>
		<div class="info_card">
			<div class="inner_box">
				<div class="button_bar">
					<h1>Spotify-Lifx</h1>
				</div>
				<p>This is a project that I've had my mind on for a very long time. My roommate CJ had gotten his hands on some Lifx smart bulbs that are generally controlled by a cell phone and I thought it would be pretty cool to do some programming with them if possible.
				I looked online and it turns out that they have an open API! This opens the door to a lot of fun projects, including having the bulbs change color based on what the 
				user is currently listening to on Spotify. This hasn't been done from what I can tell, so I decided to try it myself. The code is on my Github but it is private.</p>
				<p>There's a lot I want to do on for this project. I got the basic idea working using the Spotify and Lifx APIs, but I want to do a lot more, including a mobile app. I've never 
				done mobile development before, so I bought an online course to teach myself. Unfortunately, I don't have time to work on it because school is more important. I'm hoping to start development again sometime soon using Flutter.</p>
				<br>
				<h2>Spring 2020 Update</h2>
				<p>Since I last posted about this project I have made it so that the lights pulse to the music that is playing. I did this using the Spotify API, which includes information
				about each song that is broken down into individual segments that have a starting and peak volume level.</p>
				<p>There are still some issues, such as the program not working after a couple of hours and that it doesn't keep up with changes in the song currently playing if it is changed
				in any other way other than through the program or the song ending. That should be a pretty easy fix when I have time.</p>
				<div class="multi_image_holder">
					<img style="max-width: 600px; padding: 0 4px;" src="src/project_pictures/lifx_spotify/lifx_gif_opt.gif">
				</div>
			</div>
		</div>
		<div class="info_card">
			<div class="inner_box">
				<div class="button_bar">
					<h1>Old Website</h1>
					<custom_button text_val="Github" r_val=85 g_val=85 b_val=85 link_value='https://github.com/nWhitcome/nWhitcome.github.io'></custom_button>
					<custom_button text_val="Webpage" r_val=168 g_val=56 b_val=59 link_value='https://nWhitcome.github.io'></custom_button>
				</div>
				<p>This was the first website I ever built. I used time that I had while I wasn't working one summer to teach myself HTML and CSS. There are a lot of things I
				did inefficiently but I thought it came out looking pretty good considering how little I knew at the time. I eventually took a class at school on the basics of HTML and CSS 
				where I learned the proper way to do a lot of what I had already done. I decided to make the website you're currently on after getting 
				a lot more experience with Vue and Node.js at work. I wanted to show what I learned rather than just talking about it. The new site is also my first use of Vuex, which I think 
				will be important for me to know how to use in the future.</p>
				<minimize_content html_insert="<iframe src='https://nWhitcome.github.io' class='general_iframe' frameBorder='0'></iframe>"></minimize_content>
			</div>
		</div>
		<div class="info_card">
			<div class="inner_box">
				<div class="button_bar">
					<h1>394 Ethics Essay</h1>
				</div>
				<p>I had to write an ethics essay for my Cpr E 394 class, and it made me think about where I draw the line with my personal etics. I've become more involved in politics recently, and having this assignment made me think more about my impact on the world than I have before.
				</p>
				<minimize_content html_insert="<iframe src='./src/Ethics_Essay.pdf' class='general_iframe' frameBorder='0'></iframe>"></minimize_content>
			</div>
		</div>
		<div class="info_card bottom_copyright">
			<p style="padding: 0">© 2019 Nathan Whitcome</p>
		</div>
	</div>
	`
});

Vue.component('minimize_bar', {
	data:function(){
		return{
			closed_state: false,
			mainStyle:{
				'border-top-left-radius': '8px',
				'border-top-right-radius': '8px',
				borderBottomRightRadius: '0px',
				borderBottomLeftRadius: '0px',
			}
		}
	},
	methods:{
		switch_hidden(){
			this.closed_state = !this.closed_state;
			if(this.closed_state == true){
				this.mainStyle.borderBottomRightRadius = '8px';
				this.mainStyle.borderBottomLeftRadius = '8px';
			}
			else{
				this.mainStyle.borderBottomRightRadius = '0px';
				this.mainStyle.borderBottomLeftRadius = '0px';
			}
		}
	},
	template:`
		<div class="minimize_bar no_select" v-bind:style="mainStyle" @click="switch_hidden()">
			<div style="width: 100%; height: 100%;" v-if="closed_state"><i>keyboard_arrow_down</i><i>keyboard_arrow_down</i><i>keyboard_arrow_down</i></div>
			<div style="width: 100%; height: 100%;" v-else><i>keyboard_arrow_up</i><i>keyboard_arrow_up</i><i>keyboard_arrow_up</i></div>
		</div>
	`
})

Vue.component('minimize_content', {
	props:['html_insert'],
	data:function(){
		return{
			closed_state: false,
			content: null,
			mainStyle:{
				height: 'auto',
				overflow:'hidden',
				maxHeight: '600px',
				transition: 'max-height .25s ease-in',
			}
		}
	},
	created() {
		this.content = this.html_insert;
	},
	methods:{
		switch_hidden(){
			this.closed_state = !this.closed_state;
			if(this.closed_state == true){
				this.mainStyle.maxHeight = '0px';
			}
			else{
				this.mainStyle.maxHeight = '600px';
			}
		}
	},
	template:`
		<div @click="switch_hidden()" style="display: flex; flex-direction: column">
			<minimize_bar></minimize_bar>
			<span v-bind:style="mainStyle" v-html="content"></span>
		</div>
	`
})


Vue.component('music_page', {
	props: ['bar_hidden'],
	data: function(){
		return {
			lastScroll: 0,
		}
	},
	methods:{
		onScroll(){
			const current_scroll = this.$refs.scroll_content.scrollTop;
			if(Math.abs(current_scroll - this.lastScroll) < 120){
				return
			}
			this.$emit('change_bar', current_scroll < this.lastScroll);
			this.lastScroll = current_scroll;
			if(this.$refs.scroll_content.scrollTop == 0){
				this.$emit('change_bar', true);
			}
		}
	},
	mounted: function() {
		//this.$refs.scroll_content.addEventListener('scroll', this.onScroll)
	},
	template: `
	<div id="middle_inner_content" ref="scroll_content">
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
				<p>I worked with my teammate Austin to create a music video where the prompt was to create a song that didn't use any instruments. I recorded all of the sound in the
				video from my dorm room and put them together in Ableton Live. Austin and I then went out and recorded a video for it, creating a robot helmet for me to wear.
				<br>
				<br>
				It was a lot of fun and really made me think very creatively. I'm proud of how it came out especially since we only had six hours to do the whole thing.</p>
				<minimize_content html_insert="<div class='video_box_wrapper'><iframe class='video_box' src='https://www.youtube.com/embed/I_DftkUpqmc' frameborder='0' allow='encrypted-media' allowfullscreen></iframe></div"></minimize_content>
				
			</div>
		</div>
		<div class="info_card">
			<div class="inner_box">
				<div class="button_bar">
					<h1>Tetrad</h1>
					<custom_button text_val="Spotify" r_val=29 g_val=185 b_val=84 link_value='https://open.spotify.com/album/7AbFNyyBbA9RBzZfUYWq6Z'></custom_button>
					<custom_button text_val="Google Play" r_val=253 g_val=140 b_val=0 link_value='https://play.google.com/store/music/album/Tetrad_It_Came_from_the_Basement?id=Bqym4zpa5xxa7bmzygzlf3ubyxq'></custom_button>
					<custom_button text_val="Bandcamp" r_val=98 g_val=154 b_val=169 link_value='https://thebandtetrad.bandcamp.com/'></custom_button>
					<custom_button text_val="Facebook" r_val=59 g_val=89 b_val=152 link_value='https://www.facebook.com/TheBandTetrad'></custom_button>
				</div>
				<p>Tetrad was a band I started with my friends right before my senior year of high school. 
				<br>
				<br>
				I played guitar and did back up vocals, as well as writing the guitar and bass parts while helping write vocal lines and lyrics on occasion.
				We did relatively well, winning the battle of the bands for Cary, IL and getting second at regionals with an opportunity to go to state.
			 	Unfortunately, the band isn't around anymore, but we did record some music on our own as well as in a studio.
				  We finished an EP called "It Came From the Basement!" since we wrote almost all of the music in our drummer's basement.
				   Our music can be found on most streaming services by clicking on the buttons next the the name above.</p>
				<div class="multi_image_holder">
					<div class="image_holder_column">
						<img src="src/tetrad_pictures/band_pic.jpg">
					</div>
					<div class="image_holder_column">
						<img src="src/tetrad_pictures/band_pic_2.jpg">
					</div>
				</div>
			</div>
		</div>
		<div class="info_card bottom_copyright"><p style="padding: 0">© 2019 Nathan Whitcome</p></div>
	</div>
	`
});

Vue.component('custom_button', {
	props:['r_val', 'g_val', 'b_val', 'text_val', 'link_value'],
	created(){
		this.mainStyle.backgroundColor = 'rgb(' + this.r_val + ', ' + this.g_val + ',' +  this.b_val + ')';
	},
	methods:{
		darken_button(){
			this.mainStyle.backgroundColor = 'rgb(' + (parseInt(this.r_val) - 15) + ', ' + (parseInt(this.g_val) - 15) + ',' +  (parseInt(this.b_val) - 15) + ')';
		},
		return_button(goToPage){
			this.mainStyle.backgroundColor = 'rgb(' + this.r_val + ', ' + this.g_val + ',' +  this.b_val + ')';
			this.mainStyle.transition = '.1s'
			if(goToPage){window.open(this.link_value,'mywindow');}
		},
		click_button(){
			this.mainStyle.backgroundColor = 'rgb(' + (parseInt(this.r_val) + 15) + ', ' + (parseInt(this.g_val) + 15) + ',' +  (parseInt(this.b_val) + 15) + ')';
			this.mainStyle.transition = '0s';
		}
	},
	data: function(){
		return{
			mainStyle:{
				'color': 'white',
				padding: '5px 15px',
				backgroundColor: '#555',
    			fontSize: '20px',
    			margin: '5px 10px',
    			height: '30px',
    			'line-height': '30px',
    			'vertical-align': 'center',
    			'border-radius': '25px',
    			transition: '.1s',
				'cursor': 'pointer'
			}
		}
	},
	template:
		`
		<div v-bind:style="mainStyle" class="no_select" @mouseover="darken_button()" @mouseleave="return_button(false)" @mousedown="click_button()" @mouseup="return_button(true)">{{text_val}}</div>
		`
});

Vue.component('background_image', {
	props: ['buttons_visible'],
	data: function () {
		return {
			picture_links: [
				{ 
					link: 'src/background_pictures/my_back_mountain.jpg',
					id: 1,
					location: "Glacier National Park, Montana",
					date: "Summer 2018"
				},
				{
					link: 'src/background_pictures/Badlands.jpg',
					id: 2,
					location: "Badlands National Park, South Dakota",
					date: "Summer 2018"
				},
				{
					link: 'src/background_pictures/Colorado_Top.jpg',
					id: 3,
					location: "Quandry Peak, Colorado",
					date: "Summer 2017"
				},
				{
					link: 'src/background_pictures/Glacier1.jpg',
					id: 4,
					location: "Glacier National Park, Montana",
					date: "Summer 2018"
				},
				{
					link: 'src/background_pictures/Glacier2.jpg',
					id: 5,
					location: "Glacier National Park, Montana",
					date: "Summer 2018"
				},
				{
					link: 'src/background_pictures/Badlands2.jpg',
					id: 6,
					location: "Badlands National Park, South Dakota",
					date: "Summer 2018"
				},
				{
					link: 'src/background_pictures/Tetons1.jpg',
					id: 8,
					location: "Grand Teton National Park, Wyoming",
					date: "Summer 2018"
				},
				{
					link: 'src/background_pictures/Tetons2.jpg',
					id: 9,
					location: "Grand Teton National Park, Wyoming",
					date: "Summer 2018"
				},
				{
					link: 'src/background_pictures/Tetons3.jpg',
					id: 10,
					location: "Grand Teton National Park, Wyoming",
					date: "Summer 2018"
				},
				{
					link: 'src/background_pictures/River.jpg',
					id: 11,
					location: "Grand Teton National Park, Wyoming",
					date: "Summer 2018"
				},
				{
					link: 'src/background_pictures/Campsite.jpg',
					id: 12,
					location: "Rocky Mountain National Park, Colorado",
					date: "Summer 2017"
				},
				{
					link: 'src/background_pictures/Tetons_album.jpg',
					id: 13,
					location: "Grand Teton National Park, Wyoming",
					date: "Summer 2018"
				},
				{
					link: 'src/background_pictures/Norway1.jpg',
					id: 14,
					location: "Jostedalsbreen National Park, Norway",
					date: "Summer 2019"
				},
				{
					link: 'src/background_pictures/Norway2.jpg',
					id: 15,
					location: "Ålfoten, Norway",
					date: "Summer 2019"
				},
				{
					link: 'src/background_pictures/Norway4.jpg',
					id: 17,
					location: "Jostedalsbreen National Park, Norway",
					date: "Summer 2019"
				},
				{
					link: 'src/background_pictures/Norway5.jpg',
					id: 18,
					location: "Jostedalsbreen National Park, Norway",
					date: "Summer 2019"
				},
				{
					link: 'src/background_pictures/Norway6.jpg',
					id: 19,
					location: "Norway",
					date: "Summer 2019"
				}
			],
			allow_click: true,
			current_timer: null,
			slide_direction: "l"
		}
	},
	mounted: function(){
		this.current_timer = setInterval(this.next, 10000);
	},
	methods: {
		next (event) {
			if(this.allow_click == true){
				this.allow_click = false;
				this.slide_direction = "r";
				const first = this.picture_links.shift()
				this.picture_links = this.picture_links.concat(first)
				if(this.$store.state.full_screen == false){
					clearInterval(this.current_timer);
					this.current_timer = setInterval(this.next, 10000);
				}
				me = this;
				setTimeout(function(){me.allow_click = true;}, 750)
			}
		  },
		  previous (event) {
			if(this.allow_click == true){
				this.allow_click = false;
				this.slide_direction = "l";
				const last = this.picture_links.pop()
				this.picture_links = [last].concat(this.picture_links)
				if(this.$store.state.full_screen == false){
					clearInterval(this.current_timer);
					this.current_timer = setInterval(this.next, 10000);
				}
				me = this;
				setTimeout(function(){me.allow_click = true;}, 750)
			}
		  },
		  get_z_val(index_val){
			if(index_val == 1)
				return(1);
			else if(index_val == 2 && this.slide_direction === "l" || index_val == 0 && this.slide_direction === "r")
				return(-1);
			else if(index_val == 0 && this.slide_direction === "l" || index_val == 2 && this.slide_direction === "r")
				return (-2)
			else
				return(-4)
		  }
	},
	template: `
	<div style="height: 100%; overflow:hidden;">
		<div style="display:flex; flex-direction: row; width: ">
		</div>
		<transition-group class='carousel' tag="div">
     		<div v-for="(item, index) in picture_links" class="outer_box" :key="item.id" 
				v-bind:style="{ 'background-image': 'url(' + item.link + ')', 'z-index' : get_z_val(index)}" 
				v-show="item.id==picture_links[0].id || item.id==picture_links[1].id || item.id==picture_links[2].id"
				v-bind:class="{'translate_left':item.id==picture_links[0].id, 'translate_right':item.id==picture_links[2].id, 'slide':item.id==picture_links[1].id }">
      		</div>
    	</transition-group>
		<transition-group name="fade" tag="div" style="display:flex; height: 100%; align-items: center; justify-content: space-between;" v-show="buttons_visible">
		    <div id="arrow_button_left" class="cutout_arrow" key="one" v-on:click="previous()">
			    <i style="font-size:75px;">chevron_left</i>			
		    </div>
		    <div id="arrow_button_right" class="cutout_arrow" key="two" v-on:click="next()">
			    <i style="font-size:75px;padding-left: 5px;">chevron_right</i>					
		    </div>
		</transition-group>
		<div style="background-color: white; z-index: -3; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; display: flex; justify-content: center; align-items: center;">
			<div style="color: #888; font-size: 24px;">Loading...
			</div>
		</div>
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
			store.commit('adjust_width_height', window.innerWidth, window.innerHeight);
		}
	}
});

