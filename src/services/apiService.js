import axios from 'axios';

export function login(req){
    return axios.post('/user/login', req);
}

export function createUser(req){
    return axios.post('/user/createUser', req);
}

export function fetchAllProducts(){
    return axios.get('/product/all');
}

export function searchProducts(searchStr, userName){
    return axios.get(`/product/product/${searchStr}`, {
        headers: {
            'user-name': userName
        }
    });
}

export function orderSave(req){
    return axios.post('/orderSave', req);
}

export function fetchUserOrders(userId){
    return axios.get(`/orders/${userId}`);
}