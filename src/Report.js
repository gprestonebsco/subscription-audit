import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactHighcharts from 'react-highcharts';

import Utilities from './Utilities';
import InfoTable from './InfoTable';
import ChartTools from './ChartTools';

const LOADING_INIT = 0;
const LOADING_NEW_DATA = 1;
const LOADING_SUCCESSFUL = 2;
const LOADING_ERROR = 3;

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
    this.loadingState = LOADING_INIT;
  }

  componentDidMount() {
		lx.init().then(this._initReport);
	}

  _initReport(setup) {
    this.setup = setup;
    lx.ready(this._createConfig());
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
        callback: (data) => {
          this.data = data;
          this._computeData();
        }
      }]
    };
  }

  _computeData() {
    this.loadingState = LOADING_SUCCESSFUL;
  }

  render() {
    switch(this.loadingState) {
      case LOADING_INIT:
        return <h1>Initializing...</h1>;
      case LOADING_NEW_DATA:
        return <h1>How did you get here?</h1>;
      case LOADING_SUCCESSFUL:
        console.log('Data:');
        console.log(data);
        return <h1>React Component Test</h1>;
      case LOADING_ERROR:
        return <h1>Error somehow?</h1>;
      default:
        throw new Error('Unknown loading state: ' + this.loadingState);
    }
    /*
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
  }
}

export default Report;