const dialogflow = require("dialogflow");
const structjson = require("./structjson");
//using structjson to convert my Javascript object to a Google protobuf.struct,
//since dialogflow doesnot support js object can also use (npm i pb-util)
// we cannot pass parameters to the payload of the detectIntent.
//When passing parameters to a new contexts (via createContext or detectIntent), you cannot just passa an object.

const config = require("../config/keys");
const ProjectID = config.googleProjectID;
const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey,
};
// Create a new session
const sessionClient = new dialogflow.SessionsClient({ ProjectID, credentials });
const sessionPath = sessionClient.sessionPath(
  config.googleProjectID,
  config.dialogFlowSessionId
);

module.exports = {
  textQuery: async function (text, parameters = {}) {
    let self = module.exports;
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: text,
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
      queryParams: {
        payload: {
          data: parameters,
        },
      },
    };
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);

    return responses;
  },
  handleAction: function (responses) {
    return responses;
  },
  // -------------------------------------------time to add event query--------------------//
  eventQuery: async function (event, parameters = {}) {
    let self = module.exports;
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          // The query to send to the dialogflow agent
          //When passing parameters to a new contexts (via createContext or detectIntent), you cannot just passa an object.

          name: event,
          parameters: structjson.jsonToStructProto(parameters),

          //   parameters: parameters,
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
    };
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);

    return responses;
  },
  handleAction: function (responses) {
    return responses;
  },
};
