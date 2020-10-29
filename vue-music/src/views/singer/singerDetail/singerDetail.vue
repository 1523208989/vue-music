<template>
  <detail
    id="singerDetail"
    v-if='songList.length'
    :img="singerImg"
    :songList="songList"
  ></detail>
</template>

<script>
import { mapState } from "vuex";
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
    ...mapState({ singer: "singer"}),
    singerImg() {
      return this.singer.singer_pic;
    },
  },
  created() {
    this._getDetailApi();
  },
  methods: {
    _getDetailApi() {
      singerDetailApi(this.singer.singer_mid).then((res) => {
        console.log(res.data.data.list);
        this.songList = getSongList(res.data.data.list);
      });
    },
  },
  components: {
    Detail,
  },
};
</script>

<style>
</style>