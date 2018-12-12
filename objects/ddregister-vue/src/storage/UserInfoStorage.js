export default class UserInfoStorage {
  static storagedUserInfo = null;
  static sharedUserid = null;
  static STORAGE_USER_INFO_KEY = 'STORAGE_USER_INFO_KEY'

  static getStoragedUserInfo() {
    if (this.storagedUserInfo) return this.storagedUserInfo
    let temp = window.localStorage.getItem(this.STORAGE_USER_INFO_KEY);
    if (temp) {
      this.storagedUserInfo = JSON.parse(temp)
    }
    return this.storagedUserInfo;
  }

  static setStoragedUserInfo(obj) {
    if (window.localStorage) {
      window.localStorage.setItem(this.STORAGE_USER_INFO_KEY, JSON.stringify(obj))
    } else {
      console.log('保存登录的用户信息到本地失败')
    }
  }


  /**
   * 获取用户信息，如果不存在则前往登录界面
   * @param vue
   * @returns {*}
   */
  static getStorageUserInfoLoginByNull(vue, successFunc) {
    let _this = this;
    if (_this.getStoragedUserInfo()) {
      successFunc(_this.getStoragedUserInfo())
    } else {
      // 前往登录界面
      vue.$router.push({
        path: '/login02'
      })
    }
  }
}