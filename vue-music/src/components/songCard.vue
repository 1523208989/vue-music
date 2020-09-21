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

<style lang="less">
.songCard {
  width: 94%;
  background-color: rgba(19, 17, 17, 0.411);
  border-radius: 8px;
  display: flex;
  border-bottom: 1px solid rgb(80, 80, 80);
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
    font-size: @sizexs;
    p{
      &:first-child{
        font-weight: bolder;
        color: rgb(80, 120, 80);
      }
    }
  }
}
</style>