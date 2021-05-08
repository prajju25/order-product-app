import axios from 'axios';

export function login(req){
    return axios.post('/user/login', req);
}

export function fetchAllProducts(){
    return axios.get('/product/all');
}

export function searchProducts(searchStr){
    return axios.get(`/product/product/${searchStr}`);
}

export function orderSave(req){
    return axios.post('/order-application/orderSave', req);
}

export function fetchUserOrders(userId){
    return axios.get(`/order-application/allOrders/${userId}`);
}