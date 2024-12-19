<template>
  <div class="table-box">
    <ProTable ref="proTable" :columns="columns" :data-callback="dataCallback" :init-param="initParam" :request-api="getTableList">
      <!-- 表格 header 按钮 -->
      <template #tableHeader></template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button v-auth="'update'" :icon="EditPen" link type="primary" @click="openDrawer('编辑', scope.row)">编辑</el-button>
      </template>
    </ProTable>
    <SysConfigFormDrawer ref="drawerRef" />
  </div>
</template>

<script lang="tsx" name="sys_config" setup>
import { ref, reactive } from "vue";
import { SysConfig } from "@/api/interface/sysConfigModel";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { EditPen } from "@element-plus/icons-vue";
import { getList, deleteInfo, addInfo, editInfo, getDistinctModuleNames } from "@/api/modules/sysConfig";
import SysConfigFormDrawer from "@/views/dev/sys_config/FormDrawer.vue";
import { useAuthButtons } from "@/hooks/useAuthButtons";
import { uploadTypes } from "@/utils/dict";

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ example: 1 });

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total 这些字段，可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total
  };
};

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getList"
const getTableList = (params: any) => {
  // let newParams = JSON.parse(JSON.stringify(params));
  // newParams.createTime && (newParams.startTime = newParams.createTime[0]);
  // newParams.createTime && (newParams.endTime = newParams.createTime[1]);
  // delete newParams.createTime;
  return getList(params);
};

// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
const { BUTTONS } = useAuthButtons();

const ModuleNames = ref([]);

const getModuleNames = async () => {
  const res = await getDistinctModuleNames();
  let data = res.data;
  data.forEach((item: any) => {
    ModuleNames.value.push({ label: item, value: item });
  });
};
getModuleNames();

// 表格配置项
const columns = reactive<ColumnProps<SysConfig.ResList>[]>([
  {
    prop: "id",
    label: "ID",
    width: 80
  },
  {
    prop: "module",
    label: "配置组"
  },
  {
    prop: "module_name",
    label: "配置组名称",
    enum: ModuleNames,
    search: { el: "tree-select", props: { filterable: true } }
  },
  {
    prop: "label",
    label: "配置名"
  },
  {
    prop: "value",
    label: "配置值"
  },
  { prop: "operation", label: "操作", fixed: "right", width: 330 }
]);

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof SysConfigFormDrawer> | null>(null);
const openDrawer = (title: string, row: Partial<SysConfig.ResList> = {}) => {
  const params = {
    title,
    isView: title === "查看",
    row: { ...row },
    api: title === "创建模块" ? addInfo : title === "编辑" ? editInfo : undefined,
    getTableList: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};

// 删除信息
const deleteAccount = async (params: SysConfig.ResList) => {
  await useHandleData(deleteInfo, { id: [params.id] }, `删除【${params.name}】`);
  proTable.value?.getTableList();
};
</script>
