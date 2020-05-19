<template>
  <div v-title="pageTitle" id="app">
    <div class="smile">:(</div>
    <div class="tip">找不到页面</div>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
  
</template>

<script>
import { Button } from 'vant';

export default {
  components: {
    [Button.name]: Button
  },
  name: "app",
  data() {
    return {
      pageTitle: '404',
      checked: true
    }
  },
  created() {
  },
  methods: {
  }
};
</script>

<style lang="scss">

#app {
  padding: 50px 20px;
  text-align: center;
  font-size: 14px;
  line-height: normal;
}
.smile {
  font-size: 40px; 
  font-weight: bold;
  margin: 10px 0
}
.tip {
  font-size: 16px; 
  margin: 10px 0
}

</style>
