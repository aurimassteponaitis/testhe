import React, { forwardRef, ReactNode } from 'react';
import './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, onClick }, ref) => (
  <button ref={ref} onClick={onClick}>
    {children}
  </button>
));

export default Button;
