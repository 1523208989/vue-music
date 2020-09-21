<template>
  <div class="singerList">
    <div v-for="(item,key) of singerView.keys()" :key="key">
      <p v-if="singerView.get(item).length" class="A_Z">{{item}}</p>
      <card v-for="(item,key) of singerView.get(item)" :key="key">
        <img slot="img" v-lazy="item.singer_pic" alt />
        <p slot="title">{{item.singer_name}}</p>
      </card>
    </div>
  </div>
</template>

<script>
import Card from "components/card";
import pinyin from "js-pinyin";
pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
/*   拼音插件示例
console.log(pinyin.getFullChars('管理员'));  //GuanLiYuan
console.log(pinyin.getCamelChars('管理员'));  //GLY
 */
export default {
  props: {
    singerList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      singerView: new Map(),
    };
  },
  created() {
    this._createdA_Z();
    this._initSingerList();
  },
  methods: {
    _createdA_Z() {
      this.arr = [
        "Hot",
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
      ];
      this.arr.forEach((item) => {
        this[item] = [];
        this.singerView.set(item, this[item]);
      });
    },
    _initSingerList() {
      this.singerList.forEach((item, key) => {
        if (key < 10) {
          this.Hot.push(item);
        }
      });
      [...this.singerView.keys()].forEach((key) => {
        this.singerList.forEach((item) => {
          if (pinyin.getCamelChars(item.singer_name)[0] === key) {
            this.singerView.get(key).push(item);
          }
        });
      });
      console.log(this.singerView);
    },
  },
  components: {
    Card,
  },
};
</script>

<style lang='less' scoped>
  .singerList{
    .A_Z{
      color: @color;
      font-size: @sizexs;
      font-weight: bolder;
      margin-left: 16px;
    }
  }
</style>