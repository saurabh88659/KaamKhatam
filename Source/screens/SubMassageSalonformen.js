import {View, Text} from 'react-native';
import React from 'react';
import StressReliefTherapiesMan from './StressReliefTherapiesMan';
import PainReliefTherapiesman from './PainReliefTherapiesman';
import HotStonesTherapyMan from './HotStonesTherapyMan';
import RelaxologyMan from './RelaxologyMan';

export default function SubMassageSalonformen(props) {
  const preData = props.route.params;

  if (preData === 0) {
    return (
      <>
        <StressReliefTherapiesMan props={props} />
      </>
    );
  }
  if (preData === 1) {
    return (
      <>
        <PainReliefTherapiesman props={props} />
      </>
    );
  }
  if (preData === 2) {
    return (
      <>
        <HotStonesTherapyMan props={props} />
      </>
    );
  }
  if (preData === 3) {
    return (
      <>
        <RelaxologyMan props={props} />
      </>
    );
  }

  return <View></View>;
}
