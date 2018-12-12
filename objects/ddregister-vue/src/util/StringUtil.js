export default class StringUtil {
  /** 不区分大小写 */
  static equalsIgnoreCase(str1, str2) {
    if(this.isString(str1, str2)) {
      return str1.toLowerCase() == str2.toLowerCase()
    } else {
      return false
    }
  }

  /** 不区分大小写 忽略类型 */
  static eqlObjIgnoreCase(obj, str) {
    if(obj == null && str == null) return true
    if(obj == null && str != null) return false
    if(this.isString(str)) {
      return obj.toString().toLowerCase() == str.toLowerCase()
    } else {
      return false
    }
  }

  /** 不区分大小写 忽略类型 */
  static eqlObjIgnoreCases(obj, ...str) {
    if(str == null) return false
    for (var i = 0; i < str.length; i++) {
      if(this.eqlObjIgnoreCase(obj, str[i])){
        return true
      }
    }
    return false
  }

  /** 不区分大小写 */
  static equalsIgnoreCases() {
    if(arguments.length <= 1) return false
    for (var i = 1; i < arguments.length; i++) {
      let bool = this.equalsIgnoreCase(arguments[0], arguments[i])
      if(bool) return true
    }
    return false
  }

  /** 判断字符串是否为null或空值  true:为空；false:不为空*/
  static isNullOrEmptyTrim(str) {
    return str == null || this.trim(str).length == 0
  }

  /**去除所有空格*/
  static trimAll(str) {
    if(str == null) return str
    if(str.constructor == String) {
      return str.replace(/\s+/g,"")
    } else {
      return str
    }
  }

  /**去除两头空格*/
  static trim(str) {
    if(str == null) return str;
    if(str.constructor == String) {
      return str.replace(/^\s+|\s+$/g, "")
    } else {
      return str
    }
  }

  /** 去除左空格 */
  static trimLeft(str) {
    if(str == null) return str
    if(str.constructor == String) {
      return str.replace( /^\s*/, '')
    } else {
      return str
    }
  }

  /** 去除左空格 */
  static trimRight(str) {
    if(str == null) return str
    if(str.constructor == String) {
      return str.replace(/(\s*$)/g, "")
    } else {
      return str
    }
  }

  /** 判断对象是否是字符串 */
  static isString() {
    if(arguments.length == 0) return false
    for (var i = 0; i < arguments.length; i++) {
      let bool = Object.prototype.toString.call(arguments[i]) === "[object String]"
      if(!bool) return false
    }
    return true
  }

  /** 判断字符串中是否包含另一个字符串
   * @param  String str 原字符串
   * @param  String s   被包含的字符串
   * @return Boolean    true:包含
   */
  static contains(str, contains) {
    if(this.isString(str, contains)) {
      return str.indexOf(contains) >= 0
    } else {
      return false
    }
  }

  /** 判断字符串头部是否相同
   * @param  String str  字符串
   * @param  String start 字符串头部
   * @return Boolean
   */
  static startEquals(str, start) {
    if(this.isString(str, start)) {
      let reg = new RegExp("^" + start)
      return reg.test(str)
    } else {
      return false
    }
  }

  /** 判断字符串尾部是否相同
   * @param  String str  字符串
   * @param  String end 字符串尾部
   * @return Boolean
   */
  static endEquals(str, end) {
    if(this.isString(str, end)) {
      let reg = new RegExp(end + "$")
      return reg.test(str)
    } else {
      return false
    }
  }

  /** 判断字符串头部是否相同 不区分大小写
   * @param  String str  字符串
   * @param  String start 字符串头部
   * @return Boolean
   */
  static startEqualsIgnoreCase(str, start) {
    if(this.isString(str, start)) {
      let reg = new RegExp("^" + start.toUpperCase())
      return reg.test(str.toUpperCase())
    } else {
      return false
    }
  }

  /** 判断字符串尾部是否相同 不区分大小写
   * @param  String str  字符串
   * @param  String end 字符串尾部
   * @return Boolean
   */
  static endEqualsIgnoreCase(str, end) {
    if(this.isString(str, end)) {
      let reg = new RegExp(end.toUpperCase() + "$")
      return reg.test(str.toUpperCase())
    } else {
      return false
    }
  }

  /** 判断字符串头部是否相同 不区分大小写 请传入多个字符串，第一个参数为参照物参数
   * @return Boolean
   */
  static startEqualsIgnoreCases() {
    if(arguments.length <= 1) return false
    for (var i = 1; i < arguments.length; i++) {
      let bool = this.startEqualsIgnoreCase(arguments[0], arguments[i])
      if(bool) return true
    }
    return false
  }

  /** 判断字符串尾部是否相同 不区分大小写 请传入多个字符串，第一个参数为参照物参数
   * @return Boolean
   */
  static endEqualsIgnoreCases() {
    if(arguments.length <= 1) return false
    for (var i = 1; i < arguments.length; i++) {
      let bool = this.endEqualsIgnoreCase(arguments[0], arguments[i])
      if(bool) return true
    }
    return false
  }

  /** 替换第一个reOld*/
  static replace(str, reOld, reNew){
    if (this.isNullOrEmptyTrim(str)) return str
    return str.replace(reOld, reNew)
  }

  /** 替换所有与reOld匹配的 */
  static replaceAll(str, reOld, reNew){
    if (this.isNullOrEmptyTrim(str)) return str
    return str.replace(new RegExp(reOld, 'g'), reNew)
  }

  /**
   * 检测是否是手机号码
   * @param  {String}  phone 手机号
   * @return {Boolean}  是否是手机号
   */
  static isPhone(phone) {
    if (this.isString(phone) || phone.length == 11) {
      var reg = /^1[34578][0-9]{9}$/; //验证规则，[34578]之间不需要|
      var flag = reg.test(phone); //true
      return flag
    } else {
      return false
    }
  }

  /**
   * 字符串转成数小组
   * @param  {String}  str 要拆分的字符串
   * @param  {String}  separator 分隔符
   * @return {Array} 拆分后的字符串数小组
   */
  static split(str, separator) {
    if(this.isNullOrEmptyTrim(str)) null
    str = str + ''
    let strArr = str.split(separator);
    return strArr
  }

  /**
   * 判断字符串是否为邮箱
   * @param str
   */
  static isEmail(str) {
    if (this.isString(str)) {
      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
      return reg.test(str)
    } else {
      return false
    }
  }
}