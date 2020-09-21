<template>
  <div id="homeSlide">
    <slide ref="slide">
      <div class="slide-page" v-for="(item,key) of content" :key="key">
        <a :href="item.jumpurl">
          <img @load="imgLoad" :src="item.picurl" alt />
        </a>
      </div>
    </slide>
    <ul>
      <li v-for="(item,key) of content" :key="key" :class="{dot:slide.pageIndex===key}"></li>
    </ul>
  </div>
</template>

<script>
import Slide from "components/slide";
export default {
  props: {
    content: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      slide: {},
      load: false,
    };
  },
  mounted() {
    this._setPageIndex();
  },
  methods: {
    _setPageIndex() {
      this.slide = this.$refs.slide;
    },
    imgLoad() {
      if (!this.load) {
        this.$emit("imgLoad");
        this.load = true;
      }
    },
  },
  components: {
    Slide,
  },
  watch:{
    slide(){
      
    }
  }
};
</script>

<style lang="less">
#homeSlide {
  position: relative;
  .slide-page {
    border-radius: @radius;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  ul {
    position: absolute;
    bottom: 15px;
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