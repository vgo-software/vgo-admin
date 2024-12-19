import { ReqPage } from "@/api/interface/index";
// 系统配置
export namespace SysConfig {
  export interface ReqParams extends ReqPage {
    name: string;
  }
  export interface ResList {
    id: number;
    module: string;
    module_name: string;
    label: string;
    value: string;
  }
}
