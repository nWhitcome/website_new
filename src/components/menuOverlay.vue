<template>
  <div style="position: absolute; left: 0; right: 0; top: 110px; bottom: 0;">
    <div id="menu_overlay">
      <div style="position: absolute; top: 0px; bottom: 0px; padding-top: 50px;">
        <div class="bar_item_wrap">
          <div
            v-bind:class="{projects_text_selected: selected == 'projects_text', projects_text: selected != 'projects_text'}"
            class="projects_text menu_font"
          >Projects</div>
        </div>
        <div class="bar_item_wrap">
          <div
            v-bind:class="{projects_text_selected: selected == 'photos_text', projects_text: selected != 'photos_text'}"
            class="projects_text menu_font"
          >Photos</div>
        </div>
        <!--<div class="bar_item_wrap">
          <div
            v-bind:class="{projects_text_selected: selected == 'music_text', projects_text: selected != 'music_text'}"
            class="projects_text menu_font"
          >Music</div>
        </div>-->
        <div class="bar_item_wrap">
          <div
            v-bind:class="{projects_text_selected: selected == 'resume_text', projects_text: selected != 'resume_text'}"
            class="projects_text menu_font"
          >Résumé</div>
        </div>
      </div>
    </div>
    <div
      style="display: flex; justify-content: center; position: absolute; left: 0; right: 0; top: 0; bottom: 0;"
    >
      <div
        style="color: rgba(0, 0, 0, .4); position: absolute; top: 0px; bottom: 0px; display: flex; flex-direction: column; mix-blend-mode: normal; z-index: 7; padding-top: 50px;"
      >
        <div class="bar_item_wrap">
          <div
            class="projects_text menu_font"
            v-bind:class="{projects_text_selected_clear: selected == 'projects_text', projects_text: selected != 'projects_text'}"
            @click="headingClicked(false, 'projects_text')"
          >Projects</div>
        </div>
        <div class="bar_item_wrap">
          <div
            v-bind:class="{projects_text_selected_clear: selected == 'photos_text', projects_text: selected != 'photos_text'}"
            class="projects_text menu_font"
            @click="headingClicked(true, 'photos_text')"
          >Photos</div>
        </div>
        <!--<div class="bar_item_wrap">
          <div
            v-bind:class="{projects_text_selected_clear: selected == 'music_text', projects_text: selected != 'music_text'}"
            class="projects_text menu_font"
            @click="headingClicked(false, 'music_text')"
          >Music</div>
        </div>-->
        <div class="bar_item_wrap">
          <div
            v-bind:class="{projects_text_selected_clear: selected == 'resume_text', projects_text: selected != 'resume_text'}"
            class="projects_text menu_font"
            @click="headingClicked(false, 'resume_text')"
          >Résumé</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'menuOverlay',
    props:['selected'],
	methods:{
		headingClicked(buttonsVisible, text){
			this.$emit('headingClicked', buttonsVisible, text);
		}
	},
};
</script>

<style>
</style>