<template>
  <transition name="hot" appear>
    <div id="hotSearch">
      <p class="hotP">热门搜索</p>
      <ul>
        <li
          v-for="(item, key) of hotList"
          :key="key"
          @click="selectItem(item.k)"
        >
          {{ item.k }}
        </li>
      </ul>
      <p v-show="HIS_search.length" class="hotP">
        历史搜素<i         
          class="iconfont iconshanchu clear"
          @click="isShow = true"
        ></i>
      </p>
      <ul>
        <li
          v-for="(item, key) of HIS_search"
          :key="key"
          @click="selectItem(item)"
        >
          {{ item }}
          <span class="delete" @click.stop="deleteItem(key)">x</span>
        </li>
      </ul>
      <div v-show="isShow" class="isClear">
        <div>
          <p>你确定要清空历史搜索吗?</p>
          <span @click="clear">确定</span>
          <span @click="isShow = false">取消</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import hotSearchApi from "api/search/hotSearch";
import storage from "good-storage";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      hotList: [],
      isShow: false,
    };
  },
  created() {
    this._getHotSearch();
  },
  computed: {
    ...mapState(["HIS_search"]),
  },
  methods: {
    ...mapMutations(["setHIS_search"]),
    _getHotSearch() {
      hotSearchApi().then((res) => {
        res = res.data.data;
        if (res.length > 10) this.hotList = res.slice(0, 10);
        else this.hotList = res;
      });
    },
    selectItem(item) {
      this.$parent.$refs.searchBox.model = item;
    },
    deleteItem(key) {
      this.HIS_search.splice(key, 1);
      storage.set("search", this.HIS_search);
      this.setHIS_search(this.HIS_search);
    },
    clear() {
      this.HIS_search.length = 0;
      this.setHIS_search(this.HIS_search);
      storage.set("search", this.HIS_search);
      this.isShow = false;
    },
  },
};
</script>

<style lang='less' scoped>
#hotSearch {
  width: 100%;
  padding: 0 10px 10px;
  .isClear {
    background-color: #000000a0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    div {
      width: 60vw;
      position: absolute;
      top: 50%;
      left: 50%;
      padding-bottom: 10px;
      border-radius: 6px;
      transform: translate(-50%, -50%);
      background-color: #fff;
      text-align: center;
      p {
        padding: 15px 30px 20px;
        margin-bottom: 10px;
        border-bottom: 1px solid rgb(129, 93, 93);
        font-weight: bolder;
      }
      span {
        padding: 0 10vw;
        &:last-child {
          border-left: 1px solid #000;
        }
      }
    }
  }
  .hotP {
    margin: 10px 10px;
    font-size: 15px;
    color: @color;
    position: relative;
    .clear {
      position: absolute;
      right: 30px;
    }
  }
  ul {
    font-size: 13px;
    color: @color1;
    li {
      padding: 0 10px;
      margin: 3px 10px;
      background-color: @color3;
      border-radius: 12px;
      display: inline-block;
      list-style-type: none;
      line-height: 30px;
      span {
        margin-left: 10px;
      }
    }
  }
}
.hot-enter,
.hot-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.hot-enter-active,
.hot-leave-active {
  transition: all 1s;
}
</style>