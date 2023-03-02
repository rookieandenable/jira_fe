/**
 * 统一导出api
 */
import unauthorized from "./unauthorized"
import home from './home'
import kanban from './kanban'

export default {
  ...unauthorized,
  ...home,
  ...kanban,
}