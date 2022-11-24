const { rejects } = require('assert');
const { generateKey } = require('crypto');
const fs = require('fs');
const inquirer = require('inquirer');
const { resolve } = require('path');
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const employeeArr = [];

const mainMenu = async () => {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "",
            choices: ["Add a team", "Exit"],
        },
    ]);
    switch (answer,menu) {
        case "Add a team":
            return addManager;
        case "Exit":
            break;
    }
};

const addManager = async () => {
    const { name, id, email, officeNumber } = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "what is the manager's name?",
            validate: validateName
        },
        {
            type: "input",
            name: "id",
            message: "what is the manager's ID?",
            validate: validateId
        },
        {
            type: "input",
            name: "email",
            message: "what is the manager's email?",
            validate: validateEmail  
        },
        {
            type: "input",
            name: "officeNumber",
            message: "what is the manager's office number?",
            validate: (officeInput) => {
                if(officeInput) {
                    return true;
                }else {
                    console.log("Please enter manager's office number");
                    return false;
                }
            },
        },
    ]);
    const manager = new Manager (name, id, email, officeNumber);
    employeeArr.push(manager);
    return addUser();
};

const addUser = async () => {
    const choices = await inquirer
    .prompt({
        type: "list",
        name: "role",
        message: "Which employee are you add?",
        choices: ["Engineer", "Intern"],
    });
    switch (choices,role) {
        default:
            case "Engineer":
                return addingEngineer();
            case "Intern":
                return addingIntern();
    }
};

function validateName(name) {
    if (name) {
      return true;
    } else {
      console.log("Please enter name");
      return false;
    }
  }
  function validateId(id) {
    if (id) {
      if (employeesArr.map(({id}) => id).includes(id)) {
        console.log("That ID already exists");
        return false;
      }
      return true;
    } else {
      console.log("Please enter an ID");
      return false;
    }
  }
  
  function validateEmail(email) {
    if (email) {
      if (employeesArr.map(({email}) => email).includes(email)) {
        console.log("That email already exists");
        return false;
      }
      return true;
    } else {
      console.log("Please enter an email");
      return false;
    }
  }

  const addEngineer = async () => {
    const { name, id, email, github, addAnother } = await inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name",
            validate: validateName
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's ID",
            validate: validateId
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email",
            validate: validateEmail
        },
        {
            type: "input",
        name: "github",
        message: "What's your engineer's GitHub username",
        validate: (githubInput_1) => {
          if (githubInput_1) {
            return true;
          } else {
            console.log("Please enter the engineer's GitHub username");
            return false;
          }
        },
        },
        {
            type: "confirm",
            name: "addAnother",
            message: "Do you want yo add another employee",
            default: "true",
        },
    ]);
    employeeArr.push(new Engineer(name, id, email, github));
    if (addAnother) {
        return addUser();
    }
    return employeeArr;
  };

  const addIntern =  async () => {
    const { name, id, email, school, addAnother } = await inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the Intern's name",
        validate: validateName
      },
      {
        type: "input",
        name: "id",
        message: "What is the Intern's ID",
        validate: validateId
      },
      {
        type: "input",
        name: "email",
        message: "What is the Intern's email",
        validate: validateEmail
      },
      {
        type: "input",
        name: "school",
        message: "What is the Intern's school",
        validate: (schoolInput) => {
         if (schoolInput) {
          return true;
         } else {
          console.log("Please enter Intern's school");
         }
        },
      },
      {
        type: "confirm",
        name: "addAnother",
        message: "Do you want to add another employee",
        default: "true",
      },
    ]);
    employeeArr.push(new Intern(name, id, email, school));
    if(addAnother) {
      return addUser();
    } 
    return employeeArr;
  };

  const writeToFile = (data) => {
    return new Promise((resolve, reject) => {
      fs.writeFile("./dist/index.html", data, (err) => {
        if (err) {
          reject(err);
          return;
        }
          resolve({
            ok:true,
            message: "HTML page created",
          });
      });
    });
  };

  function init() {
    mainMenu()
    .then((Response)=> {
      return generate.generatePage(Response);
    })
    .then((res)=>{
      writeToFile(res);
      console.log("Success");
    });
  }
  init();