import classNames from 'classnames';
import * as React from 'react';
import SliderContext from '../context';
import { getDirectionStyle } from '../util';

export interface MarkProps {
  prefixCls: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  value: number;
  onClick: (value: number) => void;
}

const Mark: React.FC<MarkProps> = (props) => {
  const { prefixCls, style, children, value, onClick } = props;
  const { min, max, direction, includedStart, includedEnd, included, marksGap } =
    React.useContext(SliderContext);

  const textCls = `${prefixCls}-text`;

  // ============================ Offset ============================
  const newMin = marksGap ? min - 0.5 : min;
  const newMax = marksGap ? max + 0.5 : max;
  const positionStyle = getDirectionStyle(direction, value, newMin, newMax);

  return (
    <span
      className={classNames(textCls, {
        [`${textCls}-active`]: included && includedStart <= value && value <= includedEnd,
      })}
      style={{ ...positionStyle, ...style }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onClick={() => {
        onClick(value);
      }}
    >
      {children}
    </span>
  );
};

export default Mark;
