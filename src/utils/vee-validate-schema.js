// 给 vee-validate 提供校验规则函数
export default {
  account (value) {
    if (!value) return '请输入用户名'
    // 规则：字母开头6-20字符之间
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'
    return true
  },
  // 密码校验
  password (value) {
    if (!value) return '请输入密码'
    if (!/^\w{6,24}$/.test(value)) return '密码6-24个字符'
    return true
  },
  mobile (value) {
    if (!value) return '请输入手机号'
    if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式不对'
    return true
  },
  code (value) {
    if (!value) return '请输入短信验证码'
    if (!/^\d{6}$/.test(value)) return '短信验证码六位数'
    return true
  },
  isAgree (value) {
    if (!value) return '请勾选用户协议'
    return true
  }
}
