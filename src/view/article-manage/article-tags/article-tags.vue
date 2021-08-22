<template>
  <div>
    <MyPage :totalPageNum="count"></MyPage>
  </div>
</template>

<script>
import MyPage from '@/components/page/MyPage'
export default {
  name: 'article_tags',
  components: {
    MyPage
  },
  data() {
    return {
      count: 0
    }
  },
  created() {
    setTimeout(() => {
      this.count = 20
    },200)
  }
}
</script>

<style scoped></style>
