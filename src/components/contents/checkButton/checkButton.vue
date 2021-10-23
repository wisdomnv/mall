<template>
  <div class="check-button" :class="{ check: ischecked }">
    <img src="~assets/images/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "checkButton",
  props: {
    ischecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 2px solid #aaa;
}
.check {
  border-color: indianred;
  background-color: indianred;
}
</style>