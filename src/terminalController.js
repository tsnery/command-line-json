import DraftLog from "draftlog";
import chalkTable from "chalk-table";
import chalk from "chalk";
import readline from "readline";

import Person from "./person.js";

export default class TerminalController {
  constructor() {
    this.print = {};
    this.data = [];
    this.terminal = {};
  }
  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin);
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.initializeTable(database, language);
  }

  initializeTable(database, language) {
    const data = database.map((item) => new Person(item).formatted(language));
    const table = chalkTable(this.getTableOptions(), data);

    this.print = console.draft(table);
    this.data = data;
  }

  question(msg = "") {
    return new Promise((resolve) => this.terminal.question(msg, resolve));
  }

  updateTable(item) {
    this.data.push(item);
    this.print(chalkTable(this.getTableOptions(), this.data));
  }

  closeTerminal() {
    this.terminal.close();
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.whiteBright("ID") },
        { field: "vehicles", name: chalk.cyanBright("Vehicles") },
        { field: "kmTraveled", name: chalk.magentaBright("KM Traveled") },
        { field: "from", name: chalk.green("From") },
        { field: "to", name: chalk.red("To") },
      ],
    };
  }
}
