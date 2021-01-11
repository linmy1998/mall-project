<template>
    <div class="Nav-Bar">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>
<script>
export default {
    name:'NavBar'
}
</script>
<style scoped>
    .Nav-Bar{
        display: flex;
        /* height: 44px; */
        line-height: 44px;
        /* background-color:red; */
        text-align: center;
        box-shadow: 0 0 1px rgb(100, 100, .08);
    }
    .left,.right{
        width: 60px;
        /* background-color: blue; */
    }
    .center{
        flex: 1;
    }
</style>