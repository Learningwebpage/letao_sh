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
                    //callback专门用来定制回调的提示内容
                    callback: {
                        message: '用户名不存在'
                    }
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
                    //配置回调提示
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    })
    /*
    2.注册表单校验成功事件，在校验成功时，会触发
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
                    // alert('用户名不存在')
                    //参数1：字段名称
                    //参数2：校验状态 NOT_VALIDATED未校验  VALIDATING校验中   INVALID失败  VALID成功
                    $(form).data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
                }
                if (info.error === 1001) {
                    $(form).data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
                }
            }
        })
    });



    /*
    3.表单重置功能
    $(form).data('bootstrapValidator')创建插件实例
    方法：resetForm()没传参或者传false，只会重置校验状态
         resetForm(true)内容和校验状态都重置 

         由于reset按钮本身就可以重置内容，所以两种方法都可以，需要的是重置状态
    */

    //reset本身就是重置，但是只是重置里面的内容，加上这个插件的话
    //会把本身的提示也给清除了

    //属性选择器，reset表示重置按钮
    $('[type="reset"]').click(function () {
        //重置校验状态
        //$(form).data('bootstrapValidator')表示创建重置的插件
        //resetForm()这个是重置插件的方法
        $(form).data('bootstrapValidator').resetForm();
    })
})


