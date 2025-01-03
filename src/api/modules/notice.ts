import { ResPage } from "@/api/interface/index";
import { Notice } from "@/api/interface/noticeModel";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * 公告
 */
// 获取列表
export const getList = (params: Notice.ReqParams) => {
  return http.get<ResPage<Notice.ResList>>(PORT1 + `/notices`, params);
};

// 新增
export const addInfo = (params: { id: string }) => {
  return http.post(PORT1 + `/notices`, params);
};

// 编辑
export const editInfo = (params: { id: string }) => {
  return http.put(PORT1 + `/notices`, params);
};

// 删除
export const deleteInfo = (params: { id: string[] }) => {
  console.log(params);
  return http.delete(PORT1 + `/notices`, params);
};

// 切换状态
export const changeInfoStatus = (params: { id: string; status: number }) => {
  return http.post(PORT1 + `/notices/change`, params);
};

// 导出数据
export const exportInfo = (params: Notice.ReqParams) => {
  return http.download(PORT1 + `/user/export`, params);
};
