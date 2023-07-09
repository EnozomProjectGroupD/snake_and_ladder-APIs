import app from "../app.js";
import createTables from "../database/createTabels.js";

const port = process.env.PORT || 3000;
createTables();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
