import Calendar from '../../utils/calendar'
// components/calendar/index.html.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    week: ["一", "二", "三", "四", "五", "六", "日"],
    calendar: Calendar.getDate(new Date()),
    monthFormat: Calendar.initDate(Calendar.toDayDate.dateStr),
  },

  /**
   * 组件的方法列表
   */
  methods: {
    prevMonth () {
      const [year, month] = Calendar.takeDate(this.data.monthFormat)
      const { dateStr } = Calendar.getDateObj(
        new Date(year, month - 1, 0)
      )
      this.setData({
        monthFormat: Calendar.initDate(dateStr),
        calendar: Calendar.getDate(new Date(dateStr))
      })
    },
    nextMonth () {
      const [year, month] = Calendar.takeDate(this.data.monthFormat)
      const { dateStr } = Calendar.getDateObj(new Date(year, month, 1))
      this.setData({
        monthFormat: Calendar.initDate(dateStr),
        calendar: Calendar.getDate(new Date(dateStr))
      })
    }
  },
  created () {
  }
})
