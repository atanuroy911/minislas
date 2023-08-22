//获取应用实例
var app = getApp()
Page({
  data: {
    userName: '',
    userN:''
  },
  //用户名和密码输入框事件
  userNameInput: function (e) {
    this.setData({
      userN: e.detail.value
    })
  },
  submitBtnClick: function () {
    if (this.data.userN.length == 0) {
      this.setData({
        infoMess: '温馨提示：用户名和密码不能为空！',
      })
    } else {
      this.setData({
        userName: '用户名：' + this.data.userN,
      })
    }
    var _this=this;
    wx.request({
      url: 'https://www.test.com/index.php',
      header: { "content-type": "application/x-www-form-urlencoded" },
      method: "POST",
      data: {
        name: "新开始",
        sex: "密码"
      },

      success: function (res) {
        console.log(res.data);
        var result = res.data.name;
        console.log(result);
        wx.showModal({
          title: '这是收到的数据',
          content: JSON.stringify(res),
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              _this.setData({
                jiekou: result
              })

            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }

    })
  },
  //重置按钮点击事件
  resetBtnClick: function (e) {
    this.setData({
      infoMess: '',
      userName: '',
      userN: ''
    })
  },
  onLoad: function () {

  }
})