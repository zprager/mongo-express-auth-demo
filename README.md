# mongo-express-auth-demo

A barebones user authentication Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Run your mongo locally with 'mongod'

Create a database called 'authdemo' if you want it to work right out of the box

```sh
$ git clone git@github.com:zprager/mongo-express-auth-demo.git # or clone your own fork
$ cd mongo-express-auth-demo
$ npm install
$ npm start
```
Use the 'Auth Demo.postman_collection.json' in root folder, and import it into PostMan.   It will seed your test collection.

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```

or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

You will also have to set up your mongo database on Heroku and update your connection link. 

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
