//命名空间
window.xiaoming = {};
//添加过渡
window.xiaoming.addTransition = function(obj){
	obj.style.transition = "all 0.5s";
	obj.style.webkitTransition = "all 0.5s";
};

//移除过渡
window.xiaoming.removeTransition = function(obj){
	obj.style.transition = "none";
	obj.style.webkitTransition = "none";
};
//设置水平平移
window.xiaoming.setTranslate = function(obj,translate){
	obj.style.transform = `translateX(${translate}px)`;
	obj.style.webkitTransform = `translateX(${translate}px)`;
};
//设置垂直平移
window.xiaoming.setTranslateY = function(obj,translate){
	obj.style.transform = `translateY(${translate}px)`;
	obj.style.webkitTransform = `translateY(${translate}px)`;
};
//绑定事件
window.xiaoming.addEvent = function(obj,callback){
	obj.addEventListener('transitionEnd',callback);
	obj.addEventListener('webkitTransitionEnd',callback)
};
//封装一个轻触事件
window.xiaoming.tap = function(obj,callback){
	var start = 0;
	var end = 0;
	var isMove = false;
	obj.addEventListener('touchstart',function(){
		start = (new Date()).getTime()
	});
	obj.addEventListener('touchmove',function(){
		isMove = true;
	});
	obj.addEventListener('touchend',function(){
		end = (new Date()).getTime();
		if(!isMove&&(end-start<150)){
			callback()
		}
		start = 0;
		end = 0;
		isMove = false;
	});
}
