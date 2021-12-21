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
    let rand1=Math.random();
      console.log(rand1);

      if (rand1 < 0.5) {
        wx.navigateTo({
          url: `/pages/experiment/index?envId=jimmy-gao-622a98`,
        });
      } else {
        wx.navigateTo({
          url: `/pages/experiment2/index?envId=jimmy-gao-622a98`,
        });
      }
    wx.navigateTo({
      url: `/pages/experiment/index?envId=jimmy-gao-622a98`,
    });
  },

});
