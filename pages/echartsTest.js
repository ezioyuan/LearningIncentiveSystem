import React from 'react';
import withRoot from '../libs/withRoot';
import EchartsTest from '../components/echarts';


class EchartsCreate extends React.Component {

  render() {
      return (
        <EchartsTest/>
      );
    }
}

export default withRoot(EchartsCreate);
