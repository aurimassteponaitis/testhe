import React, { useRef } from 'react';
import styles from './Toolbar.module.scss';
import Typography, { TextColor } from '@Components/Typography';
import Button from '@Components/Button';
// FIXME
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Info from '@Images/info.svg';

interface ToolbarProps {
  onButtonClick: () => void;
}

const Toolbar = ({ onButtonClick }: ToolbarProps) => {
  const ref = useRef<HTMLButtonElement>();

  return (
    <div className={styles.container}>
      <Typography msg="TESTHY" className={styles.title} />

      <div className={styles.rightSideContainer}>
        <img src={Info} className={styles.infoIcon} />
        <Typography
          html
          color={TextColor.grey}
          msg={`Press <span class=${styles.spacebar}>spacebar</span> to shuffle or`}
          className={styles.info}
        />
        <Button
          ref={ref}
          onClick={() => {
            // avoid to trigger button on press space key
            ref.current.blur();
            onButtonClick();
          }}
        >
          <Typography msg="Click here" />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
