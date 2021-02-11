const dialogflow = require("dialogflow");
const config = require("../config/keys");
// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(
  config.googleProjectID,
  config.dialogFlowSessionId
);

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("hello world");
  });
  app.post("/api/text_query", async (req, res) => {
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: req.body.text,
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
    };

    let responses = await sessionClient.detectIntent(request);

    res.send(responses[0].queryResult);
  });
  app.post("/api/event_query", (req, res) => {
    res.send("hello from event query");
  });
};
