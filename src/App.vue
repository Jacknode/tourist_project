<template>
  <div id="app">
    <loading v-show="loadingShow"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'app',
    computed:mapGetters([
      'loadingShow'
    ]),
  }
</script>

<style lang="scss">
  *{margin: 0;padding: 0}
  .login-container[data-v-ef68022e]{
    margin: 0 auto !important;
  }


  #app {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }

  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .toolbar {
    background: #f2f2f2;
    padding: 10px;
  //border:1px solid #dfe6ec;
    margin: 10px 0;
  .el-form-item {
    margin-bottom: 10px;
  }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>

