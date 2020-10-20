<template>
  <detail
    id="songListDetail"
    v-if="songList.length"
    :img="singer.imgurl"
    :songList="songList"
  ></detail>
</template>

<script>
import { mapState } from "vuex";
import Detail from "components/detail";
import getSongList from "api/home/songListDetail";
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
    ...mapState({ singer: "singer" }),
  },
  methods: {
    _getSongList() {
      getSongList(this.singer.dissid).then((res) => {
        this.songList = res;
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