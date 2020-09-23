<template>
  <div class="singerList">
    <div v-for="(item,key) of singerView.keys()" :key="key">
      <div ref="singerList">
        <p v-if="singerView.get(item).length" class="A_Z" :class="{A_ZZ:true}">{{item}}</p>
        <card v-for="(item,key) of singerView.get(item)" :key="key" @click.native="getSinger(item)">
          <img slot="img" v-lazy="item.singer_pic" alt />
          <p slot="title">{{item.singer_name}}</p>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "components/card";

export default {
  props: {
    singerView: {
      type: Map,
      default() {
        return new Map();
      },
    },
  },
  methods: {
    getSinger(item) {
      this.$router.push({path:`/singer/${item.singer_mid}`})
    },
  },
  components: {
    Card,
  },
};
</script>

<style lang='less' scoped>
.singerList {
  .A_Z {
    width: 100vw;
    color: @color;
    font-size: @sizexs;
    padding-left: 5%;
    line-height: 24px;
  }
  ul {
    position: fixed;
    top: 50px;
    right: 20px;
    z-index: 9;
  }
}
</style>