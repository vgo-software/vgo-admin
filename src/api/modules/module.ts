import { ResPage } from "@/api/interface/index";
import { Module } from "@/api/interface/moduleModel";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * 模块
 */
// 获取列表
export const getList = (params: Module.ReqParams) => {
  return http.get<ResPage<Module.ResList>>(PORT1 + `/modules`, params);
};

// 新增
export const addInfo = (params: { id: string }) => {
  return http.post(PORT1 + `/modules`, params);
};

// 编辑
export const editInfo = (params: { id: string }) => {
  return http.put(PORT1 + `/modules`, params);
};

// 删除
export const deleteInfo = (params: { id: string[] }) => {
  console.log(params);
  return http.delete(PORT1 + `/modules`, params);
};

// 切换状态
export const changeInfoStatus = (params: { id: string; status: number }) => {
  return http.post(PORT1 + `/modules/change`, params);
};

// 导出数据
export const exportInfo = (params: Module.ReqParams) => {
  return http.download(PORT1 + `/user/export`, params);
};
