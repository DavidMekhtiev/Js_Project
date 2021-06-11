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
            <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" @click="updateUserObj(index)">Update</button><p></p>
          </div>
        </div>
      </div>
    </div>
    <!-- Create User -->
    <div class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 mt-3">
      <h1>Create</h1>
      <div class="space-y-0.5">
        <p for="timage_url">Image url:</p>
        <input type="url" class="rounded-l border border-purple-200" v-model="create_image_url"/>
        <p></p>
        <p for="tname">Name:</p>
        <input type="text" class="rounded-l border border-purple-200" v-model="create_first_name"/>
        <p for="tsalary">Salary:</p>
        <input type="number" class="rounded-l border border-purple-200" v-model="create_salary"/>
        <p></p>
        <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" @click="createUser()">Create</button>
      </div>
    </div>
     <!-- Update User -->
    <div class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 mt-3">
      <h1>Update</h1>
      <div class="space-y-0.5">
        <p for="timage_url">Image url:</p>
        <input type="url" class="rounded-l border border-purple-200" v-model="update_image_url"/>
        <p></p>
        <p for="tname">Name:</p>
        <input type="text" class="rounded-l border border-purple-200" v-model="update_first_name"/>
        <p for="tsalary">Salary:</p>
        <input type="number" class="rounded-l border border-purple-200" v-model="update_salary"/>
        <p></p>
        <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" @click="updateUser()">Update</button>
      </div>
    </div>
  </div>
   <!-- Posts -->
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
      create_first_name: "",
      create_salary: 0,
      create_image_url: "",
      update_id: 0,
      update_first_name: "",
      update_salary: 0,
      update_image_url: ""
    };
  },
  async mounted() {
    const user = await app.get("users");
    console.log(user.status);
    this.users = user.data;
  },
  methods:{
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
      if(this.create_salary > 0 && this.create_first_name != "" && this.create_image_url != ""){
        const { data, status } = await axios.post(`http://localhost:8080/api/users`, {
          first_name: this.create_first_name,
          salary: this.create_salary,
          image_url: this.create_image_url
        });
        console.log(data);
        console.log(status);
        this.create_salary = 0;
        this.create_first_name = "";
        this.create_image_url = "";
      }else{
        console.log("Error");
      }
      window.location.reload();
    },
    async deletePost(index){
      const id = this.posts[index].id
      const { data, status } = await app.delete(`posts/${id}`);
      console.log(status);
      console.log(data);
      this.posts.splice(index,1);
    },
    async updateUserObj(index){
      this.update_id = this.users[index].id;
      this.update_first_name = this.users[index].first_name;
      this.update_salary = this.users[index].salary;
      this.update_image_url = this.users[index].image_url;
    },
    async updateUser(){
      const { data, status } = await app.put(`users/${this.update_id}`, {
        first_name: this.update_first_name,
        salary: this.update_salary,
        image_url: this.update_image_url
      });
      console.log(data);
      console.log(status);
      this.update_id = 0;
      this.update_first_name = "";
      this.update_salary = 0;
      this.update_image_url = "";
      window.location.reload();
    }
  }
};
</script>

<style scoped>
</style>
