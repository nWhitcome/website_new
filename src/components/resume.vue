<template>
    <div id="middle_inner_content" ref="scroll_content">
		<div class="info_card">
			<div class="inner_box">
				<h1>Nathan Whitcome | Computer Engineering</h1>
				<!--<div class="small_image_holder">
					<img src="src/assets/resume_pictures/CSS3_logo_and_wordmark.svg.png" class="resume_image">
					<img src="src/assets/resume_pictures/HTML.png" class="resume_image">
					<img src="src/assets/resume_pictures/Git-Logo-Black.png" class="resume_image">
					<img src="src/assets/resume_pictures/java_logo_640.png" class="resume_image">
					<img src="src/assets/resume_pictures/nodejs-new-white.png" class="resume_image">
					<img src="src/assets/resume_pictures/React.png" class="resume_image">
					<img src="src/assets/resume_pictures/SQL.png" class="resume_image">
					<img src="src/assets/resume_pictures/vue.png" class="resume_image">
				</div> -->
				<div class="button_bar" style="padding: 0 0 10px;">
					<CustomButton text_val="Github" r_val=85 g_val=85 b_val=85 link_value='https://github.com/nWhitcome/'></CustomButton>
					<CustomButton text_val="LinkedIn" r_val=72 g_val=117 b_val=180 link_value='https://www.linkedin.com/in/nathan-whitcome-310977149/'></CustomButton>
				</div>
				<div id="resume_content" style="border-bottom: 1px #DDD solid;">

						<h2>Contact Info</h2>
						<a class="par_padding" href='mailto&#58;nat&#104;a&#110;&#37;&#50;E&#119;hi&#116;c&#111;me&#37;2E&#98;u%73i%6Ee&#115;&#115;&#37;4&#48;gm%61il%&#50;Eco&#109;'>nathan&#46;whitc&#111;me&#46;busin&#101;s&#115;&#64;gm&#97;i&#108;&#46;com</a>
						<br><br>

						<h2>Education</h2>
						<p class="par_padding"><b>Iowa State University, Ames IA </b><br>
						Master of Engineering, Computer Engineering<br>
						GPA: 3.84 (Fall 2020 - current)
						<br><br>
						Bachelor of Science, Computer Engineering<br>
						GPA: 3.28 | Major GPA: 3.63 (Fall 2016 - May 2020)<br>
						</p>
						<br>

						<h2>Technical Skills</h2>
						<p class="par_padding"><b>Languages</b><br>
						C, C++, Java, Python, SQL, JavaScript, HTML, CSS
						<br><br>
						<b>Networking</b><br>
						SDN (ONOS/ODL), TCP/IP, OpenStack, HTTP, RTP, RTSP, UDP, TCP Congestion Control, CSMA/CD, CSMA/CD
						<br><br>
						<b>Others</b><br>
						Vue.js, Vuex, Node.js, Git, React, Apache Spark, MapReduce, Hadoop, Embedded Systems, Circuit Design
						</p>
						<br>

						<h2>Other</h2>
						<p class="par_padding">
						Hack ISU (2017 - 2019)<br>
						Eagle Scout, 12 years of experience<br>
						Fully vaccinated against COVID-19
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
						LD ST 322 - Leadership in a Diverse Society<br>
						CPR E 537 - Wireless Network Security<br>
						CPR E 541 - High Performance Communication Networks<br>
						CPR E 543 - Wireless Network Architecture<br>
						CPR E 559 - Security and Privacy in Cloud Computing
						</p><br>
				</div>
				<div style="width: 100%; margin-top: 20px;">
					<h2>Professional Experience</h2>
					<p class="par_padding">
					<b>Iowa State University</b><br>
					Teaching Assistant (Spring 2021)<br>
					<ul>
						<li>Working to assist with CPR E 489: Computer Networking and Data Communications</li>
					</ul><br>
					Graduate Research Assistant (Fall 2020 - current)<br>
					<ul>
						<li>Worked with a team on the ARA project, which focuses on creating an advanced wireless testbed across Iowa</li>
						<li>Specialized in Software Defined Networking and integration with OpenStack</li>
					</ul><br>
					<b>Power Electronics International</b><br>
					Software Engineer (Summer 2018 – Summer 2020)<br>
					<ul>
						<li>Worked with a team to develop the PE Ultra Hub using full-stack web development skills</li>
						<li>Saved PEI time and money by allowing faster, easier debugging and data logging of drives</li>
						<li>Created internal software using Python and SQL</li>
					</ul>
					IT Work (Summer 2017)<br><br>
					</p>
				</div>
			</div>
		</div>
		<div class="info_card bottom_copyright"><p style="padding: 0">© 2021 Nathan Whitcome</p></div>
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