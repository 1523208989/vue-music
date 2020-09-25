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
  width: 94%;
  background-color: @color3;
  border-radius: 8px;
  display: flex;
  border-bottom: 1px solid rgba(70, 70, 70, 0.7) ;
  margin: 0 auto;
  padding: 10px;
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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: @sizexxs;
    p{
      &:first-child{
        font-size: @sizexs;
        font-weight: bolder;
        color: #ffffff75;
      }
    }
  }
}
</style>