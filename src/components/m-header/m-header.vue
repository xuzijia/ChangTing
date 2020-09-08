<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">到点了,网抑云le</h1>
  </div>
</template>

<script type="text/ecmascript-6">
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 32px
      height: 32px
      margin-right: 5px
      bg-image('cloud')
      background-size: 30px 32px
    .text
      display: inline-block
      vertical-align: top
      line-height: 45px
      font-size:$font-size-medium-x
      color: $color-sub-theme
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>
