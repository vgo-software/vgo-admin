import { ResPage } from "@/api/interface/index";
import { SysConfig } from "@/api/interface/sysConfigModel";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * 模块
 */
// 获取列表
export const getList = (params: SysConfig.ReqParams) => {
  return http.get<ResPage<SysConfig.ResList>>(PORT1 + `/sys-configs`, params);
};

// 新增
export const addInfo = (params: { id: string }) => {
  return http.post(PORT1 + `/sys-configs`, params);
};

// 编辑
export const editInfo = (params: { id: string }) => {
  return http.put(PORT1 + `/sys-configs`, params);
};

// 删除
export const deleteInfo = (params: { id: string[] }) => {
  console.log(params);
  return http.delete(PORT1 + `/sys-configs`, params);
};

// 获取所有模块名称
export const getDistinctModuleNames = () => {
  return http.get(PORT1 + `/sys-configs/distinct-module-names`);
};
