<template>
  <div id="home">
    <slide
      v-if="slideApi.length"
      :content="slideApi"
      @imgLoad="imgLoad"
    ></slide>
    <p class="hotSongs">热门歌单推荐</p>
    <scroll :imgLoad="load" :data="songListApi">
      <song-list :songList="songListApi"></song-list>
      <loading v-show="!songListApi.length"></loading
    ></scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from "components/scroll";
import Slide from "./homeSlide";
import slideRequest from "api/home/slide";
import songListRequest from "api/home/songList";
import SongList from "./homeSongList";
import Loading from "components/loading";
export default {
  data() {
    return {
      slideApi: [],
      songListApi: [],
      load: false,
    };
  },
  created() {
    this._getSlideApi();
    this._getSongListApi();
  },
  methods: {
    _getSlideApi() {
      slideRequest().then((res) => {
        this.slideApi = res.data.data.banner;
      });
    },
    _getSongListApi() {
      songListRequest().then((res) => {
        this.songListApi = res.data.data.list;
      });
    },
    imgLoad() {
      this.load = true;
    },
  },
  components: {
    Slide,
    SongList,
    Scroll,
    Loading,
  },
};
</script>

<style lang='less' scoped>
#home {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .hotSongs {
    text-align: center;
    color: @color;
    font-size: @sizexs;
    padding: 8px 0;
  }
}
</style>
