<template>
  <div class="bottom-bar">
      <div class="check-content" @click="selectAll">
      <check-bottom class="check-button" :value="isSelectAll" />
      <span>全选</span>
      </div>
      <div class="totalPrice">
          合计:{{totalPrice}}
      </div>
      <div class="calculate">
          去计算({{checkLength}})
      </div>
  </div>
</template>

<script>
import checkBottom from './checkBottom.vue'
export default {
  components: { checkBottom },
    name:'cartBottomBar',
    computed: {
        totalPrice(){
            return '￥' + this.$store.state.cartList.filter(item=>{
                return item.checked
            }).reduce((preValue,item)=>{
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        checkLength(){
            return this.$store.state.cartList.filter(item=>item.checked).length
        },
        isSelectAll(){
            if(this.$store.state.cartList.length === 0) return false
            return !this.$store.state.cartList.find(item => !item.checked)
        }
    },
    methods: {
        selectAll(){
            if(this.isSelectAll){
                this.$store.state.cartList.forEach(item => item.checked=false)
            }else{
                this.$store.state.cartList.forEach(item => item.checked=true)
            }
        }
    }
}
</script>

<style scoped>
.bottom-bar{
    height: 40px;
    background-color: #eeeeee;
    position: relative;
    display: flex;
    line-height: 40px;
}
.check-content{
    width: 60px;
    display: flex;
    align-items: center;
    margin-left: 10px;
}
.check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
}
.totalPrice{
    text-align: center;
    margin-left: 30px;
    flex: 1;
}
.calculate{
    width: 90px;
    text-align: center;
    background-color: var(--color-tint);
    color: #fff;
}
</style>