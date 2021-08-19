import { classes } from './classes.pipe'

test('Classes pipe should return right value', () => {
  expect(classes(['hello', 'world'])).toEqual('hello world')
  expect(classes(['a', 'b', 'c'])).toEqual('a b c')
  expect(classes(['a', false, 'c'])).toEqual('a c')
  expect(classes([undefined, false, null])).toEqual('')
  expect(classes([[], {}])).toEqual('[object Object]')
})
