<template>
  <ul class="singerNav">
    <li
      v-for="(item,key) of singerView.keys()"
      :key="key"
      @touchstart="liTouch(key)"
      :class="{isActive:index===key}"
    >{{item}}</li>
  </ul>
</template>

<script>
export default {
  props: {
    singerView: {
      type: Map,
      default() {
        return new Map();
      },
    },
    topArr: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    liTouch(key) {
      this.index = key;
      this.$emit("liTouch", key);
    },
    disposeTop() {
      this.topArr.forEach((item, key) => {
        this.$parent.scroll.on("scroll", (position) => {
          if (-position.y >= item) {
            this.index = key;
            this.$emit("getIndex", key);
          }
          this.$emit("getY", position.y);
        });
      });
    },
  },
  watch: {
    topArr() {
      this.disposeTop();
    },
  },
};
</script>

<style lang='less' scoped>
.singerNav {
  position: fixed;
  top: 50%;
  right: 5%;
  transform: translateY(-45%);
  text-align: center;
  border-radius: 5px;
  background-color: rgba(32, 31, 31, 0.5);
  list-style-type: none;
  color: @color1;
  font-size: @sizexxs;
  li {
    padding: 2px;
    line-height: 18px;
  }
  .isActive {
    color: @color;
  }
}
</style>