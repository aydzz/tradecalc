import { Transition } from 'react-transition-group';
import { useState } from 'react';

const duration = 100;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 1,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

const Fade = ({ in: inProp }) => (
  <Transition in={inProp} timeout={duration}>
    {state => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        I'm a fade Transition!
      </div>
    )}
  </Transition>
);

export default function TransitionComponent() {
    const [inProp, setInProp] = useState(false);
    return (
      <div>
        <Transition in={inProp} timeout={duration}>
            {state => (
                
            <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
            }}>
                {console.log(state)}
                Hello there...
            </div>
            )}
        </Transition>
        <button onClick={() => setInProp(!inProp)}>
          Click to Enter
        </button>
      </div>
    );
  }