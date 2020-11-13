<template>
  <div class="scroll-wrapper" ref="scroll">
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
    imgLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this._initScroll();
  },
  activated() {
    this._refresh();
  },
  computed: {
    ...mapState(["index", "fullScroll"]),
    marginBT() {
      if (this.index !== -1 && !this.fullScroll) return true;
      return false;
    },
  },
  methods: {
    _initScroll() {
      this.scroll = new BScroll(this.$refs.scroll, {
        probeType: 3,
        click: true,
        stopPropagation: true,
      });
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position.y);
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
    marginBT() {
      this.$nextTick(() => {
        this._refresh();
      });
    },
  },
};
</script>

<style lang='less' scoped>
.scroll-wrapper {
  width: 100%;
  flex: 1;
  height: 0; //设置height或width属性(值小于盒子内容高度或宽度)，
  //当值小于盒子内容高度或宽度，保证盒子高度或宽度按照flex：1均匀分配，
  //当值大于等于盒子内容高度或宽度，盒子高度或宽度等于内容高度或宽度，
  //导致flex布局剩余空间分配失效！
  //overflow：hidden也可解决这一问题
  overflow: hidden;
}
</style>