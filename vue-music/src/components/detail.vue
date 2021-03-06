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
      <p class="singer">{{ singerName || title }}</p>
      <div class="random" ref="random" @click="randomPlay">
        <img src="~assets/image/someImg/播放.png" alt="" />
        <p>随机播放列表</p>
      </div>
      <div class="singerImg" ref="imgBox">
        <img class="singer_img" ref="img" :src="img" alt="" />
      </div>
      <div ref="layer" class="layer"></div>
      <scroll :data="audioList" @scroll="scroll" ref="scroll">
        <div ref="songList" v-show="audioList.length">
          <card
            v-for="(item, key) of audioList"
            :key="key"
            @click.native="selectItem(item, key)"
          >
            <img slot="img" v-lazy="item.img_url" alt="" />
            <p slot="title">
              <span class="rank">{{ rank(item) }}</span>
              {{ item.title }}
              <span class="rankValue">{{ rankValue(item) }}</span>
              <span class="notPlay"> {{ notPlay(item) }}</span>
            </p>
            <p slot="author">{{ item.name }}--{{ item.album }}</p>
          </card>
        </div>
        <div class="detailLoad" v-show="!audioList.length">
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
      audioList: [],
      positionY: 0,
    };
  },
  mounted() {
    this.overflow();
  },
  computed: {
    ...mapState(["singer", "playList", "index", "fullScroll"]),
    singerName() {
      if (this.singer.singer_name) return this.singer.singer_name;
      else return this.singer.singerName;
    },
    rank() {
      return (item) => {
        if (item.rank) return `${item.rank} --`;
        return;
      };
    },
    rankValue() {
      return (item) => {
        if (item.rankType) {
          if (item.rankType === 2) return `⤥${item.rankValue}`;
          if (item.rankType === 3) return "⤤0";
          if (item.rankType === 4) return "New";
          return `⤤${item.rankValue}`;
        }
        return;
      };
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
    ...mapActions(["playerGo"]),
    async _getAudioApi(newV) {
      await getAudioApi(newV).then((res) => {
        res.forEach((item, key) => {
          newV[key].audioUrl = item.data.req_0.data.midurlinfo[0].purl;
        });
      });
    },
    async _getLyricApi(newV) {
      await getLyricApi(newV).then((res) => {
        res.forEach((item, key) => {
          newV[key].lyric = item.data.data.lyric;
        });
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
      this.setPlayList(this.songList);
      this.playerGo({
        song: item,
        index: key,
      });
    },
    randomPlay() {
      const len = this.audioList.length;
      if (len) {
        const songs = this.audioList.filter((item) => {
          return item.audioUrl;
        });
        if (songs.length) {
          const key = Math.floor(Math.random() * songs.length);
          this.playerGo({
            song: songs[key],
            index: this.audioList.indexOf(songs[key]),
          });
        }
      }
    },
  },
  components: {
    Scroll,
    Card,
    Loading,
  },
  watch: {
    async songList(newV) {
      await Promise.all([this._getAudioApi(newV), this._getLyricApi(newV)]);

      this.audioList = newV;
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
  .rank {
    color: @color1;
    font-size: 14px;
  }
  .notPlay,
  .rankValue {
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