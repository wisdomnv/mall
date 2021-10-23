<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titclick="titclick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentscroll"
      :probe-type="3"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgOver="imgOver" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="topclick" v-show="isshow"></back-top>
  </div>
</template>

<script>
import {
  getDetail,
  GoodsInfo,
  ShopInfo,
  paramsInfo,
  getRecommend,
} from "network/detail";
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/contents/goods/GoodsList";
import { debounce } from "common/debounce.js";
import DetailBottomBar from "./childComps/DetailBottomBar";
import { backtopmixin } from "/7-vue/27-mall/src/common/mixin";
export default {
  name: "Detail",
  mixins: [backtopmixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailShopInfo,
    DetailBaseInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themetopys: [],
      gethemetopys: null,
    };
  },

  created() {
    // 1.保存传入的id
    this.iid = this.$route.params.iid;

    // 2.根据详情数据（iid）
    getDetail(this.iid).then((res) => {
      const data = res.result;

      // 2.获取顶部的图片数据
      this.topImages = res.result.itemInfo.topImages;
      // 3.获取商品信息

      this.goods = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 4.获取店铺信息
      this.shop = new ShopInfo(data.shopInfo);

      // 5.获取商品详细信息
      this.detailInfo = data.detailInfo;

      // 6.请求详情页的参数
      this.paramInfo = new paramsInfo(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 7.请求评论数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
      // console.log(res);
    });
    // 4.给gethemetopys赋值
    this.gethemetopys = debounce(() => {
      this.themetopys = [];
      this.themetopys.push(0);
      this.themetopys.push(this.$refs.params.$el.offsetTop);
      this.themetopys.push(this.$refs.comment.$el.offsetTop);
      this.themetopys.push(this.$refs.recommend.$el.offsetTop);
      this.themetopys.push(Number.MAX_VALUE);
      // console.log(this.themetopys);
    }, 10);
  },
  methods: {
    imgOver() {
      this.$refs.scroll.refresh();
      this.gethemetopys();
    },
    titclick(index) {
      // console.log(index);
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, -this.themetopys[index], 100);
    },
    contentscroll(position) {
      // console.log(position);
      // 1.获取y值
      const positiony = -position.y;
      // positiony和主题中值进行对比
      let length = this.themetopys.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.isindex != i &&
          positiony >= this.themetopys[i] &&
          positiony < this.themetopys[i + 1]
        ) {
          this.isindex = i;
          this.$refs.nav.isindex = this.isindex;
        }
      }
      this.demo(position);
    },
    addToCart() {
      // 1.获取购物车需要的展示信息
      const product = {};
      product.images = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.detailInfo.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车
      // this.$store.commit("addCart", product);
      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });

      this.$toast.show();
      console.log(this.$toast);
    },
  },
  // updated() {
  //   this.$refs.scroll.refresh();
  //   // console.log(this.$refs.scroll.refresh());
  // },
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>