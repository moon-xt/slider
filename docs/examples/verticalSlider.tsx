import Slider from 'rc-slider';
import React, { useState } from 'react';
import '../../assets/index.less';
import './verticalSlider.css';

const parentStyle: React.CSSProperties = {
  overflow: 'hidden',
};

export default () => {
  const [value, setValue] = useState<number>(0);

  const _renderMarks = () => {
    const style = {
      marginLeft: 16,
    };
    const _renderLabel = (num: number) => {
      const color = value === num ? '#4689D0' : '#CCD2E3';
      return (
        <div>
          <span style={{ color }}>-</span>
          <span style={{ marginLeft: 10, color }}>{num}</span>
        </div>
      );
    };

    const marks = {};
    for (let i = 0; i < 11; i++) {
      marks[i] = {
        style,
        label: i % 2 === 1 ? '' : _renderLabel(i),
      };
    }
    return marks;
  };

  return (
    <div style={parentStyle}>
      <div
        style={{
          width: 100,
          height: 300,
          marginBottom: 160,
          marginLeft: 50,
          marginTop: 50,
        }}
      >
        <Slider
          defaultValue={0}
          value={value}
          vertical={true}
          min={0}
          max={10}
          marks={_renderMarks()}
          marksGap={true}
          onChange={(value) => {
            setValue(value as number);
          }}
          onChangeComplete={(value) => {
            setValue(value as number);
          }}
          styles={{
            track: {
              background: `linear-gradient(to top, #D3E3F4, #4689D0)`,
              width: 29,
            },
            rail: {
              borderRadius: 14.5,
              border: '1px solid #CCD2E3',
              backgroundColor: '#fff',
              width: 29,
            },
            handle: {
              opacity: 1,
              height: 29,
              width: 29,
              marginLeft: 0,
              borderColor: '#4689D0',
              backgroundColor: '#4689D0',
              borderRadius: 14.5,
            },
          }}
          dots={false}
        />
      </div>
    </div>
  );
};
