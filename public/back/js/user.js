// 用户管理的js
$(function () {
    var currentPage = 2;//当前页
    var pageSize = 5;//每页5条数据
    var currentId;//当前修改的用户id
    var isDelete; //当前修改的状态

    // 一进入页面，发送ajax请求，请求数据
    render();
    // 通过模板引擎完成渲染
    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                // 页码
                pageSize: pageSize,
                // 每页多少条数据
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                // template(模板id，数据对象)
                // 在模板中可以使用数据对象的所有属性
                htmlStr = template('tpl', info);
                // 把动态渲染出来的放到页面中
                $('tbody').html(htmlStr)

                // 根据返回的数据，实现动态渲染分页插件
                $("#pagintor").bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 当前总页数
                    totalPages: Math.ceil(info.total / info.size),
                    // 添加页码点击事件
                    onPageClicked: function (a, b, c, page) {
                        // console.log(page);
                        // 更新当前页
                        currentPage = page;
                        // 重新渲染页面
                        render();
                    }

                })
            },

        })

    }

    // 给所有的按钮，添加点击事件（事件委托的形式）
    $('tbody').on('click', '.btn', function () {
        // alert(1)
        // 点击显示模态框
        $('#userModal').modal('show')
        // 获取存储的id  按钮的父元素data('id')
        currentId = $(this).parent().data('id')
        // 1 启用状态  0 禁用状态,给后台传几，就是将用改成对应状态
        // 禁用按钮 ？0 ：1
        isDelete = $(this).hasClass('btn-success') ? 1 : 0;
        // 启用按钮
        // alert(1)
    });

    
    // 点击模态框确定按钮，发送请求，完成启用禁用功能
    $('#submitBtn').click(function () {
        console.log(currentId)
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                // id表示当前需要修改哪个用户的id
                // 把id存到按钮里面
                id: currentId,
                isDelete: isDelete
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    //修改成功
                    // 关闭模态框
                    $('#userModal').modal("hide")
                    // 重新渲染页面
                    render();
                }
            }
        })
    })
})