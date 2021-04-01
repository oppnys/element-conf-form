### element-conf-form

> This is a configurable element-ui form 


#### usage:

```
<template>
  <div class="hello">
    <element-conf-form ref="forms" :forms="forms" inline></element-conf-form>
  </div>
</template>


<script>
import ElementConfForm from 'element-conf-form'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {ElementConfForm},
  data() {
    return {
      forms: [
        {
          type: 'input',
          property: 'name',
          label: '名称',
          value: '',
          labelWidth: 80,
          attrs: {
            placeholder: '请输入',
            clearable: true
          }
        },
        {
          type: 'select',
          property: 'protocolType',
          label: '性别',
          value: '',
          attrs: {
            placeholder: '请选择'
          },
          options: [
            {label: '男', value: 1},
            {label: '女', value: 2}
          ]
        },
        {
          type: 'button',
          buttons: [
            {
              value: '搜索',
              validate: true,
              handle: this.search,
              attrs: {
                type: 'primary',
                icon: 'el-icon-search'
              }
            },
            {
              value: '重置',
              validate: false,
              handle: this.reset,
              attrs: {
                type: 'danger',
                icon: 'el-icon-refresh-left'
              }
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 搜索
    search(params) {
      console.log('搜索：', params)
    },
    // 重置
    reset() {
      this.$refs.forms.clearForm()
    }
  }
}
</script>

```