<template>
  <slide id="homeSlide">
    <div class="slide-page" v-for="(item,key) of content" :key="key">
      <a :href="item.jumpurl">
        <img @load="imgLoad" :src="item.picurl" alt />
      </a>
    </div>
  </slide>
</template>

<script>
import Slide from "components/slide";
export default {
  props: {
    content: {
      type: Array,
      default(){
        return [];
      },
    },
  },
  data() {
    return {
      load: false,
    };
  },
  methods: {
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
};
</script>

<style lang="less">
#homeSlide {
  .slide-page {
    border-radius: @radius;
    overflow: hidden;
    display: inline-block;   
    img {
      width: 100%;
    }
  }
}
</style>