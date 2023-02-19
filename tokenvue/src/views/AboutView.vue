<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
 <script>
   import axios from '@/axios'
   export default {
     name:'AboutView',
     async mounted() {
       var res=await axios.post('/home')
         console.log(res.data)
     }
   }
 </script>
