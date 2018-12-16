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
}, 500);


//等待页面dom结构的加载后执行
$(function () {
    //注册事件完成公共功能
    //功能1：左侧二级导航切换效果,分类管理的类
    $('.lt_aside .category').click(function () {
        //点击让下面展示
        //slideToggle切换
        //stop()保证每次执行下面的动画之前，让前面的动画停止
        $('.lt_aside .child').stop().slideToggle();
    })

    //功能2：左侧菜单切换效果
    $('.icon_left').click(function () {
        // alert(1)
        // 切换  hidemenu 距离左边0
        //<!-- 乐淘侧边栏 -->
        $('.lt_aside').toggleClass('hidemenu');
        // 右上方
        $('.lt_topbar').toggleClass('hidemenu');
        // 整个主体
        $('.lt_main').toggleClass('hidemenu');
    })
    //功能3：退出功能
    $('.icon_right').click(function () {
        //让模态框显示
        $('#logoutModal').modal('show')
    });

    //给退出按钮添加点击事件，需要在退出时，销毁用户的登录状态
    $('#logoutBtn').click(function () {
        //发送ajax请求
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function (info) {
                if (info.success) {
                    console.log(1);

                    //销毁登录状态成功，跳转到登录页
                    location.href = 'login.html'
                }
            }
        })
    })
})