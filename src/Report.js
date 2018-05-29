import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Utilities from './Utilities';
import InfoTable from './InfoTable';
import ChartTools from './ChartTools';

export class Report {

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

  constructor(setup) {
    this.setup = setup;
  }

  createConfig() {
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
  }
}
