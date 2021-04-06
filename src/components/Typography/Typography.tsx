import classNames from 'classnames';
import React from 'react';

import styles from './Typography.module.scss';

export enum TextSize {
  size14 = 'size14',
}

export enum TextColor {
  white = 'white',
  grey = 'grey',
}

interface TypographyProps {
  msg: string;
  size?: TextSize;
  color?: TextColor;
  className?: string;
  html?: boolean;
}

const Typography = ({ msg, size = TextSize.size14, color = TextColor.white, className, html }: TypographyProps) => {
  const computedClass = classNames(className, {
    [styles[size]]: size,
    [styles[color]]: color,
  });
  if (html) {
    return <span dangerouslySetInnerHTML={{ __html: msg }} className={computedClass} />;
  }
  return <span className={computedClass}>{msg}</span>;
};

export default Typography;
