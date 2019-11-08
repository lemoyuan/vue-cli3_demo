import Vue from 'vue';
import axios from 'axios';
// import { Toast } from 'mint-ui';
// import store from '@/store';
// import { getToken } from '@/units/auth';
import { Toast } from 'vant';

Vue.use(Toast);

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 100000 // request timeout
});

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '登录过期。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    var res = response.data;
    // if (typeof res.rc === 'undefined') return res;
    if (res.rc === 0) return Promise.resolve(res.data);
    Toast.fail(`${res.msg}`);
    return Promise.reject(new Error(res.msg));
  }
  Toast.fail('系统繁忙，请稍候再试。');
  // return Promise.reject(new Error(res.msg));
}

// request interceptor
service.interceptors.request.use(
  config => config,
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  checkStatus
);

service.interceptors.response.use(
  // response => response,
  checkStatus
);

export default service;
