<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabclick="tabclick"
      ref="tabcontrol1"
      class="tabcontrol"
      v-show="istabbfixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="backtopclick"
      :pull-up-load="true"
      @pullingUp="LoadMore"
    >
      <home-swiper :banners="banners" @swiperimgload="swiperimgload" />
      <home-recommend :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabclick="tabclick"
        ref="tabcontrol2" />
      <goods-list :goods="showtype"
    /></scroll>

    <back-top @click.native="topclick" v-show="isshow"></back-top>
  </div>
</template>

<script>
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/debounce.js";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/contents//tabControl/TabControl";

import GoodsList from "components/contents/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/contents/backtop/BackTop";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      goodstype: "pop",
      isshow: false,
      taboffsettop: 0,
      istabbfixed: false,
      savey: 0,
    };
  },
  computed: {
    showtype() {
      return this.goods[this.goodstype].list;
    },
  },
  // Home离开时记录状态和位置
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.savey, 0);
  },
  deactivated() {
    this.savey = this.$refs.scroll.getsavey();
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 请求首页商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听图片加载完成事件
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("imgitemload", () => {
      // this.$refs.scroll.refresh();
      refresh();
    });
  },
  methods: {
    swiperimgload() {
      this.taboffsettop = this.$refs.tabcontrol2.$el.offsetTop;
    },
    // 事件监听的相关方法
    tabclick(index) {
      switch (index) {
        case 0:
          this.goodstype = "pop";
          break;
        case 1:
          this.goodstype = "new";
          break;
        case 2:
          this.goodstype = "sell";
          break;
      }
      this.$refs.tabcontrol1.tabindex = index;
      this.$refs.tabcontrol2.tabindex = index;
    },

    topclick() {
      // this.$refs.scroll.scroll.scrollTo(0, 0, 300);
      this.$refs.scroll.scrollTo(0, 0);
    },

    backtopclick(position) {
      // console.log(position);
      // 1.判断backtop是否显示
      // this.isshow = -position.y > 1000;
      this.demo(position);
      // 2.绝对tabcontrol是否吸顶（）
      this.istabbfixed = -position.y > this.taboffsettop;
    },
    demo(position) {
      this.isshow = -position.y > 1000;
    },

    // 请求更多数据;
    LoadMore() {
      this.getHomeGoods(this.goodstype);
    },

    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // console.log(res);

        // 数据再次请求;
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped >
#home {
  /* padding-top: 44px; */
  /* 视口高度 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tabcontrol {
  position: relative;
  z-index: 9;
}
</style>
