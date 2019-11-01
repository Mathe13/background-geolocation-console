// @flow
import React from "react";
import _ from "lodash";

import { Dropdown, Input } from "react-toolbox";
import labelStyle from "../../assets/styles/labelStyle.css";

type Props = {
  onChange: (value: string) => any,
  source: { value: string, label: string }[],
  hasData: boolean,
  value: ?string
};

const DeviceField = ({ onChange, source, hasData, value }: Props) => {
  const entry = _.find(source, { value: value });
  const text = !entry ? "Nenhum dispositivo presente" : entry.label;
  return source.length > 1 ? (
    <Dropdown
      auto
      theme={labelStyle}
      label="Dispositivo"
      onChange={onChange}
      source={source}
      value={value}
    />
  ) : hasData ? (
    <div>
      <Input label="Dispositivo" theme={labelStyle} readOnly value={text} />
    </div>
  ) : (
    <div>
      <Input
        label="Dispositivo"
        theme={labelStyle}
        readOnly
        value="Loading devices ..."
      />
    </div>
  );
};

export default DeviceField;
