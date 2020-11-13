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
    ...mapState(["song"]),
  },
  methods: {
    _initLyric() {
      this.lyric = new Lyric(this.song.lyric);
      this.$emit("lyc", this.lyric.lines[0].txt);
    },
  },
  components: {
    Scroll,
  },
  watch: {
    song() {
      this.index = 0;
      this._initLyric();
      this.lines = this.lyric.lines;
      this.$refs.scroll.scroll.scrollTo(0, 1000);
    },
    currentTime(newV) {
      this.lyric.seek(newV * 1000);
      let len =
        this.lyric.lines.filter((item) => {
          return item.time <= newV * 1000;
        }).length - 1;
      if (this.index === len) return;
      this.index = len;
      if (this.index < 0) this.index = 0;
      if (this.index > 4 && this.index < this.lines.length - 4)
        this.$refs.scroll.scroll.scrollToElement(`#id${this.index - 4}`, 1000);
      if (this.index >= this.lines.length - 4)
        this.$refs.scroll.scroll.scrollToElement(
          `#id${this.lines.length - 10}`,
          1000
        );
      if (this.index <= 4) this.$refs.scroll.scroll.scrollTo(0, 0);
      this.$emit("lyc", this.lines[this.index].txt);
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
    width: 80%;
    margin: 0 auto;
    color: @color1;
    list-style-type: none;
    font-size: 15px;
    li {
      width: 100%;
      line-height: calc((90vw + 110px) * 0.1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &.hl {
        color: #f3f2f1;
      }
    }
  }
}
</style>