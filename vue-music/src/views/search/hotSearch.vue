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
    </div>
  </transition>
</template>

<script>
import hotSearchApi from "api/search/hotSearch";
export default {
  data() {
    return {
      hotList: [],
    };
  },
  created() {
    this._getHotSearch();
  },
  methods: {
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
  },
};
</script>

<style lang='less' scoped>
#hotSearch {
  width: 100%;
  padding: 10px;
  .hotP {
    margin: 0 10px 10px;
    font-size: 15px;
    color: @color;
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
    }
  }

}  .hot-enter,
  .hot-leave-to {
    opacity: 0;
    transform: translate3d(100%,0,0);
  }
  .hot-enter-active,
  .hot-leave-active {
    transition: all 1s;
  }
</style>