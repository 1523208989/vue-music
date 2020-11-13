<template>
  <detail
    id="singerDetail"
    :img="singer.picUrl"
    :title="singer.label"
    :songList="songList"
  >
  </detail>
</template>

<script>
import Detail from "components/detail";
import { mapState } from "vuex";
import getRankDetail from "api/ranking/rankingDetail";
import getSongList from "assets/js/getRankingDetail";
export default {
  data() {
    return {
      songList: [],
    };
  },
  computed: {
    ...mapState(["singer"]),
  },
  created() {
    this._getRankDetail();
  },
  methods: {
    _getRankDetail() {
      getRankDetail(this.singer.topId).then((res) => {
        res = res.data.data.list;
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