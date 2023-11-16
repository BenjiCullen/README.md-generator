
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

// Array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Welcome to my README generator. designed to generate high quality README files. To start please enter your full name:',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter your name to get started');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Please enter your GitHub username:',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub username so it is easier for people to find your work online');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter your email address:',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Please enter your email address so it is easier for people to contact you');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'title',
        message: 'What would you like the title of your project to be?',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Please enter your projects title, this is essential');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: "Please enter the description for your project here:",
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('you must enter a description for your project so that users will know what this project is for.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please enter any instructions for installation.',
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                console.log('Please enter any instructions for installation to help users to easily install you work');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please enter any instructions for usage:',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please providing detailed instructions for usage, this will help users properly navigate your project.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Can others contribute to this project? And how can others contribute to this project ?',
        validate: contributionInput => {
            if (contributionInput) {
                return true;
            } else {
                console.log('Please include detailed instructions on how others can contribute to your project.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Describe the tests written for your application and how to use them:',
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log('Please provide instructions on how others can contribute to your project.');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmLicenses',
        message: 'Would you like to include a license?',
        default: false
    },
    {
        type: 'list',
        name: 'licenses',
        message: 'Which license would you like to use?',
        choices: ['MIT', 'Apache', 'GNU'],
        when: ({ confirmLicenses }) => {
            if (confirmLicenses) {
                return true;
            } else {
                return false;
            }
        }
    },
];

// Function to write README file
const writeToFile = data => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./OutputReadme/README.md', data, err => {
            if (err) {
                reject (err);
                return;
            }
            resolve({
                ok: true,
                message: console.log('congrats, please navigate to the "OutputReadme" folder to see your README!')
            });
        })
    })
}

// Initialize app
const init = () => {
    return inquirer.prompt(questions);
}

// Function call to initialize app
init()
.then(userInput => {
    return generateMarkdown(userInput);
})
.then(readmeInfo => {
    return writeToFile(readmeInfo);
})
.catch(err => {
    console.log(err);
})