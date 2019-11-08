import request from '@/units/request'
import md5 from 'js-md5'
import headInfo from '@/units/interfaceHead'

const baseUrl = 'https://jbt-core.jianbaolife.com'

// 获取图片验证码
export function reciveImgCode (mobileNum) {
  const data = {}
  return request({
    url: `${baseUrl}/verify_code/get_image_code?mobileNo=${mobileNum}&authType=14&time=1533023554621`,
    method: 'get',
    responseType: 'arraybuffer',
    data
  })
}

// 发送短信验证码
export function sendCode (phoneNum, imgCode) {
  const data = {
    'mobileNo': phoneNum,
    'authType': '14',
    'imageCode': imgCode
  }
  const time = new Date().getTime().toString().substring(0, 10)
  const devModel = headInfo.getDeviceMode()
  const devNo = headInfo.getUUID()
  const sign = md5(`authType=14&mobileNo=${phoneNum}&nonce=15082040381508204038&salt=jianbaotong2017&timestamp=${time}`)
  return request({
    url: `${baseUrl}/verify_code/send_no_auth`,
    method: 'post',
    headers: {
      'dev_model': devModel,
      'dev_no': devNo,
      'source_type': '4',
      'ip_addr': '10.10.20.62',
      'dev_plat': 'MICROWEB',
      'timestamp': time,
      'nonce': '15082040381508204038',
      'sign': sign
    },
    data
  })
}

// 登录
export function logon (phoneNum, verifyCode) {
  let time = new Date().getTime().toString().substring(0, 10)
  const data = {
    'mobileNo': phoneNum,
    'openId': '',
    'verifyCode': verifyCode
  }
  return request({
    url: `${baseUrl}/login_quick`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'dev_model': headInfo.getDeviceMode(),
      'dev_no': headInfo.getUUID(),
      'source_type': '4',
      'ip_addr': '10.10.20.62',
      'dev_plat': 'MICROWEB',
      'timestamp': time,
      'nonce': '15082040381508204038',
      'sign': md5(`mobileNo=${phoneNum}&nonce=15082040381508204038&salt=jianbaotong2017&timestamp=${time}&verifyCode=${verifyCode}`)
    },
    data
  })
}
