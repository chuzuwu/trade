
export default class TempStorageCenter {
  // 单例
  static shared = null
  static sharedInstance() {
    if (!TempStorageCenter.shared) {
      TempStorageCenter.shared = new TempStorageCenter()
    }
    return TempStorageCenter.shared
  }

  constructor() {
    // super()
    // Log.i('调用了=>constructor')
    this.locker = new Map()
  }
  setGoodsWithKey(key, goods) {
    this.locker.set(key, goods)
  }
  getGoodsWithKey(key) {
    let goods = this.locker.get(key)
    this.locker.delete(key)
    return goods
  }
}
