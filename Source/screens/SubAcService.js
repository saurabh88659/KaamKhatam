import {View, Text} from 'react-native';
import React from 'react';
import InstallationUninstallation from './InstallationUninstallation';
import Repair from './Repair';
import WindowACcheckup from './WindowACcheckup';
import SGPservices from './SGPservices';

function SubAcService(props) {
  const preData = props.route.params;

  if (preData === 0) {
    return (
      <>
        {/* <InstallationUninstallation props={props} /> */}
        <SGPservices props={props} />
      </>
    );
  }
  if (preData === 1) {
    return (
      <>
        <Repair props={props} />
      </>
    );
  }
  if (preData === 2) {
    return (
      <>
        <WindowACcheckup props={props} />
      </>
    );
  }

  return <View></View>;
}

export default SubAcService;
