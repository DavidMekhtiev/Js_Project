<template>
<div class="grid grid-flow-col">
  <div class="container bg-gray-50 h-screen">
    <div v-for="(user, index) in users" :key="user.id">
      <div class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 mt-3">
        <img class="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0" :src="user.image_url" alt="img" />
        <div class="text-center space-y-2 sm:text-left">
          <div class="space-y-0.5">
            <p class="text-lg text-black font-semibold">{{ user.first_name }}</p>
            <p class="text-gray-500 font-medium">{{ user.salary }}</p>
            <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" @click="getPosts(index)">Posts</button><p></p>
            <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" @click="deleteUser(index)">Delete</button><p></p>
            <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" @click="updateUser(index)">Update</button><p></p>
          </div>
        </div>
      </div>
    </div>

    <div class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 mt-3">
      <div class="space-y-0.5">
        <p for="timage_url">Image url:</p>
        <input type="url" class="rounded-l border border-purple-200" v-model="timage_url"/>
        <p></p>
        <p for="tname">Name:</p>
        <input type="text" class="rounded-l border border-purple-200" v-model="tname"/>
        <p for="tsalary">Salary:</p>
        <input type="number" class="rounded-l border border-purple-200" v-model="tsalary"/>
        <p></p>
        <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" @click="createUser()">Create</button>
      </div>
    </div>
  </div>

  <div class="container h-screen w-screen">
    <div v-for="(post, index) in posts" :key="post.id">
      <div class="py-8 px-8 max-w mx-5 bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 mt-3">
        <div class="text-center space-y-2 sm:text-left">
          <div class="space-y-0.5">
            <p class="text-lg text-black font-semibold">{{ post.title }}</p>
            <p class="text-gray-500 font-medium">{{ post.content }}</p>
            <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" @click="deletePost(index)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import axios from "axios";
const app = axios.create({ baseURL: "http://localhost:8080/api/" });
export default {
  data() {
    return {
      users: [],
      posts: [],
      tname: "",
      tsalary: 0,
      timage_url: ""
    };
  },
  async mounted() {
    const user = await app.get("users");
    console.log(user.status);
    this.users = user.data;
  },
  methods:{
    async getCompanies(index){
      const id = this.users[index].id
      const { data, status } = await app.get(`users/${id}/companies`);
      console.log(status);
      alert(data.company_name);
    },
    async getPosts(index){
      const id = this.users[index].id
      const { data, status } = await app.get(`users/${id}/posts`);
      console.log(status);
      console.log(data);
      this.posts = data;
    },
    async deleteUser(index){
      const id = this.users[index].id
      const { data, status } = await app.delete(`users/${id}`);
      console.log(status);
      console.log(data);
      this.users.splice(index,1);
    },
    async createUser(){
      if(this.tsalary > 0 && this.tname != "" && this.timage_url != ""){
        axios.post(`http://localhost:8080/api/users`, {first_name: this.tname, 
                                                       salary: this.tsalary, 
                                                       image_url: this.timage_url})
        .then(function (response){
          console.log(response);
        }).catch(function (error){
          console.log(error);
        })
        this.tsalary = 0;
        this.tname = "";
        this.timage_url = "";
      }else{
        console.log("Error");
      }
    },
    async deletePost(index){
        const id = this.posts[index].id
        const { data, status } = await app.delete(`posts/${id}`);
        console.log(status);
        console.log(data);
        this.posts.splice(index,1);
    },
    async updateUser(index){
      
    }
  }
};
</script>

<style scoped>
</style>
