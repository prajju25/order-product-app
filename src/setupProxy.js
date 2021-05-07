const proxy = require('http-proxy-middleware');

module.exports = function(app){
	app.use(
		proxy('/user/login',{
		target: 'http://localhost:8081',
		changeOrigin: true
		})
    );
    app.use(
        proxy('/user/products',{
        target: 'http://localhost:8082',
        changeOrigin: true
        })
    );
}
