// Anything being routed to '/api/' will be directed here, to index.js
const router = require("express").Router();
// Importing the '/notes' router
const notesRouter = require("./notes");

// Any request made to /api/notes will be directed to the notes.js router
router.use("/notes", notesRouter);
// exporting the router
module.exports = router;
