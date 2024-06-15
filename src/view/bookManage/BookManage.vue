<script setup>
 import {ref} from "vue";

 const categoryId = ref();
 const state = ref();
 const books = ref([]);
const name = ref();
</script>

<template>
  <div>
    <el-row>
       <el-col :xs="24" :sm="20" :md="24" :lg="24" :xl="24">
         <el-form inline>
           <el-form-item label="书籍名称">
             <el-input placeholder="请输入书籍名称" v-model="name" style="width: 150px"></el-input>
           </el-form-item>
         <el-form-item label="书籍分类">
           <el-select placeholder="请选择" v-model="categoryId" style="width: 150px">
             <el-option v-for="c in categorys" :key = "c.id" :label="c.categoryName" :value="c.id"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="书籍状态">
           <el-select placeholder="请选择" v-model="state" style="width: 150px">
             <el-option label="下架" value="0"></el-option>
             <el-option label="在售" value="1"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item><el-button type="primary">搜索</el-button>
         </el-form-item>
       </el-form>
       </el-col>
    </el-row>

    <el-table :data="books" style="width: 100%">
      <el-table-column label="ID" width="100" type="index"> </el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="分类" prop="category"></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
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