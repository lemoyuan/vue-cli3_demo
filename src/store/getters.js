const getters = {
  imgUrl: state => state.user.imgUrl,
  userContent: state => state.user.userContent,
  uploadImg: state => state.consult.uploadImg,
  uploadImg2: state => state.upload.uploadImg2,//纸质处方上传
  shopDetail: state => state.consult.shopDetail,
  patientList: state => state.consult.patientList,
  checkedPatient: state => state.consult.checkedPatient,
  historyReicpe: state => state.consult.historyReicpe
};

export default getters;
