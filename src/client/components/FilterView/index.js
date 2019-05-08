// @flow
import React from 'react';
import formatDate from '~/utils/formatDate';

import DeviceField from './DeviceField';
import DeleteDeviceLink from './DeleteDeviceLink';
import CompanyTokenField from './CompanyTokenField';
import CustomMarkers from './CustomMarkers';

import { connect } from 'react-redux';
import { Input } from 'react-toolbox';

import { type GlobalState } from '~/reducer/state';
import {
  type Device,
  type CompanyToken,
  reload,
  changeDeviceId,
  changeCompanyToken,
  changeStartDate,
  changeEndDate,
  changeIsWatching,
  changeShowMarkers,
  changeShowPolyline,
  changeShowGeofenceHits,
  changeMaxMarkers,
} from '~/reducer/dashboard';

import { AppBar, Button, DatePicker, TimePicker, Switch, Checkbox, Card } from 'react-toolbox';

import Styles from '~/assets/styles/app.css';

type StateProps = {|
  hasData: boolean,
  devices: { value: string, label: string }[],
  deviceId: string,
  companyTokens: { value: string, label: string }[],
  companyToken: string,
  startDate: Date,
  endDate: Date,
  isWatching: boolean,
  showGeofenceHits: boolean,
  showPolyline: boolean,
  showMarkers: boolean,
  maxMarkers: number
|};
type DispatchProps = {|
  onReload: () => any,
  onChangeDeviceId: (deviceId: string) => any,
  onChangeCompanyToken: (companyToken: string) => any,
  onChangeStartDate: (date: Date) => any,
  onChangeEndDate: (date: Date) => any,
  onChangeIsWatching: (value: boolean) => any,
  onChangeShowMarkers: (value: boolean) => any,
  onChangeShowPolyline: (value: boolean) => any,
  onChangeShowGeofenceHits: (value: boolean) => any,
  onChangeMaxMarkers: (value: number) => any,
|};
type Props = {| ...StateProps, ...DispatchProps |};
const FilterView = function ({
  hasData,
  devices,
  deviceId,
  companyTokens,
  companyToken,
  startDate,
  endDate,
  isWatching,
  showGeofenceHits,
  showPolyline,
  showMarkers,
  maxMarkers,
  onReload,
  onChangeDeviceId,
  onChangeCompanyToken,
  onChangeStartDate,
  onChangeEndDate,
  onChangeIsWatching,
  onChangeShowMarkers,
  onChangeShowPolyline,
  onChangeShowGeofenceHits,
  onChangeMaxMarkers,
}: Props): React$Element<any> {
  return (
    <div className='filterView'>
      <AppBar title='Filtros' rightIcon='refresh' onRightIconClick={onReload} />
      <div className={Styles.content}>
        <Card style={{ marginBottom: '10px' }}>
          <div className={Styles.content}>
            <h3>Localizações</h3>
            <CompanyTokenField onChange={onChangeCompanyToken} source={companyTokens} value={companyToken} />
            <DeviceField onChange={onChangeDeviceId} source={devices} hasData={hasData} value={deviceId} />
            <DeleteDeviceLink />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <DatePicker
                label = 'Data de início'
                sundayFirstDayOfWeek
                autoOk
                style={{ flex: 1 }}
                onChange={onChangeStartDate}
                value={startDate}
                inputFormat={formatDate}
              />
              <TimePicker label='Tempo' style={{ flex: 1 }} onChange={onChangeStartDate} value={startDate} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <DatePicker
                label = 'Data de finalização'
                sundayFirstDayOfWeek
                autoOk
                style={{ flex: 1 }}
                onChange={onChangeEndDate}
                value={endDate}
                inputFormat={formatDate}
              />
              <TimePicker label='Tempo' style={{ flex: 1 }} onChange={onChangeEndDate} value={endDate} />
            </div>
            <Button icon='refresh' label='recarregar' style={{ width: '100%' }} raised primary onMouseUp={onReload} />

            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
              <label style={{ flex: 1 }}>Modo de vigia</label>
              <Switch checked={isWatching} onChange={onChangeIsWatching} style={{ flex: 1 }} />
            </div>
          </div>
        </Card>
        <Card style={{marginBottom: '10px'}}>
          <div className={Styles.content}>
            <h3>Mapa</h3>
            <Checkbox checked={showMarkers} label='Mostrar marcadores' onChange={onChangeShowMarkers} />
            <Checkbox checked={showPolyline} label='Mostrar linhas' onChange={onChangeShowPolyline} />
            {/* <Checkbox checked={showGeofenceHits} label='Show Geofences' onChange={onChangeShowGeofenceHits} /> */}
            <Input type="text" value={maxMarkers} label="Maxímo de marcadores" onChange={onChangeMaxMarkers} />
          </div>
        </Card>
        <Card>
          <CustomMarkers />
        </Card>
      </div>
    </div>
  );
};


const mapStateToProps = function (state: GlobalState): StateProps {
  return {
    deviceId: state.dashboard.deviceId,
    companyToken: state.dashboard.companyToken,
    startDate: state.dashboard.startDate,
    endDate: state.dashboard.endDate,
    devices: state.dashboard.devices.map((device: Device) => ({ value: device.id, label: device.name })),
    companyTokens: state.dashboard.companyTokens.map((companyToken: CompanyToken) => ({
      value: companyToken.id,
      label: companyToken.name,
    })),
    hasData: state.dashboard.hasData,
    isWatching: state.dashboard.isWatching,
    showGeofenceHits: state.dashboard.showGeofenceHits,
    showPolyline: state.dashboard.showPolyline,
    showMarkers: state.dashboard.showMarkers,
    maxMarkers: state.dashboard.maxMarkers,
  };
};

const mapDispatchToProps: DispatchProps = {
  onReload: reload,
  onChangeDeviceId: changeDeviceId,
  onChangeCompanyToken: changeCompanyToken,
  onChangeStartDate: changeStartDate,
  onChangeEndDate: changeEndDate,
  onChangeIsWatching: changeIsWatching,
  onChangeShowMarkers: changeShowMarkers,
  onChangeShowPolyline: changeShowPolyline,
  onChangeShowGeofenceHits: changeShowGeofenceHits,
  onChangeMaxMarkers: changeMaxMarkers,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterView);
