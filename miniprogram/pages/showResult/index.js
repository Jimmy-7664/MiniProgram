Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetRecord: false,
    envId: '',
    record: ''
  },



  goBack() {
    wx.navigateTo({
      url: `/pages/experiment/index?envId=jimmy-gao-622a98`,
    });
  },

});
