<template>
  <scroll :data="singerList" ref="scroll">
    <div id="singer">
      <singer-list
        v-if="singerList.length"
        :singerView="singerView"
        ref="singerList"
      ></singer-list>
      <loading v-show="!singerList.length"></loading>
    </div>
    <singer-nav
      v-if="is"
      :topArr="topArr"
      :singerView="singerView"
      ref="singerNav"
      @liTouch="liTouch"
      @getIndex="_getIndex"
      @getY="_getY"
    ></singer-nav>
    <p v-show="positionY < 0" class="topA_Z" ref="A_Z">{{ getItem }}</p>
    <router-view></router-view>
  </scroll>
</template>

<script>
import Scroll from "components/scroll";
import Loading from "components/loading";
import singerListApi from "api/singer/singerList";
import SingerList from "./singerList";
import SingerNav from "./singerNav";
import pinyin from "js-pinyin";
pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
/*   拼音插件示例
console.log(pinyin.getFullChars('管理员'));  //GuanLiYuan
console.log(pinyin.getCamelChars('管理员'));  //GLY
 */
export default {
  data() {
    return {
      singerList: [],
      singerView: new Map(),
      is: false,
      topArr: [],
      index: 0,
      positionY: 0,
      arr: [
        "热",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
    };
  },
  created() {
    this._getSongerList();
    this._createdA_Z();
  },

  updated() {
    this._A_ZHeight();
  },
  computed: {
    getItem() {
      return [...this.singerView.keys()][this.index];
    },
  },
  methods: {
    _getSongerList() {
      singerListApi().then((res) => {
        this.singerList = res.data.singerList.data.singerlist;
      });
    },
    _createdA_Z() {
      this.arr.forEach((item) => {
        this[item] = [];
        this.singerView.set(item, this[item]);
      });
    },
    _initSingerList() {
      this.singerList.forEach((item, key) => {
        if (key < 10) {
          this["热"].push(item);
        }
      });
      [...this.singerView.keys()].forEach((key) => {
        this.singerList.forEach((item) => {
          if (pinyin.getCamelChars(item.singer_name)[0] === key) {
            this.singerView.get(key).push(item);
          }
        });
        this.singerView.get(key).length === 0 && this.singerView.delete(key);
      });
    },
    _getIndex(key) {
      this.index = key;
    },
    _getY(y) {
      this.positionY = y;
    },
    liTouch(key) {
      this.$refs.scroll.scroll.scrollToElement(
        this.$refs.singerList.$refs.singerList[key]
      );
    },
    _A_ZHeight() {
      if (!this.topArr.length) {
        console.log(this);
        [...this.$refs.singerList.$refs.singerList].reduce((a, b) => {
          this.topArr.push(a);
          a += b.clientHeight;
          return a;
        }, 0);
      }
    },
  },
  watch: {
    singerList() {
      this._initSingerList();
      this.is = true;
    },
    positionY() {
      this.topArr.forEach((item, key) => {
        if (key) {
          if (-this.positionY <= item && -this.positionY > item - 26) {
            this.$refs.A_Z.style.transform = `translateY(${
              -26 + item + this.positionY
            }px)`;
          }
          if (Math.floor(item + this.positionY) === 0) {
            this.$refs.A_Z.style.transform = `translateY(0px)`;
          }
        } else {
          this.$refs.A_Z.style.transform = `translateY(0px)`;
        }
      });
    },
  },
  components: {
    SingerList,
    Scroll,
    Loading,
    SingerNav,
  },
};
</script>

<style lang='less' scoped>
.topA_Z {
  position: fixed;
  font-size: @sizexs;
  top: @headerHeight+ @navBarHeight+2;
  width: 100%;
  line-height: 27px;
  color: @color;
  background-color: @color2;
  padding-left: 5%;
}
</style>