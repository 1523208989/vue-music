<template>
  <transition appear name="detail">
    <!-- transition不加appear会导致enter-active动画失效 -->
    <div class="detail">
      <img class="back" src="~assets/image/back/back.png" alt="" />
      <p class="singer">{{ singerName }}</p>
      <img class="singerImg" :src="img" alt="" />
      <scroll :data="songList">
        <div>
          <card v-for="(item, key) of songList" :key="key">
            <img slot="img" src="" alt="" />
            <p slot="title">{{ item.title }}</p>
            <p slot="author">{{ item.name }}--{{ item.album }}</p>
          </card>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import Scroll from "./scroll";
import Card from "./card";
import { mapState } from "vuex";
export default {
  props: {
    img: {
      type: String,
      default: "",
    },
    songList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    ...mapState(["singer"]),
    ...mapState({
      singer: "singer",
    }),
    singerName() {
      return this.singer.singer_name;
    },
  },
  components: {
    Scroll,
    Card,
  },
};
</script>

<style lang='less' scoped>
.detail {
  display: flex;
  flex-direction: column;
  background-color: rgb(51, 47, 47);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}
.back,
.singer {
  position: fixed;
  top: 25px;
  left: 40px;
  transform: translate(-50%,-50%);
  z-index: 999;
}
.singer {
  left: 50%;
  font-size: @sizem;
  color: @color;
}
.singerImg {
  width: 100wh;
  height: 38vh;
}
.detail-leave-active,
.detail-enter-active {
  transition: all 0.5s;
}
.detail-enter {
  transform: translateX(100%);
}
.detail-leave-to {
  transform: translateX(100%);
}
</style>