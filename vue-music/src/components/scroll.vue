<template>
  <div class="scroll-wrapper" ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    imgLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this._initScroll();
    this.$nextTick((_) => {
      this._refresh();
    });
  },
  activated() {
    this._refresh();
  },
  methods: {
    _initScroll() {
      this.scroll = new BScroll(this.$refs.scroll, {
        probeType: 3,
        click: true,
      });
    },
    _refresh() {
      this.scroll.refresh();
    },

  },
  watch: {
    data() {
      this.$nextTick(() => {
        this._refresh();
      });
    },
    imgLoad() {
      this._refresh();
    },
  },
};
</script>

<style lang='less' scoped>
.scroll-wrapper {
  flex: 1;
  overflow: hidden;
}
</style>