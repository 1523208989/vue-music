<template>
  <div id="navBar">
    <router-link
      v-for="(item, key) of menu"
      :key="key"
      :to="item.path"
      tag="div"
    >
      <div :class="{ path: $route.path.includes(item.path) }">
        <p>{{ item.a }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        { a: "推荐", path: "/home" },
        { a: "歌手", path: "/singer" },
        { a: "排行", path: "/rangking" },
        { a: "搜索", path: "/search" },
      ],
    };
  },
};
</script>

<style lang='less' scoped>
#navBar {
  width: 100%;
  padding-bottom: 4px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: @sizexs;
  color: @color1;
  height: @navBarHeight;
  line-height: 28px;
  background-color: @color2;
  box-sizing: content-box;
  z-index: 9;
  .path {
    color: @color;
    border-top: solid 2px transparent;
    border-bottom: 2px solid @color;
  }
}
</style>