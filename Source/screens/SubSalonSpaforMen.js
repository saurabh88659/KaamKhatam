import {View, Text} from 'react-native';
import React from 'react';
import HairCut from './HairCut';
import Haircolormen2 from './Haircolormen2';
import ShavebeardandMoustache from './ShavebeardandMoustache';
import Kindshaircut from './Kindshaircut';
import FacecareMen from './FacecareMen';
import MassageTherapyMen from './MassageTherapyMen';

export default function SubSalonSpaforMen(props) {
  const preData = props.route.params;

  if (preData === 0) {
    return (
      <>
        <HairCut props={props} />
      </>
    );
  }
  if (preData === 1) {
    return (
      <>
        <Haircolormen2 props={props} />
      </>
    );
  }
  if (preData === 2) {
    return (
      <>
        <ShavebeardandMoustache props={props} />
      </>
    );
  }
  if (preData === 3) {
    return (
      <>
        <Kindshaircut props={props} />
      </>
    );
  }
  if (preData === 4) {
    return (
      <>
        <FacecareMen props={props} />
      </>
    );
  }
  if (preData === 5) {
    return (
      <>
        <MassageTherapyMen props={props} />
      </>
    );
  }

  return <View></View>;
}
