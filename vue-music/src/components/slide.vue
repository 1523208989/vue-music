<template>
  <div class="slide-wrapper" ref="scroll">
    <div class="slide-content" ref="scrollGroup">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    interval: {
      type: Number,
      default: 3000,
    },
    loop: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      pageIndex: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this._setSlideWidth();
      this._initSlider();
    });
  },
  beforeDestroy() {
    this.slider.destroy();
  },
  methods: {
    _setSlideWidth() {
      let scrollWidth = this.$refs.scroll.clientWidth;
      let scrollGroup = this.$refs.scrollGroup;
      this.slideWidth = scrollWidth * scrollGroup.children.length;
      scrollGroup.children.forEach((item) => {
        item.style.width = scrollWidth + "px";
      });
      this.loop && (this.slideWidth += 2 * scrollWidth);
      scrollGroup.style.width = this.slideWidth + "px";
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.scroll, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        probeType: 3,
        click: true,
        slide: {
          loop: this.loop,
          threshold: 0.3,
          speed: 1500,
          autoplay: this.loop,
        },
      });
      this.slider.on("scroll", () => {
        this.pageIndex = this.slider.getCurrentPage().pageX;
      });
    },
  },
};
</script>

<style lang='less' scope>
.slide-wrapper {
  width: 96%;
  margin: 10px auto;
  border-radius: @radius;
  line-height: 0;
  overflow: hidden;
  .slide-content {
    .slide-page {
      display: inline-block;
    }
  }
}
</style>