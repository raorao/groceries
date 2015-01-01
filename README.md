### Groceries

A real-time, collaborative grocery list.

Front-end is built using React.js and the Flux pattern. Persistence layer terminology stolen from [Datomic](http://www.datomic.com/), which the back-end architecture roughly mimics.

### Usage

Requires [bower](http://bower.io/), [npm](https://www.npmjs.com/), and [redis](http://redis.io/).

To launch redis:
```bash
  $ redis-server --port 6379
```

To install dependencies and launch application:
```bash
  $ npm install
  $ bower install
  $ npm start
```

The site should now be visible at http://0.0.0.0:3000/ .


