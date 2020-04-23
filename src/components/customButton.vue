<template>
  <div
    v-bind:style="mainStyle"
    class="no_select"
    @mouseover="darken_button()"
    @mouseleave="return_button(false)"
    @mousedown="click_button()"
    @mouseup="return_button(true)"
  >{{text_val}}</div>
</template>

<script>
export default {
  props: ["r_val", "g_val", "b_val", "text_val", "link_value"],
  created() {
    this.mainStyle.backgroundColor =
      "rgb(" + this.r_val + ", " + this.g_val + "," + this.b_val + ")";
  },
  methods: {
    darken_button() {
      this.mainStyle.backgroundColor =
        "rgb(" +
        (parseInt(this.r_val) - 15) +
        ", " +
        (parseInt(this.g_val) - 15) +
        "," +
        (parseInt(this.b_val) - 15) +
        ")";
    },
    return_button(goToPage) {
      this.mainStyle.backgroundColor =
        "rgb(" + this.r_val + ", " + this.g_val + "," + this.b_val + ")";
      this.mainStyle.transition = ".1s";
      if (goToPage) {
        window.open(this.link_value, "mywindow");
      }
    },
    click_button() {
      this.mainStyle.backgroundColor =
        "rgb(" +
        (parseInt(this.r_val) + 15) +
        ", " +
        (parseInt(this.g_val) + 15) +
        "," +
        (parseInt(this.b_val) + 15) +
        ")";
      this.mainStyle.transition = "0s";
    }
  },
  data: function() {
    return {
      mainStyle: {
        color: "white",
        padding: "5px 15px",
        backgroundColor: "#555",
        fontSize: "20px",
        margin: "5px 10px",
        height: "30px",
        "line-height": "30px",
        "vertical-align": "center",
        "border-radius": "25px",
        transition: ".1s",
        cursor: "pointer"
      }
    };
  }
};
</script>