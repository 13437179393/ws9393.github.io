window.onload = function(){
	search();//滚动事件
	banner();//轮播图事件
}



//滚动事件
function search(){
    //获取DOM元素
    var search = document.querySelector(".header_box");
    var banner = document.querySelector(".banner");
    var height = banner.offsetHeight;
    var opacity = 0;
    //绑定页面滚动事件
    window.onscroll=function(){
        var top = document.documentElement.scrollTop;
        if(top<height){
            opacity = top/height*0.85;
        }else{
            opacity = 0.85;
        }
        search.style.background = "rgba(201,21,35,"+opacity+")"
    }
}


//轮播图事件
function banner(){
	//准备工作，获取DOM元素
	var banner = document.querySelector('.banner')//轮播图容器
	var width = banner.offsetWidth;//获取轮播容器宽度
	var imgBox = banner.querySelector("ul:first-child")//图片ul
	var pointBox = banner.querySelector('ul:last-child')//小圆点ul
	var points = pointBox.querySelectorAll('li');//所有小圆点
	var index = 1;
	//1 可以轮播(定时器，过渡) 
	var timer = setInterval(function(){
		index++;
		xiaoming.addTransition(imgBox);
		xiaoming.setTranslate(imgBox,-index*width);
	},2000);
	//2 小圆点随着图片滚动
	xiaoming.addEvent(imgBox,function(){
		if(index>=6){
			index = 1;
		}else if(index<=0){
			index = 5;
		}
		xiaoming.removeTransition(imgBox);
		xiaoming.setTranslate(imgBox,-index*width);
		setPoint();//点亮小圆点
	});
	//封装一个点亮小圆点的方法
	function setPoint(){
		for(var i=0;i<points.length;i++){
			points[i].className = "";
		}
		points[index-1].className = "now";
	}
	//3 图片滑动（touch）
	var startX = 0;
	var moveX = 0;
	var distanceX = 0;
	var isMove = false;
	imgBox.addEventListener('touchstart',function(event){
		clearInterval(timer);
		startX = event.touches[0].clientX;
	});
	imgBox.addEventListener('touchmove',function(event){
		isMove = true;
		moveX = event.touches[0].clientX;
		distanceX = moveX - startX;//负数左滑，正数右滑
		xiaoming.removeTransition(imgBox);
		xiaoming.setTranslate(imgBox,-index*width+distanceX);
	});
	imgBox.addEventListener('touchend',function(event){
		if(isMove){
			if(Math.abs(distanceX)>width/3){
				if(distanceX<0){
					index++;//如果为负数，是左滑，看下一张
				}else if(distanceX>0){
					index--;//如果为正数，是右滑，看上一张
				}
			}
			//4 滑动不超过一定距离，吸附回去
			//5 滑动超过一定距离，滚动到下一张
			xiaoming.addTransition(imgBox);
			xiaoming.setTranslate(imgBox,-index*width);
		}
		clearInterval(timer);
		timer = setInterval(function(){
			index++;
			xiaoming.addTransition(imgBox);
			xiaoming.setTranslate(imgBox,-index*width);
		},2000)
	});
	
}