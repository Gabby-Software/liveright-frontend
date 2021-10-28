import extend from './_extends'
import mixin from './_mixins'
import vars, { clientVars } from './_variables'

export const theme = { vars, mixin, extend }
export const clientTheme = { vars: clientVars, mixin, extend }
