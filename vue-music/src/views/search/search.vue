<template>
  <div id="search">
    <searchBox ref="searchBox" @getModel="getModel"></searchBox>
    <searchKey ref="searchKey" :singers="singers" :songs="songs"></searchKey>
    <hotSearch></hotSearch>
  </div>
</template>

<script>
import SearchKey from "./searchKey";
import SearchBox from "components/searchBox";
import HotSearch from "./hotSearch";
import getSearchKey from "api/search/searchKey";
export default {
  data() {
    return {
      singers: [],
      songs: [],
    };
  },
  methods: {
    getModel(model) {
       this.singers = [];
        this.songs = [];
      if (model)
        getSearchKey(model).then((res) => {
          this.singers = res.data.data.singer.itemlist;
          this.songs = res.data.data.song.itemlist;
          console.log(res);
        });
      if (!model) {
        this.singers = [];
        this.songs = [];
      }
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
#search{
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>