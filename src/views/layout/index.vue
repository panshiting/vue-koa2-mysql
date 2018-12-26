<template>
  <div class="contain">
    <div class="slider">
      <side-menu></side-menu>
    </div>
    <div class="main">
      <div class="main-head">
        <div class="main-head-warp">
          <el-button class="out-btn" type="text" @click="handleOut">退出</el-button>
        </div>
      </div>
      <div style="padding: 20px">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu'
export default {
  name: 'index',
  components: {
    SideMenu
  },
  data () {
    return {}
  },
  created () {},
  methods: {
    handleOut () {
      localStorage.clear()
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/mixin";
  .contain {
    position: relative;
    width: 100%;
    height: 100%;
    .slider {
      width: 200px;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      .el-menu {
        height: 100%;
      }
    }
    .main {
      height: 100%;
      min-width: 1060px;
      margin-left: 200px;
      position: relative;
      .main-head {
        height: 60px;
        .main-head-warp {
          @include clearfix;
          position: fixed;
          left: 200px;
          right: 0;
          top: 0;
          height: 60px;
          background: #fff;
          box-shadow: -2px 5px 11px 1px rgba(50, 95, 155, 0.1);
          z-index: 99;
          .out-btn {
            float: right;
            line-height: 60px;
            margin-right: 50px;
          }
          .el-button {
            padding: 0;
          }
        }
      }
    }
  }
</style>
