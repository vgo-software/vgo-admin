<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" :title="`${drawerProps.title}`" size="450px">
    <el-form
      ref="ruleFormRef"
      :disabled="drawerProps.isView"
      :hide-required-asterisk="drawerProps.isView"
      :model="drawerProps.row"
      :rules="rules"
      label-suffix=" :"
      label-width="100px"
    >
      <el-form-item label="配置组" prop="module">
        <el-input v-model="drawerProps.row!.module" clearable placeholder="请填写配置组"></el-input>
      </el-form-item>
      <el-form-item label="配置组名称" prop="module_name">
        <el-input v-model="drawerProps.row!.module_name" clearable placeholder="请填写配置组名称"></el-input>
      </el-form-item>
      <el-form-item label="配置名" prop="label">
        <el-input v-model="drawerProps.row!.label" clearable placeholder="请填写配置名"></el-input>
      </el-form-item>
      <el-form-item label="配置值" prop="value">
        <el-select
          v-if="drawerProps.row!.module === 'upload' && drawerProps.row!.label === '上传服务类型'"
          v-model="drawerProps.row!.value"
          placeholder="请选择配置值"
        >
          <el-option v-for="item in uploadTypes" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-else v-model="drawerProps.row!.value" clearable placeholder="请填写配置值"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button v-show="!drawerProps.isView" type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script lang="ts" name="SysConfigFormDrawer" setup>
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { SysConfig } from "@/api/interface/sysConfigModel";
import { uploadTypes } from "@/utils/dict";

const rules = reactive({
  module: [{ required: true, message: "请填写配置组" }],
  module_name: [{ required: true, message: "请填写配置组名称" }],
  label: [{ required: true, message: "请填写配置名" }],
  value: [{ required: true, message: "请填写配置值" }]
});

interface DrawerProps {
  title: string;
  isView: boolean;
  row: Partial<SysConfig.ResList>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: "",
  row: {}
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.row);
      ElMessage.success({ message: `${drawerProps.value.title}成功！` });
      drawerProps.value.getTableList!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

defineExpose({
  acceptParams
});
</script>
