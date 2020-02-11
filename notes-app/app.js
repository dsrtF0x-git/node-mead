// const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

yargs.command({
  command: "add",
  describe: "add a new note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "this is a body",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => notes.addNote(argv.title, argv.body)
})

yargs.command({
  command: "remove",
  describe: "remove a note",
  builder: {
    title: {
      describe: "note remover",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => notes.removeNote(argv.title)
})

yargs.command({
  command: "list",
  describe: "list something",
  handler: () => notes.listNotes()
})

yargs.command({
  command: "read",
  describe: "reading smth",
  builder: {
    title: {
      describe: "note reader",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => notes.readNotes(argv.title)
})

yargs.parse()



// const validator = require("validator");

// const notes = require("./notes");

// console.log(notes("abevegede"));

// console.log(validator.isURL("https://mead.io"));

// const add = require("./utils");
// console.log(add(10, 3));