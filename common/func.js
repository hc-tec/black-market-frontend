

export const throttle = (fn, wait, immediate) => {
	let timer, timeStamp=0;
	let context, args;
	let run = () => {
		timer=setTimeout(()=>{
			if(!immediate){
				fn.apply(context,args);
			}
			clearTimeout(timer);
			timer=null;
		},wait);
	}
 
	return function () {
		context=this;
		args=arguments;
		if(!timer){
			if(immediate){
				fn.apply(context,args);
			}
			run();
		}
	}
 
}

// 增加前缘触发功能
export const debounce = (fn, wait, immediate=false) => {
	let timer, startTimeStamp=0;
	let context, args;
 
	let run = (timerInterval)=>{
		timer= setTimeout(()=>{
			let now = (new Date()).getTime();
			let interval=now-startTimeStamp
			if(interval<timerInterval){ // the timer start time has been reset，so the interval is less than timerInterval
				startTimeStamp=now;
				run(wait-interval);  // reset timer for left time 
			}else{
				if(!immediate){
					fn.apply(context,args);
				}
				clearTimeout(timer);
				timer=null;
			}
			
		},timerInterval);
	}
 
	return function(){
		context=this;
		args=arguments;
		let now = (new Date()).getTime();
		startTimeStamp=now; // set timer start time
 
		if(!timer){
			if(immediate) {
				fn.apply(context,args);
			}
			run(wait);    // last timer alreay executed, set a new timer
		}
	}
 
}

/**
 * 自动补零
 * @param {Number} num 数字
 * @param {Number} n 位数
 */
const PrefixInteger = (num, n) => {
    return (Array(n).join(0) + num).slice(-n);
}

/**
 * @param{String} time: 给出的时间 -> 2020-11-18 11:58:00
 */
export const timeFormat = (time, detail = false) => {
	const curTime = new Date()
	time = new Date(time)
	
	let curYear = curTime.getFullYear()
		, curMouth = curTime.getMonth()+1
		, curDay = curTime.getDate()
		, curHour = curTime.getHours()
		, curMinute = curTime.getMinutes()
		, year = time.getFullYear()
		, month = time.getMonth()+1
		, day = time.getDate()
		, hour = time.getHours()
		, minute = time.getMinutes()
		, second = time.getSeconds()
	// 获取相差的时间戳
	const timeDelta = curTime - time
	
	// 单位时间
	const SECOND_UNIT = 1000
		, MINUTE_UNIT = SECOND_UNIT * 60
		, HOUR_UNIT = MINUTE_UNIT * 60
		, DAY_UNIT = HOUR_UNIT * 24
	
	// 1 分钟以内，返回 刚刚
	if(timeDelta < MINUTE_UNIT) {
		return "刚刚"
	}
	// 60 分钟以内，返回 xx 分钟前
	// const minuteDelta = Math.ceil(timeDelta / MINUTE_UNIT)
	// if(minuteDelta < 60) {
	// 	return `${minuteDelta}分钟前`
	// }
	// 今天以内，返回 xx:xx
	const hourDelta = Math.ceil(timeDelta / HOUR_UNIT)
	if(hourDelta < curHour) {
		return `${PrefixInteger(hour,2)}:${PrefixInteger(minute,2)}:${PrefixInteger(second,2)}`
	}
	// 前天，返回 前天
	// if(dayDelta === 2) {
	// 	return "前天"
	// }
	if(detail) {
		// 其余情况，返回 xxxx.xx.xx xx:xx:xx
		const formatTime = `${year}.${PrefixInteger(month,2)}.${PrefixInteger(day,2)} 
							${PrefixInteger(hour,2)}:${PrefixInteger(minute,2)}:${PrefixInteger(second,2)}`
		return formatTime;
	} else {
		const dayDelta = parseInt(timeDelta / DAY_UNIT)
		// 昨天，返回 昨天
		if(dayDelta === 1) {
			return "昨天"
		}
		// 在今年以内，返回日期
		if(year === curYear) {
			return `${PrefixInteger(month,2)}.${PrefixInteger(day,2)}`
		} else {
			return `${year}.${PrefixInteger(month,2)}.${PrefixInteger(day,2)}`
		}
	}
}


export const getFileInfo = (filePath) => {
	if(!filePath) return
	return new Promise((resolve, reject) => {
		uni.getFileInfo({
			filePath,
			success(res) {
				resolve(res)
			},
			fail(e) {
				reject(e)
			},
		})
	})
}


export const validator = (obj, requiredFields, requiredFieldsHans) => {
	const fieldsLen = requiredFields.length
	let err = '';
	for(let i=0;i<fieldsLen;++i) {
		const field = requiredFields[i]
		if(!obj[field]) {
			err += `${requiredFieldsHans 
				? requiredFieldsHans[i] 
				: requiredFields[i]} & `
		}
	}
	err = err.slice(0, err.length-2)
	return err
}


export const sleep = (time) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, time)
	})
}

// 驼峰转中线
export const toLine = (name) => {
  return name.replace(/([A-Z])/g,"-$1").toLowerCase();
}

export const cssObjectToString = style => {
	let results = []
	Object.keys(style).forEach(key => {
		const newKey = toLine(key)
		results.push(`${newKey}:${style[key]}`)
	})
	return results.join(';')
}

export const generateEvent = (ev_name, detail) => {
	const event = new CustomEvent(ev_name, {
		detail: detail,
	})
	window.dispatchEvent(event)
}

let timer = null;
export const interval = (func, wait) => {
    let interv = function(){
        func.call(null);
        timer=setTimeout(interv, wait);
    };
    timer= setTimeout(interv, wait);
 }
 
 export const getIndexFromObjList = (objList, field, target) => {
	 let i = -1
	 try {
		objList.forEach((obj, index) => {
			if(obj[field] === target) {
				i = index
				throw Error("")
			}
		 })
		return i
	 } catch {
		 return i
	 }
 }