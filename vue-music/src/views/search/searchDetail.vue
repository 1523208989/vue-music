<template>
  <detail :img="singer.singerPic" :songList="songList"></detail>
</template>

<script>
import Detail from "components/detail";
import singerDetailApi from "api/singer/singerDetail";
import getSongList from "assets/js/getSingerDetail";
import { mapState } from "vuex";
export default {
  data() {
    return {
      songList: [],
    };
  },
  created() {
    this._getDetailApi();
  },
  computed: {
    ...mapState(["singer"]),
    ...mapState({ singer: "singer" }),
  },
  methods: {
    _getDetailApi() {
      singerDetailApi(this.singer.singerMID).then((res) => {
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