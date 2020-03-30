const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    //app.use(
    //    createProxyMiddleware("/api", {
    //        target: "http://localhost:8082",
    //       changeOrigin: false
    //    })
    //)
    app.use(
        createProxyMiddleware("/api", {
            target: "https://diy-backend-app.herokuapp.com",
            changeOrigin: true
        })
    )
}