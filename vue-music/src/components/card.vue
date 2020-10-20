<template>
  <div class="songCard">
    <div class="songImg">
      <slot name="img"></slot>
    </div>
    <div class="songContent">
      <slot name="title"></slot>
      <slot name="author"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.songCard {
  width: 97%;
  background-color: @color3;
  border-radius: 8px;
  display: flex;
  margin: 0 auto;
  border-bottom: 1px solid @color2;
  padding: 9px;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  .songImg {
    width: @cardwidth;
    border-radius: 4px;
    overflow: hidden;
    margin-right: 12px;
    line-height: 0;
    img {
      width: 100%;
    }
  }
  .songContent {
    height: @cardwidth;
    width: calc(100% - 90px);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: @sizexxs;
    p {
      &:first-child {
        font-size: @sizexs;
        color: @color1;
      }
      &:last-child {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>