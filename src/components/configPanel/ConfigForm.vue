<template>
  <div></div>
</template>

<script>
export default {
  watch: {
    formTpl(newVal) {
      const bpmnModeler = this.bpmnModeler()
      const modeling = bpmnModeler.get('modeling')
      const moddle = bpmnModeler.get('moddle')
      const FormProperty = moddle.create('flowable:FormProperty')
      const ExtensionElements = moddle.create('bpmn:ExtensionElements')
      ExtensionElements.get('values').push(FormProperty)
      // console.log(ExtensionElements, FormProperty)
      // console.log(this.element)
      modeling.updateProperties(this.element, {
        extensionElements: ExtensionElements
      })
    }
  }
}
</script>