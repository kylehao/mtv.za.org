/**
每次打开网页和刷新都会显示不同背景（并且默认有背景，在用户屏蔽js代码时也能正常显示）
可以实现幻灯片，相册的切换效果。（定时切换背景图片，同时变换效果）
zdz 2007-11-27
*/
var timerId = -1;
var interval = 19000;
var imgIsLoaded = false;
var flag = true;
var bFirst = false;
var curImg = 0;
var arrPreload = new Array();
var begImg = 0;
var arrPreload = new Array();
var spd = 2;
var current_transition = 28;
//幻灯片切换效果数组
var transitions = new Array;
/*
transitions[0] = "progid:DXImageTransform.Microsoft.Fade(duration=1)";
transitions[1] = "progid:DXImageTransform.Microsoft.Blinds(Duration=1,bands=20)";
transitions[2] = "progid:DXImageTransform.Microsoft.Checkerboard(Duration=1,squaresX=20,squaresY=20)";
transitions[3] = "progid:DXImageTransform.Microsoft.Strips(Duration=1,motion=rightdown)";
transitions[4] = "progid:DXImageTransform.Microsoft.Barn(Duration=1,orientation=vertical)";
transitions[5] = "progid:DXImageTransform.Microsoft.GradientWipe(duration=1)";
transitions[6] = "progid:DXImageTransform.Microsoft.Iris(Duration=1,motion=out)";
transitions[7] = "progid:DXImageTransform.Microsoft.Wheel(Duration=1,spokes=12)";
transitions[8] = "progid:DXImageTransform.Microsoft.Pixelate(maxSquare=10,duration=1)";
transitions[9] = "progid:DXImageTransform.Microsoft.RadialWipe(Duration=1,wipeStyle=clock)";
transitions[10] = "progid:DXImageTransform.Microsoft.RandomBars(Duration=1,orientation=vertical)";
transitions[11] = "progid:DXImageTransform.Microsoft.Slide(Duration=1,slideStyle=push)";
transitions[12] = "progid:DXImageTransform.Microsoft.RandomDissolve(Duration=1,orientation=vertical)";
transitions[13] = "progid:DXImageTransform.Microsoft.Spiral(Duration=1,gridSizeX=40,gridSizeY=40)";
transitions[14] = "progid:DXImageTransform.Microsoft.Stretch(Duration=1,stretchStyle=push)";
transitions[15] = "special case";
*/
transitions[0] = "progid:DXImageTransform.Microsoft.RandomDissolve()";
transitions[1] = "progid:DXImageTransform.Microsoft.Iris(irisStyle=, motion=out)";
transitions[2] = "progid:DXImageTransform.Microsoft.Iris(irisStyle=diamond, motion=in)";
transitions[3] = "progid:DXImageTransform.Microsoft.Iris(irisStyle=cross, motion=)";
transitions[4] = "progid:DXImageTransform.Microsoft.Iris(irisStyle=circle, motion=)";
transitions[5] = "progid:DXImageTransform.Microsoft.Iris(irisStyle=square, motion=out)";
transitions[6] = "progid:DXImageTransform.Microsoft.Iris(irisStyle=plus, motion=in)";
transitions[7] = "progid:DXImageTransform.Microsoft.Barn(orientation=vertial motion=in)";
transitions[8] = "progid:DXImageTransform.Microsoft.Barn(orientation=vertial motion=out)";
transitions[9] = "progid:DXImageTransform.Microsoft.Barn(orientation=horizontal motion=in)";
transitions[10] = "progid:DXImageTransform.Microsoft.Barn(orientation=horizontalmotion=out)";
transitions[11] = "progid:DXImageTransform.Microsoft.Pixelate()";
transitions[12] = "progid:DXImageTransform.Microsoft.Inset()";
transitions[13] = "progid:DXImageTransform.Microsoft.Checkerboard(Direction=left)";
transitions[14] = "progid:DXImageTransform.Microsoft.Checkerboard(Direction=right)";
transitions[15] = "progid:DXImageTransform.Microsoft.Checkerboard(Direction=down)";
transitions[16] = "progid:DXImageTransform.Microsoft.Checkerboard(Direction=up)";
transitions[17] = "progid:DXImageTransform.Microsoft.RandomBars(motion=horizontal)";
transitions[18] = "progid:DXImageTransform.Microsoft.RandomBars(motion=vertical)";
transitions[19] = "progid:DXImageTransform.Microsoft.Slide(bands=5, slideStyle=push)";
transitions[20] = "progid:DXImageTransform.Microsoft.Slide(bands=5, slidestyle=swap)";
transitions[21] = "progid:DXImageTransform.Microsoft.Slide(bands=5, slidestyle=hide)";
transitions[22] = "progid:DXImageTransform.Microsoft.Spiral()";
transitions[23] = "progid:DXImageTransform.Microsoft.Stretch(stretchStyle=push)";
transitions[24] = "progid:DXImageTransform.Microsoft.Stretch(stretchStyle=pop)";
transitions[25] = "progid:DXImageTransform.Microsoft.Fade(duration=2,overlap=0)";
transitions[26] = "progid:DXImageTransform.Microsoft.GradientWipe(duration=2,gradientSize=0.25,motion=forward )";
transitions[27] = "progid:DXImageTransform.Microsoft.Wheel(duration=2,spokes=16)";
transitions[28] = "progid:DXImageTransform.Microsoft.RadialWipe(duration=2,wipeStyle=CLOCK)";
var transition_count = 28;
var _PRELOADRANGE = 5;
function imgLoadNotify()
{
    imgIsLoaded = true;
}
function changeSlide()
{ 
    if (document.all)
{ 
   var do_transition;
   if (current_transition == (transition_count)) 
   {
    do_transition = Math.floor(Math.random() * transition_count);
   } 
   else 
   {
    do_transition = current_transition;
   }
   /**
   以下两句是在切换效果前切换背景图片的代码，number、image和idtemp要设置全局变量才可以
   */
　　 number = Math.floor(Math.random() * image.length);
   idtemp.background=image[number];
   /**
   以下两句是实现幻灯片切换效果的
   */
   document.all.topimgbg.style.filter=transitions[do_transition];
   document.all.topimgbg.filters[0].Apply();   
    }
    
    imgIsLoaded = false;
if (image.length !=0) {
   imgLoadNotify();
   if (document.all) 
   { //播放幻灯片
    document.all.topimgbg.filters[0].Play();
   }
}
}
function forward()
{
imgIsLoaded = false;
if (!image[curImg+1])
{
   curImg++;
   if (curImg >= image.length) 
   { 
    curImg = 0;
   } 
} 
else 
{
   curImg++;
   if (curImg >= image.length) 
   { 
    curImg = 0;
   }
}
changeSlide();
}
function play()
{
    if (timerId == -1) 
   timerId = window.setInterval('forward();', interval);
}
function stop()
{
    window.clearInterval(timerId);
    timerId = -1;
    imgIsLoaded = true;
}
function preloadRange(intPic,intRange) {
//alert("intPic = "+intPic+" intRange = "+intRange);
for (var i=intPic; i<(intPic+intRange); i++) {
   arrPreload[i] = new Image();
   arrPreload[i].src = image[i];
   //alert(arrPreload[i]+" arrPreload[i].src = "+arrPreload[i].src);
} 
return false;
}

