var socket = io(); 

const store = new Vuex.Store({
	state: {
		bottom_visible: 0,
		current_picture_index: 0,
		winWidth: null,
		winHeight: null,
	},
	mutations: {
		adjust_width_height(state, width, height){
			state.winWidth = width;
			state.winHeight = height;
		}
	},
})

Vue.component('top_bar', {
	data: function () {
		return {
			selected: 'photos_text',
			menu_visible: false,
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
	},
	template: `
	<div style="height: 100%;">
		<div id="top_bar_cutout">
			<div id="my_name" v-if="this.$store.state.winWidth > 900">Nathan Whitcome</div>
			<div id="my_name" v-else>NW</div>
			<div style="display:flex; align-items: center;" v-if="this.$store.state.winWidth > 600">
				<div v-bind:class="{projects_text_selected: selected == 'projects_text', projects_text: selected != 'projects_text'}" class="projects_text">Projects</div>
				<div v-bind:class="{projects_text_selected: selected == 'photos_text', projects_text: selected != 'photos_text'}" class="projects_text">Photos</div>
				<div v-bind:class="{projects_text_selected: selected == 'music_text', projects_text: selected != 'music_text'}" class="projects_text">Music</div>
				<div v-bind:class="{projects_text_selected: selected == 'resume_text', projects_text: selected != 'resume_text'}" class="projects_text">Résumé</div>
			</div>
			<div v-else class='no_select'><i style='font-size:50px;'>menu</i></div>
		</div>
		<div id="top_bar_text">
			<div id="my_name" v-if="this.$store.state.winWidth > 900">Nathan Whitcome</div>
			<div id="my_name" v-else>NW</div>
			<div style="display:flex; align-items: center;" v-if="this.$store.state.winWidth > 600">
				<div class="projects_text" v-bind:class="{projects_text_selected_clear: selected == 'projects_text', projects_text: selected != 'projects_text'}" @click="headingClicked(false, 'projects_text')">Projects</div>
				<div v-bind:class="{projects_text_selected_clear: selected == 'photos_text', projects_text: selected != 'photos_text'}" class="projects_text" @click="headingClicked(true, 'photos_text')">Photos</div>
				<div v-bind:class="{projects_text_selected_clear: selected == 'music_text', projects_text: selected != 'music_text'}" class="projects_text" @click="headingClicked(false, 'music_text')">Music</div>
				<div v-bind:class="{projects_text_selected_clear: selected == 'resume_text', projects_text: selected != 'resume_text'}" class="projects_text" @click="headingClicked(false, 'resume_text')">Résumé</div>
			</div>
			<div v-else @click='hamburgerClicked()' class='no_select'><i style='font-size:50px; cursor: pointer;'>menu</i></div>
		</div>
		<transition name="slide_left" v-if='menu_visible && this.$store.state.winWidth < 600'>
			<menu_overlay key='menu' :selected='selected' @headingClicked='headingClicked'></menu_overlay>
		</transition>
		<transition-group name="fade" tag="div" v-else-if="selected != 'photos_text'">
			<div  id="middle_content" key='middle'>
				<music_page v-if="selected == 'music_text'"></music_page>
				<resume_page v-else-if="selected == 'resume_text'"></resume_page>
				<projects_page v-else-if="selected == 'projects_text'"></projects_page>
			</div>
		</transition-group>
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
					<custom_button text_val="Github" r_val=85 g_val=85 b_val=85 link_value='https://github.com/nWhitcome/'></custom_button>
					<custom_button text_val="LinkedIn" r_val=72 g_val=117 b_val=180 link_value='https://www.linkedin.com/in/nathan-whitcome-310977149/'></custom_button>
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
		<div class="info_card">© 2019 Nathan Whitcome</div>
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
					<h1>Old Website</h1>
					<custom_button text_val="Github" r_val=85 g_val=85 b_val=85 link_value='https://github.com/nWhitcome/nWhitcome.github.io'></custom_button>
					<custom_button text_val="Webpage" r_val=168 g_val=56 b_val=59 link_value='nWhitcome.github.io'></custom_button>
				</div>
				<p>This was the first website I ever built. I used time that I had while I wasn't working one summer to teach myself HTML and CSS. There are a lot of things I
				did inefficiently but I thought it came out looking pretty good considering how little I knew at the time. I eventually took a class at school on the basics of HTML and CSS 
				where I learned the proper way to do a lot of what I had already been doing. I decided to make the website you're currently on after getting 
				a lot more experience with Vue and Node.js at work. I wanted to show what I learned rather than just talking about it. The new site is also my first use of Vuex, which I think 
				will be important for me to know how to use in the future.</p>

				<minimize_content html_insert="<iframe src='https://nWhitcome.github.io' class='general_iframe' frameBorder='0'></iframe>"></minimize_content>
			</div>
		</div>
		<div class="info_card">© 2019 Nathan Whitcome</div>
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
				overflow:'hidden'
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
				this.mainStyle.height = '35px';
			}
			else{
				this.mainStyle.height = 'auto';
			}
		}
	},
	template:`
		<div v-bind:style="mainStyle" @click="switch_hidden()">
			<minimize_bar></minimize_bar>
			<span v-html="content"></span>
		</div>
	`
})


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
					<img class="fifty_width_image" src="src/tetrad_pictures/band_pic.jpg">
					<img class="fifty_width_image" src="src/tetrad_pictures/band_pic_2.jpg">
				</div>
			</div>
		</div>
		<div class="info_card">© 2019 Nathan Whitcome</div>
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
			store.commit('adjust_width_height', window.innerWidth, window.innerHeight);
		}
	}
});

