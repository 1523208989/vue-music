<template>
  <div class="pulling" ref="pu">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapState } from "vuex";
export default {
  props: {
    data: {
      default() {
        return [];
      },
    },
    isPull: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(["fullScroll"]),
    ...mapState({ fullScroll: "fullScroll" }),
  },
  mounted() {
    this.initPU();
  },
  methods: {
    initPU() {
      this.pu = new BScroll(this.$refs.pu, {
        probeType: 3,
        click: true,
        stopPropagation: true,
        pullUpLoad: true,
      });
      this.pu.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    },
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.pu.refresh();
      });
    },
    isPull(newV) {
      if (!newV) this.pu.finishPullUp();
    },
    fullScroll() {
      this.pu.refresh();
    },
  },
};
</script>

<style lang='less' scoped>
.pulling {
  width: 100%;
  flex: 1;
  overflow: hidden;
}
</style>