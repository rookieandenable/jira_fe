import React from 'react';
import { Select, SelectProps } from 'antd';
import { useAppSelector } from '@/hooks/store';
import { homeState } from '@/store/home';

interface BaseSelectProps extends SelectProps {
  setVal?: (value: number) => void;
  selVal?: number;
}

const BaseSelect: React.FC<BaseSelectProps> = (props) => {
  const { setVal, selVal } = props
  const state = useAppSelector(homeState)
  const res = state.membersList.map(item => ({
    value: item.id,
    label: item.name,
  }))

  return (
    <>
      <Select
        defaultValue={selVal || 5}
        options={res}
        onChange={(value) => {
          setVal && setVal(value)
        }}
      />
    </>
  );
};

export default BaseSelect;