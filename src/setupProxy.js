const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){
	app.use(
		createProxyMiddleware ('/user/login',{
		target: 'http://localhost:8081',
		changeOrigin: true
		})
    );
    app.use(
        createProxyMiddleware ('/product/all',{
        target: 'http://localhost:8082',
        changeOrigin: true
        })
    );
    app.use(
        createProxyMiddleware ('/product/product',{
        target: 'http://localhost:8082',
        changeOrigin: true
        })
    );
    app.use(
        createProxyMiddleware ('/order-application/orderSave',{
        target: 'http://localhost:8082',
        changeOrigin: true
        })
    );
    app.use(
        createProxyMiddleware ('/order-application/allOrders',{
        target: 'http://localhost:8082',
        changeOrigin: true
        })
    );
}
