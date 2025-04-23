import Dayjs from 'dayjs'
/**
 * 获取年月日
 * @returns {y: years, m: months, d: days}
 */
export const getDiffYear = (time: any) => {
    const val = Dayjs().diff(Dayjs(time), 'minute', true)
    const totalDays = Math.floor(val / (24 * 60)); // 转换为天数
    const years = Math.floor(totalDays / 365); // 计算年数
    const remainingDays = totalDays % 365; // 剩余的天数
    const months = Math.floor(remainingDays / 30); // 计算月数
    const days = remainingDays % 30; // 剩余天数
    return { y: years, m: months, d: days }
}
/**
 * 时间转换
 * @returns {y: years, m: months, d: days}
 */
export const forMat = (time: any, format = "YYYY-MM-DD") => {
    let t = new RegExp(/^\d+$/).test(time) ? Number(time) : time 
    const val = Dayjs(t).format(format)
    return val
}
/**
 * 连续点击
 */
let lastClickTime = 0;
let clickCount = 0;
export const NumerousTimes = (callback: Function, duraction: number = 500, count: number = 10) => {
    const currentTime = Date.now();
    if (lastClickTime && currentTime - lastClickTime > duraction) {
        clickCount = 0;
    }
    clickCount++;
    lastClickTime = currentTime;
    if (clickCount >= count) {
        clickCount = 0
        callback();
    }
}