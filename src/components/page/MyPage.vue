<template>
  <div>
    <Page
      class="pageWrapper"
      :total="totalPageNum"
      :page-size="pageSize"
      @on-change="changePageNum"
      size="small"
    ></Page>
  </div>
</template>

<script>
export default {
  name: 'MyPage',
  props: {
    totalPageNum: {
      type: Number,
      default() {
        return 0
      }
    },
    pageSize: {
      type: Number,
      default() {
        return 1
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    changePageNum(pageNum) {
      this.$emit('changePageNum', pageNum)
    }
  },
}
</script>

<style scoped>
.pageWrapper {
  margin-top: 20px;
}
</style>
