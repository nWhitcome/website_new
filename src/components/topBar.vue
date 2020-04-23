<template>
  <div style="height: 100%;">
    <div
      id="top_bar_cutout"
      :class="{ 'bar_hide': !bar_hidden , 'bar_hide': $store.state.full_screen}"
    >
      <div id="my_name" class="no_select" v-if="$store.state.winWidth > 900">Nathan Whitcome</div>
      <div id="my_name" class="no_select" v-else>NW</div>
      <div style="display:flex; align-items: center;" v-if="$store.state.winWidth > 600">
        <div
          v-bind:class="{projects_text_selected: (selected == 'projects_text' || top_hover.pr === true)}"
          class="projects_text"
        >Projects</div>
        <div
          v-bind:class="{projects_text_selected_clear: (selected == 'photos_text' || top_hover.ph == true)}"
          class="projects_text"
        >Photos</div>
        <div
          v-bind:class="{projects_text_selected_clear: (selected == 'music_text' || top_hover.mu == true)}"
          class="projects_text"
        >Music</div>
        <div
          v-bind:class="{projects_text_selected_clear: (selected == 'resume_text' || top_hover.re == true)}"
          class="projects_text"
        >Résumé</div>
      </div>
      <div
        v-else
        class="no_select hamburger_icon"
        v-bind:style="{'background-color:white':!mouse_down_hamb}"
        v-bind:class="{'black_border':(hamburger_hovered && !mouse_down_hamb), 'black_clicked':mouse_down_hamb}"
      >
        <i style="font-size:50px;">menu</i>
      </div>
    </div>
    <div
      id="top_bar_text"
      :class="{ 'bar_hide': !bar_hidden, 'bar_hide': $store.state.full_screen}"
    >
      <div id="my_name" class="no_select" v-if="$store.state.winWidth > 900">Nathan Whitcome</div>
      <div id="my_name" class="no_select" v-else>NW</div>
      <div style="display:flex; align-items: center;" v-if="$store.state.winWidth > 600">
        <div
          @mouseenter="top_hover.pr = true;"
          @mouseleave="top_hover.pr = false"
          class="projects_text"
          v-bind:class="{projects_text_selected_clear: (selected == 'projects_text' || top_hover.pr == true)}"
          @click="headingClicked(false, 'projects_text')"
        >Projects</div>
        <div
          @mouseenter="top_hover.ph = true;"
          @mouseleave="top_hover.ph = false"
          v-bind:class="{projects_text_selected_clear: (selected == 'photos_text' || top_hover.ph == true)}"
          class="projects_text"
          @click="headingClicked(true, 'photos_text')"
        >Photos</div>
        <div
          @mouseenter="top_hover.mu = true;"
          @mouseleave="top_hover.mu = false"
          v-bind:class="{projects_text_selected_clear: (selected == 'music_text' || top_hover.mu == true)}"
          class="projects_text"
          @click="headingClicked(false, 'music_text')"
        >Music</div>
        <div
          @mouseenter="top_hover.re = true;"
          @mouseleave="top_hover.re = false"
          v-bind:class="{projects_text_selected_clear: (selected == 'resume_text' || top_hover.re == true)}"
          class="projects_text"
          @click="headingClicked(false, 'resume_text')"
        >Résumé</div>
      </div>
      <div
        v-else
        v-bind:class="{'black_border_fill':(hamburger_hovered && !mouse_down_hamb), 'black_clicked_transp':mouse_down_hamb}"
        @mousedown="mouse_down_hamb = true"
        @mouseup="mouse_down_hamb = false; console.log('Here')"
        @mouseenter="hamburger_hovered = true"
        @mouseleave="hamburger_hovered = false"
        @click="hamburgerClicked()"
        class="no_select hamburger_icon"
      >
        <i style="font-size:50px; cursor: pointer;">menu</i>
      </div>
    </div>
    <transition name="slide_left" v-if="menu_visible && $store.state.winWidth < 600">
      <menu_overlay key="menu" :selected="selected" @headingClicked="headingClicked"></menu_overlay>
    </transition>
    <transition-group name="fade" tag="div" v-else-if="selected != 'photos_text'">
      <div
        :class="{ 'middle_reach': !bar_hidden, 'middle_top': bar_hidden}"
        id="middle_content"
        key="middle"
      >
        <Music
          v-show="selected == 'music_text'"
          :bar_hidden="bar_hidden"
          @change_bar="change_bar"
        ></Music>
        <Resume
          v-show="selected == 'resume_text'"
          :bar_hidden="bar_hidden"
          @change_bar="change_bar"
        ></Resume>
        <Projects
          v-show="selected == 'projects_text'"
          :bar_hidden="bar_hidden"
          @change_bar="change_bar"
        ></Projects>
      </div>
    </transition-group>
    <div
      id="fullscreen_icon"
      v-if="selected == 'photos_text'"
      @click="toggle_full_screen"
      :class="{ 'fullscreen_hide': $store.state.full_screen, 'fullscreen_here': !$store.state.full_screen }"
      class="no_select cutout_arrow"
    >
      <i>{{full_icon}}</i>
    </div>
    <footer
      v-show="selected == 'photos_text'"
      :class="{ 'footer_hide': $store.state.full_screen }"
      id="bottom_bar_cutout"
    >
      <div
        style="display: flex; flex-direction: column; padding-left: 20px; position: fixed; bottom: 0px; left: 0px; height: 100px; justify-content: center;"
      >
        <div style="font-size: 20px;">{{this.$parent.$children[0].picture_links[1].location}}</div>
        <div style="font-size: 14px;">{{this.$parent.$children[0].picture_links[1].date}}</div>
      </div>
    </footer>
    <div
      v-show="selected == 'photos_text'"
      :class="{ 'footer_hide': $store.state.full_screen }"
      style="height: 100px; position: fixed; bottom: 0px; left: 0px; width: 500px; z-index: 5;"
      class="footer_text"
    >
      <div
        style="display: flex; flex-direction: column; padding-left: 20px; position: fixed; bottom: 0px; left: 0px; height: 100px; justify-content: center;"
      >
        <div style="font-size: 20px;">{{this.$parent.$children[0].picture_links[1].location}}</div>
        <div style="font-size: 14px;">{{this.$parent.$children[0].picture_links[1].date}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Resume from "./resume.vue";
import Music from "./music.vue";
import Projects from "./projects.vue";
export default {
  name: "topBar",
  components: { Resume, Music, Projects },
  data: function() {
    return {
      selected: "photos_text",
      menu_visible: false,
      bar_hidden: true,
      hamburger_hovered: false,
      mouse_down_hamb: false,
      top_hover: {
        pr: false,
        ph: false,
        mu: false,
        re: false
      }
    };
  },
  methods: {
    headingClicked(buttonsVisible, text) {
      this.$root.photo_buttons_visible = buttonsVisible;
      this.selected = text;
      if (this.menu_visible) {
        this.hamburgerClicked();
      }
    },
    hamburgerClicked() {
      this.menu_visible = !this.menu_visible;
    },
    change_bar(value) {
      this.bar_hidden = value;
    },
    toggle_full_screen() {
      if (this.$store.state.full_screen == false) {
        clearInterval(this.$parent.$children[0].current_timer);
      } else {
        this.$parent.$children[0].current_timer = setInterval(
          this.$parent.$children[0].next,
          10000
        );
      }
      this.$store.commit("toggle_full_screen");
    }
  },
  computed: {
    full_icon: function() {
      if (this.$store.state.full_screen) {
        return "fullscreen_exit";
      } else {
        return "fullscreen";
      }
    }
  }
};
</script>

<style lang="scss">
#fullscreen_icon{
    color: rgba(255, 255, 255, 1);
    position: fixed;
    right: 10px;
    font-size: 60px;
    z-index: 6;
    cursor: pointer;
    transition: .2s ease-in-out;
    border-radius: 50%;
    height: 80px;
    width: 80px;
    line-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}

#fullscreen_icon:hover{
    box-shadow: inset 0px 0px 0px 5px rgba(255, 255, 255, 1);
}

#fullscreen_icon:active{
    color: black;
    transition: 0s;
}

.fullscreen_hide{
    bottom: -80px;
}

.fullscreen_here{
    bottom: 20px;
}
</style>
