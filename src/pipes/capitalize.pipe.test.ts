import { capitalize } from './capitalize.pipe'

test('Capitalize should return right value', () => {
  expect(capitalize('yosef tukachinsky')).toEqual('Yosef Tukachinsky')
  expect(capitalize('trainer')).toEqual('Trainer')
  expect(capitalize('')).toEqual('')
  expect(capitalize(null)).toEqual('')
  expect(capitalize(undefined)).toEqual('')
  expect(capitalize('a b cd efg h i')).toEqual('A B Cd Efg H I')
})
