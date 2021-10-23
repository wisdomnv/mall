<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartlist"
        ::key="index"
        :item-info="item"
      />
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartlist"]),
  },
  activated() {
    // this.$refs.scroll.refresh();
    // console.log(".....");
  },
};
</script>

<style scoped>
.content {
  height: calc(100vh - 44px - 49px - 40px);
  overflow: hidden;
}
</style>