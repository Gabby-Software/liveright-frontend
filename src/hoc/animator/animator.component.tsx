import React, {useState, useEffect} from 'react';

export type AnimatorProps = {
    value: number;
    duration: number;
    func?: (x: number) => number;
    children: React.ComponentType<{value: number}>;
};

const Animator = ({value, duration, func, children: Children}: AnimatorProps) => {
    const [val, setVal] = useState(value);
    const [startTime, setStartTime] = useState(0);
    useEffect(() => {
      setStartTime(new Date().getTime());
    }, [value]);
    useEffect(() => {
        frame();
    }, [startTime]);
    const frame = () => {
      if(val === value) return;
      const progress = (new Date().getTime() - startTime) / duration;
      if(progress >= 1) return setVal(value);
      const linear = (x:number) => x;
      setVal(val + (value-val) * (func || linear)(progress));
      requestAnimationFrame(frame);
    };
    return <Children value={val}/>;
};
Animator.LINEAR = (x:number) => x;
Animator.EASE_OUT = (x:number) => +(Math.sin(x * Math.PI / 2)).toFixed(5);
Animator.EASE_IN = (x:number) => +(Math.sin(Math.PI * 3 / 2 + x * Math.PI / 2) + 1).toFixed(5);
Animator.EASE = (x:number) => +((Math.cos(Math.PI + x * Math.PI) + 1) / 2).toFixed(5);
Animator.SPRING = (volume:number = 1) => (x:number) => +(-((x-1)**2) * Math.cos(x * volume * Math.PI * 2)+1).toFixed(5);
export default Animator;
