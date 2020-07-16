import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer' // 引入默认的renderer

const HIGH_PRIORITY = 1500 // 最高优先级

export default class CustomRenderer extends BaseRenderer {
  // 继承BaseRenderer
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY)
    this.bpmnRenderer = bpmnRenderer
  }

  canRender(element) {
    // ignore labels
    return !element.labelTarget
  }

  drawShape(parentNode, element) {
    // 核心函数就是绘制shape
    const shape = this.bpmnRenderer.drawShape(parentNode, element)
    return shape
  }

  getShapePath(shape) {
    return this.bpmnRenderer.getShapePath(shape)
  }
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer']
