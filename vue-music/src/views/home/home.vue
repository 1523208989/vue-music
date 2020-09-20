<template>
  <scroll :imgLoad="load" :data="songListApi">
    <div id="home">
      <slide v-if="slideApi.length" :content="slideApi" @imgLoad="imgLoad"></slide>
      <p class="hotSongs">❤热门推荐歌单</p>
      <song-list :songList="songListApi"></song-list>
      <loading v-show="!songListApi.length"></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/scroll";
import Slide from "./homeSlide";
import slideRequest from "api/home/slide";
import songListRequest from "api/home/songList";
import SongList from "./homeSongList";
import Loading from 'components/loading'
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
        console.log(res);
          this.slideApi = res.data.data.banner;
      });
    },
    _getSongListApi() {
      songListRequest().then((res) => {
        console.log(res);
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
    Loading
  },
};
</script>

<style lang='less'>
#home {
  margin: 0 auto;
  .hotSongs {
    text-align: center;
    color: @color;
    font-size: @sizexs;
    margin: 10px auto;
    font-weight: bolder;
  }
}
</style>
