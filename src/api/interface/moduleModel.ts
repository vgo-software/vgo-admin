import { ReqPage } from "@/api/interface/index";
// 模块模型
export namespace Module {
  export interface ReqParams extends ReqPage {
    name: string;
  }
  export interface ResList {
    id: number;
    name: string;
  }
}
