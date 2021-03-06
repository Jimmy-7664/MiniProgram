const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  console.log("adding");
  try {
    await db.collection('results').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        robot:event.robot,
        robotAction:event.robotAction,
        human:event.human,
        result:event.result
      }
    });
 
    return {
      success: true
    };
  } catch (e) {
    // 这里catch到的是该collection已经存在，从业务逻辑上来说是运行成功的，所以catch返回success给前端，避免工具在前端抛出异常
    return {
      success: true,
      data: 'create collection success'
    };
  }
};
