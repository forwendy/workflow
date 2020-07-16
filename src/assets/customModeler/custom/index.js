import CustomPalette from './CustomPalette'
import CustomRenderer from './CustomRenderer'
import CustomContextPadProvider from './CustomContextPadProvider'
import customTranslate from './customTranslate'
export default {
  __init__: [
    'paletteProvider',
    'customRenderer',
    'contextPadProvider',
    'translate',
  ],
  paletteProvider: ['type', CustomPalette],
  customRenderer: ['type', CustomRenderer],
  contextPadProvider: ['type', CustomContextPadProvider],
  translate: ['value', customTranslate],
}
