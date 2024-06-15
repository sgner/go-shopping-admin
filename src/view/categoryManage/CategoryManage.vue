<script setup>
import {nextTick, ref} from "vue";
import {
  addCategoryService,
  deleteCategoryService,
  getAvailableParentCategoryService, getBookCategoryService, getCategoryByIdService,
  getCategoryService,
  getCurrentCategoryParentService, getSubCategoryService
} from "@/api/admin.js";
import {Edit, Delete} from '@element-plus/icons-vue';
const categorys = ref([])
const name = ref('')
const updateName = ref('')
const type = ref('')
const PageNum = ref(1)
const total = ref(0)
const search = async ()=>{
  loading.value = true
  await getCategories()
  loading.value = false
}
const getCategories = async ()=>{
    const result= await getCategoryService(name.value,type.value,PageNum.value)
    categorys.value = result.data.result
    total.value = result.data.total
}
const deleteCategory = async (id,type)=>{
     await deleteCategoryService(id,type)
     await getCategories()
}
const onCurrentChange = (pageNum)=>{

}
const updateDialogVisible = ref(false)
getCategories()
const parent = ref()
const parentList = ref([
])
const sonList = ref([
])
const defaultProps = {
  children: 'subCategories',
  label: 'name',
}
const handleDragStart = (node) => {
  console.log('drag start', node.data.name);
};

const handleDragEnter = (draggingNode, dropNode) => {
  console.log('tree drag enter:', dropNode.data.name);
};

const handleDragLeave = (draggingNode, dropNode) => {
  console.log('tree drag leave:', dropNode.data.name);
};

const handleDragOver = (draggingNode, dropNode) => {
  console.log('tree drag over:', dropNode.data.name);
};

const handleDragEnd = (draggingNode, dropNode, dropType) => {
  console.log('tree drag end:', dropNode && dropNode.data.name, dropType);
};

const handleDrop = (draggingNode, dropNode, dropType) => {
  console.log('tree drop:', dropNode.data.name, dropType);
  console.log('Dragged Node ID:', draggingNode.data.id);
  console.log('Target Node ID:', dropNode.data.id);
};

const allowDrop = (draggingNode, dropNode) => dropNode.data.id !== 1;

const allowDrag = (draggingNode) => draggingNode.data.id !== 1;

const append = (node, data) => {
  const timestamp = new Date().getTime();
  const newChild = {
    isEdit: 0,
    name: 'T' + timestamp,
    subCategories: [],
  };
  if (!data.subCategories) {
    data.subCategories = [];
  }
  data.subCategories.push(newChild);
};

const remove = (node, data) => {
  const parent = node.parent;
  const children = parent.data.subCategories || parent.data;
  const index = children.findIndex(d => d.id === data.id);
  children.splice(index, 1);
};

const edit = (node, data) => {
  if (!data) return;
  data.isEdit = 1;
  updateName.value = data.name;
  nextTick(() => {
    document.querySelector('.el-input__inner').focus();
    input.value.input.focus()
  });
};
const input = ref()
const submitEdit = (node, data) => {
  if (!data) return;
  if (data.name === updateName.value) {
    console.log('没有修改');
    updateName.value = '';
    data.isEdit = 0;
  } else {
    data.name = updateName.value;
    updateName.value = '';
    data.isEdit = 0;
  }
};

const getParent = async (id,type)=>{
      const result = await getAvailableParentCategoryService(id,type)
      parentList.value = result.data
}
const getCurrentParent = async (id)=>{
    const result = await getCurrentCategoryParentService(id)
     if(typeof result.data !== 'undefined'){
       parent.value = result.data.name
     }else {
       parent.value = ''
     }
}
const currentCategory = ref({
      id: '',
      name:'',
      type:''
})
const currentType = ref()
const geCurrentSubCategory = async (id)=>{
    const request = await getSubCategoryService(id)
    sonList.value = request.data
}
const getCategoryById = async (id)=>{
  const result = await getCategoryByIdService(id)
  currentCategory.value = result.data;
  currentType.value = currentCategory.value.type
  if(currentCategory.value.type === 0){
      currentCategory.value.type = '书籍分类'
  }else{
     currentCategory.value.type = '活动分类'
  }
}
const loading = ref(false)
const addSubCategories = ref([])
const handleClose = (subCategory) => {
  addSubCategories.value.splice(addSubCategories.value.indexOf(subCategory), 1)
}
const inputVisible = ref(false)
const InputRef = ref(null)
const inputValue = ref('')
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.input.focus()
  })
}
const handleInputConfirm = () => {
  if (inputValue.value) {
    addSubCategories.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
const addCategory = async () => {
     await addCategoryService()
}
const addCategoryVisible = ref(false)
const addCategoryForm = ref(
    {
        name: '',
        type:'',
        parent:''
    }
)
const bookCategoryList = ref([])
const getBookCategory = async ()=>{
    const result =  await getBookCategoryService()
    bookCategoryList.value = result.data
}
</script>

<template>
  <div>
    <el-dialog v-model="addCategoryVisible">
         <el-form label-width="auto">
               <el-form-item label="分类名称">
                    <el-input placeholder="请输入分类名称" v-model="addCategoryForm.name"></el-input>
               </el-form-item>
           <el-form-item label="分类类别">
             <el-select v-model="addCategoryForm.type" placeholder="请选择分类类别">
                  <el-option label="书籍分类" value="0"></el-option>
                  <el-option label="活动分类" value="1"></el-option>
             </el-select>
           </el-form-item>
            <el-form-item label="父分类" v-if="addCategoryForm.type===0">
              <el-select v-model="addCategoryForm.parent" placeholder="请选择父分类">
                <el-option v-for="item in bookCategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
         </el-form>
    </el-dialog>
    <el-dialog v-model="updateDialogVisible" title="修改分类" width="600px" draggable>
        <el-form label-width="auto">
          <el-form-item label="分类ID">
                <el-input v-model="currentCategory.id" placeholder="分类ID" disabled ></el-input>
          </el-form-item>
           <el-form-item label="分类名称">
                <el-input v-model="currentCategory.name" placeholder="请输入分类名称" ></el-input>
           </el-form-item>
          <el-form-item label="分类类别">
            <el-input v-model="currentCategory.type" placeholder="分类类别" disabled ></el-input>
          </el-form-item>
          <el-form-item label="子分类" v-if="currentType===0" size="large">
            <el-row justify="space-between">
               <el-col :span="18">
                 <el-scrollbar style="min-width: 100%" height="100px" >
                   <div class="custom-tree-container">
                     <div class="block" style="width:300px">
                       <el-tree
                           :data="sonList"
                           node-key="id"
                           :props="defaultProps"
                           :expand-on-click-node="false"
                           @node-click="nodeclick"
                           @node-drag-start="handleDragStart"
                           @node-drag-enter="handleDragEnter"
                           @node-drag-leave="handleDragLeave"
                           @node-drag-over="handleDragOver"
                           @node-drag-end="handleDragEnd"
                           @node-drop="handleDrop"
                           draggable
                           :allow-drop="allowDrop"
                           :allow-drag="allowDrag"
                           :height="208"
                           accordion
                       >
                         <template #default="{ node, data }">
        <span class="custom-tree-node">
          <template v-if="data.isEdit === 1">
            <el-input ref="input" @blur="() => submitEdit(node, data)" v-model="updateName" style="height:20px; line-height:20px" class="el-input__inner"></el-input>
          </template>
          <span v-else v-text="data.name"></span>
          <span>
            <el-button type="text" size="small" @click="() => edit(node, data)" style="margin-left: 4px">编辑</el-button>
            <el-button type="text" size="small" @click="() => append(node, data)" style="margin-left: 0">添加子分类</el-button>
            <el-button type="text" size="small" @click="() => remove(node, data)" style="margin-left: -3px">删除</el-button>
            </span>
           </span>
                         </template>
                         <template #empty>
                           <el-row justify="center">
                             <el-col>
                               <span>没有子分类</span>
                             </el-col>
                           </el-row>
                         </template>
                       </el-tree>
                     </div>
                   </div>
                 </el-scrollbar>
               </el-col>
              <el-col :span="6">
                <el-row>
                  <el-col>
                    <el-tag
                        v-for="subCategory in addSubCategories"
                        :key="subCategory"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(subCategory)"
                        type="info"
                        style="margin-right: 10px"
                        class="category-tag"
                    >
                      {{ subCategory.length>8?subCategory.substring(0,7)+'...':subCategory}}
                    </el-tag>
                    <el-input
                        v-if="inputVisible"
                        ref="InputRef"
                        v-model="inputValue"
                        class="w-20"
                        size="small"
                        @keyup.enter="handleInputConfirm"
                        @blur="handleInputConfirm"
                        style="width: 100px"
                    />
                    <el-button v-else class="button-new-tag" size="small" @click="showInput" type="info">
                      + 添加子分类
                    </el-button>
                    <el-row>
                      <span> 子分类不宜复杂</span>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row v-if="addSubCategories.length!==0" justify="end">
                  <el-col>
                    <el-button type="info" plain @click="clearAddSubCategories" size="small">清空</el-button>
                    <el-button type="primary" @click="submitAddSubCategories" plain size="small">提交</el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="父分类" v-if="currentType===0">
              <el-select v-model="parent" placeholder="选择父分类">
                    <el-option v-for="parent in parentList" :value="parent.id" :label="parent.name"></el-option>
              </el-select>
          </el-form-item>
        </el-form>
    </el-dialog>
    <el-row>
      <el-col :xs="24" :sm="20" :md="24" :lg="24" :xl="24">
        <el-form inline>
          <el-form-item label="分类名称">
            <el-input placeholder="请输入分类名称" v-model="name" style="width: 150px"></el-input>
          </el-form-item>
          <el-form-item label="分类类别">
            <el-select placeholder="选择分类类别" v-model="type" style="width: 150px">
              <el-option label="书籍分类" value='0'></el-option>
              <el-option label="活动分类" value='1'></el-option>
              <el-option label="无" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item><el-button type="primary" @click="search()" v-loading="loading">搜索</el-button>
          </el-form-item>
          <el-form-item><el-button type="primary" @click="addCategoryVisible=true" v-loading="loading">新增分类</el-button></el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-table :data="categorys" style="width: 100%" height="80vh">
      <el-table-column label="ID" width="100" type="index" prop="id"> </el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="updateDialogVisible=true;getParent(row.id,row.type);getCurrentParent(row.id);getCategoryById(row.id);geCurrentSubCategory(row.id)"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row.id,row.type)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"/>
      </template>
    </el-table>
    <el-row justify="start">
      <el-col :span="10">
        <el-pagination small background layout="total, prev, pager, next , jumper" :total="total"  class="el-pagination"
                       v-model:current-page="PageNum"
                       @current-change="onCurrentChange"/>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
/deep/ .el-tree {
  width: 100%;
}

/deep/ .el-tree > .el-tree-node {
  display: inline-block;
  min-width: 100%;
}
.el-input__inner{

}
</style>