import Animator from './animator.component'

test('should Animator linear function base cases work', () => {
  expect(Animator.LINEAR(0)).toEqual(0)
  expect(Animator.LINEAR(1)).toEqual(1)
})
test('should Animator ease function base cases work', () => {
  expect(Animator.EASE(0)).toEqual(0)
  expect(Animator.EASE(1)).toEqual(1)
})
test('should Animator ease-in function base cases work', () => {
  expect(Animator.EASE_IN(0)).toEqual(0)
  expect(Animator.EASE_IN(1)).toEqual(1)
})
test('should Animator ease-out function base cases work', () => {
  expect(Animator.EASE_OUT(0)).toEqual(0)
  expect(Animator.EASE_OUT(1)).toEqual(1)
})
test('should Animator spring function base cases work', () => {
  expect(Animator.SPRING(1)(0)).toEqual(0)
  expect(Animator.SPRING(1)(1)).toEqual(1)
  expect(Animator.SPRING(2)(0)).toEqual(0)
  expect(Animator.SPRING(2)(1)).toEqual(1)
  expect(Animator.SPRING(5)(0)).toEqual(0)
  expect(Animator.SPRING(5)(1)).toEqual(1)
  expect(Animator.SPRING(-5)(0)).toEqual(0)
  expect(Animator.SPRING(-5)(1)).toEqual(1)
})
test('should Animator linear function middle cases work', () => {
  expect(Animator.LINEAR(0.5)).toEqual(0.5)
  expect(Animator.LINEAR(0.8)).toEqual(0.8)
  expect(Animator.LINEAR(0.66)).toEqual(0.66)
})
test('should Animator spring function middle cases work', () => {
  expect(Animator.SPRING(1)(0.25)).toEqual(1)
  expect(Animator.SPRING(1)(0.75)).toEqual(1)
  expect(Animator.SPRING(2)(0.125)).toEqual(1)
  expect(Animator.SPRING(2)(0.625)).toEqual(1)
  expect(Animator.SPRING(10)(0.025)).toEqual(1)
  expect(Animator.SPRING(10)(0.425)).toEqual(1)
  expect(Animator.SPRING(10)(0.875)).toEqual(1)
})
