// Heavily inspired by 'tips.js' file in activity 22!!

const notes = require("express").Router();

// Destructures the functions found in the fsUtils.js helper file; makes them available for use in this script.
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
// Importing 3rd party npm module to generate a unique ID for each note created by user(s)
const uniqueId = require("generate-unique-id");

// anything that is being routed to '/api/notes' will happen here, below \/\/\/\/\/\/\/\/

// A GET request will execute the following:
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  // PATH NOTE: the file path below is being read relative to the location of the server.js file!
  // 'readFromFile' is an augmentation of the 'fs' method 'readFile', which returns a promise
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// A POST request will execute the following:
notes.post("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  // Destructures 'title' and 'text' properties from req.body object
  const { title, text } = req.body;
  // If both properties are present..
  if (title && text) {
    //... a new object is created, with these 3 properties \/\/\/
    const newNote = {
      title,
      text,
      // random id is generated by this module and assigned as value here
      id: uniqueId(),
    };
    // File is read and 'newNote' is appended
    readAndAppend(newNote, "./db/db.json");
    // Response is returned: JSON data of new note entry
    res.json(newNote);
  } else {
    // If 'title' & 'text' are undefined or otherwise falsy, this response is sent:
    res.send("Invalid note. Must include title and text!");
  }
});

// A delete request will execute the following:
notes.delete("/:id", (req, res) => {
  // reqId object takes in value of the query param following /api/notes.
  // The /:id param is determined by the front-end .js file: it pulls the id from an attribute stored in the html element upon which the delete icon was pressed.
  const reqId = req.params.id;
  // Reads contents from the notes database
  readFromFile("./db/db.json")
    .then((data) => {
      const parsedData = JSON.parse(data);
      // Creates a newNotes object, which stores a new array of notes that filters out the note whose ID matches the reqID
      const newNotes = parsedData.filter((note) => {
        // if the note's id does not match the reqId, note is retained in array
        return note.id !== reqId;
      });
      return newNotes;
    })
    .then((newNotes) => {
      // Note DB file is rewritten with the updated array
      writeToFile("./db/db.json", newNotes);
      res.json(newNotes);
    });
  return;
});

// notes router is exported
module.exports = notes;