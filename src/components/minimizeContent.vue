<template>
  <div @click="switch_hidden()" style="display: flex; flex-direction: column">
    <MinimizeBar></MinimizeBar>
    <span v-bind:style="mainStyle" v-html="content"></span>
  </div>
</template>

<script>
import MinimizeBar from "./minimizeBar";
export default {
  props: ["html_insert"],
  components: { MinimizeBar },
  data: function() {
    return {
      closed_state: false,
      content: null,
      mainStyle: {
        height: "auto",
        overflow: "hidden",
        maxHeight: "600px",
        transition: "max-height .25s ease-in"
      }
    };
  },
  created() {
    this.content = this.html_insert;
  },
  methods: {
    switch_hidden() {
      this.closed_state = !this.closed_state;
      if (this.closed_state == true) {
        this.mainStyle.maxHeight = "0px";
      } else {
        this.mainStyle.maxHeight = "600px";
      }
    }
  }
};
</script>

<style>
</style>