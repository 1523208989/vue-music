<template>
  <div id="mine">
    <div class="mine">
      <div class="nav">
        <p :class="{ navB: navB === 1 }" @click="navB = 1">我的歌单</p>
        <p :class="{ navB: navB === 2 }" @click="navB = 2">我的收藏</p>
        <p :class="{ navB: navB === 3 }" @click="navB = 3">最近播放</p>
      </div>
      <p v-show="songList.length" class="clear">
        按下就清空，三思三思<i class="iconfont iconshanchu"></i>
      </p>
      <p v-show="!songList.length" class="clear">暂无歌曲</p>
      <scroll :data="songList" ref="scroll">
        <ul class="song" v-show="songList.length">
          <li
            v-for="(item, key) of songList"
            :key="key"
            @click="selectItem(item, key)"
          >
            {{ item.title }}---{{ item.name }}
            <i
              v-show="navB === 2"
              class="iconfont iconshanchu"
              @click.stop="setCollect(item)"
            ></i>
            <i
              v-show="navB !== 2"
              class="iconfont iconshoucang"
              :class="{ red: colorRed(item) }"
              @click.stop="setCollect(item)"
            ></i>
            <span v-show="navB !== 1">+</span>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from "components/scroll";
import storage from "good-storage";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      navB: 1,
      show: true,
    };
  },
  computed: {
    ...mapState(["MINE_collect", "MINE_songList", "MINE_history"]),
    songList() {
      if (this.navB === 1) return this.MINE_songList;
      if (this.navB === 2) return this.MINE_collect;
      if (this.navB === 3) return this.MINE_history;
    },
    colorRed() {
      return (song) => {
        if (
          this.MINE_collect.some((item) => {
            return item.mid === song.mid;
          })
        )
          return true;
        else return false;
      };
    },
  },
  methods: {
    ...mapMutations(["setSinger", "setHIS_search", "setMINE_collect"]),
    ...mapActions(["playerGo"]),
    selectItem(item, key) {
      this.playerGo({
        song: item,
        index: key,
      });
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
  },
  components: {
    Scroll,
  },
};
</script>

<style lang='less' scoped>
#mine {
  position: fixed;
  top: 0;
  bottom: 65px;
  left: 0;
  right: 0;
  background-color: #000000a0;
  z-index: -1;
  .mine {
    background-color: @color2;
    position: absolute;
    top: 15%;
    bottom: 0;
    width: 90%;
    margin: 0 5%;
    display: flex;
    flex-direction: column;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    .nav {
      width: 100%;
      display: flex;
      padding-top: 5px;
      justify-content: space-around;
      align-items: center;
      background-color: @color3;
      p {
        font-size: 14px;
        color: @color;
        padding: 8px 0;
        margin-bottom: 6px;
        border: none;
        border-top: solid 2px transparent;
        border-bottom: solid 2px transparent;
        &.navB {
          border-bottom: 2px solid @color;
        }
      }
      .down {
        width: 30px;
      }
    }
    .clear {
      font-size: 14px;
      color: @color;
      padding: 6px;
      position: relative;
      text-align: center;
      i {
        position: absolute;
        right: 30px;
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
  }
}
</style>