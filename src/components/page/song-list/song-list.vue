<template>
    <div class="song-list">
        <ul>
            <li v-for="(song,index) in songs" class="item" :key="index" @click="selectItem(song,index)">
                <div class="content">
                    <h2 class="name ellipsis">{{song.name}}</h2>
                    <p class="desc ellipsis">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: []
    }
  },
  methods: {
    getDesc(song) {
      return `${song.singer}.${song.album}`;
    },
    selectItem(item, index) {
      this.$emit(item, index);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 3rem;
    font-size: $font-size-small-s;
    .content {
      flex: 1;
      line-height: 1rem;
      overflow: hidden;
      .name {
        color: $color-text;
      }
      .desc {
        margin-top: 0.1rem;
        color: $color-text-d;
      }
    }
  }
}
</style>

