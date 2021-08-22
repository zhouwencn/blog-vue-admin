<template>
  <div>
    <Card>
      <Form ref="formCustom" :model="articleForm" :label-width="60">
        <Row>
          <Col span="6">
            <FormItem label="文章标题">
              <Input
                v-model="articleForm.title"
                placeholder="请输入文章标题"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <FormItem label="文章描述 ">
              <Input
                v-model="articleForm.description"
                placeholder="文章描述"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <FormItem label="文章分类">
              <Select v-model="articleForm.typeId" transfer>
                <Option
                  v-for="item in categoryList"
                  :key="item.id"
                  :value="item.value"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <mavon-editor
        class="editor"
        v-model="articleForm.content"
        ref="md"
        @imgAdd="$imgAdd"
        @change="change"
        style="min-height: 800px"
      ></mavon-editor>
      <div class="box-btn">
        <Button class="save" @click="articleAdd(0)">存草稿</Button>
        <Button type="primary" class="publish" @click="articleAdd(1)"
          >发布</Button
        >
      </div>
    </Card>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { uploadFile, createOneArticle, querySingleArticle } from '@/api/article.js'
import { findAllCategory } from '@/api/category.js'
export default {
  name: 'article_create',
  components: {
    mavonEditor
  },
  data() {
    return {
      articleForm: {
        id: '',
        title: '',
        typeId: -1,
        description: '',
        content: '',
        htmlContent: ''
      },
      categoryList: []
    }
  },
  created() {
    this.queryArticleById()
    this.findAllCategory()
  },
  activated() {
    this.queryArticleById()
  },
  methods: {
    queryArticleById() {
      const { id } = this.$route.query
      if (id) {
        this.articleForm.id = id
        querySingleArticle(id).then(res => {
          const data = res.data
          Object.assign(this.articleForm, data.data)
        })
      } else {
        this.articleForm = {
            id: '',
            title: '',
            typeId: -1,
            description: '',
            content: '',
            htmlContent: ''
        }
      }
    },
    findAllCategory() {
      findAllCategory().then((res) => {
        const data = res.data
        this.categoryList = data.data
      })
    },
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      var formdata = new FormData()
      formdata.append('file', $file)
      uploadFile(formdata).then((res) => {
        let url = res.data.data.fileUrl
        this.$refs.md.$img2Url(pos, url)
      })
      //将下面上传接口替换为你自己的服务器接口
      // axios({
      //   url: "/common/upload",
      //   method: "post",
      //   data: formdata,
      //   headers: { "Content-Type": "multipart/form-data" }
      // }).then(url => {
      //   this.$refs.md.$img2Url(pos, url);
      // });
    },
    change(value, render) {
      // render 为 markdown 解析后的结果
      this.articleForm.content = value
      this.articleForm.htmlContent = render
    },
    articleAdd(status) {
      let published = status
      const {
        id,
        title,
        description,
        typeId,
        content,
        htmlContent
      } = this.articleForm
      const reqBody = {
        id,
        title,
        description,
        typeId,
        content,
        htmlContent,
        published
      }
      createOneArticle(reqBody).then((res) => {
        if (res.data.status === 200) {
          this.$Message.info('操作成功')
          this.$router.push({name: "article_list"})
        } else {
          this.$Message.error('操作失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.editor {
  z-index: 100;
}
.box-btn {
  text-align: center;
  margin-top: 25px;
  .save {
    margin-right: 10px;
  }
}
</style>
