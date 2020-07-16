import ConfigProps from '../ConfigProps'
import ConfigForm from '../ConfigForm'
import ConfigAuditor from '../ConfigAuditor'
import ConfigBtn from '../ConfigBtn'
import ConfigPerformListener from '../ConfigPerformListener'
import ConfigTaskListener from '../ConfigTaskListener'
import ConfigFlowRule from '../ConfigFlowRule.vue'
import ConfigRights from '../ConfigRights.vue'

export default {
  'bpmn:Process': [
    {
      title: '基本设置',
      key: 1,
      component: ConfigProps,
    },
    {
      title: '执行监听器',
      key: 2,
      component: ConfigPerformListener,
    },
    {
      title: '权限设置',
      key: 3,
      component: ConfigRights,
    },
  ],
  'bpmn:StartEvent': [
    {
      title: '基本设置',
      key: 1,
      component: ConfigProps,
    },
    {
      title: '表单设置',
      key: 2,
      component: ConfigForm,
    },
    {
      title: '执行监听器',
      key: 3,
      component: ConfigPerformListener,
    },
  ],
  'bpmn:UserTask': [
    {
      title: '基本设置',
      key: 1,
      component: ConfigProps,
    },
    {
      title: '审核者',
      key: 2,
      component: ConfigAuditor,
    },
    {
      title: '表单设置',
      key: 3,
      component: ConfigForm,
    },
    {
      title: '按钮配置',
      key: 4,
      component: ConfigBtn,
    },
    {
      title: '执行监听器',
      key: 5,
      component: ConfigPerformListener,
    },
    {
      title: '任务监听器',
      key: 6,
      component: ConfigTaskListener,
    },
  ],
  'bpmn:SequenceFlow': [
    {
      title: '基本设置',
      key: 1,
      component: ConfigProps,
    },
    {
      title: '流转条件',
      key: 2,
      component: ConfigFlowRule,
    },
    {
      title: '执行监听器',
      key: 3,
      component: ConfigPerformListener,
    },
  ],
  'bpmn:ExclusiveGateway': [
    {
      title: '基本设置',
      key: 1,
      component: ConfigProps,
    },
  ],
  'bpmn:EndEvent': [
    {
      title: '基本设置',
      key: 1,
      component: ConfigProps,
    },
    {
      title: '执行监听器',
      key: 2,
      component: ConfigPerformListener,
    },
  ],
}
