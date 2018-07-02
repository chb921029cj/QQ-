<template>
    <div class="m-header">
        <div class="icon"></div>
        <h1 class="text">chb music app</h1>

    </div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.m-header {
  position: relative;
  @include wh(100%, 1.95rem);
  text-align: center;
  color: $color-theme;
  font-size: 0;
  .icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 0.2rem;
    @include wh(1.4rem, 1.4rem);
    margin-right: 0.4rem;
    @include bis("../../../assets/image/img.jpg");
    // background-image: url();
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
  }

  .text {
    display: inline-block;
    vertical-align: top;
    @include font($font-size-large, 1.95rem);
    color: $color-theme;
    font-weight: bold;
  }

  .mine {
    position: absolute;
    top: 0;
    right: 0;

    .icon-mine {
      display: block;
      padding: 12px;
      font-size: 20px;
      color: $color-theme;
    }
  }
}
</style>
