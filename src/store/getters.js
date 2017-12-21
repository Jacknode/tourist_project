/**
 * Created by leibo on 17/11/29.
 */
export default {
  //加载动画
  loadingShow: (state) => state.loadingShow,
  //初始化动画
  transtionActive: (state) => state.transtionActive,
  //导游信息
  guiderInfoList: state => state.guiderInfoList,
  //修改导游信息obj
  guiderEditObj: state => state.guiderEditObj,
  //导游预约用户
  sceneryOrderInfoList: state => state.sceneryOrderInfoList,
}
