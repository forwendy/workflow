<template>
  <el-form size="medium" label-position="top">
    <el-form-item label="ID">
      <el-input v-model="id" disabled></el-input>
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="name"></el-input>
    </el-form-item>
    <el-form-item label="描述信息">
      <el-input type="textarea" :rows="2" v-model="describe"></el-input>
    </el-form-item>
    <el-form-item label="流程发起人">
      <el-input v-model="initiator"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  //依赖注入
  props: ['element'],
  inject: ['bpmnModeler'],
  data() {
    return {
      id: '',
      name: '',
      describe: '',
      initiator: ''
    }
  },
  watch: {
    id(newVal) {
      const bpmnModeler = this.bpmnModeler()
      const modeling = bpmnModeler.get('modeling')
      modeling.updateProperties(this.element, { id: newVal })
    },
    name(newVal) {
      const bpmnModeler = this.bpmnModeler()
      const modeling = bpmnModeler.get('modeling')
      modeling.updateProperties(this.element, { name: newVal })
    },
    describe(newVal) {
      const bpmnModeler = this.bpmnModeler()
      const modeling = bpmnModeler.get('modeling')
      const moddle = bpmnModeler.get('moddle')
      const Documentation = moddle.create('bpmn:Documentation', {
        text: newVal
      })
      modeling.updateProperties(this.element, {
        documentation: [Documentation]
      })
    },
    initiator(newVal) {
      const bpmnModeler = this.bpmnModeler()
      const modeling = bpmnModeler.get('modeling')
      modeling.updateProperties(this.element, { initiator: newVal })
    },
    // 监控element值，当发生改变时获取响应的属性
    element: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal) {
          console.log(newVal)
          this.id = newVal.businessObject.get('id') || ''
          this.name = newVal.businessObject.get('name') || ''
          this.initiator = newVal.businessObject.get('initiator') || ''
          const documentation = newVal.businessObject.documentation
          // const extensionElements = newVal.businessObject.extensionElements
          if (documentation) {
            this.describe = documentation[0].text
          } else {
            this.describe = ''
          }
        }
      }
    }
  },
  methods: {
    update(val) {
      console.log(val)
      this.$emit('update', this.form)
    }
  }
}
</script>