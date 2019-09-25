// caseManager.js 
const AWS = require('aws-sdk');

module.exports = {

  openCase: (event, context, callback) => {
    // Create a support case
    var myCaseID = event.inputCaseID;
    var myMessage = "Case " + myCaseID + ": opened...";   
    var result = {Case: myCaseID, Message: myMessage};
    callback(null, result);   
  },

  assignCase: () => {
    // Assign the support case and update the status message    
    var myCaseID = event.Case;    
    var myMessage = event.Message + "assigned...";    
    var result = {Case: myCaseID, Message: myMessage};
    callback(null, result);     
  },

  closeCase: () => {
    // Close the support case    
    var myCaseStatus = event.Status;    
    var myCaseID = event.Case;    
    var myMessage = event.Message + "closed.";    
    var result = {Case: myCaseID, Status : myCaseStatus, Message: myMessage};
    callback(null, result);
  }
  
}