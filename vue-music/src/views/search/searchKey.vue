<template>
  <div id="searchKey">
    <loading class="loading" v-show="!songs.length && model"></loading>
    <transition name="singer" appear>
      <div v-show="singers.length">
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
    <pullingUp ref="pu" :data="songs" :isPull="isPull" @pullingUp="pullingUp">
      <transition name="song" appear>
        <ul class="song" v-show="songs.length">
          <li
            v-for="(item, key) of songs"
            :key="key"
            @click="selectItem(item, key)"
          >
            {{ item.title }}---{{ item.name }}
            <span class="span" v-show="!item.audioUrl">(无版权)</span>
            <i
              v-show="item.audioUrl"
              class="iconfont iconshoucang"
              :class="{ red: colorRed(item, MINE_collect) }"
              @click.stop="setCollect(item)"
            ></i>
            <span
              v-show="item.audioUrl"
              :class="{ red: colorRed(item, MINE_songList) }"
              @click.stop="setSongList(item)"
              >+</span
            >
          </li>
          <li class="li" v-show="isPull">加载数据中...</li>
        </ul>
      </transition>
    </pullingUp>
  </div>
</template>

<script>
import Loading from "components/loading";
import pullingUp from "components/pullingUp";
import getSearchKey from "api/search/searchKey";
import getSongDetail from "assets/js/getSingerDetail";
import getAudioApi from "api/player/audio.js";
import getLyricApi from "api/player/lyric";
import { mapState, mapMutations, mapActions } from "vuex";
import saveSearch from "assets/js/saveHistory";
import storage from "good-storage";

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
      page: 1,
      isPull: false,
      timer: null,
    };
  },
  computed: {
    ...mapState(["MINE_collect", "MINE_songList"]),
    colorRed() {
      return (song, type) => {
        if (
          type.some((item) => {
            return item.mid === song.mid;
          })
        )
          return true;
        else return false;
      };
    },
  },
  methods: {
    ...mapMutations([
      "setSinger",
      "setPlayList",
      "setHIS_search",
      "setMINE_collect",
      "setMINE_songList",
    ]),
    ...mapActions(["playerGo"]),
    setSongList(song) {
      const songList = saveSearch(
        "songList",
        song,
        (item) => item.audioUrl === song.audioUrl
      );
      this.setMINE_songList(songList);
    },
    setCollect(song) {
      const collect = this.MINE_collect;
      let key = -1;
      if (
        collect.some((item, index) => {
          if (item.mid === song.mid) key = index;
          return item.mid === song.mid;
        })
      ) {
        if (key > -1) collect.splice(key, 1);
      } else collect.unshift(song);
      storage.set("collect", collect);
      this.setMINE_collect(collect);
    },
    pullingUp() {
      this.page++;
      this.isPull = true;
      getSearchKey(this.model, this.page).then(async (res) => {
        const keyword = res.data.data.keyword;
        res = getSongDetail(res.data.data.song.list);
        await Promise.all([this._getAudioApi(res), this._getLyricApi(res)]);
        if (keyword === this.model) this.songs.push(...res);
        this.isPull = false;
      });
    },
    selectSinger(item) {
      saveSearch("search", this.model, (item) => item === this.model, 9);
      this.$router.push({ path: `/search/${item.singerMID}` });
      this.setSinger(item);
    },
    selectItem(item, key) {
      this.setPlayList([]);
      saveSearch("search", this.model, (item) => item === this.model, 9);
      this.setSinger("来自搜索");
      this.playerGo({
        song: item,
        index: key,
      });
      this.setHIS_search(storage.get("search", []));
    },
    async _getAudioApi(newV) {
      await getAudioApi(newV).then((res) => {
        res.forEach((item, key) => {
          newV[key].audioUrl = item.data.req_0.data.midurlinfo[0].purl;
        });
      });
    },
    async _getLyricApi(newV) {
      await getLyricApi(newV).then((res) => {
        res.forEach((item, key) => {
          newV[key].lyric = item.data.data.lyric;
        });
      });
    },
    _getSearchKey(newV) {
      getSearchKey(newV).then(async (res) => {
        if (res.data.data.zhida.type === 1)
          this.singers = [res.data.data.zhida.zhida_singer];
        res = getSongDetail(res.data.data.song.list);
        await Promise.all([this._getAudioApi(res), this._getLyricApi(res)]);
        if (newV === this.model) this.songs = res;
      });
    },
  },
  watch: {
    model(newV) {
      this.page = 1;
      this.singers = [];
      this.songs = [];
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        if (newV) this._getSearchKey(newV);
      }, 1000);
    },
  },
  components: {
    Loading,
    pullingUp,
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
    .li {
      margin: 0 auto;
      padding: 0;
      color: @color;
      text-align: center;
    }
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
      .span,
      i {
        position: absolute;
        right: 12px;
        font-size: 16px;
        &.red {
          color: rgba(255, 187, 0, 0.6);
        }
      }
      .span {
        color: @color;
        font-size: 11px;
      }
      i {
        right: 38px;
        &.red {
          color: rgba(255, 187, 0, 0.6);
        }
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