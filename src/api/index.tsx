/**
 * 统一导出api
 */
import unauthorized from "./unauthorized"
import home from './home'

export default {
  ...unauthorized,
  ...home,
}