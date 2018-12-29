//var socket = io('http://localhost:3000'); 

Vue.component('nav_button', {
	methods: {
   	    onClickBack (event) {
            if(this.$root.current_picture_index == 0)
                this.$root.current_picture_index = this.$root.picture_links.length-1;
            else
   		        current_picture_index = current_picture_index-1;
  		    },
  	    onClickForward (event) {
            if(this.$root.current_picture_index == this.$root.picture_links.length-1)
                current_picture_index = 0;
            else
                current_picture_index = current_picture_index+1;
  		}
	},
	template:`
		<transition-group appear name="nav_button" tag="div">
			<div id="arrow_button_left" v-bind:key="0" v-on:click="this.onClickBack">
				<i style="font-size:70px;">chevron_left</i>			
			</div>
			<div id="arrow_button_right" v-bind:key="1" v-on:click="this.onClickForward">
				<i style="font-size:70px;">chevron_right</i>					
			</div>
		</transition-group>	
	`
})

Vue.component('background_image', {
    data: function(){
        return{
            picture_links: ['background_pictures/my_back_mountain.jpg', 'background_pictures/Badlands.jpg', 'background_pictures/Colorado_Top.jpg', 'background_pictures/Glacier1.jpg', 'background_pictures/Glacier2.jpg', 'background_pictures/Badlands2.jpg', 'background_pictures/Swing_Dance.jpg', 'background_pictures/Tetons1.jpg', 'background_pictures/Tetons2.jpg'],
			current_picture_index: 0,
			current_timer: setInterval(this.onClickForward, 10000),
			slide_direction: "slide_left"
        }
	},
	methods: {
   	    onClickBack (event) {
			this.slide_direction="slide_right";
            if(this.current_picture_index == 0){
				this.current_picture_index = this.picture_links.length-1;
			}
            else
				this.current_picture_index = this.current_picture_index-1;
			clearInterval(this.current_timer);
			this.current_timer = setInterval(this.onClickForward, 10000);
  		},
  	    onClickForward (event) {
			this.slide_direction="slide_left";
            if(this.current_picture_index == this.picture_links.length-1)
                this.current_picture_index = 0;
            else
				this.current_picture_index = this.current_picture_index+1;
			clearInterval(this.current_timer);
			this.current_timer = setInterval(this.onClickForward, 10000);
		},
	},
	template:`
	<div style="height: 100%;">
		<transition-group :name="slide_direction" tag="div" class="outer_box" v-for="(item, index) in picture_links" style=" animation-duration: 1s; animation-name: fadebackground;">
			<div class="outer_box" :key="index" v-show="index == current_picture_index" v-bind:style="{ 'background-image': 'url(' + picture_links[index] + ')' }">
			</div>
		</transition-group>
		    <div style="display:flex; height: 100%; align-items: center; justify-content: space-between;">
			    <div id="arrow_button_left" class="cutout_arrow" v-on:click="this.onClickBack">
				    <i style="font-size:65px;">chevron_left</i>			
			    </div>
			    <div id="arrow_button_right" class="cutout_arrow" v-on:click="this.onClickForward">
				    <i style="font-size:65px;padding-left: 5px;">chevron_right</i>					
			    </div>
			</div>	
		
	</div>
	`
})

new Vue({
	el: '#app',
	created: function () {
		window.addEventListener('resize', this.handleResize)
		this.handleResize();
	},
	methods:{
		handleResize(){
			this.winWidth= window.innerWidth;
			this.winHeight = window.innerHeight;
		}
	}
}) ;