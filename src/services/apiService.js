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
    return axios.post('/user/orders', req);
}

export function fetchUserOrders(req){
    return axios.post('/user/orders', req);
}