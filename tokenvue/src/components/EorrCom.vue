<template>
        <div ref="empty_" class="empty">
            <el-empty :description="empty"></el-empty>
        </div>
</template>

<script>
    export default {
        name: "EorrCom",
        data(){
            return{
                empty:'抱歉,您没有权限访问该页面,请联系管理员'
            }
        },
    }
</script>

<style scoped>

</style>