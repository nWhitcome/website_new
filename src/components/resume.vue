<template>
    <div id="middle_inner_content" ref="scroll_content">
		<div class="info_card">
			<div class="inner_box">
				<div class="button_bar">
					<h1>Career Objective</h1>
					<p>As a programmer, it is important that I am always growing and adapting to the world around me. Languages come and go and I want to make sure that I'm as up-to-date as I can be in my career. I also want to make sure that my place of work follows my ethical code and that I feel fulfiilled at my job. I'm pretty flexible in terms of what I like to do, as long as I can see my impact on the world and enjoy the work that I do.</p>
				</div>
			</div>
		</div>
		<div class="info_card">
			<div class="inner_box">
				<h1>Nathan Whitcome | GPA: 3.26</h1>
				<div class="small_image_holder">
					<img src="src/assets/resume_pictures/CSS3_logo_and_wordmark.svg.png" class="resume_image">
					<img src="src/assets/resume_pictures/HTML.png" class="resume_image">
					<img src="src/assets/resume_pictures/Git-Logo-Black.png" class="resume_image">
					<img src="src/assets/resume_pictures/java_logo_640.png" class="resume_image">
					<img src="src/assets/resume_pictures/nodejs-new-white.png" class="resume_image">
					<img src="src/assets/resume_pictures/React.png" class="resume_image">
					<img src="src/assets/resume_pictures/SQL.png" class="resume_image">
					<img src="src/assets/resume_pictures/vue.png" class="resume_image">
				</div>
				<div class="button_bar" style="padding: 0 0 10px;">
					<CustomButton text_val="Github" r_val=85 g_val=85 b_val=85 link_value='https://github.com/nWhitcome/'></CustomButton>
					<CustomButton text_val="LinkedIn" r_val=72 g_val=117 b_val=180 link_value='https://www.linkedin.com/in/nathan-whitcome-310977149/'></CustomButton>
				</div>
				<div id="resume_content" style="border-bottom: 1px #DDD solid;">

						<h2>Contact Info</h2>
						<a class="par_padding" href='mailto&#58;nat&#104;a&#110;&#37;&#50;E&#119;hi&#116;c&#111;me&#37;2E&#98;u%73i%6Ee&#115;&#115;&#37;4&#48;gm%61il%&#50;Eco&#109;'>nathan&#46;whitc&#111;me&#46;busin&#101;s&#115;&#64;gm&#97;i&#108;&#46;com</a>
						<br><br>

						<h2>Education</h2>
						<p class="par_padding"><b>Iowa State University, Ames IA (2016 - May 2020)</b><br>
						Bachelor of Science, Computer Engineering<br>
						GPA: 3.26<br>
						Major GPA: 3.58
						</p>
						<br>

						<h2>Technical Skills</h2>
						<p class="par_padding"><b>Programming – Name (Years Experience)</b><br>
						C (3.5), Java (3.5), HTML (3), CSS (3), Vue.js (2), Node.js (2), Socket.io (2), NPM (2), JavaScript (2), PostgreSQL (2), MySQL (1.5), Python (1)
						<br><br>
						<b>Others – Name (Years Experience)</b><br>
						Git (3.5), Circuits (3.5), Hadoop (0.5), Embedded Systems (1), Logic Design (1)
						</p>
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

						<h2>College Classes</h2>
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

						<h2>Other Interests</h2>
						<p class="par_padding">
						Political Student Group (Fall 2019 - Present)<br>
						Boxing (Fall 2018)<br>
						Audio Engineering Society (Spring 2017)<br><br>
						<b>Music</b><br>
						Self-taught multi-instrumentalist (2012 - Present)<br>
						Open Mic Night (2016 - Present)
						<br>
						</p>
				</div>
				<div style="width: 100%; margin-top: 20px;">
					<h2>Employment</h2>
					<p class="par_padding">
					<b>Power Electronics International</b><br>
					Software Development Internship (Summer 2018 – 2019)<br>
					<ul>
						<li>Worked with a team to develop the PE Ultra Hub using full-stack web development skills</li>
						<li>Created internal software using Python and SQL</li>
					</ul>
					IT Work (Summer 2017)<br><br>
					</p>
					<h2>Software Projects</h2>
					<p class="par_padding">
					<b>My Website</b><br>
					<ul>
						<li>Wrote a website to hold my projects, photos of me, music, and my resume</li>
						<li>Written using Node.js on the backend with Vue.js, Vuex, HTML, and CSS on the frontend</li>
						<li>Hosted in Heroku</li>
					</ul>
					<b>Spotify-Lifx</b><br>
					<ul>
						<li>Wrote a webapp that changes the color of Lifx bulbs to match colors of the album art of what a user is currently listening to on Spotify</li>
						<li>Updated recently to change bulb brightness based on loudness information from the Spotify API</li>
						<li>Written using JavaScript, HTML, CSS, Vue.js, the Spotify API, and the Lifx API</li>
					</ul>
					<b>Pathfinder – Hack ISU 2019</b><br>
					<ul>
						<li>Developed a webapp that generates running paths of a certain mileage that is determined by the user</li>
						<li>Written using JavaScript, HTML, CSS, and the Google Maps API</li>
						<li>Developed for Hack ISU in under 36 hours with no prior knowledge in the Google Maps API</li>
					</ul>
					</p>
				</div>
			</div>
		</div>
		<div class="info_card bottom_copyright"><p style="padding: 0">© 2020 Nathan Whitcome</p></div>
	</div>
</template>

<script>
import CustomButton from "./customButton";
export default {
    name: "resume",
	props: ['bar_hidden'],
	components: { CustomButton },
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
}
</script>