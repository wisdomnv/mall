<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartlength }})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list />

    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartList from "./childComps/CartList.vue";
import NavBar from "../../components/common/navbar/NavBar.vue";
import CartBottomBar from "./childComps/CartBottomBar";
export default {
  name: "Cart",
  components: { NavBar, CartList, CartBottomBar },
  computed: {
    ...mapGetters(["cartlength"]),
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>

