<template>
  <div id="search">
    <searchBox ref="searchBox" @getModel="getModel"></searchBox>
    <hotSearch v-show="!model"></hotSearch>
    <searchKey ref="searchKey" :model="model"></searchKey>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchKey from "./searchKey";
import SearchBox from "components/searchBox";
import HotSearch from "./hotSearch";
export default {
  data() {
    return {
      model: "",
    };
  },
  methods: {
    getModel(model) {
      this.model = model;
    },
  },
  components: {
    SearchBox,
    HotSearch,
    SearchKey,
  },
};
</script>

<style lang='less' scoped>
#search {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
</style>