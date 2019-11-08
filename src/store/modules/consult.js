import { get, post } from '@/api';

export default {
  state: {
    activeKeIndex: 0,
    uploadImg: [],
    shopDetail: {},
    patientList: [],
    checkedPatient: {},
    historyReicpe: [],
    deptDisList: [],
    activeAllergies: false,
    allergies: '',
    diseases: '',
    consultType: 0, // 咨询方式：0为图文，1为视频
    initJsBridge: true,
    checkedDiease:[],
  },
  mutations: {
    ADD_DIEASE(state, data) {
      state.checkedDiease = [...state.checkedDiease,data];
    },
    DEL_DIEASE(state,i) {
      state.checkedDiease.splice(i, 1);
      // state.checkedDiease = [...data];
    },
    SET_ACTIVEKE(state, index) {
      state.activeKeIndex = index
    },
    SET_UPLOADIMG(state, imgUrl) {
      const tmp = state.uploadImg;
      tmp.push(imgUrl);
      state.uploadImg = tmp;
    },
    DEL_UPLOADIMG1(state, index) {
      const tmp = state.uploadImg;
      tmp.splice(index, 1);
      console.log(tmp,'tmp')
      state.uploadImg = tmp;
    },
    DEL_UPLOADIMG(state, data) {
      state.uploadImg = [...data];
    },
    SET_SHOPDETAIL(state, info) {
      state.shopDetail = { ...info };
    },
    SET_PATIENTLIST(state, data) {
      state.patientList = [...data];
    },
  },
  actions: {
    //是否需要新功能提示
    async isNewWarn(_, {
      payload
    }) {
      return await get('/retailshops/iteration', payload);
    },
    // 获取商铺详情
    async shopDetail({ commit }, { payload }) {
      const data = await get(`/retailshops/${payload.retailshop_id}`, payload);
      sessionStorage.setItem('retailshops', JSON.stringify(data));
      commit('SET_SHOPDETAIL', data);
    },
    // 上传处方图片
    async uploadImg({ commit }, { payload }) {
      const f = new FormData();
      f.append('file', payload);
      const data = await post('/upload', f);
      commit('SET_UPLOADIMG', data);
    },
 
    
    // 上传身份证
    async handleOcr(_, { payload }) {
      const data = await post('/patient/ocr', payload.image);
      return data
    },
  }
}
