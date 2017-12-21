/**
 * Created by leibo on 17/11/29.
 */
import getters from './getters'

const state = {
	//加载动画
	loadingShow: false,
	//初始化动画
	transtionActive: {
		isActive: false,
		isMove: false
	},
  //导游信息
  guiderInfoList:[],
  //初始化修改导游obj
  guiderEditObj:{},
  //预约用户
  sceneryOrderInfoList:[],
};

const mutations = {
	//loading动画过渡
	showLoading(state) {
		state.loadingShow = true
	},
	hideLoading() {
		state.loadingShow = false
	},
	//初始化动画
	setTranstionFalse(state) {
		state.transtionActive = {
			isActive: false,
			isMove: false
		}
	},
	oPTranstionFalse() {
		state.transtionActive = {
			isActive: !state.transtionActive.isActive,
			isMove: !state.transtionActive.isMove
		}
	},
  initGuiderInfoList(state,data){
	  state.guiderInfoList = data;
  },
  //修改导游obj
  setGuiderEditObj(state,id){
    state.guiderEditObj = state.guiderInfoList.filter(item=>{
      if(item.gi_Code==id){
        return true;
      }
      return false;
    })[0]
  },
  //删除导游
  GuiderDelete(state,id){
    state.guiderInfoList = state.guiderInfoList.filter(item=>{
      if(item.gi_Code==id){
        return false;
      }
      return true;
    })
  },
  //导游预约用户
  initSceneryOrderInfoList(state,data){
    state.sceneryOrderInfoList = data;
  }
};

export default {
	getters,
	state,
	mutations
}
