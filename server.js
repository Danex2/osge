const app = require("./index");
const dotenv = require("dotenv").config();

app.listen(process.env.PORT, () => console.log(`App running`));
