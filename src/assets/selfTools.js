// 获取浏览器窗口显示宽高
function getDimensions() {
    let winWidth, winHeight;
    //获取窗口宽度  
    if (window.innerWidth) {
        winWidth = window.innerWidth;
    } else if ((document.body) && (document.body.clientWidth)) {
        winWidth = document.body.clientWidth;
    }

    //获取窗口高度  
    if (window.innerHeight) {
        winHeight = window.innerHeight;
    } else if ((document.body) && (document.body.clientHeight)) {
        winHeight = document.body.clientHeight;
    }

    //通过深入Document内部对body进行检测，获取窗口大小  
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
    }

    //结果输出至两个文本框  
    return {
        winHeight,
        winWidth
    }
}


// 阻止默认事件
function cancelHandler(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}


// 阻止事件冒泡
function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}
//  日期或者时间前缀加0,返回字符串
function setDatePrefixZero(value) {
    return value < 10? '0'+value:value+''
}
// 聊天页面时间戳处理
function dealChatTimestamp(value) { 
    // console.log(value)
    let time = value.toString().trim().length < 13 ? value * 1000 : value;
    
    let dateYear = new Date(time).getFullYear(),
        dateMonth = new Date(time).getMonth() + 1,
        dateDay = new Date(time).getDate(),
        dateHours = new Date(time).getHours(),
        dateMinutes = new Date(time).getMinutes(),
        dateSeconds = new Date(time).getSeconds();
        // console.log(dateHours)
    dateMonth = setDatePrefixZero(dateMonth)
    dateDay = setDatePrefixZero(dateDay)
    dateHours = setDatePrefixZero(dateHours)
    dateMinutes = setDatePrefixZero(dateMinutes)
    dateSeconds = setDatePrefixZero(dateSeconds)
    let nowYear = new Date().getFullYear(),
        nowMonth = new Date().getMonth() + 1,
        nowDay = new Date().getDate();
        
        nowMonth = setDatePrefixZero(nowMonth)
        nowDay = setDatePrefixZero(nowDay)
        // console.log(dateDay,nowDay)
    // console.log(dateHours + ':' + dateMinutes + ':' + dateSeconds)
    if (dateYear === nowYear && dateMonth === nowMonth && dateDay === nowDay) {
        // 当天日期处理
    //    console.log(1)
        return dateHours + ':' + dateMinutes + ':' + dateSeconds
    } else if (dateYear === nowYear) {
        // 当年日期处理
        // console.log(2)
        return `${dateMonth}月${dateDay}日 ${dateHours}:${dateMinutes}:${dateSeconds}`
    } else {
        // 隔年日期处理
        return `${dateYear}年${dateMonth}月${dateDay}日 ${dateHours}:${dateMinutes}:${dateSeconds}`
    }
}

// 创建倒计时，返回 ‘00’,传入格式“2019-09-09 10:20:30”
// 使用时需要放在定时函数里面
function setCountDown(targetDate,timer){
    
    
        let targetSeconds= new Date(targetDate)/1000,
        nowSeconds = new Date().getTime()/1000;
       let differentValue=targetSeconds- nowSeconds
        if(differentValue ===0 || differentValue < 0){
            clearInterval(timer)
            return {
                days:'00',
                hours:'00',
                minutes:'00',
                seconds:'00'
            }
            
        }else{
            let days = Math.floor( differentValue / (24*60*60) ) 
            let hours = Math.floor( (differentValue - days*24*60*60 )/(60*60) ) 
            let minutes = Math.floor( (differentValue - days*24*60*60 - hours*60*60)/60  ) 
            let seconds = Math.floor(differentValue  - days*24*60*60 - hours*60*60 - minutes*60)

            days = setDatePrefixZero(days) + ""
            hours = setDatePrefixZero(hours)  + ""
            minutes = setDatePrefixZero(minutes) + ""
            seconds = setDatePrefixZero(seconds) + ""
            // console.log(seconds)
            return {
                days,
                hours,
                minutes,
                seconds
            }
        }

}

export {
    getDimensions,
    cancelHandler,
    stopBubble,
    setDatePrefixZero,
    dealChatTimestamp,
    setCountDown
}
