const {createProxyMiddleware} = require('http-proxy-middleware');
const USER_SERVICE = process.env.USER_SERVICE_URL;
const PRODUCT_SERVICE = process.env.PRODUCT_SERVICE_URL;
const ORDER_SERVICE = process.env.ORDER_SERVICE_URL;

module.exports = function(app){
	app.use(
		createProxyMiddleware ('/user/login',{
		target: USER_SERVICE,
		changeOrigin: true
		})
    );
    app.use(
        createProxyMiddleware ('/product/all',{
        target: PRODUCT_SERVICE,
        changeOrigin: true
        })
    );
    app.use(
        createProxyMiddleware ('/product/product',{
        target: PRODUCT_SERVICE,
        changeOrigin: true
        })
    );
    app.use(
        createProxyMiddleware ('/orderSave',{
        target: ORDER_SERVICE,
        changeOrigin: true
        })
    );
    app.use(
        createProxyMiddleware ('/orders',{
        target: ORDER_SERVICE,
        changeOrigin: true
        })
    );
}
