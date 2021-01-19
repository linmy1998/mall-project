import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// 1.安装插件
Vue.use(Vuex)

const store=new Vuex.Store({
    state: {
    cartList:[]
    },
    mutations: {
        addCounter(state,payload){
            payload.count++
        },
        addToCart(state,payload){
           payload.checked=true
           state.cartList.push(payload)
        }
        // addCart(state,payload){
        //     // state.cartList.push(payload)
        //     let oldProduct=state.cartList.find(item => item.iid === payload.iid)
        //     if(oldProduct){
        //         // context.commit('addCounter',oldProduct)
        //         oldProduct.count++
        //     }else{
        //         payload.count=1
        //         // context.commit('addToCart',oldProduct)
        //         state.cartList.push(payload)
        //     }
        // }
    },
    actions: {
        addCart(context,payload){
            // state.cartList.push(payload)
           return new Promise((resolve,reject)=>{
             let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)
                if(oldProduct){
                    context.commit('addCounter',oldProduct)
                    resolve('成功添加一件商品')
                }else{
                    payload.count=1
                    context.commit('addToCart',payload)
                    resolve('成功添加一件新商品')
                }
            })
            
        }
    },
    getters
})

export default store