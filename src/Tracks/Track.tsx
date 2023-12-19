import cls from 'classnames';
import * as React from 'react';
import SliderContext from '../context';
import type { OnStartMove } from '../interface';
import { getOffset } from '../util';

export interface TrackProps {
  prefixCls: string;
  style?: React.CSSProperties;
  /** Replace with origin prefix concat className */
  replaceCls?: string;
  start: number;
  end: number;
  index: number;
  onStartMove?: OnStartMove;
}

const Track: React.FC<TrackProps> = (props) => {
  const { prefixCls, style, start, end, index, onStartMove, replaceCls } = props;
  const { direction, min, max, disabled, range, classNames, marksGap } =
    React.useContext(SliderContext);

  const trackPrefixCls = `${prefixCls}-track`;

  const offsetStart = getOffset(start, min, max);
  const newMin = marksGap ? min - 0.5 : min;
  const newMax = marksGap ? max + 0.5 : max;
  const offsetEnd = getOffset(end, newMin, newMax);

  // ============================ Events ============================
  const onInternalStartMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!disabled && onStartMove) {
      onStartMove(e, -1);
    }
  };

  // ============================ Render ============================
  const positionStyle: React.CSSProperties = {};

  switch (direction) {
    case 'rtl':
      positionStyle.right = `${offsetStart * 100}%`;
      positionStyle.width = `${offsetEnd * 100 - offsetStart * 100}%`;
      break;

    case 'btt':
      positionStyle.bottom = `${offsetStart * 100}%`;
      positionStyle.height = `${offsetEnd * 100 - offsetStart * 100}%`;
      break;

    case 'ttb':
      positionStyle.top = `${offsetStart * 100}%`;
      positionStyle.height = `${offsetEnd * 100 - offsetStart * 100}%`;
      break;

    default:
      positionStyle.left = `${offsetStart * 100}%`;
      positionStyle.width = `${offsetEnd * 100 - offsetStart * 100}%`;
  }

  const className =
    replaceCls ||
    cls(
      trackPrefixCls,
      {
        [`${trackPrefixCls}-${index + 1}`]: index !== null && range,
        [`${prefixCls}-track-draggable`]: onStartMove,
      },
      classNames.track,
    );

  return (
    <div
      className={className}
      style={{ ...positionStyle, ...style }}
      onMouseDown={onInternalStartMove}
      onTouchStart={onInternalStartMove}
    />
  );
};

export default Track;
