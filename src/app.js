const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

require("./routes/index")(app);

app.listen(port, console.log(`App running at ${port}`));
