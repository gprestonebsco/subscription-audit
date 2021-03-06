// Get the given type of subscribers for the given fact sheet
function getSubscriptionsOfType(fs, subscriptionType) {
  return fs.subscriptions.edges.filter(e => e.node.type === subscriptionType);
}

// Get string of subscriptions of type
function getSubscriptionNamesOfType(fs, subscriptionType) {
  return getSubscriptionsOfType(fs, subscriptionType).map(e => e.node.user.displayName).join(', ');
}

// Get all fact sheets of the given type
function getFactSheetsOfType(data, fsType) {
  return data.filter(fs => fs.type === fsType);
}

// Find the subType of the fact sheet
function computeSubType(fs) {
  let responsible = this.getSubscriptionsOfType(fs, 'RESPONSIBLE');
  let accountable = this.getSubscriptionsOfType(fs, 'ACCOUNTABLE');

  if (responsible.length === 0 && accountable.length === 0) {
    return 0;
  }
  else if (responsible.length !== 0 && accountable.length === 0) {
    return 1;
  }
  else if (responsible.length === 0 && accountable.length !== 0) {
    return 2;
  }
  else {
    return 3;
  }
}

// Convert subscription count data into percentage
function computeSubPercents(subCount) {
  let total = subCount.reduce((sum, val) => {
    return sum + val.y;
  }, 0, 0);
  return subCount.map(s => {
    return {
      name: s.name,
      y: s.y / total
    }
  })
}

// Get all fact sheets without a responsible or accountable tag (0)
function getNoResponsibleNoAccountable(data) {
  return data.filter(fs => this.getSubscriptionsOfType(fs, 'RESPONSIBLE').length === 0
  && this.getSubscriptionsOfType(fs, 'ACCOUNTABLE').length === 0);
}

// Get all fact sheets with responsible user(s) but no accountable user (1)
function getResponsibleNoAccountable(data) {
  return data.filter(fs => this.getSubscriptionsOfType(fs, 'RESPONSIBLE').length !== 0
  && this.getSubscriptionsOfType(fs, 'ACCOUNTABLE').length === 0);
}

// Get all fact sheets with no responsible user(s) but an accountable user (2)
function getNoResponsibleAccountable(data) {
  return data.filter(fs => this.getSubscriptionsOfType(fs, 'RESPONSIBLE').length === 0
  && this.getSubscriptionsOfType(fs, 'ACCOUNTABLE').length !== 0);
}

// Get all fact sheets with responsible and accountable user(s) (3)
function getResponsibleAccountable(data) {
  return data.filter(fs => this.getSubscriptionsOfType(fs, 'RESPONSIBLE').length !== 0
  && this.getSubscriptionsOfType(fs, 'ACCOUNTABLE').length !== 0);
}

// Get all fact sheets of the given type with the given subscription combination
function getRelevantFactSheets(data, fsType, subType) {
  let typeFiltered = this.getFactSheetsOfType(data, fsType);

  if (subType === 0) {
    return this.getNoResponsibleNoAccountable(typeFiltered);
  }
  else if (subType === 1) {
    return this.getNoResponsibleAccountable(typeFiltered);
  }
  else if (subType === 2) {
    return this.getResponsibleNoAccountable(typeFiltered);
  }
  else if (subType === 3) {
    return this.getResponsibleAccountable(typeFiltered);
  }
}

function subscriptionStringToSubType(subscriptionString) {
  let typeStrings = ['No responsible, no accountable', 'Accountable, no responsible',
  'Responsible, no accountable', 'Responsible and accountable'];
  return typeStrings.indexOf(subscriptionString);
}

export default {
  getSubscriptionsOfType: getSubscriptionsOfType,
  getSubscriptionNamesOfType: getSubscriptionNamesOfType,
  getFactSheetsOfType: getFactSheetsOfType,
  computeSubType: computeSubType,
  computeSubPercents: computeSubPercents,
  getNoResponsibleNoAccountable: getNoResponsibleNoAccountable,
  getResponsibleNoAccountable: getResponsibleNoAccountable,
  getNoResponsibleAccountable: getNoResponsibleAccountable,
  getResponsibleAccountable: getResponsibleAccountable,
  getRelevantFactSheets: getRelevantFactSheets,
  subscriptionStringToSubType: subscriptionStringToSubType
};