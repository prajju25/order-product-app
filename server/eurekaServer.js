const Eureka = require('eureka-js-client').Eureka;
const eurekaHost = (process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || '127.0.0.1');
const eurekaPort = (process.env.EUREKA_PORT || 8761);
const hostName = (process.env.HOSTNAME || 'localhost');
const HTTP_URL = process.env.HTTP_URL;
const ipAddr = '127.0.0.1';

exports.registerWithEureka = function(appName, PORT) {
    const client = new Eureka({
        instance: {
            app: appName,
            hostName: hostName,
            ipAddr: ipAddr,
            statusPageUrl: HTTP_URL,
            port: {
                '$': PORT,
                '@enabled': 'true',
            },
            vipAddress: appName,
            dataCenterInfo: {
                '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                name: 'MyOwn',
            },
            registerWithEureka: true,
            fetchRegistry: true,
        },
        eureka: {
            host: eurekaHost,
            port: eurekaPort,
            servicePath: '/eureka/apps',
            maxRetries: 10,
            requestRetryDelay: 2000,
        },
    })
    return client;
};