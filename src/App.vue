<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
<router-view/>
    </keep-alive>
    
    <play></play>
  </div>
</template>

<script>
import Play from "@/components/page/play/play";
import MHeader from "@/components/page/m-header/m-header";
import Tab from "@/components/page/tab/tab";
export default {
  components: {
    MHeader,
    Tab,
    Play,
  },
  created() {
  }
};
</script>

<style lang="scss" scoped>
</style>
