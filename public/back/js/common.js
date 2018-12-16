/*
需求：在第一个ajax发送的时候，开启进度条
     在全部的ajax回来的时候，关闭进度条
*/

//测试进度条方法
// NProgress.start();//开启进度条

// setTimeout(function () {
//     //结束进度条,两秒结束
//     NProgress.done();
// }, 2000);

// ajaxStart开始
$(document).ajaxStart(function () {
    //第一个ajax发送时开启进度条
    NProgress.start();
})

//ajaxStop结束
$(document).ajaxStop(function () {
    //关闭
    NProgress.done();
}, 2000);