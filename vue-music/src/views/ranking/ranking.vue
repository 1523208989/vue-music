<template>
  <scroll id="ranking" :data="rankList">
    <div>
      <card
        v-for="(item, key) of rankList"
        :key="key"
        @click.native="selectItem(item)"
      >
        <img slot="img" v-lazy="item.picUrl" alt="" />
        <p slot="title">{{ item.label }}</p>
        <p slot="author">{{ listenNum(item) }}</p>
      </card>
    </div>
    <loading v-show="!rankList.length"></loading>
    <router-view></router-view>
  </scroll>
</template>

<script>
import Card from "components/card";
import Scroll from "components/scroll";
import Loading from "components/loading";
import getRankList from "api/ranking/rankList";
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      rankList: [],
    };
  },
  created() {
    this._getRankList();
  },
  computed: {
    listenNum() {
      return (item) => {
        return `播放量：${item.listenNum}`;
      };
    },
  },
  methods: {
    ...mapMutations(['setSinger']),
    _getRankList() {
      getRankList().then((res) => {
        res.data.data.forEach((item) => {
          this.rankList.push(...item.list);
        });
      });
    },
    selectItem(item) {
      this.$router.push({path:`/ranking/${item.topId}`});
      this.setSinger(item)
    },
  },
  components: {
    Card,
    Scroll,
    Loading,
  },
};
</script>

<style lang='less' scoped>
#ranking {
  display: flex;
  flex-direction: column;
}
</style>