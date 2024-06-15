<script setup>
import {ref, watch} from "vue";
import {getEventCategoryService, getEventService} from "@/api/admin.js";
import {Delete, Edit} from "@element-plus/icons-vue";
  const startTime = ref();
  const endTime = ref();
  const sdTime = ref([]);
  const name = ref();
  const eventCategory = ref();
  const type = ref();
  const status = ref();
  const categorySelect = ref([]);
  const handleDateChange = () => {
    if (sdTime.value && sdTime.value.length !== 0) {
      startTime.value = sdTime.value[0];
      endTime.value = sdTime.value[1];
    } else {
      startTime.value = '';
      endTime.value = '';
    }
  };

  watch(sdTime, (newVal) => {
    if (newVal && newVal.length !== 0) {
      startTime.value = newVal[0];
      endTime.value = newVal[1];
    } else {
      startTime.value = '';
      endTime.value = '';
    }
  });
  const events = ref([]);
  const pageNum = ref(1);
  const total = ref(0);
  const loading = ref(false);
  const getEvent = async () => {
    loading.value = true;
    const params = {
      name: name.value || null,
      type: type.value !== undefined && type.value !== '' ? type.value : null,
      status: status.value !== undefined && status.value !== '' ? status.value : null,
      startTime: startTime.value || null,
      endTime: endTime.value || null,
    };
    const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== null));
     const result = await getEventService(filteredParams,pageNum.value);
     total.value = result.data.total;
     events.value = result.data.result;
     loading.value = false;
  }
  getEvent()
  const updateDialogVisible = ref(false);
  const getEventCategory = async (id) => {
         const result =  await getEventCategoryService(id)
         categorySelect.value= result.data;
         if(id !== undefined){
            eventCategory.value = result.data[0].category;
         }
  }
  getEventCategory()

</script>

<template>
  <div>
    <el-dialog v-model="updateDialogVisible" title="修改活动" draggable>
          <el-form>
            <el-form-item label="活动名称">
                <el-input placeholder="请输入活动名称" v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="活动分类">
              <el-select placeholder="请选择" v-model="eventCategory">
                 <el-option v-for="category in categorySelect" :key="category.categoryId" :value="category.categoryId" :label="category.category"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
    </el-dialog>
    <el-row>
      <el-col :xs="24" :sm="20" :md="24" :lg="24" :xl="24">
        <el-form inline>
          <el-form-item label="活动名称">
            <el-input placeholder="请输入活动名称" v-model="name" style="width: 150px"></el-input>
          </el-form-item>
          <el-form-item label="活动分类">
            <el-select placeholder="请选择" v-model="type" style="width: 150px">
              <el-option v-for="c in categorySelect" :key = "c.categoryId" :label="c.category" :value="c.categoryId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动状态">
            <el-select placeholder="请选择" v-model="status" style="width: 150px">
              <el-option label="结束" value="0"></el-option>
              <el-option label="正在进行" value="1"></el-option>
              <el-option label="未开始" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起止时间">
            <el-date-picker
                v-model="sdTime"
                type="daterange"
                range-separator="-"
                start-placeholder="起始时间"
                end-placeholder="结束时间"
                :size="'default'"
                @change="handleDateChange"
                unlink-panels
            />
          </el-form-item>
          <el-form-item><el-button type="primary" @click="getEvent()" v-loading="loading">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-table :data="events" style="width: 100%">
      <el-table-column label="ID" width="100" type="index"> </el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="类别" prop="category"></el-table-column>
      <el-table-column label="状态">
        <template #default="{ row }">
             <span v-if="row.status ===0">
                 未开始
             </span>
          <span v-if="row.status ===1">
             正在进行
          </span>
          <span v-if="row.status ===2">
            已结束
          </span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" prop="startTime">
      </el-table-column>
      <el-table-column label="结束时间" prop="endTime"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="getEventCategory(row.categoryId);updateDialogVisible=true"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="deleteArticle(row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </div>
</template>

<style scoped>

</style>