Page({
  setEnter:function(e){
    wx.redirectTo({
      url: '../student/student',
    })
  },
  onShareAppMessage: function () {
    return {
      title: '江西理工大学',
    }
  }
})