<template>
  <el-form ref="forms" :model="rulesData" v-bind="$attrs" :rules="rules">
    <el-form-item
      v-for="(item, index) in forms"
      :key="index"
      :label="item.label"
      :prop="item.property"
    >
      <template v-if="item.type === FormType.INPUT && propertyFilter(item)">
        <el-input
          placeholder="请输入"
          v-model="rulesData[item.property]"
          v-bind="item.attrs"
        ></el-input>
      </template>
      <template
        v-else-if="item.type === FormType.SELECT && propertyFilter(item)"
      >
        <el-select v-model="rulesData[item.property]" v-bind="item.attrs">
          <el-option
            v-for="option in item.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>
      </template>
      <template v-if="item.type === FormType.RADIO && propertyFilter(item)">
        <el-radio-group v-model="rulesData[item.property]" v-bind="item.attrs">
          <el-radio
            v-for="radio in item.options"
            :key="radio.value"
            v-bind="radio.attrs"
            :label="radio.value"
          >
            {{ radio.label }}
          </el-radio>
        </el-radio-group>
      </template>
      <template
        v-if="item.type === FormType.RADIOBUTTON && propertyFilter(item)"
      >
        <el-radio-group v-model="rulesData[item.property]" v-bind="item.attrs">
          <el-radio-button
            v-for="radio in item.options"
            :key="radio.value"
            v-bind="radio.attrs"
            :label="radio.value"
          >
            {{ radio.label }}
          </el-radio-button>
        </el-radio-group>
      </template>
      <template v-if="item.type === FormType.SWITCH && propertyFilter(item)">
        <el-switch v-model="rulesData[item.property]" v-bind="item.attrs">
        </el-switch>
      </template>
      <template v-if="item.type === FormType.SLIDER && propertyFilter(item)">
        <el-slider
          v-model="rulesData[item.property]"
          v-bind="item.attrs"
        ></el-slider>
      </template>
      <template v-if="item.type === FormType.CASCADER && propertyFilter(item)">
        <el-cascader
          v-model="rulesData[item.property]"
          :options="item.options"
          v-bind="item.attrs"
        ></el-cascader>
      </template>
      <template
        v-if="item.type === FormType.TIMEPICKER && propertyFilter(item)"
      >
        <el-time-select v-model="rulesData[item.property]" v-bind="item.attrs">
        </el-time-select>
      </template>
      <template
        v-if="item.type === FormType.DATEPICKER && propertyFilter(item)"
      >
        <el-date-picker v-model="rulesData[item.property]" v-bind="item.attrs">
        </el-date-picker>
      </template>
      <template v-else-if="item.type === FormType.BUTTON">
        <el-button
          v-for="(button, indey) in item.buttons"
          :key="indey"
          v-bind="button.attrs"
          @click="submitForm(button)"
        >
          {{ button.value }}
        </el-button>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
import FormType from './formType'

export default {
  name: 'ElementConfForm',
  props: {
    forms: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      FormType,
      rulesData: null
    }
  },
  mounted() {
    this.rulesData = this.generateObj(this.forms, 'property', 'value')
  },
  methods: {
    clearForm() {
      this.$refs.forms.resetFields()
    },
    submitForm(data) {
      if (data.validate) {
        this.$refs.forms.validate((valid, params) => {
          if (valid) {
            data.handle(this.rulesData)
          } else {
            this.$message.error(this.deconstructObj(params))
          }
        })
      } else {
        data.handle(this.rulesData)
      }
    },
    deconstructObj(obj = {}) {
      const res = []
      for (const key in obj) {
        res.push(obj[key][0]['message'])
      }
      return res[0]
    },
    propertyFilter(item) {
      // eslint-disable-next-line no-prototype-builtins
      return this.rulesData && this.rulesData.hasOwnProperty(item.property)
    },
    generateObj(arr = [], keyName = '', val = '') {
      if (arr) {
        const obj = {}
        arr.map((item) => {
          if (item[keyName]) {
            const key = item[keyName]
            const value = item[val] || ''
            obj[key] = value
          }
        })
        return obj
      }
      return null
    }
  }
}
</script>

<style scoped>
</style>
