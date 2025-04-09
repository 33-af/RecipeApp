import { create } from 'zustand';
// import { BACKEND_API } from '@/constants/BackendApi';
// import { AuthStoreProps, SignInProps, SignUpProps } from '@/types/Store';
// import axios from 'axios';
// import Cookies from 'js-cookie';
import Error from 'next/error';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { headers } from 'next/headers';




type User = {
  username: string;
  email: string;
  profileImage?:string;
  createdAt?:string;
  _id?: string;
};

export type SignInProps={
  email: string;
  password: string;
}


type Recipe = {
  _id: number;
  title: string;
  caption: string;
  image: string;
  rating: number;
  user:{
    _id:number;
    username:string;
    profileImage:string
  }
  createdAt: Date;
  updatedAt: Date;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  recipes: Recipe[] | null;
  signIn: (data: SignInProps) => Promise<{ success: boolean }>;
  signUp: (data: { username: string; email: string; password: string }) => Promise<{ success: boolean }>;
  getRecipes: () => Promise<Recipe[]>;

};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null, 
  isLoading: false,
  recipes:null,
  token:null,

  signUp: async ({ username, email, password }) => {
    set({ isLoading: true });
    try {
      const response = await fetch("https://recipe-yt.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
           credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      console.log("Response data:", data);

      if (!response.ok) throw new Error(data.message || "Something went wrong");
      



      set({token:data.token, user: data.user, isLoading: false });
      const currentUser = get().user; // Получаем текущего пользователя после обновления состояния
      console.log("User Store", currentUser);

    

      return { success: true };
    } catch (error: unknown) {
      set({ isLoading: false });
      console.error("SignUp error:", error); // Логируем ошибку
      return { success: false };
    }
  },

  signIn: async ({ email, password }) => {
    set({ isLoading: true });
    try {
      const response = await fetch("https://recipe-yt.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 👈 обязательно, чтобы получить cookie
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("Response data:", data);
  
      if (!response.ok) throw new Error(data.message || "Something went wrong");
  
      // Предполагается, что токен установился как куки, а не приходит в body
      set({ isLoading: false });
  
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      set({ isLoading: false });
      return { success: false };
    }
  },

  
 // Inside useAuthStore or however your store is structured
 getRecipes: async () => {
  try {
    const cookies = document.cookie;
console.log("Cookies:", cookies);  // Log the full cookie string

const token = typeof document !== 'undefined'
  ? cookies.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
  : null;

console.log("Extracted Token:", token);  // Log the extracted token
if (!token) {
  console.log("No token");
}


    const res = await fetch("https://recipe-yt.onrender.com/api/recipes", {
      method: 'GET',
      // headers: {
      //   'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      // },
      credentials: 'include', // Keep this if you're sending cookies, as in your original code
    });
    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error("Error fetching recipes:", err);
  }
},





  

// checkAuth: async () => {
//   try{
// // const token = await localStorage.getItem("token");
// // const userJson = await localStorage.getItem("user");
// // const user =userJson ? JSON.parse(userJson) : null;
// set({token, user});
//   }catch(e){
// console.log("Error", e)
//   }
// },
// logout: async() =>{
//   await localStorage.removeItem("token");
//   await localStorage.removeItem("user");
//   set({token: null, user: null})
// }
}))


  // user: { _id: 0, username: '', email: '', profileImage: null },
  // isAuthenticated: false,
  // error: null,
  // isVerified: false,
  // isLoading: false,
  // token: null,
  // recipes: null,
  // _id: 0,
  // title: "",
  // caption: "",
  // image: null,
  // rating: 0,
  // createdAt: new Date,
  // updatedAt: new Date,

  // Перевірка куків при завантаженні сторінки
  // checkCookies: () => {
  //     const token = Cookies.get('token');  // Получаем токен из куки
  //     if (token) {
  //         // Обновляем состояние, если токен есть и пользователь еще не аутентифицирован
  //         if (!get().isAuthenticated) {
  //             set({ token, isAuthenticated: true });
  //             console.log("Токен відновлено після перевірки:", token);  // Логируем токен
  //         }
  //     } else {
  //         if (typeof window !== 'undefined') {
  //             alert("Токена нету");
  //         }
  //     }
  // },



  // signUp: async ({ username, email, password }: SignUpProps) => {
  //     set({ isLoading: true });
  //     try {
  //         const response = await axios.post(`${BACKEND_API}/api/auth/register`, { username, email, password });
  //         console.log('Response from server:', response); 
  //         set({ user: response.data.user, isLoading: false, isAuthenticated: true });

  //         if (response.data.token) {
  //             Cookies.set('token', response.data.token, { expires: 7, path: '/', sameSite: 'None', secure: false });
  //             console.log("Token saved:", response.data.token);
  //         } else {
  //             console.error("No token in response");
  //         }

  //     } catch (error: any) {
  //         console.log(error);
  //         const errorMessage = error?.response?.data?.message || 'Реєстрація не вдалася';
  //         set({ isLoading: false, error: errorMessage });
  //     }
  // },

  // signIn: async ({ email, password }: SignInProps) => {
  //     set({ isLoading: true });
  //     try {
  //         const response = await axios.post(`${BACKEND_API}/api/auth/login`, { email, password });
  //         console.log('Response from server:', response); // Логуємо всю відповідь сервера
  //         set({ user: response.data.user, isLoading: false, isVerified: true });

  //         if (response.data.token) {
  //             Cookies.set('token', response.data.token, { expires: 7, path: '/', sameSite: 'None', secure: false });
  //             console.log("Token saved:", response.data.token);
  //         } else {
  //             console.error("No token in response");
  //         }

  //     } catch (error: any) {
  //         console.log(error);
  //         const errorMessage = error?.response?.data?.message || 'Вхід не вдалося';
  //         set({ isLoading: false, error: errorMessage });
  //     }
  // },    



 


// }));

// Перевірка куків при завантаженні сторінки для кожної сторінки/компонента
// useAuthStore.getState().checkCookies();