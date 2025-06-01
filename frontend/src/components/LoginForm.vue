<template>
  <div class="relative w-full min-h-screen flex items-center justify-center bg-gray-900">
    <!-- Background image -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    ></div>

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black opacity-50"></div>

    <!-- Form container -->
    <div class="relative w-full max-w-md mx-auto mt-0 text-gray-600 z-10">
      <form @submit.prevent="onLogin" class="bg-white flex flex-col gap-6 px-6 py-8 rounded-lg shadow-md">
        <div class="flex justify-between items-center text-black">
          <h2 class="text-xl font-bold">{{ currState }}</h2>
        </div>

        <div class="flex flex-col gap-5">
          <input
            v-if="currState === 'Sign Up'"
            name="name"
            v-model="data.name"
            type="text"
            placeholder="Your name"
            required
            class="outline-none border-2 border-gray-300 p-2.5 rounded-lg"
          />
          <input
            name="email"
            v-model="data.email"
            type="email"
            placeholder="Your email"
            required
            class="outline-none border-2 border-gray-300 p-2.5 rounded-lg"
          />
          <input
            name="password"
            v-model="data.password"
            type="password"
            placeholder="Password"
            required
            class="outline-none border-2 border-gray-300 p-2.5 rounded-lg"
          />
        </div>

        <button type="submit" class="p-2.5 text-white bg-green-500 text-[15px] rounded-lg cursor-pointer">
          {{ currState === 'Sign Up' ? 'Create Account' : 'Login' }}
        </button>

        <div class="flex items-start gap-2 mt-[-15px]">
          <input type="checkbox" required class="mt-1" />
          <p>By continuing, I agree to the terms and conditions &amp; privacy policy.</p>
        </div>

        <p v-if="currState === 'Login'">
          Create a new account?
          <span class="text-lime-500 font-bold cursor-pointer" @click="switchState('Sign Up')">Click here</span>
        </p>
        <p v-else>
          Already have an account?
          <span class="text-lime-500 font-bold cursor-pointer" @click="switchState('Login')">Login here</span>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import loginFormImg from '../assets/images/loginform.jpg';

const router = useRouter();

// States
const currState = ref('Sign Up');
const data = reactive({
  name: '',
  email: '',
  password: ''
});

const backgroundImage = loginFormImg;

const url = import.meta.env.VITE_BACKEND_API_URL;

const token = ref(localStorage.getItem('token') || null);

function switchState(state) {
  currState.value = state;
  // Clear form on switching
  data.name = '';
  data.email = '';
  data.password = '';
}

// login/signup function
async function onLogin() {
  let apiUrl = url;
  console.log('API URL:', apiUrl);
  if (currState.value === 'Login') {
    apiUrl += '/api/user/login';
  } else {
    apiUrl += '/api/user/register';
  }

  try {
    const response = await axios.post(apiUrl, {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (response.data.success) {
      token.value = response.data.token;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

     
      alert(`${currState.value} successful!`);

       
       router.push('/dashboard'); 
     
       // Reset form after success
      data.name = '';
      data.email = '';
      data.password = '';
    } else {
      alert(response.data.message || 'Authentication failed');
    }
  } catch (error) {
    alert('An error occurred: ' + (error.response?.data?.message || error.message));
  }
}
</script>
