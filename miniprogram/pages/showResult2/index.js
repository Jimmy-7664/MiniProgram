Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetRecord: false,
    envId: '',
    record: '',
    type: 1
  },

    onLoad: function (query) {
      console.log(query);
      this.setData({
        type:query.type
      });
    },
  

  goBack() {
    let rand1=Math.random();
      console.log("2");
      if (rand1 < 0.5) {
        wx.redirectTo({
          url: `/pages/experiment/index?envId=jimmy-gao-622a98`,
        });
      } else {
        wx.redirectTo({
          url: `/pages/experiment2/index?envId=jimmy-gao-622a98`,
        });
      }
  },

});
