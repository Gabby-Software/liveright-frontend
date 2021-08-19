/* eslint-disable @typescript-eslint/no-var-requires,@typescript-eslint/no-unused-vars */
const fs = require('fs')
const { logger } = require('./logger')
const { exec } = require('child_process')
const camelCase = (name) =>
  name
    .split('-')
    .map((s) => s[0].toUpperCase() + s.substring(1).toLowerCase())
    .join('')
const hookTemplate = (
  name
) => `import React, {useState, useEffect} from 'react';
export const use${camelCase(name)} = () => {};`
const pipeTemplate = (name) =>
  `export const ${name[0]}${camelCase(name).substring(1)} = () => {}`
const componentJSTemplate = (
  name
) => `import React, {useState, useEffect, FC} from 'react';
import Styles from './${name}.styles';

type Props = {};
const ${camelCase(name)}: FC<Props> = ({}) => {
    return (
        <Styles>
        </Styles>
    );
};

export default ${camelCase(name)};
`
const componentSCSSTemplate = (
  extraDir
) => `import styled from "styled-components";

export default styled.div\`\`;
`
const testTemplate = (name) => `import React from 'react';

test('${camelCase(name)} initial test', () => {
    expect(true).toBeTruthy();
});
`
const enumTemplate = (name) => `const ${camelCase(name)} = {
    
};
Object.freeze(${camelCase(name)});
export default ${camelCase(name)};
`
const managerTemplate = (name) => `export default class ${camelCase(
  name
)}Manager {
    
}`
const createComponent = (name, folder, d) => {
  const dir = `src/${folder}${d ? `/${d}` : ''}/${name}`
  if (d && !fs.existsSync(`src/${folder}/${d}`)) {
    logger.info(`creating folder in src/${folder}/${d}`)
    fs.mkdirSync(`src/${folder}/${d}`, '0744')
  }
  if (!fs.existsSync(dir)) {
    logger.info(`creating folder in ${dir}`)
    fs.mkdirSync(dir, '0744')
  }
  logger.info(`creating ${name}.component.tsx`)
  fs.writeFileSync(`${dir}/${name}.component.tsx`, componentJSTemplate(name))
  // logger.info(`creating ${name}.test.tsx`);
  // fs.writeFileSync(`${dir}/${name}.test.tsx`, testTemplate(name));
  logger.info(`creating ${name}.styles.ts`)
  fs.writeFileSync(`${dir}/${name}.styles.ts`, componentSCSSTemplate(!!d))
  exec(`git add ${dir}`)
}
const createManager = (name) => {
  const dir = 'src/managers'
  logger.info(`creating ${name}.manager.ts`)
  fs.writeFileSync(`${dir}/${name}.manager.ts`, managerTemplate(name))
  // logger.info(`creating ${name}.manager.test.ts`);
  // fs.writeFileSync(`${dir}/${name}.manager.test.ts`, testTemplate(name));
  exec(`git add ${dir}`)
}
const createHook = (name) => {
  const dir = 'src/hooks'
  logger.info(`creating ${name}.hook.tsx`)
  fs.writeFileSync(`${dir}/${name}.hook.tsx`, hookTemplate(name))
  exec(`git add ${dir}`)
}
const createPipe = (name) => {
  const dir = 'src/pipes'
  logger.info(`creating ${name}.pipe.ts`)
  fs.writeFileSync(`${dir}/${name}.pipe.ts`, pipeTemplate(name))
  // logger.info(`creating ${name}.pipe.test.ts`);
  // fs.writeFileSync(`${dir}/${name}.pipe.test.ts`, testTemplate(name));
  exec(`git add ${dir}`)
}
const createEnum = (name) => {
  const dir = 'src/enums'
  logger.info(`creating ${name}.enum.ts`)
  fs.writeFileSync(`${dir}/${name}.enum.ts`, enumTemplate(name))
  exec(`git add ${dir}`)
}

const createTypes = {
  page(name, dir) {
    createComponent(name, 'pages', dir)
  },
  component(name, dir) {
    createComponent(name, 'components', dir)
  },
  layout(name) {
    createComponent(name, 'layouts')
  },
  pipe: createPipe,
  manager: createManager,
  hook: createHook,
  enum: createEnum,
  form(name) {
    createComponent(name, 'components', 'forms')
  },
  graph(name) {
    createComponent(name, 'components', 'graphs')
  },
  command: ''
}
const create = ({ info, name, n, dir, d }) => {
  if (!createTypes[info[0]])
    return logger.error(
      `Invalid option. available options ${Object.keys(createTypes).join(', ')}`
    )
  if (!(name || n)) return logger.error('Required option name')
  createTypes[info[0]](name || n, dir || d)
}

module.exports.create = create
