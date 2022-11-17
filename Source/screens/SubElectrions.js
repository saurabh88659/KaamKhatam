import {View, Text} from 'react-native';
import React from 'react';
import InverterStabilizer from './InverterStabilizer';
import RoomHeater from './RoomHeater';
import McbandFuse from './McbandFuse';
import FanandLight from './FanandLight';
import SwitchandSocket from './SwitchandSocket';

export default function SubElectrions({props}) {
  const preData = props.route.params;

  if (preData === 0) {
    return (
      <>
        <InverterStabilizer props={props} />
      </>
    );
  }
  if (preData === 1) {
    return (
      <>
        <RoomHeater props={props} />
      </>
    );
  }
  if (preData === 2) {
    return (
      <>
        <McbandFuse props={props} />
      </>
    );
  }
  if (preData === 3) {
    return (
      <>
        <FanandLight props={props} />
      </>
    );
  }
  if (preData === 4) {
    return (
      <>
        <SwitchandSocket props={props} />
      </>
    );
  }
  return <View></View>;
}
