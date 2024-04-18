// Import dependencies
const express = require("express");
const path = require("path");
const app = express();
// links router from routes/index.js file
const api = require("./routes/index.js");
// Assign PORT #
const PORT = 4040;

// Call middleware functions; make public dir available, add body parsing functions (backwards-compatibility)
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Creates a route for any request beginning with '/api' query param. Directs to the 'api' router, located at './routes/index.js'
app.use("/api", api);

// Add index.html to root path; http request w/o any query params will be directed to index.html
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// Add notes.html to /notes path. Http request followed by /notes query param will be directed to notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// Start server
app.listen(PORT, () => console.log(`Server up on http://localhost:${PORT}`));
