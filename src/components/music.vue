<template>
  <div id="middle_inner_content" ref="scroll_content">
    <div class="info_card">
      <div class="inner_box">
        <h1>Kaleidoquiz</h1>
        <p>
          KaleidoQuiz is a competition put on every year by the radio station "the KURE" at Iowa State that involves a lot of trivia and projects in
          order to earn points. There is always a musical video challenge that I participate in.
        </p>
        <br />
        <h2>2019</h2>
        <p>
          The musical challenge for 2019 involved creating a diss track about ourselves. There was another Nathan in our group that knows how to rap pretty well, so him and I
          teamed up to make the song and video below. I made a simple trap beat in about 20 minutes while he wrote some disses. I then recorded his voice, mixing and mastering it
          while him and another teammate of mine recorded a video for it.
          <br />
          <br />My music production skills improved an incredible amount compared to the year before. Writing music on a weekly basis also really helped me write something
          that worked for what we were trying to accomplish.
        </p>
        <br />
        <br />
        <h2>2018</h2>
        <p>
          I worked with my teammate Austin to create a music video where the prompt was to create a song that didn't use any instruments. I recorded all of the sound in the
          video from my dorm room and put them together in Ableton Live. Austin and I then went out and recorded a video for it, creating a robot helmet for me to wear.
          <br />
          <br />It was a lot of fun and really made me think very creatively. I'm proud of how it came out especially since we only had six hours to do the whole thing.
        </p>
        <MinimizeContent
          html_insert="<div class='video_box_wrapper'><iframe class='video_box' src='https://www.youtube.com/embed/I_DftkUpqmc' frameborder='0' allow='encrypted-media' allowfullscreen></iframe></div"
        ></MinimizeContent>
      </div>
    </div>
    <div class="info_card">
      <div class="inner_box">
        <div class="button_bar">
          <h1>Tetrad</h1>
          <CustomButton
            text_val="Spotify"
            r_val="29"
            g_val="185"
            b_val="84"
            link_value="https://open.spotify.com/album/7AbFNyyBbA9RBzZfUYWq6Z"
          ></CustomButton>
          <CustomButton
            text_val="Google Play"
            r_val="253"
            g_val="140"
            b_val="0"
            link_value="https://play.google.com/store/music/album/Tetrad_It_Came_from_the_Basement?id=Bqym4zpa5xxa7bmzygzlf3ubyxq"
          ></CustomButton>
          <CustomButton
            text_val="Bandcamp"
            r_val="98"
            g_val="154"
            b_val="169"
            link_value="https://thebandtetrad.bandcamp.com/"
          ></CustomButton>
          <CustomButton
            text_val="Facebook"
            r_val="59"
            g_val="89"
            b_val="152"
            link_value="https://www.facebook.com/TheBandTetrad"
          ></CustomButton>
        </div>
        <p>
          Tetrad was a band I started with my friends right before my senior year of high school.
          <br />
          <br />I played guitar and did back up vocals, as well as writing the guitar and bass parts while helping write vocal lines and lyrics on occasion.
          We did relatively well, winning the battle of the bands for Cary, IL and getting second at regionals with an opportunity to go to state.
          Unfortunately, the band isn't around anymore, but we did record some music on our own as well as in a studio.
          We finished an EP called "It Came From the Basement!" since we wrote almost all of the music in our drummer's basement.
          Our music can be found on most streaming services by clicking on the buttons next the the name above.
        </p>
        <div class="multi_image_holder">
          <div class="image_holder_column">
            <img src="src/assets/tetrad_pictures/band_pic.jpg" />
          </div>
          <div class="image_holder_column">
            <img src="src/assets/tetrad_pictures/band_pic_2.jpg" />
          </div>
        </div>
      </div>
    </div>
    <div class="info_card bottom_copyright">
      <p style="padding: 0">© 2020 Nathan Whitcome</p>
    </div>
  </div>
</template>

<script>
import CustomButton from "./customButton"
import MinimizeContent from "./minimizeContent"
export default {
  props: ["bar_hidden"],
  components: { CustomButton, MinimizeContent },
  data: function() {
    return {
      lastScroll: 0
    };
  },
  methods: {
    onScroll() {
      const current_scroll = this.$refs.scroll_content.scrollTop;
      if (Math.abs(current_scroll - this.lastScroll) < 120) {
        return;
      }
      this.$emit("change_bar", current_scroll < this.lastScroll);
      this.lastScroll = current_scroll;
      if (this.$refs.scroll_content.scrollTop == 0) {
        this.$emit("change_bar", true);
      }
    }
  },
  mounted: function() {
    //this.$refs.scroll_content.addEventListener('scroll', this.onScroll)
  }
};
</script>

<style>
</style>