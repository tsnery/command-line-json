import database from "../database.json" assert { type: "json" };
import Person from "./person.js";
import TerminalController from "./terminalController.js";

const DEFAULT_LANGUAGE = "pt-BR";
const STOP_TERM = ":q";

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE);

async function mainLoop() {
  try {
    const answer = await terminalController.question("What? ");
    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log("process finished!");
      return;
    }
    const person = Person.generateInstanceFromString(answer);
    console.log("person", person.formatted());
    return mainLoop();
  } catch (error) {
    console.error("Something wrong happened!", error);
    return mainLoop();
  }
}

await mainLoop();
