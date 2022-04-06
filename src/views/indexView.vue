<template>
  <div>
    <div class="btns">
      <button @click="selectiveGame = 1">猜{{ $t('index.img') }}</button>
      <button @click="selectiveGame = 2">猜歌名</button>
      <button @click="selectiveGame = 3">知识问答</button>
    </div>
    <p>{{ $t('index.img') }}</p>
    <p>{{ $t('index.test') }}</p>
    <button @click="switchZh('zh')">切换中文</button>
    <button @click="switchZh('en')">切换英文</button>
    <LuckyDraw
      :selectiveGame="selectiveGame"
      @packUpHandle="packUpHandle"
    ></LuckyDraw>
  </div>
</template>

<script>
import LuckyDraw from '../components/LuckyDraw.vue';
export default {
  components: {
    LuckyDraw,
  },
  data() {
    return {
      selectiveGame: 0,
    };
  },
  methods: {
    packUpHandle(index) {
      this.selectiveGame = index;
    },
    switchZh(val) {
      this.$i18n.locale = val;
    },
  },
  mounted() {
    console.log(this.$t('index'));
  },
};
</script>

<style lang="less" scoped>
.btns {
  button {
    margin-right: 20px;
  }
}
</style>>