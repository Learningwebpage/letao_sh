// 分类管理下面的一级分类
$(function () {
    var currentPage = 1; //当前页面
    var pageSize = 5;//每页的条数
    // 一进入页面，发送ajax请求，完成渲染
    render();

    function render() {

        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                // 页数
                page: currentPage,
                // 每页的条数
                pageSize: pageSize,
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('firstTpl', info);
                $('tbody').html(htmlStr);
                // 根据返回数据，完成初始化
                $('#paginator').bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),
                    // //为按钮绑定点击事件 page:当前点击的按钮值
                    onPageClicked: function (a, b, c, page) {
                        console.log(page);
                        // 更新当前页
                        currentPage = page;
                        // 重新渲染页面
                        render();
                    }
                })
            }
        })
    }


    // 给添加按钮注册点击事件
    $('#addBtn').click(function () {
        // alert(1)
        // 让模态框显示 
        $('#addModal').modal("show")
    })

    // 调用表单校验效应

})