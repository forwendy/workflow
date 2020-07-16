<template>
  <div class="bpmn" v-loading="!bpmnModeler">
    <div class="bpmn-modeler left">
      <div class="control">
        <el-button-group>
          <el-button @click="save" type="primary">保存</el-button>
          <el-button @click="handleUndo" type="primary">后退</el-button>
          <el-button @click="handleRedo" type="primary">前进</el-button>
          <el-button @click="createDiagram" type="primary">创建新的流程图</el-button>
          <el-button @click="importFile" type="primary">导入BPMN</el-button>
          <el-button @click="downloadXML" type="primary">下载XML</el-button>
          <el-button @click="downloadSVG" type="primary">下载SVG</el-button>
          <el-button @click="downloadImage" type="primary">下载图片</el-button>
        </el-button-group>
      </div>
      <div v-init class="canvas"></div>
    </div>
    <BpmnPanel class="bpmn-panel" v-if="bpmnModeler" :bpmnModeler="bpmnModeler"></BpmnPanel>
    <BpmnViewer v-if="bpmnModeler" class="viewer" :bpmnModeler="bpmnModeler" ref="viewer" />
  </div>
</template>

<script>
import BpmnViewer from '@/components/BpmnViewer'
import BpmnPanel from '@/components/configPanel/Index'
import CustomModeler from '@/assets/customModeler'
// /*左边工具栏以及编辑节点的样式*/
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import '@/assets/customModeler/style.css'
import flowable from '@/components/flowable'

export default {
  name: 'BPMN',
  components: {
    BpmnViewer,
    BpmnPanel
  },
  props: {
    bpmnXML: String
  },
  provide() {
    return {
      bpmnModeler: this.getModeler
    }
  },
  data() {
    return {
      // bpmn建模器
      bpmnModeler: null,
      element: null,
      initXML:
        '<?xml version="1.0" encoding="UTF-8"?>' +
        '<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xmlns:flowable="http://flowable.org/bpmn" ' +
        'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" ' +
        'xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" ' +
        'xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" ' +
        'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
        'targetNamespace="http://www.flowable.org/processdef" ' +
        'id="Definitions_1">' +
        '<process id="Process_1" isExecutable="false">' +
        '<startEvent id="StartEvent_1"/>' +
        '</process>' +
        '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
        '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
        '<bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">' +
        '<dc:Bounds height="36.0" width="36.0" x="173.0" y="102.0"/>' +
        '</bpmndi:BPMNShape>' +
        '</bpmndi:BPMNPlane>' +
        '</bpmndi:BPMNDiagram>' +
        '</definitions>'
    }
  },
  directives: {
    init: {
      // 被绑定元素插入父节点时调用
      inserted: function(el, binding, vnode) {
        const vm = vnode.context
        vm.bpmnModeler = new CustomModeler({
          container: el,
          //模块拓展，拓展flowable的描述
          moddleExtensions: {
            flowable
          }
        })
        // 初始化图表
        vm.openDiagram(vm.initXML)
      }
    }
  },
  methods: {
    getModeler() {
      return this.bpmnModeler
    },
    // 选择文件导入
    importFile() {
      const bpmnXML = ''
      // 打开编辑Diagram
      this.openDiagram(bpmnXML)
    },

    createDiagram() {
      this.bpmnModeler.createDiagram()
    },

    /**
     * Open diagram in our viewer instance.
     *
     * @param {String} bpmnXML diagram to display
     */
    // 导入XML
    async openDiagram(bpmnXML) {
      const bpmnViewer = this.bpmnModeler
      // import diagram
      try {
        await bpmnViewer.importXML(bpmnXML)

        // access viewer components
        var canvas = bpmnViewer.get('canvas')
        // var overlays = bpmnViewer.get('overlays')

        // zoom to fit full viewport
        canvas.zoom('fit-viewport')

        // attach an overlay to a node
        // overlays.add('SCAN_OK', 'note', {
        //   position: {
        //     bottom: 0,
        //     right: 0
        //   },
        //   html: '<div class="diagram-note">Mixed up the labels?</div>'
        // })

        // add marker
        // canvas.addMarker('SCAN_OK', 'needs-discussion')
      } catch (err) {
        console.error('could not import BPMN 2.0 diagram', err)
      }
    },

    async downloadXML() {
      const modeler = this.bpmnModeler
      console.log(modeler)
      modeler.saveXML({ format: true, preamble: false }, function(err, xml) {
        console.log(err, xml)
      })
      // try {
      //   const { xml } = await modeler.saveXML({ format: true })
      //   console.log('xml', xml)
      // } catch (err) {
      //   console.error('Error happened saving xml: ', err)
      // }
    },

    // 下载SVG
    async downloadSVG() {
      const modeler = this.bpmnModeler
      try {
        const { svg } = await modeler.saveSVG({ format: true })
        console.log('svg', svg)
      } catch (err) {
        console.error('Error happened saving svg: ', err)
      }
    },

    downloadImage() {},

    // 后退
    handleUndo() {
      this.bpmnModeler.get('commandStack').undo()
    },

    // 前进
    handleRedo() {
      this.bpmnModeler.get('commandStack').redo()
    },

    zoom(newScale) {
      this.bpmnModeler.get('canvas').zoom(newScale)
    },

    save() {}
  }
}
</script>

<style>
body {
  margin: 0;
}
.bpmn {
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
}
.bpmn-panel {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  background: #ffffff;
}
.bpmn-modeler {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.control {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  z-index: 999;
}
.canvas {
  width: 100%;
  height: 100%;
}
</style>

