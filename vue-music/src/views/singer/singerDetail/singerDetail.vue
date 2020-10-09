<template>
  <detail
    id="singerDtail"
    v-if="songList.length"
    :img="singerImg"
    :songList="songList"
  ></detail>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import singerDetailApi from "api/singer/singerDetail";
import getSongList from "assets/js/getSingerDetail";
import Detail from "components/detail";
import getAudioApi from "api/player/audio.js";
export default {
  data() {
    return {
      songList: [],
    };
  },
  computed: {
    ...mapState(["singer", "playList"]),
    ...mapState({ singer: "singer", playList: "playList" }),
    singerImg() {
      return this.singer.singer_pic;
    },
  },
  created() {
    this._getDetailApi();
  },
  methods: {
    ...mapMutations(["setSinger", "setPlayList", "setPlayListUrl"]),
    ...mapMutations({
      setSinger: "setSinger",
      setPlayList: "setPlayList",
      setPlayListUrl: "setPlayListUrl",
    }),
    _getDetailApi() {
      singerDetailApi(this.singer.singer_mid).then((res) => {
        this.songList = getSongList(res.data.singerSongList.data.songList);
      });
    },
    _getAudioApi(newV) {
      getAudioApi(newV).then((res) => {
        this.setPlayListUrl(
          res.map((item) => {
            return item.data.req_0.data.midurlinfo[0].purl
          })
        );
      });
    },
  },
  components: {
    Detail,
  },
  watch: {
    songList(newV) {
      this.setPlayList(newV);
      this._getAudioApi(newV);
    },
  },
};
</script>

<style lang='less' scoped>
</style>