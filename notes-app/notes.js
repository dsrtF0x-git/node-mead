const fs = require("fs");
const chalk = require("chalk");

function getNotes(notes) {
  return `Your notes ${notes}`;
}

function addNote(title, body) {
  const notes = loadNotes();

  const duplicateNotes = notes
  .filter(note => note.title === title || note.body === body);

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);

    console.log("Note added")
  } else {
    console.log(chalk.red.bold("Note title taken"));
  }  
}

function removeNote(title) {
    const notes = loadNotes();
    const updatedNotes = notes.filter(note => note.title !== title);
    if (notes.length - updatedNotes.length === 1) {
      saveNotes(updatedNotes);
      console.log(chalk.green("Note was removed"));
    } else {
      console.log(chalk.red("There is no such note"));
    }
}

function saveNotes(notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
}

function listNotes() {
  const data = loadNotes();
  console.log(chalk.green(data.map(item => item.title).join('\n')));
}

function readNotes(title) {
  const data = loadNotes();
  const note = data.find(note => note.title === title);
  if (note) {
    console.log(note);
  } else {
    console.log(chalk.red("There is no such note title"));
  }
}

function loadNotes() {
  try {
    const data = fs.readFileSync("notes.json").toString();
    return JSON.parse(data);
  } catch (error) {
    return []; 
  }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes
};