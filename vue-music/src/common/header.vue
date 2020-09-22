<template>
  <div id="header">
    <div class="HLeft"></div>
    <div class="HMiddle">
      <img src="~assets/image/logo/logo.png" alt />
      <i>Vue Music</i>
    </div>
    <div class="HRight"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less'>
#header {
  width: 100%;
  height: @headerHeight;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .HLeft,
  .HRight {
    flex: 1;
  }
  .HMiddle {
    width: 140px;
    padding-right: 10px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    font-weight: bolder;
    color: @color;
    font-size: @sizem;
    img {
      width: 35px;
    }
  }
}
</style>