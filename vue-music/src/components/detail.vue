<template>
  <transition appear name="detail">
    <!-- transition不加appear会导致enter-active动画失效 -->
    <div class="detail">
      <img
        class="back"
        @click="back"
        src="~assets/image/someImg/back.png"
        alt=""
      />
      <p class="singer">{{ singerName }}</p>
      <div class="singerImg" ref="imgBox">
        <div class="random" ref="random">
          <img src="~assets/image/someImg/播放.png" alt="" />
          <p>随机播放列表</p>
        </div>
        <img class="singer_img" ref="img" :src="img" alt="" />
      </div>

      <div ref="layer" class="layer"></div>
      <scroll :data="playList" @scroll="scroll" ref="scroll">
        <div ref="songList" v-show="playList.length">
          <card
            v-for="(item, key) of playList"
            :key="key"
            @click.native="selectItem(item, key)"
          >
            <img slot="img" v-lazy="item.img_url" alt="" />
            <p slot="title">
              {{ item.title }}
              <span class="notPlay"> {{ notPlay(item) }}</span>
            </p>
            <p slot="author">{{ item.name }}--{{ item.album }}</p>
          </card>
        </div>
        <div class="detailLoad" v-show="!playList.length">
          <loading></loading>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import Scroll from "./scroll";
import Card from "./card";
import Loading from "./loading";
import { mapState, mapMutations, mapActions } from "vuex";
import getAudioApi from "api/player/audio.js";

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
  data() {
    return {
      positionY: 0,
    };
  },
  created() {
    this._getAudioApi(this.songList);
  },
  mounted() {
    this.overflow();
    this.getScrollHeight();
  },
  computed: {
    ...mapState(["singer", "playList"]),
    ...mapState({
      singer: "singer",
      playList: "playList",
    }),
    singerName() {
      return this.singer.singer_name;
    },
    loadingShow() {
      return !this.playList.length;
    },
    notPlay() {
      return (item) => {
        if (!item.audioUrl) return "(无版权)";
        return;
      };
    },
  },
  methods: {
    ...mapMutations(["setPlayList", "setMinPlayer"]),
    ...mapMutations({
      setPlayList: "setPlayList",
      setMinPlayer: "setMinPlayer",
    }),
    ...mapActions(["playerGo"]),
    ...mapActions({ playerGo: "playerGo" }),
    _getAudioApi(newV) {
      getAudioApi(newV).then((res) => {
        res.forEach((item, key) => {
          newV[key].audioUrl = item.data.req_0.data.midurlinfo[0].purl;
          return newV[key];
        });
        this.setPlayList(newV);
      });
    },
    back() {
      this.$router.go(-1);
    },
    scroll(item) {
      this.positionY = item;
    },
    overflow() {
      this.$refs.scroll.$el.style.overflow = "visible";
    },
    getScrollHeight() {
      this.scrollH = this.$refs.scroll.$el.clientHeight;
    },
    selectItem(item, key) {
      this.playerGo({
        playList: this.songList,
        song: item,
        index: key,
      });
    },
  },
  components: {
    Scroll,
    Card,
    Loading,
  },
  watch: {
    songList(newV) {
      this.setPlayList(newV);
      this._getAudioApi(newV);
    },
    positionY(newV) {
      if (-newV >= 0 && -newV <= 240) {
        this.$refs.layer.style.transform = `translate3d(0,${newV}px,0)`;
        this.$refs.img.style.filter = "brightness(60%)";
        this.$refs.imgBox.style["z-index"] = -2;
        this.$refs.imgBox.style.height = "280px";
        this.$refs.scroll.$el.style.flex = 1;
        this.$refs.scroll.$el.style.position = "static";
        this.$refs.random.style.display = "flex";
      }
      if (-newV > 240) {
        this.$refs.imgBox.style["z-index"] = 9;
        this.$refs.imgBox.style.height = "45px";
        this.$refs.img.style.filter = "brightness(30%)";
        this.$refs.random.style.display = "none";
      }
      if (-newV < 0) {
        this.$refs.layer.style.transform = `translate3d(0,${newV}px,0)`;
        this.$refs.imgBox.style.transform = `scale(${1 + newV / 600})`;
        this.$refs.imgBox.style.height = `${280 + newV}px`;
      }
      if (-newV < 0 || -newV > 240) {
        this.$refs.scroll.$el.style.height = `${this.scrollH}px`;
        this.$refs.scroll.$el.style.flex = 0;
        this.$refs.scroll.$el.style.position = "fixed";
        this.$refs.scroll.$el.style.bottom = 0;
      }
    },
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
  width: 100%;
  height: 100vh;
  z-index: 999;
  .notPlay {
    color: @color;
    font-size: 11px;
  }
  .layer {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 280px;
    background-color: @color2;
    z-index: -1;
  }
  .back,
  .singer {
    position: fixed;
    top: 25px;
    left: 40px;
    transform: translate(-50%, -50%);
    z-index: 99;
  }
  .singer {
    color: @color;
    left: 50%;
    font-size: @sizem;
  }
  .singerImg {
    height: 280px;
    position: relative;
    overflow: hidden;
    background-color: #585555;
    z-index: -2;
    .singer_img {
      filter: brightness(60%);
    }
    .random {
      width: 36%;
      font-size: @sizexs;
      border-radius: 16px;
      border: 1px solid @color;
      position: absolute;
      display: flex;
      color: @color;
      top: 75%;
      left: 50%;
      padding: 3px;
      transform: translateX(-50%);
      justify-content: space-around;
      align-items: center;
      img {
        width: 20%;
      }
    }
    img {
      width: 100%;
    }
  }
}
.detail-leave-active,
.detail-enter-active {
  transition: all 0.2s;
}
.detail-enter,
.detail-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>