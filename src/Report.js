import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactHighcharts from 'react-highcharts';

import Utilities from './Utilities';
import InfoTable from './InfoTable';
import ChartTools from './ChartTools';

class Report extends Component {

  /*
    BusinessCapability -> Domain
    Process -> Use Case
    UserGroup -> Persona
    Project -> Epic
    Application -> Bounded Context
    Interface -> Behavior
    DataObject -> Data Object
    ITComponent -> IT Component
    Provider -> Provider
    TechnicalStack -> Technical Stack
    */

  /*
  constructor(setup) {
    this.setup = setup;
  }
  */

  constructor(props) {
    super(props);
    this._initReport = this._initReport.bind(this);
    this._createConfig = this._createConfig.bind(this);
  }

  _initReport(setup) {
    this.setup = setup;
    lx.init().then(lx.ready(this._createConfig));
  }

  _createConfig() {
    return {
      facets: [{
        attributes: ['displayName', 'type',
        `subscriptions {
          edges {
            node {
              id
              type
              user {
                displayName
              }
            }
          }
        }`],
        callback: this.render.bind(this)
      }]
    };
  }

  render(data) {
    let fsTypes = {'BusinessCapability': 'Domain', 'Process': 'Use Case', 'UserGroup': 'Persona',
    'Project': 'Epic', 'Application': 'Bounded Context', 'Interface': 'Behavior', 'DataObject': 'Data Object',
    'ITComponent': 'IT Component', 'Provider': 'Provider', 'TechnicalStack': 'Technical Stack'};
    let fsKeys = _.keys(fsTypes);

    let subTypes = data.map(fs => {
      return {
        fs: fs,
        subType: Utilities.computeSubType(fs)
      }
    });
    let subCounts = ChartTools.countSubTypes(subTypes);

    let n = 0;
    /*
    for (let i = 0; i < fsKeys.length; i++) {
      // Erase each div's contents
      $(`#chart${i}`).html('');

      // Only rewrite new data into the div if it exists
      if (subCounts[fsKeys[i]]) {
        let subPercents = Utilities.computeSubPercents(subCounts[fsKeys[i]]);
        ChartTools.createHighchart(fsKeys[i], subPercents, fsTypes, data, n);
        n += 1;
      }
    }
    // ===============
    ReactDOM.render(<div id={'chart' + n}></div>, document.getElementById('report'));
    let subPercents = Utilities.computeSubPercents(subCounts[fsKeys[0]]);
    ReactDOM.render(ChartTools.createHighchart(fsKeys[0], subPercents, fsTypes, data, 0), document.getElementById('test'));
    */
    return <h1>React Component Test</h1>;
  }
}

export default Report;