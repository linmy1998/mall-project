<template>
  <div class="recommend">
      <div v-for="item in recommend" class="recommend-Item">
          <a :href="item.link" >
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name:'RecommendView',
    props: {
        recommend:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
.recommend{
    display: flex;
    text-align: center;
    padding: 5px 0px 15px 0;
    border-bottom: 8px solid #eee;
}
.recommend-Item{
    flex: 1;
}
.recommend-Item img{
    width: 65px;
    height: 65px;
    margin-bottom: 8px;
}
</style>