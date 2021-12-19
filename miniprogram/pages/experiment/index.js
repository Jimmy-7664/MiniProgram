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

  onLoad(options) {
    this.setData({
      envId: options.envId
    });
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'selectRecord'
      }
    }).then((resp) => {
      this.setData({
        record: resp.result.data
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  },
  exit(){
    wx.navigateTo({
      url: `/pages/index/index`,
    });
  },
  Create(e){

    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: "jimmy-gao-622a98"
      },
      data: {
        type: 'addRecord'
      }
    }).then((resp) => {
      if (resp.result.success) {
        this.setData({
          haveCreateCollection: true
        });
      };
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  },
  Avoiding(e) {
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'addRecord',
        robot: '注视',
        human: '避让',
        result: 'crash'
      }
    }).then((resp) => {
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
    wx.navigateTo({
      url: `/pages/showResult/index?envId=jimmy-gao-622a98`,
    });
  },
  NotAvoiding() {
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'addRecord',
        robot: '不注视',
        human: '不避让',
        result: 'safe'
      }
    }).then((resp) => {
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
    wx.navigateTo({
      url: `/pages/showResult2/index?envId=jimmy-gao-622a98`,
    });
  },
});
