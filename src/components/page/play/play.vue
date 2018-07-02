<template>
    <div class="player">
        <div class="mormal-player" v-show="fullScreen">
            播放器
        </div>
        <div class="mini-player" v-show="!fullScreen">

        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["fullScreen", "playList"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.play {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>
