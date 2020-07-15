import Calendar from './utils/calendar'
let currentSwiperIndex = 1,
    generateDate = Calendar.toDayDate.dateStr,
    swipeStartPoint = 0, // 滑动的坐标
    isPrevMonth = false, // 是否向右滑动
    changeCount = 0; // 滑动的次数
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    duration: {
      type: String,
      value: 500
    },
    isVertical: {
      type: Boolean,
      value: false
    },
    select: {
      type: String,
      value: 'single'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    week: ["一", "二", "三", "四", "五", "六", "日"],
    current: 1,
    calendarArr: [],
    monthFormat: Calendar.getDateStr(Calendar.toDayDate.dateStr)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 设置当前的索引值
    swiperChange(e) {
      const { current, source } = e.detail;
      if (source === "touch") {
        currentSwiperIndex = current;
        changeCount += 1;
      }
    },
    // 上个月
    prevMonth () {
      this.setData({
        monthFormat: Calendar._getPrevMonth(this.data.monthFormat),
      });
      this.generatorCalendar(this.data.monthFormat);
    },
    // 下个月
    nextMonth () {
      this.setData({
        monthFormat: Calendar._getNextMonth(this.data.monthFormat),
      });
      this.generatorCalendar(this.data.monthFormat);
    },
    
    // 动画结束后让滑动的次数置0
    swiperAnimateFinish() {
      const { year, month } = Calendar.getDateObj(generateDate);
      const monthDist = isPrevMonth ? -changeCount : changeCount;
      generateDate = new Date(year, month + monthDist - 1);
      // 清空滑动次数
      changeCount = 0;
      this.generatorCalendar(generateDate);
    },
    // 获取手指刚按下的坐标
    swipeTouchStart(e) {
      const { clientY, clientX } = e.changedTouches[0]
      swipeStartPoint = this.data.isVertical ? clientY : clientX
    },
    // 手机松开
    swipeTouchEnd(e) {
      const { clientY, clientX } = e.changedTouches[0]
      isPrevMonth = this.data.isVertical
        ? clientY - swipeStartPoint > 0
        : clientX - swipeStartPoint > 0
    },
    // 生成日历数组
    generatorCalendar(date) {
      const calendarArr = [];
      // 转换为 Date 实例
      const currentDate = Calendar.transFormDate(date)
      // 获取当前时间的日历数据
      const now = Calendar.getDate(currentDate);
      // 获取当前时间的字符串
      const { dateStr } = Calendar.getDateObj(currentDate)
      // 获取上个月的日历数据
      const prev = Calendar.getDate(Calendar._getPrevMonth(dateStr));
      // 获取下个月的日历数据
      const next = Calendar.getDate(Calendar._getNextMonth(dateStr));
      // 设置日历数据
      const prevIndex = currentSwiperIndex === 0 ? 2 : currentSwiperIndex - 1;
      const nextIndex = currentSwiperIndex === 2 ? 0 : currentSwiperIndex + 1;
      calendarArr[prevIndex] = prev;
      calendarArr[nextIndex] = next;
      calendarArr[currentSwiperIndex] = now
      this.setData({
        calendarArr,
        monthFormat: Calendar.getDateStr(dateStr)
      })
      this.triggerEvent("change", this.data.monthFormat)
    },
    dateChange(e) {
      const monthFormat = e.detail.value;
      this.setData({
        monthFormat,
      });
      generateDate = Calendar.getDateStr(monthFormat);
      this.generatorCalendar(generateDate);
    },
    // 选择时间
    selectDate (event) {
      if (this.data.select === 'single') {
        console.log(event.currentTarget.dataset.erwei)

        console.log(this.data.calendarArr)
      }else{
        console.log('多选')
      }
    }
  },
  ready () {
    this.generatorCalendar(generateDate)
  }
})