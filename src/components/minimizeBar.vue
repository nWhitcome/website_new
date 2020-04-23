<template>
  <div class="minimize_bar no_select" v-bind:style="mainStyle" @click="switch_hidden()">
    <div style="width: 100%; height: 100%;" v-if="closed_state">
      <i>keyboard_arrow_down</i>
      <i>keyboard_arrow_down</i>
      <i>keyboard_arrow_down</i>
    </div>
    <div style="width: 100%; height: 100%;" v-else>
      <i>keyboard_arrow_up</i>
      <i>keyboard_arrow_up</i>
      <i>keyboard_arrow_up</i>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      closed_state: false,
      mainStyle: {
        "border-top-left-radius": "8px",
        "border-top-right-radius": "8px",
        borderBottomRightRadius: "0px",
        borderBottomLeftRadius: "0px"
      }
    };
  },
  methods: {
    switch_hidden() {
      this.closed_state = !this.closed_state;
      if (this.closed_state == true) {
        this.mainStyle.borderBottomRightRadius = "8px";
        this.mainStyle.borderBottomLeftRadius = "8px";
      } else {
        this.mainStyle.borderBottomRightRadius = "0px";
        this.mainStyle.borderBottomLeftRadius = "0px";
      }
    }
  }
};
</script>

<style>
</style>