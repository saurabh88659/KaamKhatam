import {View, Text} from 'react-native';
import React from 'react';
import Pedicure from './Pedicure';
import Bleach from './Bleach';
import Chocolatewax from './Chocolatewax';
import HairColor from './HairColor';
import Manicure from './Manicure';
import Cleanup from './Cleanup';
import Threading from './Threading';

export default function SubSalonSpaforwomen2(props) {
  const preData = props.route.params;

  if (preData === 0) {
    return (
      <>
        <HairColor props={props} />
      </>
    );
  }
  if (preData === 1) {
    return (
      <>
        <Manicure props={props} />
      </>
    );
  }
  if (preData === 2) {
    return (
      <>
        <Pedicure props={props} />
      </>
    );
  }
  if (preData === 3) {
    return (
      <>
        <Bleach props={props} />
      </>
    );
  }
  if (preData === 4) {
    return (
      <>
        <Cleanup props={props} />
      </>
    );
  }
  if (preData === 5) {
    return (
      <>
        <Threading props={props} />
      </>
    );
  }
  if (preData === 6) {
    return (
      <>
        <Chocolatewax props={props} />
      </>
    );
  }

  return <View></View>;
}
