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
export default {
  data() {
    return {
      songList: [],
    };
  },
  computed: {
    ...mapState(["singer"]),
    ...mapState({ singer: "singer" }),
    singerImg() {
      return this.singer.singer_pic;
    },
  },
  created() {
    this._getDetailApi();
    console.log(this.singer);
  },
  methods: {
    ...mapMutations(["setSinger"]),
    ...mapMutations({ setSinger: "setSinger" }),
    _getDetailApi() {
      singerDetailApi(this.singer.singer_mid).then((res) => {
        this.songList = getSongList(res.data.singerSongList.data.songList);
        console.log(res);
      });
    },
  },
  components: {
    Detail,
  },
};
</script>

<style lang='less' scoped>

</style>