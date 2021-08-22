<template>
  <div>
    <Card>
      <Form ref="formCustom" :model="userForm" :label-width="60">
        <Row :gutter="20">
          <Col span="5">
            <FormItem label="用户名">
              <Input v-model="userForm.username"></Input>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="用户邮箱">
              <Input v-model="userForm.userEmail"></Input>
            </FormItem>
          </Col>
          <Col span="14">
            <FormItem>
              <Button type="primary" @click="handleSubmit('formCustom')"
                >查询</Button
              >
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Table :columns="columns" :data="userData"></Table>
      <MyPage
        :totalPageNum="userForm.totalPageNum"
        :pageSize="userForm.pageSize"
        @changePageNum="changePage"
      ></MyPage>
    </Card>
  </div>
</template>

<script>
import { findAllUser, deleteUser } from '@/api/user.js'
import MyPage from '@/components/page/MyPage'

export default {
  name: 'user_list',
  components: {
    MyPage
  },
  data() {
    return {
      userForm: {
        username: '',
        userEmail: '',
        pageNum: 1,
        pageSize: 1,
        totalPageNum: 0
      },
      userData: [],
      columns: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '用户昵称',
          key: 'nickname'
        },
        {
          title: '用户邮箱',
          key: 'userEmail'
        },
        {
          title: '手机号',
          key: 'phone'
        },
        {
          title: '角色',
          key: 'role'
        },
        {
          title: '创建时间',
          key: 'createdTime'
        },
        {
          title: '更新时间',
          key: 'updatedTime'
        },
        {
          title: '用户操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.id)
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
    this.findAllUser()
  },
  methods: {
    findAllUser() {
      const { username, userEmail, pageNum, pageSize } = this.userForm
      const reqBody = {
        username,
        userEmail,
        pageNum,
        pageSize
      }
      findAllUser(reqBody).then((res) => {
        const data = res.data
        this.userData = data.data.rows
        this.userForm.totalPageNum = data.data.records
      })
    },
    remove(id) {
      const config = {
        title: '提示',
        content: '你确定删除该用户吗?',
        onOk: () => {
          this.deleteUser(id)
        },
        onCancel: () => {
          this.$Message.info('取消了删除')
        }
      }
      this.$Modal.confirm(config)
    },
    deleteUser(id) {
      deleteUser(id)
        .then((res) => {
          this.$Message.info('删除成功')
          this.findAllUser()
        })
        .catch(() => {
          this.$Message.info('删除失败')
        })
    },
    changePage(pageNum) {
      this.userForm.pageNum = pageNum
      this.findAllUser()
    },
    handleSubmit(formName) {
      this.userForm.pageNum = 1
      this.findAllUser()
    }
  }
}
</script>

<style scoped>
.pageWrapper {
  margin-top: 20px;
}
</style>
