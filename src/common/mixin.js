import BackTop from "components/contents/backtop/BackTop";

export const backtopmixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isshow: false,
        }
    },
    methods: {
        topclick() {
            this.$refs.scroll.scrollTo(0, 0);
        },
        demo(position) {
            this.isshow = -position.y > 1000;
        },
    },
}