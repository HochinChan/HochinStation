<script setup lang="ts">
import { reactive } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

interface NavItem {
  name: string;
  label: string;
}
const navs: NavItem[] = [
  {
    name: "home",
    label: "推荐",
  },
];
const publishPopover = reactive({ show: false, list: [] });
</script>
<template>
  <div class="header">
    <div class="left">
      <nav :class="{ 'nav-active': route.name == item.name }" v-for="(item, i) in navs" :key="i">{{ item.label }}</nav>
    </div>
    <div class="publish" @mouseover="publishPopover.show = true" @mouseleave="publishPopover.show = false">
      <div class="publish-button">发布</div>
      <Transition name="publish-popover">
        <div class="publish-popover" v-if="publishPopover.show">
          <ul>
            <li v-for="(item, i) in publishPopover.list" :key="i"></li>
          </ul>
        </div>
      </Transition>
    </div>
    <div class="right"></div>
  </div>
</template>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 80px;
  top: 0;
  position: sticky;
  box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-around;
  .left {
    display: flex;
    nav {
      font-size: 16px;
      padding: 0 20px;
      box-sizing: border-box;
      user-select: none;
      cursor: pointer;
    }
    .nav-active {
      color: @theme-color;
    }
  }
  .publish {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    .publish-button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      cursor: pointer;
      color: #fff;
      font-weight: bold;
      display: flex;
      user-select: none;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      background-color: @theme-color;
    }
    .publish-popover {
      position: absolute;
      top: 100%;
      @border-color: transparent;
      ul {
        margin-top: 12px;
        height: 50px;
        width: 180px;
        border-radius: 10px;
        background-color: #fff;
        display: flex;
        align-items: center;
        flex-direction: column;
        position: relative;
        box-shadow: 0 0 4px 1px #ccc;
        &::before {
          content: "";
          top: 0;
          border-top: 0;
          position: absolute;
          transform: translateY(-100%);
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 10px solid #fff;
          filter: drop-shadow(0px -2px 1px #ccc);
        }
      }
    }
    .publish-popover-enter-active {
      transition-duration: 0.3s;
      transform-origin: center 0px;
    }
    .publish-popover-enter-from {
      transform: scale(0);
    }
    .publish-popover-enter-to {
      transform: scale(1);
    }
  }
}
</style>
