// @flow
import React from "react";
import formatDate from "~/utils/formatDate";

import DeviceField from "./DeviceField";
import DeleteDeviceLink from "./DeleteDeviceLink";
import CompanyTokenField from "./CompanyTokenField";
import CustomMarkers from "./CustomMarkers";
import datepicker_theme from "../../assets/styles/datepicker.css";
import { connect } from "react-redux";
import { Input } from "react-toolbox";

import { type GlobalState } from "~/reducer/state";
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
  changeMaxMarkers
} from "~/reducer/dashboard";

import {
  AppBar,
  Button,
  DatePicker,
  TimePicker,
  Switch,
  Checkbox,
  Card
} from "react-toolbox";

import Styles from "~/assets/styles/app.css";

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
  onChangeMaxMarkers: (value: number) => any
|};
type Props = {| ...StateProps, ...DispatchProps |};
const FilterView = function({
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
  onChangeMaxMarkers
}: Props): React$Element<any> {
  return (
    <div className="filterView">
      <AppBar
        title="Filtros"
        rightIcon="refresh"
        className={Styles.uergsprimary}
        onRightIconClick={onReload}
      />
      <div className={Styles.content}>
        <Card style={{ marginBottom: "10px" }}>
          <div className={Styles.content}>
            <h3>Menu</h3>
            <CompanyTokenField
              onChange={onChangeCompanyToken}
              source={companyTokens}
              value={companyToken}
            />
            <DeviceField
              onChange={onChangeDeviceId}
              source={devices}
              hasData={hasData}
              value={deviceId}
            />
            <DeleteDeviceLink />
            <h4> Período de Coleta - clique para selecionar </h4>
            <div
              style={{
                "border-radius": "4px",
                border: "2px solid #ccc",
                marginBottom: "8px"
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <DatePicker
                  label="Data de início"
                  sundayFirstDayOfWeek
                  autoOk
                  theme={datepicker_theme}
                  style={{ flex: 1 }}
                  onChange={onChangeStartDate}
                  value={startDate}
                  inputFormat={formatDate}
                />
                <TimePicker
                  label="Hora de início"
                  style={{ flex: 1 }}
                  theme={datepicker_theme}
                  onChange={onChangeStartDate}
                  value={startDate}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <DatePicker
                  label="Data de finalização"
                  sundayFirstDayOfWeek
                  autoOk
                  theme={datepicker_theme}
                  style={{ flex: 1, marginTop: "20px" }}
                  onChange={onChangeEndDate}
                  value={endDate}
                  inputFormat={formatDate}
                />
                <TimePicker
                  label="Hora de finalização"
                  style={{ flex: 1, marginTop: "20px" }}
                  theme={datepicker_theme}
                  onChange={onChangeEndDate}
                  value={endDate}
                />
              </div>
            </div>
            <Button
              icon="refresh"
              label="recarregar"
              style={{ width: "100%" }}
              raised
              primary
              onMouseUp={onReload}
            />

            <div
              style={{ display: "flex", flexDirection: "row", marginTop: 10 }}
            >
              <label style={{ flex: 1 }}>Localização atual</label>
              <Switch
                checked={isWatching}
                onChange={onChangeIsWatching}
                style={{ flex: 1 }}
              />
            </div>
          </div>
        </Card>
        <Card style={{ marginBottom: "10px" }}>
          <div className={Styles.content}>
            <h3>Mapa</h3>
            <Checkbox
              checked={showMarkers}
              label="Mostrar pontos de leitura"
              onChange={onChangeShowMarkers}
            />
            <Checkbox
              checked={showPolyline}
              label="Mostrar rota percorrida"
              onChange={onChangeShowPolyline}
            />
            {/* <Checkbox checked={showGeofenceHits} label='Show Geofences' onChange={onChangeShowGeofenceHits} /> */}
            <Input
              type="text"
              value={maxMarkers}
              label="Numero de leituras a exibir"
              onChange={onChangeMaxMarkers}
            />
          </div>
        </Card>
        <Card>
          <CustomMarkers />
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = function(state: GlobalState): StateProps {
  return {
    deviceId: state.dashboard.deviceId,
    companyToken: state.dashboard.companyToken,
    startDate: state.dashboard.startDate,
    endDate: state.dashboard.endDate,
    devices: state.dashboard.devices.map((device: Device) => ({
      value: device.id,
      label: device.name
    })),
    companyTokens: state.dashboard.companyTokens.map(
      (companyToken: CompanyToken) => ({
        value: companyToken.id,
        label: companyToken.name
      })
    ),
    hasData: state.dashboard.hasData,
    isWatching: state.dashboard.isWatching,
    showGeofenceHits: state.dashboard.showGeofenceHits,
    showPolyline: state.dashboard.showPolyline,
    showMarkers: state.dashboard.showMarkers,
    maxMarkers: state.dashboard.maxMarkers
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
  onChangeMaxMarkers: changeMaxMarkers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterView);
