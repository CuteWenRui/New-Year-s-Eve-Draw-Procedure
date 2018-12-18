//数据

var areas = [
	'A区域', 'C区域', 'B区域', 'D区域',
	'A区域', 'C区域', 'B区域', 'D区域',
	'A区域', 'C区域', 'B区域', 'D区域'
]

var rows = [
	'第4排', '第5排', '第6排', '第7排'
]
var columns = [
	'第4个', '第5个', '第6个', '第7个', '第8个', '第9个', '第10个', '第11个', '第12个', '第13个', '第14个'
]

var intavlflag1; //标记区域
var intavlflag2; //标记排
var intavlflag3; //标记个

var isBegin1 = false; //区域模块是否正在滚动 默认未开始状态
var isBegin2 = false; // 排模块是否正在滚动 默认未开始状态
var isBegin3 = false; // 个模块是否正在滚动 默认未开始状态

var areasValue; //记录当前摇到的区域的值
var rowValue; //记录当前摇到的排的值
var columnValue; //记录当前摇到的个值

var lucker; //记录当前幸运儿
var luckers = []; //存储所有幸运儿

var intavlflag; //标记
var isBegin = false; //是否正在滚动 默认未开始状态
var lucker; //记录当前幸运儿
var luckers = []; //存储所有幸运儿
//全局按键事件
document.onkeydown = function(e) {
	//获取事件对象中的按键码   13：enter       27：esc
	switch(e.keyCode) {
		case 13:
			//抽取相关
			start();
			break;
			//		case 27:
			//			//将已被抽取的名单合并到源数组中(归还名额)
			//			areas = areas.concat(luckers);
			//			console.info('还原数组:' + areas);
			//			luckers = []; //清空数组
			//			//清除列表内幸运儿名单
			//			$('list').innerHTML = '';
			//			break;
	}
}

function start() {
	extractAreas();
	setTimeout(extractRow, 1000);
	setTimeout(extractColumn, 2300)
}
//抽取区域准备
function extractAreas() {
	if(isBegin1) {
		//停止
		clearInterval(intavlflag1);
		
		//增加样式(动画)
		$('show-box1').className = 'tip';
		//标记滚动状态为停止
		isBegin1 = false;
		console.log("begin1停止")
	} else {
		//启动抽取每隔0.05秒刷新界面内容
		intavlflag1 = setInterval(begin1, 50);
		$('bgm').src = 'source/bgm.mp3';
		//去除样式（停止动画）
		$('show-box1').className = '';
		//将标志位设置为已启动
		isBegin1 = true;
		console.log("begin1开始")
	}
}

//抽取排准备
function extractRow() {
	if(isBegin2) {
		//停止
		clearInterval(intavlflag2);
		//从源数组移除被抽中的幸运儿
		//removeValue(rows, rowValue);
		//增加样式(动画)
		$('show-box2').className = 'tip';
		//标记滚动状态为停止
		isBegin2 = false;
		console.log("begin2停止")
	} else {
		//启动抽取每隔0.05秒刷新界面内容
		intavlflag2 = setInterval(begin2, 50);
		//去除样式（停止动画）
		$('show-box2').className = '';
		//将标志位设置为已启动
		isBegin2 = true;
		console.log("begin2开始")
	}
}

//抽取个准备
function extractColumn() {
	if(isBegin3) {
		//停止
		clearInterval(intavlflag3);
		//将幸运儿加入数组
		luckers.push(columnValue);
		//动态创建节点
		var li = document.createElement('li');
		li.innerHTML = areasValue + rowValue + columnValue;
		//将节点加入ol元素中
		$('list').appendChild(li);
		//从源数组移除被抽中的幸运儿
		removeValue(columns, columnValue);
		//改变音效
		$('bgm').src = 'source/cheer.mp3';
		setTimeout(stopCheer,5000);
		//增加样式(动画)
		$('show-box3').className = 'tip';
		//标记滚动状态为停止
		isBegin3 = false;
		console.log("begin3结束")
	} else {
		//启动抽取每隔0.05秒刷新界面内容
		intavlflag3 = setInterval(begin3, 50);
		//去除样式（停止动画）
		$('show-box3').className = '';
		//将标志位设置为已启动
		isBegin3 = true;
		console.log("begin3开始")
	}
}

//从源数组中移除被抽中的幸运儿
function removeValue(arr, name) {
	for(var i = 0; i < arr.length; i++) {

		if(arr[i] == name) {
			arr.splice(i, 1);
			console.info('移除：' + name + '--剩余：' + arr);
			break;
		}
	}
}

//开始抽取，随机获取ABCD的下标
function begin1() {
	var index = Math.floor(Math.random() * areas.length);
	areasValue = areas[index];
	$('show-box1').innerHTML = areasValue;
}

//开始抽取，随机获取排数的下标
function begin2() {
	var index = Math.floor(Math.random() * rows.length);
	rowValue = rows[index];
	$('show-box2').innerHTML = rowValue;
}

//开始抽取，随机获取个的下标
function begin3() {
	var index = Math.floor(Math.random() * columns.length);
	columnValue = columns[index];
	$('show-box3').innerHTML = columnValue;
}
	function $(id) {
		return document.getElementById(id);
	}
	function stopCheer(){
		$('bgm').pause();
	}
