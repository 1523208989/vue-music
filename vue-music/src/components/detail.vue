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
      <p class="singer">{{ singerName||title }}</p>
      <div class="random" ref="random">
        <img src="~assets/image/someImg/播放.png" alt="" />
        <p>随机播放列表</p>
      </div>
      <div class="singerImg" ref="imgBox">
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
      <div ref="own" :class="marginBT"></div>
    </div>
  </transition>
</template>

<script>
import Scroll from "./scroll";
import Card from "./card";
import Loading from "./loading";
import { mapState, mapMutations, mapActions } from "vuex";
import getAudioApi from "api/player/audio.js";
import getLyricApi from "api/player/lyric";

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
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      positionY: 0,
      stateSetPl: 0,
    };
  },
  mounted() {
    this.overflow();
  },
  computed: {
    ...mapState(["singer", "playList", "index", "fullScroll"]),
    ...mapState({
      singer: "singer",
      playList: "playList",
      fullScroll: "fullScroll",
      index: "index",
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
    marginBT() {
      if (this.index !== -1 && !this.fullScroll) return "marginBT";
      return "";
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
        });
        this.stateSetPl++;
      });
    },
    _getLyricApi(newV) {
      getLyricApi(newV).then((res) => {
        res.forEach((item, key) => {
          newV[key].lyric = item.data.data.lyric;
        });
        this.stateSetPl++;
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
      this._getAudioApi(newV);
      this._getLyricApi(newV);
    },
    stateSetPl(newV) {
      newV === 2 && this.setPlayList(this.songList);
    },
    positionY(newV) {
      if (-newV >= 0 && -newV <= 235) {
        this.$refs.layer.style.transform = `translate3d(0,${newV}px,0)`;
        this.$refs.img.style.filter = "brightness(60%)";
        this.$refs.random.style["z-index"] = -2;
        this.$refs.imgBox.style["z-index"] = -3;
        this.$refs.imgBox.style.height = "280px";
        this.$refs.imgBox.style["margin-bottom"] = 0;
      }
      if (-newV > 235) {
        this.$refs.img.style.filter = "brightness(20%)";
        this.$refs.imgBox.style["margin-bottom"] = "240px";
        this.$refs.imgBox.style["z-index"] = 9;
        this.$refs.imgBox.style.height = "45px";
      }
      if (-newV < 0) {
        this.$refs.layer.style.transform = `translate3d(0,${newV}px,0)`;
        this.$refs.imgBox.style.transform = `scale(${1 + newV / 600})`;
        this.$refs.imgBox.style.height = `${280 + newV}px`;
        this.$refs.imgBox.style["margin-bottom"] = `${-newV}px`;
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
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 60%;
  }
  .random {
    width: 36%;
    font-size: @sizexs;
    border-radius: 16px;
    border: 1px solid @color;
    position: absolute;
    display: flex;
    color: @color;
    top: 200px;
    left: 50%;
    padding: 2px;
    transform: translateX(-50%);
    justify-content: space-around;
    align-items: center;
    img {
      width: 20%;
    }
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
    img {
      width: 100%;
    }
  }
  .marginBT {
    height: 65px;
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