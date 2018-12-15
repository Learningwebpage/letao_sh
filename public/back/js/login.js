$(function () {
    // 获取表单
    $('#form').bootstrapValidator({
        //配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',//校验成功
            invalid: 'glyphicon glyphicon-remove',//校验失败
            validating: 'glyphicon glyphicon-refresh'//校验中
        },


        fields: {
            username: {
                // 校验规则
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    // 长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须在6到30之间'
                    },
                }
            },

            password: {
                //配置校验规则
                validators: {
                    //非空校验
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须是6-12位'
                    },
                }
            }
        }
    })
    /*
注册表单校验成功事件，在校验成功时，会触发
在事件中阻止默认的提交(会跳转)，通过ajax进行提交（异步不跳转）
**/
    $("#form").on('success.form.bv', function (e) {
        //阻止浏览器默认行为
        e.preventDefault();
        //使用ajax提交逻辑

        //通过ajax提交
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('#form').serialize(),//表单序列化，获取表单中的所有内容
            dataType: 'json',
            success: function (info) {
                console.log(1);
                if (info.success) {
                    //成功跳转到首页

                    location.href = 'index.html';
                }
                if (info.error === 1000) {
                    alert('用户名不存在')
                }
                if (info.error === 1001) {
                    alert('密码错误')
                }
            }
        })
    });


})


