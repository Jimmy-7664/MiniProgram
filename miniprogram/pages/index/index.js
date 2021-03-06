// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

Page({
  data: {
    showUploadTip: false,
    powerList: [{
    //   title: '云函数',
    //   tip: '安全、免鉴权运行业务代码',
    //   showItem: false,
    //   item: [{
    //     title: '获取OpenId',
    //     page: 'getOpenId'
    //   },
    //   //  {
    //   //   title: '微信支付'
    //   // },
    //    {
    //     title: '生成小程序码',
    //     page: 'getMiniProgramCode'
    //   },
    //   // {
    //   //   title: '发送订阅消息',
    //   // }
    // ]
    // }, {
      title: '实验部分',
      tip: 'Mutual gaze with a robot affects human neural activity and delays decision-making processes',
      showItem: true,
      item: [{
        title: '实验介绍',
        page: 'createCollection',
        jump: false
      }, {
      //   title: '更新记录',
      //   page: 'updateRecord'
      // }, {
      //   title: '查询记录',
      //   page: 'selectRecord',
      //   jump: false

      // }, {
        title: '进行实验',
        page: ['experiment','experiment2'],
        jump: true
      }
    ]}],
    // }, {
    //   title: '云存储',
    //   tip: '自带CDN加速文件存储',
    //   showItem: false,
    //   item: [{
    //     title: '上传文件',
    //     page: 'uploadFile'
    //   }]
    // }, {
    //   title: '云托管',
    //   tip: '不限语言的全托管容器服务',
    //   showItem: false,
    //   item: [{
    //     title: '部署服务',
    //     page: 'deployService'
    //   }]
    // }],
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false
  },

  onClickPowerInfo(e) {
    // console.log(this.data);
    const index = e.currentTarget.dataset.index;
    const powerList = this.data.powerList;
    powerList[index].showItem = !powerList[index].showItem;
    if (powerList[index].title === '数据库' && !this.data.haveCreateCollection) {
      this.onClickDatabase(powerList);
    } else {
      this.setData({
        powerList
      });
    }
  },

  onChangeShowEnvChoose() {
    wx.showActionSheet({
      itemList: this.data.envList.map(i => i.alias),
      success: (res) => {
        this.onChangeSelectedEnv(res.tapIndex);
      },
      fail (res) {
        console.log(res.errMsg);
      }
    });
  },

  onChangeSelectedEnv(index) {
    if (this.data.selectedEnv.envId === this.data.envList[index].envId) {
      return;
    }
    const powerList = this.data.powerList;
    powerList.forEach(i => {
      i.showItem = false;
    });
    this.setData({
      selectedEnv: this.data.envList[index],
      powerList,
      haveCreateCollection: false
    });
  },

  jumpPage(e) {
    // console.log(e.currentTarget.dataset.page.jump);

    if (e.currentTarget.dataset.page.jump) {

      let rand1=Math.random();
      console.log(rand1);

      if (rand1 < 0.5) {
        wx.redirectTo({
          url: `/pages/${e.currentTarget.dataset.page.page[0]}/index?envId=${this.data.selectedEnv.envId}`,
        });
      } else {
        wx.redirectTo({
          url: `/pages/${e.currentTarget.dataset.page.page[1]}/index?envId=${this.data.selectedEnv.envId}`,
        });
      }

    } else {
      wx.redirectTo({
        url: `/pages/${e.currentTarget.dataset.page.page}/index?envId=${this.data.selectedEnv.envId}`,
      });
    }

  },
  jumpPage2(e) {
    console.log(e);
    wx.redirectTo({
      url: `/pages/${e.currentTarget.dataset.page[1]}/index?envId=${this.data.selectedEnv.envId}`,
    });
  },
  onClickDatabase(powerList) {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'createCollection'
      }
    }).then((resp) => {
      if (resp.result.success) {
        this.setData({
          haveCreateCollection: true
        });
      }
      this.setData({
        powerList
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  }
});
