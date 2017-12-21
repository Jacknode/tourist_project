/**
 * Created by leibo on 17/11/13.
 */
//获取日期 格式年-月-日
export const getNewDate = (value) => {
  let reg = /\d+/g
  var num = value.match(reg)[0];
  var date = new Date(Number(num));
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};
//获取状态
export const getStatus = (value) => {
  switch (Number(value)) {
    case 0:
      return '空闲';
    case 1:
      return '锁定';
    default:
      return '使用'
  }
};
//取票状态
export const GetState = (value) => {
  switch (Number(value)) {
    case 0:
      return '未取票';
    case 1:
      return '已取票';
    default:
      return '未知'
  }
};
//获取启用状态
export const getDelete = (value) => {
  if (Number(value) == 0) {
    return '启用'
  } else {
    return '不启用'
  }
}

//获取支付状态
export const getPayState = (value) => {
  if (Number(value) == 0) {
    return '未支付'
  } else {
    return '已支付'
  }
}
//获取入住状态
export const getUseStatus = (value) => {
  switch (Number(value)) {
    case 0:
      return '未入住';
    case 1:
      return '已入住';
    case 2:
      return '已退房';
    default:
      return '未知';
  }
}
export const useStatus = (value) => {
  switch (Number(value)) {
    case 0:
      return '未使用';
    case 1:
      return '已使用';
    case 2:
      return '已离店';
    default:
      return '未知';
  }
}
export const getGrade = (value) => {
  switch (Number(value)) {
    case 0:
      return '差评';
    case 1:
      return '中评';
    case 2:
      return '好评'
    default:
      return '未评级';
  }
}
//票状态
export const getTicketStatus = (value)=>{
  switch (Number(value)) {
    case 0:
      return '无效';
    case 1:
      return '正常';
    case 2:
      return '已退'
    case 3:
      return '已废'
    case 3:
      return '已检'
    default:
      return '未知';
  }
}
//获取性别
export const getSex = value=>{
  switch (Number(value)) {
    case 0:
      return '男';
    case 1:
      return '女';
    default:
      return '未知性别';
  }
}
//获取空闲
export const getFree = value=>{
  switch (Number(value)) {
    case 0:
      return '空闲';
    case 1:
      return '繁忙';
    default:
      return '未知';
  }
}
