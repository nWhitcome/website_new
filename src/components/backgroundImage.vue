<template>
  <div style="height: 100%; overflow:hidden;">
    <div style="display:flex; flex-direction: row; width: "></div>
    <transition-group class="carousel" tag="div">
      <div
        v-for="(item, index) in picture_links"
        class="outer_box"
        :key="item.id"
        v-bind:style="{ 'background-image': 'url(' + item.link + ')', 'z-index' : get_z_val(index)}"
        v-show="item.id==picture_links[0].id || item.id==picture_links[1].id || item.id==picture_links[2].id"
        v-bind:class="{'translate_left':item.id==picture_links[0].id, 'translate_right':item.id==picture_links[2].id, 'slide':item.id==picture_links[1].id }"
      ></div>
    </transition-group>
    <transition-group
      name="fade"
      tag="div"
      style="display:flex; height: 100%; align-items: center; justify-content: space-between;"
      v-show="buttons_visible"
    >
      <div id="arrow_button_left" class="cutout_arrow" key="one" v-on:click="previous()">
        <i style="font-size:75px;">chevron_left</i>
      </div>
      <div id="arrow_button_right" class="cutout_arrow" key="two" v-on:click="next()">
        <i style="font-size:75px;padding-left: 5px;">chevron_right</i>
      </div>
    </transition-group>
    <div
      style="background-color: white; z-index: -3; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; display: flex; justify-content: center; align-items: center;"
    >
      <div style="color: #888; font-size: 24px;">Loading...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "backgroundImage",
  props: ["buttons_visible"],
  data: function() {
    return {
      picture_links: [
        {
          link: "src/assets/background_pictures/my_back_mountain.jpg",
          id: 1,
          location: "Glacier National Park, Montana",
          date: "Summer 2018"
        },
        {
          link: "src/assets/background_pictures/Badlands.jpg",
          id: 2,
          location: "Badlands National Park, South Dakota",
          date: "Summer 2018"
        },
        {
          link: "src/assets/background_pictures/Colorado_Top.jpg",
          id: 3,
          location: "Quandry Peak, Colorado",
          date: "Summer 2017"
        },
        {
          link: "src/assets/background_pictures/Glacier1.jpg",
          id: 4,
          location: "Glacier National Park, Montana",
          date: "Summer 2018"
        },
        {
          link: "src/assets/background_pictures/Glacier2.jpg",
          id: 5,
          location: "Glacier National Park, Montana",
          date: "Summer 2018"
        },
        {
          link: "src/assets/background_pictures/Badlands2.jpg",
          id: 6,
          location: "Badlands National Park, South Dakota",
          date: "Summer 2018"
        },
        {
          link: "src/assets/background_pictures/Tetons1.jpg",
          id: 8,
          location: "Grand Teton National Park, Wyoming",
          date: "Summer 2018"
        },
        {
          link: "src/assets/background_pictures/Tetons2.jpg",
          id: 9,
          location: "Grand Teton National Park, Wyoming",
          date: "Summer 2018"
        },
        {
          link: "src/assets/background_pictures/Tetons3.jpg",
          id: 10,
          location: "Grand Teton National Park, Wyoming",
          date: "Summer 2018"
        },
        {
          link: "src/assets/background_pictures/River.jpg",
          id: 11,
          location: "Grand Teton National Park, Wyoming",
          date: "Summer 2018"
        },
        {
          link: "src/assets/background_pictures/Campsite.jpg",
          id: 12,
          location: "Rocky Mountain National Park, Colorado",
          date: "Summer 2017"
        },
        {
          link: "src/assets/background_pictures/Tetons_album.jpg",
          id: 13,
          location: "Grand Teton National Park, Wyoming",
          date: "Summer 2018"
        },
        {
          link: "src/assets/background_pictures/Norway1.jpg",
          id: 14,
          location: "Jostedalsbreen National Park, Norway",
          date: "Summer 2019"
        },
        {
          link: "src/assets/background_pictures/Norway2.jpg",
          id: 15,
          location: "Ålfoten, Norway",
          date: "Summer 2019"
        },
        {
          link: "src/assets/background_pictures/Norway4.jpg",
          id: 17,
          location: "Jostedalsbreen National Park, Norway",
          date: "Summer 2019"
        },
        {
          link: "src/assets/background_pictures/Norway5.jpg",
          id: 18,
          location: "Jostedalsbreen National Park, Norway",
          date: "Summer 2019"
        },
        {
          link: "src/assets/background_pictures/ArtMus.jpg",
          id: 19,
          location: "Des Moines Art Center, Des Moines",
          date: "Fall 2020"
        },
        {
          link: "src/assets/background_pictures/Dubuque.jpg",
          id: 20,
          location: "Dubuque, IA",
          date: "Winter 2020"
        },
        {
          link: "src/assets/background_pictures/Frontenac.jpg",
          id: 21,
          location: "Frontenac State Park, Minnesota",
          date: "Fall 2020"
        },
        {
          link: "src/assets/background_pictures/Lockwood.jpg",
          id: 22,
          location: "Lockwood Cafe, Ames, IA",
          date: "Winter 2020"
        },
        {
          link: "src/assets/background_pictures/Reiman.jpg",
          id: 23,
          location: "Reiman Gardens, Ames, IA",
          date: "Winter 2020"
        },
      ],
      allow_click: true,
      current_timer: null,
      slide_direction: "l"
    };
  },
  mounted: function() {
    this.current_timer = setInterval(this.next, 10000);
  },
  methods: {
    next(event) {
      if (this.allow_click == true) {
        this.allow_click = false;
        this.slide_direction = "r";
        const first = this.picture_links.shift();
        this.picture_links = this.picture_links.concat(first);
        if (this.$store.state.full_screen == false) {
          clearInterval(this.current_timer);
          this.current_timer = setInterval(this.next, 10000);
        }
        var me = this;
        setTimeout(function() {
          me.allow_click = true;
        }, 750);
      }
    },
    previous(event) {
      if (this.allow_click == true) {
        this.allow_click = false;
        this.slide_direction = "l";
        const last = this.picture_links.pop();
        this.picture_links = [last].concat(this.picture_links);
        if (this.$store.state.full_screen == false) {
          clearInterval(this.current_timer);
          this.current_timer = setInterval(this.next, 10000);
        }
        var me = this;
        setTimeout(function() {
          me.allow_click = true;
        }, 750);
      }
    },
    get_z_val(index_val) {
      if (index_val == 1) return 1;
      else if (
        (index_val == 2 && this.slide_direction === "l") ||
        (index_val == 0 && this.slide_direction === "r")
      )
        return -1;
      else if (
        (index_val == 0 && this.slide_direction === "l") ||
        (index_val == 2 && this.slide_direction === "r")
      )
        return -2;
      else return -4;
    }
  }
};
</script>

<style lang="scss">
#arrow_button_left:hover,
#arrow_button_right:hover {
  box-shadow: inset 0px 0px 0px 5px rgba(255, 255, 255, 1);
}
#arrow_button_left:active,
#arrow_button_right:active {
  color: black;
  transition: 0s;
  background-color: rgba(255, 255, 255, 1);
}
</style>
