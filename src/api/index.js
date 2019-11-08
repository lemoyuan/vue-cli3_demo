import { stringify } from 'qs';
import request from '@/units/request';

export async function get(url, data) {
  return await request({
    url: `${url}${data ? `?${stringify(data, { arrayFormat: 'repeat' })}` : ''}`,
    method: 'get'
  });
}

export async function post(url, data) {
  return request({
    url,
    method: 'POST',
    data
  });
}

export async function del(url, data) {
  return request(`/jbdoctor/sys-api/${url}${data ? `?${stringify(data, { arrayFormat: 'repeat' })}` : ''}`, {
    method: 'DELETE'
  });
}

export async function upload(url, data) {
  return request(url, {
    method: 'UPLOAD',
    data
  });
}

export async function update(url, data) {
  return request({
    url: url,
    method: 'PUT',
    data
  });
}

export function getUserIP(url, params={}) {
  return new Promise((resolve,reject) =>{
    axios.get(url,{
      params:params
    })
    .then(response =>{
      resolve(response.data);
    })
    .catch(err =>{
      reject(err);
    })
  });
}