<template>
  <div id="lyric">
    <scroll :data="lines" ref="scroll">
      <ul>
        <li
          v-for="(item, key) of lines"
          :key="key"
          :id="`id${key}`"
          :class="{ hl: key === index }"
        >
          {{ item.txt }}
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Lyric from "lyric-parser";
import Scroll from "components/scroll";
import { mapState } from "vuex";
export default {
  data() {
    return {
      index: 0,
      lines: [],
    };
  },
  props: {
    currentTime: {
      type: Number,
      default: 0,
    },
  },
  created() {
    this._initLyric();
  },
  mounted() {
    this.$refs.scroll.$el.style.height = "auto";
    this.lines = this.lyric.lines;
  },
  computed: {
    ...mapState(["song", "play"]),
    ...mapState({ song: "song", play: "play" }),
  },
  methods: {
    hanlder({ lineNum, txt }) {
      this.index = lineNum;
      if (this.index > 6 && this.index < this.lines.length - 5)
        this.$refs.scroll.scroll.scrollToElement(
          `#id${lineNum}`,
          1000,
          0,
          true
        );
    },
    _initLyric() {
      this.lyric = new Lyric(this.song.lyric, this.hanlder);
      this.lyric.play();
    },
  },
  components: {
    Scroll,
  },
  watch: {
    song() {
      this.lyric.stop();
      this.index = 0;
      this._initLyric();
      this.$refs.scroll.scroll.scrollTo(0, 0);
    },
    play(newV) {
      this.lyric.togglePlay();
    },
    currentTime(newV) {
      this.lyric.seek(newV * 1000);
      this.index =
        this.lyric.lines.filter((item) => {
          return item.time <= newV * 1000;
        }).length - 1;
      if (this.index > 6 && this.index < this.lines.length - 5)
        this.$refs.scroll.scroll.scrollToElement(
          `#id${this.index}`,
          0,
          0,
          true
        );
      else
        this.$refs.scroll.scroll.scrollToElement(
          `#id${this.lines.length - 5}`,
          0,
          0,
          true
        );
    },
  },
};
</script>

<style lang='less' scoped>
#lyric {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 100%;
  top: 0;
  display: flex;
  text-align: center;
  ul {
    width: 100%;
    color: @color1;
    list-style-type: none;
    line-height: 36px;
    font-size: 15px;
    .hl {
      color: #f3f2f1;
    }
  }
}
</style>