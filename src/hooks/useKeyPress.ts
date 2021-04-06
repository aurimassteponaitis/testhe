import { useEffect, useState } from 'react';

export const useKeyPress = (targetKeyCode: number) => {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  function downHandler({ keyCode }: KeyboardEvent) {
    if (keyCode === targetKeyCode) {
      setIsKeyPressed(true);
    }
  }

  const upHandler = ({ keyCode }: KeyboardEvent) => {
    if (keyCode === targetKeyCode) {
      setIsKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.addEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return isKeyPressed;
};
