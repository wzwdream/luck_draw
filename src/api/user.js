/*
 * @Description: 用户信息
 */

const userInfo = {
    userId: '',
    userName: '',
    phone: '',
    nickname: ''
}

// 设置用户信息
// 传入一个对象
export function setUserInfo(obj) {
    Object.keys(userInfo).forEach(item => {
        if(obj[item]) userInfo[item] = obj[item]
    })
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

// 获取用户信息
// 传入key值
export function getUserInfo(key) {
    return userInfo[key] || JSON.parse(localStorage.getItem('userInfo'))[key]
}