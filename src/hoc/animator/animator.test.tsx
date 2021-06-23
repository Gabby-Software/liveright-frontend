import Animator from "./animator.component";

test('should Animator linear function base cases work', () => {
    expect(Animator.LINEAR(0)).toEqual(0);
    expect(Animator.LINEAR(1)).toEqual(1);
});
test('should Animator ease function base cases work', () => {
    expect(Animator.EASE(0)).toEqual(0);
    expect(Animator.EASE(1)).toEqual(1);
});
test('should Animator ease-in function base cases work', () => {
    expect(Animator.EASE_IN(0)).toEqual(0);
    expect(Animator.EASE_IN(1)).toEqual(1);
});
test('should Animator ease-out function base cases work', () => {
    expect(Animator.EASE_OUT(0)).toEqual(0);
    expect(Animator.EASE_OUT(1)).toEqual(1);
});
test('should Animator spring function base cases work', () => {
    expect(Animator.SPRING(1)(0)).toEqual(0);
    expect(Animator.SPRING(1)(1)).toEqual(1);
    expect(Animator.SPRING(2)(0)).toEqual(0);
    expect(Animator.SPRING(2)(1)).toEqual(1);
    expect(Animator.SPRING(5)(0)).toEqual(0);
    expect(Animator.SPRING(5)(1)).toEqual(1);
    expect(Animator.SPRING(-5)(0)).toEqual(0);
    expect(Animator.SPRING(-5)(1)).toEqual(1);
});
