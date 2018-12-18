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


    // 2.给添加按钮注册点击事件
    $('#addBtn').click(function () {
        // alert(1)
        // 让模态框显示 
        $('#addModal').modal("show")
    })

    // 3.调用表单校验插件，完成校验
    $('#form').bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 校验字段  先给input设置name
        fields: {
            categoryName: {
                // 校验规则
                validators: {
                    // 非空
                    notEmpty: {
                        // 提示信息
                        message: '请输入一级分类名称'
                    },
                }
            }
        }
    })

    // 点击添加
    $('#quit').on('click', function () {
        // alert(1)
        $("#form").on('success.form.bv', function (e) {
            e.preventDefault();
            //使用ajax提交逻辑
        });

        // 发送ajax请求
        $.ajax({
            url: '/category/addTopCategory',
            type: 'POST',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    // 模态框隐藏
                    $('#addModal').modal("hide");
                    // 重新渲染页面
                    currentPage = 1;
                    render();
                    // 重置表单内容，true表示两个状态都重置
                    $('#form').data("bootstrapValidator").resetForm(true);
                }
            }
        })

    })
})