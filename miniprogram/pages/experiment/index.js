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
    wx.redirectTo({
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
    let rand1=Math.random();
    let avoidFlag=false;
    if(rand1<=0.3){
      avoidFlag=true;
    }
    let robotAction="不避让";
    if(avoidFlag){
      robotAction="避让";
    }
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'addRecord',
        robot: '注视',
        robotAction:robotAction,
        human: '避让',
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
    console.log(e);
    wx.redirectTo({
      url: `/pages/showResult2/index?envId=jimmy-gao-622a98&type=1&avoid=${avoidFlag}&human=true`,
    });
  },
  NotAvoiding() {
    let rand1=Math.random();
    let avoidFlag=false;
    let result='crash';
    if(rand1<=0.3){
      avoidFlag=true;
      result='safe';
    }
    let robotAction="不避让";
    if(avoidFlag){
      robotAction="避让";
    }
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'addRecord',
        robot: '注视',
        robotAction:robotAction,
        human: '不避让',
        result: result
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
    if(!avoidFlag){
      wx.redirectTo({
        url: `/pages/showResult/index?envId=jimmy-gao-622a98&type=1&avoid=${avoidFlag}&human=false`,
      });
    }else{
    wx.redirectTo({
      url: `/pages/showResult2/index?envId=jimmy-gao-622a98&type=1&avoid=${avoidFlag}&human=false`,
    });
  }
  },
});
