<template>
  <transition appear name="detail"
    ><!-- transition不加appear会导致enter-active动画失效 -->
    <div id="singerDetail"></div>
  </transition>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import singerDetailApi from "api/singer/singerDetail";
export default {
  data() {
    return {
      songList: [],
    };
  },
  computed: {
    ...mapState(["singer"]),
    ...mapState({ singer: "singer" }),
    ...mapGetters(["singer"]),
    ...mapGetters({
      getSinger: "singer",
    }),
  },
  created() {
    console.log(this.singer);
    this._getDetailApi();
  },
  methods: {
    _getDetailApi() {
      singerDetailApi(this.singer.singer_mid).then((res) => {
        this.songList = res.data.singerSongList.data.songList;
        console.log(this.songList);
      });
    },
  },
};
</script>

<style lang='less' scoped>
#singerDetail {
  background: rgb(51, 47, 47);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}
.detail-leave-active,
.detail-enter-active {
  transition: all 0.5s;
}

.detail-enter ,.detail-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100%);
}
</style>