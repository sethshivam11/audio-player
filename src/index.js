import connectDb from "./db/index.js";
import app from "./app.js";

const port = process.env.PORT || 3000;

connectDb()
  .then(() =>
    app.listen(port, () => console.log("Server is running on port " + port))
  )
  .catch((err) => console.log(`Something went wrong \n${err}`));
