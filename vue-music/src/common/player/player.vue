<template>
  <div v-show="minPlayer || playList.length">
    <div id="error" v-show="error">
      <div>
        <span @click="close">×</span>
        <h4>提示</h4>
        <p>您播放的歌曲仅限qq音乐客户端播放，建议您打开客户端进行播放。</p>
      </div>
    </div>
    <transition
      name="player"
      appear
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div id="player" v-show="fullScroll && !error">
        <div
          class="fuzzy"
          :style="{ 'background-image': `url(${song.img_url})` }"
        ></div>
        <div class="top">
          <img
            src="~assets/image/someImg/down.png"
            class="down"
            @click="down"
            alt=""
          />
          <h6 class="song_name">{{ song.title }}</h6>
          <p class="singer_name">{{ song.name }}</p>
        </div>
        <div class="big_box" ref="cd">
          <div class="img_box rotate" :class="rotate">
            <img v-lazy="song.img_url" alt="" />
          </div>
        </div>
        <div class="time">
          <span>{{ songTime.currentTime }}</span>
          <div
            class="line"
            @touchstart="touchStartX"
            @touchmove="touchMove"
            @touchend="touchEnd"
            @click="lineClick"
          >
            <div class="timeLine" ref="line"></div>
            <div class="round" ref="round">
              <div class="minRound"></div>
            </div>
          </div>
          <span>{{ songTime.totalTime }}</span>
        </div>
        <div class="player">
          <i :class="`iconfont ${playModeCls}`" @click="setPlayMode"></i>
          <i
            class="iconfont iconshangyishou-yuanshijituantubiao"
            :class="prevClass"
            @click="prev"
          ></i>
          <i :class="`iconfont ${playClass}`" @click="setPlay(!play)"></i>
          <i
            class="iconfont iconxiayishou-yuanshijituantubiao"
            :class="prevClass"
            @click="next"
          ></i>
          <i class="iconfont iconshoucang"></i>
        </div>
      </div>
    </transition>
    <transition name="min_player">
      <div id="min_player" v-show="!fullScroll && index !== -1" @click="full">
        <div class="img_box rotate" :class="rotate">
          <img v-lazy="song.img_url" alt="" />
        </div>
        <div class="centent">
          <p>{{ song.title }}</p>
          <p>{{ song.name }}</p>
        </div>
        <prog-circle
          :wd="36"
          :percent="percent"
          @click.stop.native="setPlay(!play)"
        >
          <i :class="`iconfont ${playClass}`"></i
        ></prog-circle>
        <i class="iconfont icongedan i"></i>
      </div>
    </transition>
    <audio
      ref="audio"
      autoplay
      :src="audioUrl"
      @canplay="songReady"
      @error="songError"
      @timeupdate="timeUpdate"
    ></audio>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import animations from "create-keyframe-animation";
import ProgCircle from "./progressCircle";
export default {
  data() {
    return {
      songState: false,
      songTime: {
        currentTime: "0:00",
        totalTime: "0:00",
      },
      lineX: 0,
      dashArray: 10,
      dashOffset: 10,
      percent: 0,
      songCut: false,
    };
  },
  mounted() {
    this.modePlay();
  },
  computed: {
    ...mapState([
      "fullScroll",
      "minPlayer",
      "index",
      "playList",
      "song",
      "play",
      "error",
      "mode",
    ]),
    ...mapState({
      fullScroll: "fullScroll",
      playList: "playList",
      song: "song",
      play: "play",
      error: "error",
      index: "index",
      minPlayer: "minPlayer",
      mode: "mode",
    }),
    playClass() {
      return this.play ? "iconicon_bofang" : "iconbofang";
    },
    audioUrl() {
      return (
        this.song.audioUrl &&
        `http://ws.stream.qqmusic.qq.com/${this.song.audioUrl}`
      );
    },
    prevClass() {
      if (!this.songState) return "stop";
      return;
    },
    rotate() {
      if (this.play) return;
      else return "paused";
    },
    playModeCls() {
      if (this.mode === 0) return "iconxunhuan";
      if (this.mode === 1) return "iconxunhuan1";
      return "iconrandom";
    },
  },
  methods: {
    ...mapMutations([
      "setFullScroll",
      "setSong",
      "setPlay",
      "setError",
      "setIndex",
      "setMode",
    ]),
    ...mapMutations({
      setFullScroll: "setFullScroll",
      setPlay: "setPlay",
      setError: "setError",
      setIndex: "setIndex",
      setSong: "setSong",
      setMode: "setMode",
    }),
    timeUpdate(e) {
      let m = (this.$refs.audio.duration / 60) | 0;
      let s = this._pad(this.$refs.audio.duration % 60 | 0);
      let min = (this.$refs.audio.currentTime / 60) | 0;
      let sec = this._pad(this.$refs.audio.currentTime % 60 | 0);
      this.songTime.currentTime = `${min}:${sec}`;
      this.songTime.totalTime = `${m}:${s}`;
      this.percent = this.$refs.audio.currentTime / this.$refs.audio.duration;
      this.lineX = this.percent * document.body.clientWidth * 0.6;
      if (!this.touchInit) {
        this.move(this.lineX);
      }
    },
    _pad(timestamp) {
      let len = timestamp.toString().length;
      while (len < 2) {
        timestamp = "0" + timestamp;
        len++;
      }
      return timestamp;
    },
    modePlay() {
      this.$refs.audio.addEventListener("ended", () => {
        this.setPlay(false);
        if (this.mode === 0) this.next();
        if (this.mode === 1) {
          this.$refs.audio.load();
          this.setPlay(true);
        }
        if (this.mode === 2) {
          let random = Math.floor(Math.random() * this.playList.length);
          if (random === this.index) {
            random = ((random + 1) % this.playList.length) - 1;
          }
          this.setIndex(random);
          this.next();
        }
      });
    },
    move(x) {
      this.$refs.line.style.width = `${x}px`;
      this.$refs.round.style.transform = `translate3d(${x}px,0,0)`;
    },
    touchStartX(e) {
      this.touchInit = true;
      this.startX = e.touches[0].pageX;
    },
    touchMove(e) {
      this.endX = e.touches[0].pageX;
      let moveX = this.endX - this.startX;
      let lineX = this.lineX;
      lineX += moveX;
      if (lineX < 0) lineX = 0;
      if (lineX >= document.body.clientWidth * 0.6)
        lineX = document.body.clientWidth * 0.6;
      this.move(lineX);
      this.x = lineX;
    },
    touchEnd() {
      if (this.x) {
        this.$refs.audio.currentTime =
          (this.x / (document.body.clientWidth * 0.6)) *
          this.$refs.audio.duration;
        this.percent = this.x / (document.body.clientWidth * 0.6);
      }
      this.touchInit = false;
    },
    lineClick(e) {
      this.touchInit = false;
      let moveX = e.clientX - document.body.clientWidth * 0.2;
      this.$refs.audio.currentTime = (
        (moveX / (document.body.clientWidth * 0.6)) *
        this.$refs.audio.duration
      ).toFixed(6);
      this.move(moveX);
    },
    setPlayMode() {
      this.setMode((this.mode + 1) % 3);
    },
    close() {
      this.setError(false);
    },
    down() {
      this.setFullScroll(false);
    },
    next() {
      if (!this.songState) return;
      if (this.index === this.playList.length - 1) {
        this.setIndex(-1);
      }
      this.setIndex(this.index + 1);
      this.nextGet(this.playList[this.index]);
      if (this.song === this.playList[this.index]) {
        this.setPlay(true);
        this.$refs.audio.load();
      } else this.setSong(this.playList[this.index]);
      this.songState = false;
    },
    nextGet(item) {
      if (!item.audioUrl) {
        if (this.index === this.playList.length - 1) {
          this.setIndex(-1);
        }
        this.setIndex(this.index + 1);
        this.nextGet(this.playList[this.index]);
      }
    },
    prev() {
      if (!this.songState) return;
      if (this.index === 0) {
        this.setIndex(this.playList.length);
      }
      this.setIndex(this.index - 1);
      this.prevGet(this.playList[this.index]);
      if (this.song === this.playList[this.index]) {
        this.$refs.audio.load();
        this.setPlay(true);
      } else this.setSong(this.playList[this.index]);
      this.songState = false;
    },
    prevGet(item) {
      if (!item.audioUrl) {
        if (this.index === 0) {
          this.setIndex(this.playList.length);
        }
        this.setIndex(this.index - 1);
        this.prevGet(this.playList[this.index]);
      }
    },
    songReady() {
      this.songState = true;
    },
    songError() {
      this.songState = true;
    },
    full() {
      this.setFullScroll(true);
    },
    enter(el, done) {
      const { x, y, scale } = this.getPosition();
      animations.registerAnimation({
        name: "move",
        animation: {
          0: {
            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
          },
          60: {
            transform: `translate3d(-50%,0,0) scale(1.1)`,
          },
          100: {
            transform: `translate3d(-50%,0,0) scale(1)`,
          },
        },
        presets: {
          duration: 800,
        },
      });
      animations.runAnimation(this.$refs.cd, "move", done);
    },
    afterEnter(el) {
      animations.unregisterAnimation("move");
      this.$refs.cd.style.animation = "";
    },
    leave(el, done) {
      const { x, y, scale } = this.getPosition();
      this.$refs.cd.style.transition = "all 0.3s";
      this.$refs.cd.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      this.$refs.cd.addEventListener("transitionend", done);
    },
    afterLeave(el) {
      this.$refs.cd.style.transition = "";
      this.$refs.cd.style.transform = "";
    },
    getPosition() {
      const min_x = window.innerWidth * 0.07 + 10;
      const min_y = window.innerHeight - 32.5;
      const full_x = window.innerWidth / 2 + window.innerWidth * 0.45;
      const full_y = 90 + window.innerWidth * 0.45;
      const x = min_x - full_x;
      const y = min_y - full_y;
      const scale = 14 / 90;
      return {
        x,
        y,
        scale,
      };
    },
  },
  watch: {
    song() {
      this.setPlay(true);
    },
    play(newV) {
      this.$nextTick(() => {
        newV ? this.$refs.audio.play() : this.$refs.audio.pause();
      });
    },
  },
  components: {
    ProgCircle,
  },
};
</script>

<style lang='less' scoped>
#error {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #000000a0;
  z-index: 99999;
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 10px 20px;
    width: 68vw;
    span {
      position: absolute;
      top: 5px;
      right: 10px;
      font-size: 24px;
      cursor: pointer;
    }
    h4 {
      border-bottom: 1px solid #cccccc;
      padding-bottom: 5px;
      margin-bottom: 10px;
    }
    p {
      font-size: 15px;
      line-height: 20px;
    }
  }
}

#player {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #725f5f;
  z-index: 9999;
  .fuzzy {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-position: center;
    background-size: cover;
    filter: blur(15px) brightness(50%);
    z-index: -1;
  }
  .top {
    position: relative;
    text-align: center;
    height: 10vh;
    .down {
      position: absolute;
      width: 35px;
      top: 25px;
      left: 40px;
      transform: translate(-50%, -50%);
      color: @color;
    }
    .song_name {
      position: absolute;
      width: 45%;
      left: 50%;
      top: 25px;
      transform: translate(-50%, -50%);
      color: @color;
      font-size: @sizem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .singer_name {
      position: absolute;
      left: 50%;
      top: 50px;
      transform: translate(-50%, -50%);
      color: @color;
      font-size: @sizexs;
    }
  }
  .big_box {
    position: fixed;
    top: 90px;
    left: 50%;
    transform: translate(-50%);
    width: 90vw;
    height: 90vw;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    .img_box {
      width: 84vw;
      height: 84vw;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
      &.rotate {
        animation: rotate 20s linear infinite;
      }
      &.paused {
        animation-play-state: paused;
      }
    }
  }
  .time {
    color: @color;
    font-size: 14px;
    width: 80vw;
    margin: 0 10vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 16%;
    span {
      width: 30px;
    }
    .line {
      width: 60vw;
      height: 4px;
      border-radius: 2px;
      background-color: #b6b5b55e;
      position: relative;
    }
    .timeLine {
      width: 0;
      height: 4px;
      border-radius: 2px;
      background-color: @color;
    }
    .round {
      left: -5px;
      top: -3px;
      width: 10px;
      height: 10px;
      background-color: @color;
      border-radius: 50%;
      position: absolute;
    }
    .minRound {
      width: 60%;
      height: 60%;
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      background-color: @color1;
    }
  }
  .player {
    color: @color;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    position: fixed;
    bottom: 5%;
    i {
      font-size: 44px;
      &:first-child {
        font-size: 36px;
      }
      &:nth-child(3) {
        font-size: 50px;
      }
      &:last-child {
        font-size: 36px;
        color: @color1;
      }
      &.stop {
        color: @color1;
      }
    }
  }
}

#min_player {
  position: fixed;
  height: 65px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(40, 39, 61);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
  .img_box {
    width: 14vw;
    height: 14vw;
    margin-left: 15px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
    }
    &.rotate {
      animation: rotate 20s linear infinite;
    }
    &.paused {
      animation-play-state: paused;
    }
  }
  .centent {
    p {
      width: 40vw;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: @sizexxs;
      color: @color1;
      padding: 3px;
      &:first-child {
        font-size: @sizexs;
        color: @color;
      }
    }
  }
  i {
    font-size: 36px;
    color: @color;
    &.i {
      margin-right: 25px;
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    transition: all 20s;
  }
}

.player-enter-active,
.player-leave-active {
  transition: all 0.3s;
  .top {
    transition: all 0.3s;
  }
  .player {
    transition: all 0.3s;
  }
}

.player-enter,
.player-leave-to {
  opacity: 0;
  .top {
    transform: translate3d(0, -150px, 0);
  }
  .player {
    transform: translate3d(0, 150px, 0);
  }
}

.min_player-enter-active,
.min_player-leave-active {
  transition: all 0.2s;
}

.min_player-enter,
.min_player-leave-to {
  opacity: 0;
  transform: translate3d(0, 50px, 0);
}
</style>