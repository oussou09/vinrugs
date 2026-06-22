import axios from "axios";


export const apiClient = axios.create({
    baseURL : process.env.NEXT_PUBLIC_API_URL, 
    headers : {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest' // Helps Laravel identify AJAX requests
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(async (config) => {
    const method = config.method?.toLowerCase();

    if (config.data instanceof FormData) {
        if (config.headers?.set) {
            config.headers.set('Content-Type', undefined);
        } else {
            delete config.headers?.['Content-Type'];
            delete config.headers?.['content-type'];
        }
    }

    // نتحقق من نوع الطلب
    if (['post', 'put', 'patch', 'delete'].includes(method)) {
        try {
            const rootUrl = process.env.NEXT_PUBLIC_NORMAL_API_URL;
            const response = await axios.get(`${rootUrl}sanctum/csrf-cookie`, { withCredentials: true });
            console.log(response);
        } catch (error) {
            console.error("%c[Interceptor] %cفشل جلب CSRF Cookie:", "color: blue; font-weight: bold", "color: red", error);
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

let isRedirecting = false;

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    const message =
      error.response?.data?.message ??
      "The requested page needs a username and a password.";

    if (
      status === 401 &&
      !isRedirecting &&
      typeof window !== "undefined" &&
      !window.location.pathname.includes("/unauthorized")
    ) {
      isRedirecting = true;

      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");

      window.location.href = `/unauthorized?message=${encodeURIComponent(message)}`;
    }

    return Promise.reject(error);
  }
);