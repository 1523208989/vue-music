<template>
  <div id="navBar">
    <router-link v-for="(item,key) of menu" :key="key" :to="item.path" tag="div">
      <div :class="{'path':$route.path.includes(item.path)}">
        <p>{{item.a}}</p>
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

<style lang='less'>
#navBar {
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: @sizexxs;
  color: @color1;
}
</style>