<template>
  <div class="searchBox">
    <i class="iconfont iconsousuo"></i>
    <input
      class="searchIpt"
      type="text"
      v-model="model"
      :placeholder="placeholder"
    />
    <i v-show="model" class="iconfont iconx" @click="clear"></i>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "搜索歌手/歌曲",
    },
  },
  data() {
    return {
      model: "",
    };
  },
  methods: {
    clear() {
      this.model = "";
    },
  },
  watch: {
    model(newV) {
      this.$emit("getModel", newV);
    },
  },
};
</script>

<style lang='less' scoped>
.searchBox {
  width: 97%;
  padding: 10px 2px;
  border-radius: 6px 6px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  background-color: @color3;
  .searchIpt {
    flex: 1;
    border: none;
   
    outline: none;
    background-color: transparent;
    color: @color;
  }
  i {
    margin: 0 8px;
    &:first-child {
      font-size: 20px;
    }
  }
}
</style>