class Calendar {
    static getCurrentMonth (year, month) {
        return new Date(year, month + 1, 0).getDate()
    }
    static transFormDate (date) {
        if (!(date instanceof Date)) {
            date = new Date(date)
        }
        return date
    }
    static fillZero (num) {
        num = parseInt(num)
        if (num < 10) {
            num = '0'+num
        }
        return num
    }
    static startOfMonth (date) {
        return date.setDate(1)
    }
    static getDateObj (date) {
        date = Calendar.transFormDate(date)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        return {
            year,
            month,
            day,
            dateStr: `${year}/${Calendar.fillZero(month)}/${Calendar.fillZero(day)}`
        }
    }
    static getDate (date) {
        Calendar.toDayDate = Calendar.getDateObj(new Date())
        date = Calendar.transFormDate(date)
        // 删除格数
        let dist
        // 获取当前年月日
        let {year, month} = Calendar.getDateObj(date)
        // 获取当月总天数
        const days = Calendar.getCurrentMonth(year, month - 1)
        // 获取当月的第一天是周几
        let currentDay = new Date(Calendar.startOfMonth(date)).getDay() === 0 ? 7 : new Date(Calendar.startOfMonth(date)).getDay()
        // 上一月的格数 = 月初周几 - 1
        dist = currentDay - 1
        currentDay -= 2
        const dataArr = []
        for (let i = 0; i < 42; i++) {
            // 判断当前的日子是否，小于月初的周一， 或者 日子是否大于 本月总天数 + 上一个月的格子数
            const otherMonth = i <= currentDay || i >= dist + days
            // 获取当前for循环中年月日的信息
            // 月份小于当前月份一个月, 日期 是根据月初的日期+当前循环的日期(如果currentDay是负的, 访问的就是上个月的, 如果数字是正数，访问的就是本月的)
            const date = new Date(year, month - 1, -currentDay + i)
            const dataObj = Calendar.getDateObj(date)
            dataArr.push({
                otherMonth,
                today: Calendar.toDayDate.dateStr === dataObj.dateStr,
                ...dataObj
            })
        }
        return dataArr
    }
    static initDate (date) {
        return date.slice(0, -3)
    }
    static takeDate (date) {
        date = date.replace(/\-|\//, '-')
        return date.split('-')
    }
}

export default Calendar