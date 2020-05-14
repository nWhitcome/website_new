<template>
  <div id="middle_inner_content" ref="scroll_content">
    <div class="info_card">
      <div class="inner_box">
        <div class="button_bar">
          <h1>Sticking Pattern Generator</h1>
          <CustomButton
            text_val="Github"
            r_val="85"
            g_val="85"
            b_val="85"
            link_value="https://github.com/nWhitcome/drum-sticking-pattern-generator"
          ></CustomButton>
          <CustomButton
            text_val="Webpage"
            r_val="168"
            g_val="56"
            b_val="59"
            link_value="https://sticking-pattern.netlify.app/"
          ></CustomButton>
        </div>
        <p>
          I started learning how to play the drums last year after years of wanting to learn how to play. I eventually stumbled across what is called a sticking pattern, which spells out differnet patterns
          in which you can hit the drums. There are three letters, R for right hand, L for left hand, and K for kick drum and they are arranged in unique patterns as a way of practicing and coming
          up with drum patterns and fills.
        </p>
        <p>
          I found a video on YouTube of a guy talking about how he would plug in the letters mentioned above into some sort of word generator to come up with patterns and I figured it would be fun
          and useful to make a webapp specifically for generating sticking patterns that was a lot easier to use and had more features. As of today, 4/23/2020, it generates patterns of length 3 to
          15 without repeats of more than two of the same letter in a row and allows the user to change each individual letter.
        </p>
        <br />
        <h2>Future Development</h2>
        <p>I have a bunch of features I want to add to this project including:</p>
        <ol>
          <li>Accented notes</li>
          <li>A metronome with different sounds for each hit</li>
          <li>Setting a length for notes, e.g. quarter notes, half notes, rests</li>
          <li>Allowing users to change the colors of each hit type in case they prefer that to different letters</li>
          <li>Dark theme</li>
        </ol>
        <br />
        <MinimizeContent
          html_insert="<iframe src='https://sticking-pattern.netlify.app/' class='general_iframe' frameBorder='0'></iframe>"
        ></MinimizeContent>
      </div>
    </div>
    <div class="info_card">
      <div class="inner_box">
        <div class="button_bar">
          <h1>Pathfinder</h1>
          <CustomButton
            text_val="Github"
            r_val="85"
            g_val="85"
            b_val="85"
            link_value="https://github.com/nWhitcome/hackisu2018"
          ></CustomButton>
          <CustomButton
            text_val="Webpage"
            r_val="168"
            g_val="56"
            b_val="59"
            link_value="https://hackisu2018dev.herokuapp.com/"
          ></CustomButton>
        </div>
        <p>
          Pathfinder is my project from Hack ISU 2018 using the Google Maps API. I had no idea what I wanted to do going in but decided to make something that had to do with running
          after being inspired by my friend. Hack ISU is a 36-hour competition, so I did as much development as I could in that time. I had never used the maps API before but I did
          have a lot of experience with Javascript. The app allows the user to put in a mileage number and a direction, generating a path of close to that length for the user to run on.
          This could prevent runners from getting bored and could keep them safe from predators that may memorize their path.
          <br />
          <br />
        </p>

        <h2>Issues</h2>
        <ol>
          <li>
            <b>The app sometimes produces an error stating that no results were returned.</b> I know why this error is happening but I haven't had time to do any further development to fix it.
            I might overhaul the entire system at some point in the near future, so it might not be worth fixing right now anyways.
          </li>
          <li>
            <b>The Google Maps API isn't very good for what I'm doing here.</b> This causes a number of problems:
            <ul>
              <li>
                It always looks for the shortest path to a specific place, which meant that it was always returning
                a path that was a straight line. I had to do a lot of work to get around this and it is still very inefficient.
              </li>
              <li>
                <b>Creating a looping path is almost impossible.</b> The Google Maps API sends data to their servers and returns a path, so I all I can do is process the data
                they have given to me. It only takes a few relevant parameters:
                <ul>
                  <li>start point</li>
                  <li>end point</li>
                  <li>waypoints - places to hit on the way from the beginning to the end</li>
                </ul>I have very little freedom in what I can send to be processed. Creating a looping path would require me to try a bunch of different options, which would be very
                inefficient and would take a very long time if I have to keep sending Google data and waiting for a response.
              </li>
            </ul>
          </li>
        </ol>
        <br />
        <h2>Future Development</h2>
        <p>
          I haven't changed much of this program since I created due to a heavy workload. I really want to work on it since I know it could make the lives of a lot of people
          a little bit easier. I hope to solve the problems listed above by grabbing shapefiles from OpenStreetMaps and using that data to generate paths, which would give me a lot
          more control over how I process the data and would allow me to create looping paths. It would also be a lot faster because I would not have to send anything to Google or
          wait for a response. I also got my brother
          <a
            href="http://www.davidwhitcome.com"
          >David Whitcome</a> involved, so we might work on the project together at some point in the future.
        </p>
        <MinimizeContent
          html_insert="<iframe src='https://hackisu2018dev.herokuapp.com/' class='general_iframe' frameBorder='0'></iframe>"
        ></MinimizeContent>
      </div>
    </div>
    <div class="info_card">
      <div class="inner_box">
        <div class="button_bar">
          <h1>Spotify-Lifx</h1>
        </div>
        <p>
          This is a project that I've had my mind on for a very long time. My roommate CJ had gotten his hands on some Lifx smart bulbs that are generally controlled by a cell phone and I thought it would be pretty cool to do some programming with them if possible.
          I looked online and it turns out that they have an open API! This opens the door to a lot of fun projects, including having the bulbs change color based on what the
          user is currently listening to on Spotify. This hasn't been done from what I can tell, so I decided to try it myself. The code is on my Github but it is private.
        </p>
        <p>
          There's a lot I want to do on for this project. I got the basic idea working using the Spotify and Lifx APIs, but I want to do a lot more, including a mobile app. I've never
          done mobile development before, so I bought an online course to teach myself. Unfortunately, I don't have time to work on it because school is more important. I'm hoping to start development again sometime soon using Flutter.
        </p>
        <br />
        <h2>Spring 2020 Update</h2>
        <p>
          Since I last posted about this project I have made it so that the lights pulse to the music that is playing. I did this using the Spotify API, which includes information
          about each song that is broken down into individual segments that have a starting and peak volume level.
        </p>
        <p>
          There are still some issues, such as the program not working after a couple of hours and that it doesn't keep up with changes in the song currently playing if it is changed
          in any other way other than through the program or the song ending. That should be a pretty easy fix when I have time.
        </p>
        <div class="multi_image_holder">
          <img
            style="max-width: 600px; padding: 0 4px;"
            src="src/assets/project_pictures/lifx_spotify/lifx_gif_opt.gif"
          />
        </div>
      </div>
    </div>
    <div class="info_card">
      <div class="inner_box">
        <div class="button_bar">
          <h1>Senior Design Group 36</h1>
          <CustomButton
            text_val="Webpage"
            r_val="168"
            g_val="56"
            b_val="59"
            link_value="http://sdmay20-36.sd.ece.iastate.edu/"
          ></CustomButton>
        </div>
        <p>
          The senior design project that I have been involved with this year is called Open-Source Prototyping of 5G Wireless Systems for UGV/UAV,
          which basically means that we are working on experimental 5G networking systems to be used in unmanned ground and air vehicles.
        </p>
        <p>
          My role in the project has changed as time has progressed. I started out as part of a team trying to get OpenAirInterface, or OAI, working,
          which is an open-source 5G simulation and testing software. I have switched over to using SUMO, which is a program that simulates traffic
          of vehicles on a given area, which we want to use to send data to be simulated over to OAI for testing. My job right now is to create software
          using visual C++ to give a visual representation of this data as well as where cell towers and devices that connect to those towers would be
          located.
        </p>
        <p>
          I've learned a lot about how incredibly difficult it can be to get open source code running. OAI requires very specific hardware and software
          to even run, meaning I spent a couple dozen hours just trying to get it to work. Modifying the code has also been hard since it's not very well documented
          and there are hundreds of thousands of lines of code.
        </p>
        <p>
          The project doesn't involve very much coding, so I haven't learned a lot in that respect, but I have learned a lot about how wireless cell systems
          work. Right now I'm learning visual C++, which I have no experience with at all.
        </p>
        <p>
          Overall, this project is quite exciting for the future of wireless communication. The goal is to implement a new algorithm that would increase the reliability
          and lower the latency of 5G systems, which means that things like remote surgery could be possible in the near future. Learning about 5G technology has
          been interesting, although it is hard to work with since it's so new.
        </p>
        <MinimizeContent :closed_prop="true"
          html_insert="<iframe src='src/assets/senior_design/PeerEvaluation.pdf' class='general_iframe' frameBorder='0'></iframe>"
        ></MinimizeContent>
      </div>
    </div>
    <div class="info_card">
      <div class="inner_box">
        <div class="button_bar">
          <h1>Power Electronics International</h1>
        </div>
        <p>
          I spent two summers working at Power Electronics International in East Dundee, and I learned quite a bit about programming and working on a real project
          in a way that I had not at school. I spent most of my time doing development of a project called the PE Hub that has just been announced. PEI sells
          crane control motors, and this device allows people to get live updates about all of those drives at once from a laptop or phone.
        </p>
        <p>
          I did a lot of full-stack web deveopment for this project, which I had never done before up until that point. I learned about javascript
          as well as how to use things like Node Project Manager and how to debug web applications. I worked on a team, so I did learn a good bit about working
          with other people, although they were working on different areas of the project. The company is quite small, so I was able to meet with people in
          other departments face-to-face to understand what our customers are really looking for in a product.
        </p>
        <p>
          I didn't do a dont of evaluations while I was there since it was such a small company, but I did give many presentations and walk-throughs of the project.
          I learned that it's quite easy to talk about something when you're really passionate about it and know it like the back of your hand. Presntations have always
          been easy for me, so it was an enjoyable experience. I don't have have any pictures or anything of the finished product since it's still under active development.
        </p>
      </div>
    </div>
    <div class="info_card">
      <div class="inner_box">
        <div class="button_bar">
          <h1>Old Website</h1>
          <CustomButton
            text_val="Github"
            r_val="85"
            g_val="85"
            b_val="85"
            link_value="https://github.com/nWhitcome/nWhitcome.github.io"
          ></CustomButton>
          <CustomButton
            text_val="Webpage"
            r_val="168"
            g_val="56"
            b_val="59"
            link_value="https://nWhitcome.github.io"
          ></CustomButton>
        </div>
        <p>
          This was the first website I ever built. I used time that I had while I wasn't working one summer to teach myself HTML and CSS. There are a lot of things I
          did inefficiently but I thought it came out looking pretty good considering how little I knew at the time. I eventually took a class at school on the basics of HTML and CSS
          where I learned the proper way to do a lot of what I had already done. I decided to make the website you're currently on after getting
          a lot more experience with Vue and Node.js at work. I wanted to show what I learned rather than just talking about it. The new site is also my first use of Vuex, which I think
          will be important for me to know how to use in the future.
        </p>
        <MinimizeContent :closed_prop="true"
          html_insert="<iframe src='https://nWhitcome.github.io' class='general_iframe' frameBorder='0'></iframe>"
        ></MinimizeContent>
      </div>
    </div>
    <div class="info_card">
      <div class="inner_box">
        <div class="button_bar">
          <h1>CPR E 494 Reflections</h1>
        </div>
        <p>
          Below are a couple relections I did about my experience at Iowa State. I thought I'd put it all here since my webpage is getting kind of cluttered with all
          those tabs at the top.
        </p>
        <h2>General Education</h2>
        <MinimizeContent :closed_prop="true"
          html_insert="<iframe src='./src/assets/senior_design/GE_Reflection.pdf' class='general_iframe' frameBorder='0'></iframe>"
        ></MinimizeContent>
        <br />
        <h2>Cumulative</h2>
        <MinimizeContent :closed_prop="true"
          html_insert="<iframe src='./src/assets/senior_design/Cumulative_Reflection.pdf' class='general_iframe' frameBorder='0'></iframe>"
        ></MinimizeContent>
      </div>
    </div>
    <div class="info_card">
      <div class="inner_box">
        <div class="button_bar">
          <h1>394 Ethics Essay</h1>
        </div>
        <p>I had to write an ethics essay for my Cpr E 394 class, and it made me think about where I draw the line with my personal etics. I've become more involved in politics recently, and having this assignment made me think more about my impact on the world than I have before.</p>
        <MinimizeContent :closed_prop="true"
          html_insert="<iframe src='./src/assets/Ethics_Essay.pdf' class='general_iframe' frameBorder='0'></iframe>"
        ></MinimizeContent>
      </div>
    </div>
    <div class="info_card bottom_copyright">
      <p style="padding: 0">© 2020 Nathan Whitcome</p>
    </div>
  </div>
</template>

<script>
import MinimizeContent from "./minimizeContent";
import CustomButton from "./customButton";
export default {
  props: ["bar_hidden"],
  components: { MinimizeContent, CustomButton },
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