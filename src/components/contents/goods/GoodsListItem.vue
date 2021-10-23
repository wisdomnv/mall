<template>
  <div class="goods-item" @click="itemclick">
    <img v-lazy="showImage" alt="" @load="imgload" />
    <div class="goods-info">
      <p>{{ goodsitem.title }}</p>
      <span class="price">{{ goodsitem.price }}</span>
      <span class="xing"></span>
      <span class="collect">{{ goodsitem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsitem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage() {
      return this.goodsitem.image || this.goodsitem.show.img;
    },
  },
  methods: {
    imgload() {
      this.$bus.$emit("imgitemload");
    },
    itemclick() {
      this.$router.push("/detail/" + this.goodsitem.iid);
      // console.log("0000");
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 3px solid var(--color-tint);
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 15px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/images/goods-xing/xing.png") 0 0/14px 14px;
  color: palevioletred;
}
</style>