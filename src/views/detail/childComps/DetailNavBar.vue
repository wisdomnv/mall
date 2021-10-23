<template>
  <nav-bar>
    <div slot="left" class="fanhui" @click="backclick"><</div>
    <div slot="center" class="title">
      <div
        v-for="(item, index) in titles"
        class="titleitem"
        :class="{ active: index === isindex }"
        @click="inclick(index)"
      >
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      isindex: 0,
    };
  },
  methods: {
    inclick(index) {
      this.isindex = index;
      this.$emit("titclick", index);
    },
    // 返回home
    backclick() {
      //   this.$router.go(-1);
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 14px;
}
.titleitem {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.fanhui {
  font-size: 27px;
}
</style>