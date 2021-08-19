import React from 'react'

import Styles from './test.styles'

const Test = () => {
  return (
    <Styles>
      <p style={{ fontWeight: 300 }}>AaBbCcDdEeFfGgHhŞşIıİi Example</p>
      <p style={{ fontWeight: 300 }}>
        <i>AaBbCcDdEeFfGgHhŞşIıİi Example</i>
      </p>
      <p style={{ fontWeight: 400 }}>AaBbCcDdEeFfGgHhŞşIıİi Example</p>
      <p style={{ fontWeight: 400 }}>
        <i>AaBbCcDdEeFfGgHhŞşIıİi Example</i>
      </p>
      <p style={{ fontWeight: 700 }}>AaBbCcDdEeFfGgHhŞşIıİi Example</p>
      <p style={{ fontWeight: 700 }}>
        <i>AaBbCcDdEeFfGgHhŞşIıİi Example</i>
      </p>
      <p style={{ fontWeight: 900 }}>AaBbCcDdEeFfGgHhŞşIıİi Example</p>
      <p style={{ fontWeight: 900 }}>
        <i>AaBbCcDdEeFfGgHhŞşIıİi Example</i>
      </p>
    </Styles>
  )
}

export default Test
