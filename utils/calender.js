
class TraverseDay {
  // 获取当月有多少天
  static getMonthDays (year, month) {
    return new Date(year, month + 1, 0).getDate()
  }

  // 补零
  static toDou (day) {
    return day <= 9 ? day : `0${day}`
  }

  // 日期转化格式
  static transformDateformat (date) {
    if (!(date instanceof Date)) {
      date = new Date()
    }
    return date
  }

  // 返回现在日期的第一日
  static startOfMonth (data) {
    // return data.
  }

  // 当前日期转化年月日对象
  static getDateObj (date) {
    date = TraverseDay.transformDateformat(date)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return {
      year,
      month,
      day,
      dataStr: `${year}/${TraverseDay.toDou(month)}/${day}`
    }
  }
  static getDate (date) {
    const { dataStr } = TraverseDay.getDateObj(new Date());
    date = TraverseDay.transformDateformat(date);
    // 计算需要补的格子
    let dist;
    const { year, month } = TraverseDay.getDateObj(date);
    // 获取当月有多少天
    const days = TraverseDay.getMonthDays(year, month - 1);
    // 获取当前日期是星期几
    let currentDate = new Date().getDay();
    // 众所周知的原因，一周的第一天时星期天，而我们做的日历星期天是放在最后的，所以我们这里需要改一下值
    if (currentDate == 0) {
      currentDate = 7;
    }
    dist = currentDate - 1;
    currentDate -= 2;
    const res = [];
    for (let i = 0; i < 42; i++) {
      // 是否不是当前月
      const otherMonth = i >= dist + days || i <= currentDate;
      const date = new Date(year, month - 1, - currentDate + i);
      const dateObj = TraverseDay.getDateObj(date)
      res.push({
        ...dateObj,
        today: dataStr === dateObj.dataStr,
        otherMonth,
      });
    }
    return res;
  }
}

// export default {
//   TraverseDay
// }
module.exports = TraverseDay