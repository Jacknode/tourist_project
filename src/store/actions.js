/**
 * Created by leibo on 17/11/29.
 */
import {postPromise} from '@/assets/js/public'
export default {
  //导游信息
  getGuiderInfoList({commit},data){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:10004/Service1.asmx/GetGuiderInfoList', data)
        .then(data=>{
          var data = JSON.parse(data);
          console.log(data)
          if (Number(data.backCode) == 200) {
            commit('initGuiderInfoList', data.tm_GuiderInfoList)
            relove(Number(data.total))
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //添加导游
  AddGuiderInfo({commit},data){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:10004/Service1.asmx/AddGuiderInfo', data)
        .then(data=>{
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            relove()
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //修改导游
  updateGuiderInfo({commit},data){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:10004/Service1.asmx/UpdateGuiderInfo', {
        loginUserID:'huileyou',
        loginUserPass:123,
        Code:data.gi_Code,
        Name:data.gi_Name,
        SceneryID:data.gi_SceneryID,
        SceneryName:data.gi_SceneryName,
        Telephone:data.gi_Telephone,
        Level:data.gi_Level,
        Sex:data.gi_Sex,
        DoYears:data.gi_DoYears,
        CertNo:data.gi_CertNo,
        Image:'',
        HeadImage:'',
        Fee:data.gi_Fee,
        IsFree:data.gi_IsFree,
        Introduce:data.gi_Introduce,
        IsDelete:0,
        Remark:data.gi_Remark,
      })
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            relove()
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //删除导游
  GuiderDelete({commit},id){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:10004/Service1.asmx/DelectGuiderInfo',{
        // loginUserID:'huileyou',
        // loginUserPass:123,
        Code:id
      })
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            commit('GuiderDelete', id)
            relove()
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //导游预约用户
  getSceneryOrderInfoList({commit},data){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:10004/Service1.asmx/GetBookGuiderList', data)
        .then(data=>{
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            commit('initSceneryOrderInfoList', data.tm_BookGuiderList)
            relove(Number(data.total))
          } else {
            reject(data.backResult)
          }
        })
    })
  }
}
