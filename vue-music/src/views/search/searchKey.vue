<template>
  <div id="searchKey">
    <transition name="singer" appear>
      <div v-show="singers.length">
        <div class="singer" v-for="(item, key) of singers" :key="key">
          <div class="singerImg">
            <img v-lazy="item.pic" alt="" />
          </div>
          <p>{{ item.name }}</p>
          <p>(歌手)</p>
        </div>
      </div>
    </transition>
    <transition name="song" appear>
      <ul v-show="songs.length" class="song">
        <li v-for="(item, key) of songs" :key="key" @click="selectItem(item)">
          {{ item.name }}---{{ item.singer }}
          <i class="iconfont iconshoucang"></i>
          <span>+</span>
        </li>
      </ul></transition
    >
  </div>
</template>

<script>
import Loading from "components/loading";
export default {
  props: {
    singers: {
      type: Array,
      default() {
        return [];
      },
    },
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    selectItem(item) {
      
    },
  },
  components: {
    Loading,
  },
};
</script>

<style lang='less' scoped>
#searchKey {
  width: 97%;
  border-radius: 0 0 6px 6px;
  background-color: #252525;
  .singer {
    padding: 5px;
    display: flex;
    justify-content: start;
    align-items: center;
    border-top: 1px solid #575353a0;
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
    color: @color1;
    li {
      padding-left: 17px;
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
    transition: all 1s;
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