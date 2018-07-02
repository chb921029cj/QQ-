<template>
    <div class="singer">
        <list :data="singers" @select="selectSinger"></list>
        <router-view></router-view>
    </div>
</template>

<script>
import List from "@/components/common/listview/listview";
import { getSingerList } from "@/api/singer";
import { ERR_OK } from "@/api/config";
import Singe from "@/api/singe";
const HOT_NAME = "热门";
const HOT_SINGER_LEN = "10";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingerList();
  },
  mounted() {},
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
    _getSingerList() {
      getSingerList()
        .then(res => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list);
          }
        })
        .catch();
    },
    //规范化传入的数据
    _normalizeSinger(list) {
      //分为两类数据 1.热门 2.安装名字选择的数据
      let map = {
        hot: { title: HOT_NAME, items: [] }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singe({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            })
          );
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singe({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          })
        );
      });
      //为了得到有序的列表需要处理map
      let hot = [];
      let ret = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      //按字母排序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      console.log(hot, ret);
      return hot.concat(ret);
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    })
  },
  components: {
    List
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.singer {
  position: fixed;
  top: 4rem;
  bottom: 0;
  width: 100%;
}
</style>
