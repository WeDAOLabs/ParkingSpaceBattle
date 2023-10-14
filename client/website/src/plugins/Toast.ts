import { message } from "ant-design-vue";
const [messageApi, contextHolder] = message.useMessage();

export class Toast {
  static success(msg: string) {
    messageApi.success(msg);
  }

  static error(msg: string) {
    messageApi.error(msg);
  }

  static warn(msg: string) {
    messageApi.warning(msg);
  }
}
