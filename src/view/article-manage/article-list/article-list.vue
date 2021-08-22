<template>
  <div>
    <Card>
      <Form :model="params" :label-width="80">
        <Row :gutter="15">
          <Col span="6">
            <FormItem prop="title" label="文章标题">
              <Input
                type="text"
                v-model="params.title"
                clearable
                placeholder="请输入文章标题"
              >
              </Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem prop="typeId" label="文章分类">
              <Select v-model="params.typeId" clearable>
                <Option
                  v-for="item in categoryList"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <Button
              type="primary"
              style="margin-right: 15px"
              @click="queryArticle"
              >查询</Button
            >
            <!--            <Button type="primary">重置</Button>-->
          </Col>
        </Row>
      </Form>
      <Table :data="articleList" :columns="articleColumns"></Table>
      <div>
        <MyPage
          :totalPageNum="params.pageTotal"
          :pageSize="params.pageSize"
          @changePageNum="changePage"
        />
      </div>
    </Card>
  </div>
</template>

<script>
import { getAllArticle, deleteOneArticle } from '@/api/article'
import { findAllCategory } from '@/api/category'
import MyPage from '@/components/page/MyPage'

export default {
  name: 'article_list',
  components: {
    MyPage
  },
  data() {
    return {
      articleList: [],
      categoryList: [],
      total: 0,
      params: {
        title: '',
        typeId: '',
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
      },
      articleColumns: [
        {
          key: 'id',
          title: 'id'
        },
        {
          key: 'title',
          title: '文章标题'
        },
        {
          key: 'description',
          title: '文章描述',
          render: (h, params) => {
            return h(
              'span',
              {
                style: {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  webkitLineClamp: 2,
                  webkitBoxOrient: 'vertical'
                }
              },
              params.row.description
            )
          }
        },
        {
          key: 'createdTime',
          title: '创建时间'
        },
        {
          key: 'updatedTime',
          title: '更新时间'
        },
        {
          key: 'published',
          title: '状态',
          render: (h, params) => {
            return h('div', {}, params.row.published ? '已发布' : '草稿')
          }
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            const id = params.row.id
            return h('div', {}, [
              h(
                'Button',
                {
                  props: { type: 'primary', size: 'small' },
                  style: {
                    marginRight: '15px'
                  },
                  on: {
                    click: () => {
                      this.edit(id)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: { type: 'error', size: 'small' },
                  on: {
                    click: () => {
                      this.delete(id)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ]
    }
  },
  created() {
    this.getAllArticle()
    this.findAllCategory()
  },
  methods: {
    findAllCategory() {
      findAllCategory().then((res) => {
        this.categoryList = res.data.data
      })
    },
    getAllArticle() {
      const { title, typeId, pageNum, pageSize } = this.params
      const reqBody = { title, typeId, pageNum, pageSize }
      getAllArticle(reqBody).then((res) => {
        const data = res.data
        this.articleList = data.data.rows
        this.params.pageTotal = data.data.records
      })
    },
    changePage(pageNum) {
      this.params.pageNum = pageNum
      this.getAllArticle()
    },
    queryArticle() {
      this.params.pageNum = 1
      this.getAllArticle()
    },
    delete(id) {
      deleteOneArticle(id).then((res) => {
        this.getAllArticle()
      })
    },
    edit(id) {
      this.$router.push({ name: 'article_create', query: { id } })
    }
  }
}
</script>

<style scoped></style>
