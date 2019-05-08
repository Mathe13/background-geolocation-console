// @flow
import React from 'react';
import { connect } from 'react-redux';
import { type GlobalState } from '~/reducer/state';

type Props = {|
  isWatching: boolean,
|};
const WatchModeWarning = ({ isWatching }: Props) =>
  <div
    style={{
      zIndex: 10000,
      display: isWatching ? '' : 'none',
      position: 'absolute',
      top: 22,
      left: '50%',
      transform: 'translateX(-50%)',
      borderRadius: 3,
      color: 'black',
      fontSize: 14,
      padding: 3,
      fontWeight: 'bold',
    }}
  >
    Você está no modo de vigia.Apenas a última localização está sendo exibida aqui
  </div>;

const mapStateToProps = (state: GlobalState) => ({
  isWatching: state.dashboard.isWatching,
});
export default connect(mapStateToProps)(WatchModeWarning);
