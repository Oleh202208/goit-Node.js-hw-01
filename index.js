const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const { program } = require("commander");

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();
const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const addContacts = await addContact(name, email, phone);
      console.log(addContacts);
      break;

    case "remove":
      const removeContacts = await removeContact(id);
      console.log(removeContacts);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
