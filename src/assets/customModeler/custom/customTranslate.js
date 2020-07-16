import translations from './translations'

export default function customTranslate(template, replacements) {
  replacements = replacements || {}
  // Translate
  template = translations[template] || template
  // console.log(replacements)
  // console.log(template)

  // Replace
  return template.replace(/{([^}]+)}/g, function(_, key) {
    const replacementsTranslate =
      translations[replacements[key]] || replacements[key]
    return replacementsTranslate || '{' + key + '}'
  })
}
