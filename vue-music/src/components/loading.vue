<template>
  <div class="loading">
    <img src="~assets/image/loading/loading.gif" alt />
    <p>稍后，加载中...</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.loading {
  padding-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  img {
    width: 25px;
    margin-right: 10px;
  }
}
</style>