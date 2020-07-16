<template>
  <el-collapse v-model="active">
    <template v-for="(item, key) in configMenus">
      <el-collapse-item :key="key" :name="key">
        <div class="collapse-title" slot="title">{{ item.title }}</div>
        <component :is="item.component" :element="element"></component>
      </el-collapse-item>
    </template>
  </el-collapse>
</template>

<script>
import configMenus from './js/configMenus.js'
export default {
  created() {
    this.addModelerListener()
    this.addEventBusListener()
  },
  props: {
    bpmnModeler: Object
  },
  data() {
    return {
      active: 0,
      element: null,
      configMenus: null
    }
  },
  methods: {
    // 添加事件监听
    addModelerListener() {
      const bpmnjs = this.bpmnModeler
      const events = ['shape.added', 'shape.move.end', 'shape.removed']
      events.forEach(event => {
        bpmnjs.on(event, e => {
          // console.log(event, e)
          const elementRegistry = bpmnjs.get('elementRegistry')
          const shape = e.element ? elementRegistry.get(e.element.id) : e.shape
          console.log(shape)
          this.element = shape
          this.configMenus = configMenus[shape.type]
        })
      })
    },

    // 监听element并绑定事件
    addEventBusListener() {
      const bpmnjs = this.bpmnModeler
      const eventBus = bpmnjs.get('eventBus') // 需要使用eventBus
      const eventTypes = ['element.click', 'element.changed'] // 需要监听的事件集合
      eventTypes.forEach(eventType => {
        eventBus.on(eventType, e => {
          const elementRegistry = bpmnjs.get('elementRegistry')
          const shape = e.element ? elementRegistry.get(e.element.id) : e.shape
          console.log(shape)
          this.element = shape
          this.configMenus = configMenus[shape.type]
        })
      })
    }
  }
}
</script>

<style scoped>
.collapse-title {
  padding: 0 20px;
  font-size: 18px;
}
.collapse-content {
  padding: 0 20px;
}
</style>