# mongoDB TODO list (CRUD Application)

## About

TODO list CRUD app made with `Node.js`, `Express` and `mongoDB` for backend backend and `HTML5`, `CSS` and `Javascript` for front-end.

## Usage:

The application has two distinguishable elements: an input form and a todo list.

Whenever you create a todo, it will appear in the list with two additional buttons: _Edit_ and _Delete_. Delete will delete your todo from the database whilst edit will take the value from the input form and use it to replace the chosen todo.

## How to use locally:

1. Clone this repo.

2. Install dependencies with `npm install` or `yarn install`.

3. Start your `mongoDB` service (be sure that you're using the port specified in `config.js`).

4. Run the application: `node index.js`. You should see a message in your terminal: Connected to database, app listening on port `<port you specified in config.js>`.

### \*Prerequisites:

- Have [`Node.js`]('https://nodejs.org/') and `npm` installed.

- Have [`mongoDB`]('https://www.mongodb.com/') installed.

## Troubleshooting:

If your terminal shows the `Unable to connect to the database.` message, it means that you haven't started `mongoDB` or that your service is **running on a different port** than the one you should be running it with (specified in `config.js`). Ensure yourself that `mongoDB` is running by typing the command `mongod` in your terminal (before running the application).

---

## Inspiration

- \*_Based on [this video]('https://www.youtube.com/watch?v=CyTWPr_WwdI')_.
- Design is inspired by [Bootstrap]('https://getbootstrap.com/').
