// @flow
import camelizeStyleName from 'fbjs/lib/camelizeStyleName'
import hyphenateStyleName from 'fbjs/lib/hyphenateStyleName'
import { autoprefix } from 'glamor/lib/autoprefix'
import typeof { Container } from 'glamor/lib/autoprefix'

export default (root: Container) => {
  root.walkDecls(decl => {
    /* No point even checking custom props */
    if (decl.prop.startsWith('--')) return

    const objStyle = { [camelizeStyleName(decl.prop)]: decl.value }
    const prefixed = autoprefix(objStyle)
    Object.keys(prefixed).reverse().forEach(newProp => {
      decl.cloneBefore({
        prop: hyphenateStyleName(newProp),
        value: prefixed[newProp],
      })
    })
    decl.remove()
  })
}
