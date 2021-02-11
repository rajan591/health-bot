const express = require("express");
const app = express();
app.use(express.json());

require("../backend/routes/dialogFlowRoutes")(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("server is started in port" + PORT);
});
