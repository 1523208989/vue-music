<template>
  <div id="searchKey">
    <loading class="loading" v-show="stateSetPl !== 2 && model"></loading>
    <transition name="singer" appear>
      <div v-show="singers.length && model">
        <div
          class="singer"
          v-for="(item, key) of singers"
          :key="key"
          @click="selectSinger(item)"
        >
          <div class="singerImg">
            <img v-lazy="item.singerPic" alt="" />
          </div>
          <p>{{ item.singerName }}</p>
          <p>(歌手)</p>
        </div>
      </div>
    </transition>
    <scroll :data="stateSetPl">
      <transition name="song" appear>
        <ul class="song" v-show="stateSetPl === 2 && model">
          <li
            v-for="(item, key) of songs"
            :key="key"
            @click="selectItem(item, key)"
          >
            {{ item.title }}---{{ item.name }}
            <i class="iconfont iconshoucang"></i>
            <span>+</span>
          </li>
        </ul>
      </transition>
    </scroll>
  </div>
</template>

<script>
import Loading from "components/loading";
import Scroll from "components/scroll";
import getSearchKey from "api/search/searchKey";
import getSongDetail from "assets/js/getSingerDetail";
import getAudioApi from "api/player/audio.js";
import getLyricApi from "api/player/lyric";
import { mapMutations, mapActions } from "vuex";

export default {
  props: {
    model: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      singers: [],
      songs: [],
      stateSetPl: 0,
    };
  },
  methods: {
    ...mapMutations(["setSinger", "setPlayList", "setMinPlayer"]),
    ...mapMutations({
      setSinger: "setSinger",
      setPlayList: "setPlayList",
      setMinPlayer: "setMinPlayer",
    }),
    ...mapActions(["playerGo"]),
    ...mapActions({ playerGo: "playerGo" }),
    selectSinger(item) {
      this.$router.push({ path: `/singer/${item.singerMID}` });
      this.setSinger(item);
    },
    selectItem(item, key) {
      this.setSinger("来自搜索");
      this.playerGo({
        song: item,
        index: key,
      });
    },
    _getAudioApi(newV) {
      getAudioApi(newV).then((res) => {
        res.forEach((item, key) => {
          newV[key].audioUrl = item.data.req_0.data.midurlinfo[0].purl;
        });
        this.stateSetPl++;
      });
    },
    _getLyricApi(newV) {
      getLyricApi(newV).then((res) => {
        res.forEach((item, key) => {
          newV[key].lyric = item.data.data.lyric;
        });
        this.stateSetPl++;
      });
    },
  },
  watch: {
    model(newV) {
      this.singers = [];
      this.stateSetPl = 0;
      if (newV)
        getSearchKey(newV).then((res) => {
          if (res.data.data.zhida.type === 1)
            this.singers = [res.data.data.zhida.zhida_singer];
          this.songs = getSongDetail(res.data.data.song.list);
        });
    },
    songs(newV) {
      this._getAudioApi(newV);
      this._getLyricApi(newV);
    },
  },
  components: {
    Scroll,
    Loading,
  },
};
</script>

<style lang='less' scoped>
#searchKey {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 97%;
  overflow: hidden;
  border-radius: 0 0 6px 6px;
  .loading {
    position: fixed;
    width: 100%;
    top: 40%;
  }
  .singer {
    padding: 5px;
    display: flex;
    justify-content: start;
    align-items: center;
    border-top: 1px solid #575353a0;
    background-color: #202020c4;
    p {
      font-size: 13px;
      color: @color1;
      &:last-child {
        margin-left: 10px;
        font-size: 11px;
        color: @color;
      }
    }
    .singerImg {
      width: 40px;
      height: 40px;
      margin: 0 12px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
  .song {
    background-color: #202020c4;
    color: @color1;
    li {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 60px 0 17px;
      position: relative;
      line-height: 38px;
      font-size: 13px;
      list-style-type: none;
      border-top: 1px solid #575353a0;
      span,
      i {
        position: absolute;
        right: 12px;
        font-size: 16px;
      }
      i {
        right: 38px;
      }
    }
  }
  .singer-enter,
  .singer-leave-to {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }
  .singer-enter-active,
  .singer-leave-active {
    transition: all 2s;
  }
  .song-enter,
  .song-leave-to {
    transform: translate3d(-100%, 0, 0);
    opacity: 0;
  }
  .song-enter-active,
  .song-leave-active {
    transition: all 1s;
  }
}
</style>