Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetRecord: false,
    envId: '',
    record: '',
    type: ''
  },

  onLoad: function (query) {
    console.log(query);

    if (query.human=="true" & query.avoid=="true") {
      this.setData({
        type:3
      })
    }
    if (query.human == "true"  & query.avoid=="false") {
      this.setData({
        type:2
      })    }
    if (query.human == "false" & query.avoid=="true") {
      this.setData({
        type:1
      })    
    }
    // this.setData({
    //   type: query.human
    // });
    console.log(this.data.type);

  },


  goBack() {
    let rand1 = Math.random();
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