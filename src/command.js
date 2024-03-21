import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  newNote,
  getAllNotes,
  findNotes,
  removeNote,
  removeAllNotes,
} from "./notes.js";
import { listNotes } from "./utils.js";
import { start } from "./server.js";


const APP_VERSION = "1.0.0";

const displayAppInfo = () => {
  console.log(`Yuck Notes App (Version ${APP_VERSION})`);
  console.log(`
  Y   Y  U   U  CCCCC   K   K
   Y Y   U   U  C       K  K
    Y    U   U  C       K K
    Y    U   U  C       KK
    Y    U   U  C       K K
    Y     UUU   CCCCC   K   K
  `);
  console.log("Welcome to Yuck Notes App!");
  console.log("To see available commands, type 'yuck --help'");
};

yargs(hideBin(process.argv))
  .scriptName("yuck")
  .command(
    "new <note>",
    "create a new note",
    (yargs) => {
      return yargs.positional("note", {
        describe: "The content of the note you want to create",
        type: "string",
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const note = await newNote(argv.note, tags);
      console.log("Note added!", note.id);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags to add to the note",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async (argv) => {
      const notes = await getAllNotes();
      listNotes(notes);
    }
  )
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to note.content",
        type: "string",
      });
    },
    async (argv) => {
      const notes = await findNotes(argv.filter);
      listNotes(notes);
    }
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      const id = await removeNote(argv.id);
      if (id) {
        console.log("Note removed: ", id);
      } else {
        console.log("Note not found");
      }
    }
  )
  .command(
    "web [port]",
    "launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        describe: "port to bind on",
        default: 5000,
        type: "number",
      });
    },
    async (argv) => {
      const notes = await getAllNotes();
      start(notes, argv.port);
    }
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {
      await removeAllNotes();
      console.log("All notes removed");
    }
  )
  .command(
    "$0",
    "display app version and welcome visual",
    () => {},
    () => {
      displayAppInfo();
    }
  )
  .demandCommand(1)
  .parse();
