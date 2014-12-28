### Groceries

A real-time, collaborative grocery list.

Front-end is built using React.js and the Flux pattern. Persistence layer terminology stolen from [Datomic](http://www.datomic.com/), which the back-end architecture will eventually mimic.

### Usage

Requires [bower](http://bower.io/), [npm](https://www.npmjs.com/), and [redis](http://redis.io/). I recommend you use a simple command-line tool like [http-server](https://www.npmjs.com/package/http-server) to host in development.

To launch the front-end:
```bash
  $ cd app
  $ bower install
  $ http-server index.js -p 8080
```

To launch redis:
```bash
  $ redis-server --port 6379
```

To launch the back-end:
```bash
  $ cd persistence
  $ node index.js
```
