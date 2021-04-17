/** @type {import("snowpack").SnowpackUserConfig } */

const httpProxy = require("http-proxy");
const proxy = httpProxy.createServer({ target: "http://localhost:3000" });

module.exports = {
  env: {
    REACT_APP_WEBSOCKET_ENDPOINT: "ws://localhost:8080/query",
  },
  mount: {
    public: "/",
    src: "/dist",
  },
  plugins: [
    /* ... */
  ],
  routes: [
    {
      src: "/query.*",
      dest: (req, res) => {
        proxy.web(req, res);
      },
      upgrade: (req, socket, head) => {
        proxy.ws(req, socket);
      },
    },
    /* Enable an SPA Fallback in development: */
    { match: "routes", src: ".*", dest: "/index.html" },
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
