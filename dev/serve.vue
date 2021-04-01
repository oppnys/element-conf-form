
<template>
  <div id="app">
    <element-conf-form ref="searchForm" :forms="forms" inline />
  </div>
</template>

<script>
import Vue from 'vue'
import ElementConfForm from '@/element-conf-form.vue'
import FormType from '@/formType'

export default Vue.extend({
  name: 'ServeDev',
  data() {
    return {
      forms: [
        {
          type: FormType.INPUT,
          property: 'name',
          label: '系统名称',
          value: '',
          labelWidth: 80,
          attrs: {
            placeholder: '请输入',
            clearable: true
          }
        },
        {
          type: FormType.SELECT,
          property: 'protocolType',
          label: '协议类型',
          value: '',
          attrs: {
            placeholder: '请选择'
          },
          options: [
            { label: 'HTTP', value: 1 },
            { label: 'HTTPS', value: 2 }
          ]
        },
        {
          type: FormType.BUTTON,
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
  components: {
    ElementConfForm
  },
  methods: {
    search(params) {
      console.log('搜索：', params)
    },
    // 重置
    reset() {
      this.$refs.searchForm.clearForm()
      console.log(this.forms)
    }
  }
})
</script>

