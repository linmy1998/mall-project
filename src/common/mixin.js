export const backTopMixin = {
    data() {
      return {
        isshow: false
      }
    },
    methods: {
        backclick(){
            
            this.$refs.scroll.scroll.scrollTo(0,0,500)
         },
    }
  }