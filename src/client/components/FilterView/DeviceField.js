// @flow
import React from 'react';
import _ from 'lodash';

import { Dropdown, Input } from 'react-toolbox';

type Props = {
  onChange: (value: string) => any,
  source: { value: string, label: string }[],
  hasData: boolean,
  value: ?string,
};

const DeviceField = ({ onChange, source, hasData, value }: Props) => {
  const entry = _.find(source, { value: value });
  const text = !entry ? 'Nenhum dispositivo presente' : entry.label;
  return source.length > 1
    ? < Dropdown auto label = 'Dispositivo'
    onChange = {
      onChange
    }
    source = {
      source
    }
    value = {
      value
    }
    />
    : hasData
      ? < Input label = 'dispositivo'
      readOnly value = {
        text
      }
      />
      : < Input label = 'dispositivo'
      readOnly value = 'Loading devices ...' / > ;
};

export default DeviceField;
