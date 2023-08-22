var textVal ='SLAS:Self-Lecture Attendance System'
var
stuId='Student ID'
var chekIP = 'Check IP'
var code = 'CODE:'

Page({

  data:{
    textVal_str: textVal,
    stuId_str: stuId,
    chekIP_str: chekIP,
    code_str: code,
    stu_id:'',
    stu_ip:'',
    getcode:'',
    getIP:''
  },

  //获取id
  idInput:function(e){
    this.setData({
      stu_id:e.detail.value,
    })
  },
  //获取ip
  setIP: function (e) {
    var _this = this;
    console.log("扫描二维码");
    wx.scanCode({
      success: (res) => {
        console.log(res);
      
        _this.show = res.result;
        _this.setData({
          getIP: _this.show,
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })

      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  //scanode
  setScan: function (e) {
    var _this=this;
    console.log("扫描二维码");
    wx.scanCode({
      success: (res) => {
        console.log(res);
        _this.show = res.result;
        _this.setData({
          getcode: _this.show,
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })

      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  //attend
  setAttend: function (e) {
    var _this = this;
    wx.request({
      url:'http://'+ _this.data.getIP+'/post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        data: _this.data.getcode+","+ _this.data.stu_id
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
              jiekou: result,
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: 'SLAS',
    }
  }

})