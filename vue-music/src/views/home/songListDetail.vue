<template>
  <detail
    id="songListDetail"
    :img="singer.imgurl"
    :songList="songList"
    :title="singer.dissname"
  ></detail>
</template>

<script>
import { mapState } from "vuex";
import Detail from "components/detail";
import songListDetailApi from "api/home/songListDetail";
import getSongList from "assets/js/getSongListDetail";
export default {
  data() {
    return {
      songList: [],
    };
  },
  created() {
    this._getSongList();
  },
  computed: {
    ...mapState(["singer"]),
  },
  methods: {
    _getSongList() {
      songListDetailApi(this.singer.dissid).then((res) => {
        res = res.data.data.songlist;
        if (res.length > 66) this.songList = getSongList(res.slice(0, 66));
        else this.songList = getSongList(res);
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