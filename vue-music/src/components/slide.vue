<template>
  <div class="slide">
    <div class="slide-wrapper" ref="scroll">
      <div class="slide-content" ref="scrollGroup">
        <slot></slot>
      </div>
    </div>
    <ul v-if="dots">
      <li v-for="(item,key) of content" :key="key" :class="{dot:pageIndex===key}"></li>
    </ul>
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
    dots: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      pageIndex: 0,
      content: [],
    };
  },
  mounted() {
    this._setSlideWidth();
    this._initSlider();
    this._scroll();
  },
  methods: {
    _setSlideWidth() {
      let scrollWidth = this.$refs.scroll.clientWidth;
      let scrollGroup = this.$refs.scrollGroup;
      scrollGroup.children.forEach((item, key) => {
        key < scrollGroup.children.length && this.content.push("");
        this.slideWidth += scrollWidth;
        item.style.width = scrollWidth + "px";
      });
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
    },
    _scroll() {
      this.slider.on("scroll", () => {
        this.pageIndex = this.slider.getCurrentPage().pageX;
      });
    },
  },
};
</script>

<style lang='less' scoped>
.slide {
  position: relative;
  .slide-wrapper {
    width: 96%;
    margin: 10px auto 0;
    border-radius: @radius;
    line-height: 0;
    overflow: hidden;
  }
  ul {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 9;
    li {
      list-style-type: none;
      width: @sizexxxs;
      height: @sizexxxs;
      margin: 0 3px;
      border-radius: @sizexxxs / 2;
      background-color: rgba(182, 176, 176, 0.6);
      &.dot {
        width: 2.4 * @sizexxxs;
        background: #ffffff90;
      }
    }
  }
}
</style>