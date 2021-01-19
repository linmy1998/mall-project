<template>
    <div id="categroy">
        <nav-bar class="nav-bar"><div slot="center">分类</div></nav-bar>
        <div class="content">
        <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
        </div>
         <div class="tabcontent">
          <scroll id="tab-content" :data="[categoryData]" ref="scroll" :probeType="3">
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
      </scroll>
         </div>
    </div>
    
    
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import TabMenu from './childComps/TabMenu.vue';
import { getCategory , getSubcategory ,getCategoryDetail} from "network/category";
import TabContentCategory from './childComps/TabContentCategory.vue';
import Scroll from 'components/common/scroll/Scroll.vue';

export default {
    name:'Categroy',
    components: { 
      NavBar,
      TabMenu,
      TabContentCategory,    
      Scroll
    },
    data () {
       return {
           categories:[],
           currentIndex:-1,
           categoryData: {}
    }
    },
    created () {
       getCategory().then(res=>{
           this.categories=res.data.category.list
            for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {}
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
       })
   },
    activated () {
       this.$refs.scroll.scroll.refresh()
   },
   computed: {
		  showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
   methods: {
    //     _getCategory() {
	// 	    getCategory().then(res => {
	// 	      // 1.获取分类数据
	// 	      this.categories = res.data.category.list
    //       // 2.初始化每个类别的子数据
         
    //     })
    //   },
       _getSubcategories(index) {
        this.currentIndex = index;
		    const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
            console.log(res);
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail('pop')
          this._getCategoryDetail('sell')
          this._getCategoryDetail('new')
        })
      },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
              // 3.将获取的数据保存下来
              console.log(res);
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
       selectItem(index){
           this._getSubcategories(index)
       }
   }
}
</script>
<style scoped>
   #category {
    position: relative;
    z-index: 9;
        background-color: #fff;
        height: 100vh;
  }

  .nav-bar {
    position: relative;
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
    z-index: 9;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
  .tabcontent{
      position: absolute;
    left: 40%;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
  #tab-content {
    height: 100%;
    /* height: calc(100% - 102px); */
    flex: 1;
  }
  .tab-content{
      position: fixed;
  }
</style>