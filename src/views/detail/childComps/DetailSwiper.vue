<template>
  <swiper class="swwper">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="" class="imgg" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.swwper {
  height: 300px;
  overflow: hidden;
}
.imgg {
  width: 100%;
  height: 100%;
}
</style>