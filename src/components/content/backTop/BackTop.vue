<template>
   <div class="backtop">
       <img src="~assets/img/common/top.png" alt="">
   </div>
</template>

<script>
export default {
    name:'BackTop'
}
</script>

<style  scoped>
    .backtop{
        position: fixed;
        right: 5px;
        bottom: 50px;
    }
    .backtop img{
        widows: 40px;
        height: 40px;
    }
</style>