# VidBits

VidBits, *the Capstone Project for the [Test Driven Development Codecademy Intensive](https://www.codecademy.com/pro/intensive/test-driven-development) course*, is a web application that allows a user to create, retrieve, update, and delete video posts.

## Getting Started

### Prerequisites

VidBits requires [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/get-npm) and [MongoDB](https://www.mongodb.com/).

### Installing

Clone this repository and change to the project directory.

`git clone git@github.com:bigbhowell/vidbits.git && cd vidbits`

Install the project dependencies

`npm install`

Run the Mongo daemon

`mongod --dbpath ~/your/path/to/mongo/data/here`

Start the application

`npm start`

Access the application in your browser

`http://localhost:4001`

### Running the tests

Run the VidBits test suite

`npm test`
