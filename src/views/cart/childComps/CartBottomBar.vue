<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-bottom"
        :ischecked="isselectall"
        @click.native="checkedclick"
      />
      <span>全选</span>
    </div>
    <div class="price">合计：{{ totalprice }}</div>
    <div class="calculate">去计算({{ checklength }})</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import checkButton from "components/contents/checkButton/checkButton";

export default {
  name: "CartBottomBar",
  components: {
    checkButton,
  },
  computed: {
    ...mapGetters(["cartlist"]),
    totalprice() {
      return (
        "￥" +
        this.$store.state.cartlist
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checklength() {
      return this.$store.state.cartlist.filter((item) => item.checked).length;
    },
    isselectall() {
      if (this.cartlist.length === 0) return false;
      // for (let item of this.cartlist) {
      //   if (!item.checked) {
      //     return false;
      //   }
      // }
      // return true;

      // return !this.cartlist.filter((item) => !item.checked).length;

      return !this.cartlist.find((item) => !item.checked);
    },
  },
  methods: {
    checkedclick() {
      if (this.isselectall) {
        this.cartlist.forEach((item) => (item.checked = false));
      } else {
        this.cartlist.forEach((item) => (item.checked = true));
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 7px;
}
.check-bottom {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
}
.calculate {
  width: 90px;
  background-color: red;
  color: #fff;
  margin-left: auto;
  padding-left: 5px;
  line-height: 40px;
}
</style>