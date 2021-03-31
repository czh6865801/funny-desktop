/* 
类型检测 https://www.runoob.com/regexp/regexp-syntax.html
*/
export const TypeOf = (value) => Object.prototype.toString.call(value).match(/\s(\w+)/)[1]

/**
 * 传入毫秒，格式化时间
 * @param timestampOrDate 毫秒数或格式日期
 * @param fmt 格式，常见：'yyyy-MM-dd hh:mm:ss.S'、'yyyy-M-d h:m:s.S'
 * @returns {*}
 */
export function formateDate (timestampOrDate, fmt = 'yyyy-MM-dd HH:mm:ss') {
  if (!timestampOrDate) {
    return ''
  }
  // Step 1: 如果是非时间戳，转化为时间戳
  if (!/^\d+$/.test(timestampOrDate)) {
    // 如果是时间戳
    // 把-转化成 / 避免IOS时间问题
    timestampOrDate = timestampOrDate.replace(/-/gi, '/')
  }

  // Step 2:  转化为时间对象
  var date = new Date(timestampOrDate) // 后台时间转javascript时间戳
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear().toString()).substr(4 - RegExp.$1.length))
  }

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr((o[k].toString()).length)))
    }
  }

  return fmt
}

export function delay (func, wait, args) {
  return setTimeout(() => {
    return func.apply(null, args)
  }, wait)
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * Refrence: [underscore.debounce](https://github.com/jashkenas/underscore/blob/d5fe0fd4060f13b40608cb9d92eda6d857e8752c/underscore.js#L887-L914)
 * @param {Function} func
 * @param {Number} wait
 * @param {Boolean} immediate
 * @returns {Function}
 */
export function debounce (func, wait, immediate) {
  let timeout, result

  const later = (context, args) => {
    timeout = null
    if (args) result = func.apply(context, args)
  }

  const debounced = function (...args) {
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(later, wait)
      if (callNow) result = func.apply(this, args)
    } else {
      timeout = delay(later, wait, args)
    }
    return result
  }

  debounced.cancel = () => {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

/**
     * 配置节流函数
     * @param  {[Function]}  fn     [要执行的函数]
     * @param  {[Number]}  delay    [延迟执行的毫秒数]
     * @param  {[Number]}  mustRun  [至少多久执行一次]
     * @return {[Function]}         [节流函数]
     */
export function throttle (fn, wait, mustRun) {
  let timeout
  let startTime = new Date()
  return function () {
    let context = this
    let args = arguments
    let curTime = new Date()
    clearTimeout(timeout)
    if (curTime - startTime >= mustRun) {
      fn.apply(context, args)
      startTime = curTime
    } else {
      timeout = setTimeout(fn, wait)
    }
  }
}

/**
 * 显示文件类型图标
 * @param  {[String]} fileName [文件名]
 * @return 文件后缀
 */
export function toFileName (fileName) {
  if (fileName) {
    let filearray = fileName.split('.')
    let suffix = filearray[filearray.length - 1].toLowerCase()
    if (/^(txt|ai|psd|apk|exe|pdf|key|dmg|msi)$/gi.test(suffix)) {
      return suffix
    } else if (/^(rar|7z|zip)$/gi.test(suffix)) {
      return 'zip'
    } else if (/MP3|AAC|WMA|FLAC|ALAC|WAV|AIFF|PCM/gi.test(suffix)) {
      return 'music'
    } else if (/AVI|wma|rmvb|rm|flash|mp4|mid|3GP/gi.test(suffix)) {
      return 'video'
    } else if (/HML|HTML|XHTML/gi.test(suffix)) {
      return 'html'
    } else if (/xls|xlsx|xlsm|xltx|xltm|xlsb|xlam/gi.test(suffix)) {
      return 'excel'
    } else if (/bmp|tif|tiff|dwg|png|gif|ico|jiff|jpeg|jpg/gi.test(suffix)) {
      return 'img'
    } else if (/doc|docx|docm|dotx|dotm/gi.test(suffix)) {
      return 'word'
    } else if (/ppt|pptx|pptm|ppsx|potx|potm|ppam/gi.test(suffix)) {
      return 'ppt'
    } else {
      return 'unknow'
    }
  }
}

// 对象数组排序
export const orderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] =
          orders && orders[i] === 'desc'
            ? [b[prop], a[prop]]
            : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
  );
const users = [
  { name: 'fred', age: 48 },
  { name: 'barney', age: 36 },
  { name: 'fred', age: 40 },
];
// orderBy(users, ['name', 'age'], ['asc', 'desc']);
// [{name: 'barney', age: 36}, {name: 'fred', age: 48}, {name: 'fred', age: 40}]
// orderBy(users, ['name', 'age']);
// [{name: 'barney', age: 36}, {name: 'fred', age: 40}, {name: 'fred', age: 48}]

const fs = require('fs')

export const JSONToFile = (obj, filename) => fs.writeFileSync(`${filename}.json`, JSON.stringify(obj, null, 2), 'utf8')

export const assignJson = (standard, b) => {
  for (const i in standard) {
    if (b[i]) {
      if (TypeOf(b[i]) === 'Object' && TypeOf(standard[i]) === 'Object') {
        standard[i] = assignJson.apply(standard[i], b[i])
      } else {
        standard[i] = b[i]
      }
    }
  }
  for (const i in b) {
    if (!standard[i]) {
      standard[i] = b[i]
    }
  }
  return standard
}
//例: JSONToFile(assignJson(standard, b), filename = 'testJsonFile')
