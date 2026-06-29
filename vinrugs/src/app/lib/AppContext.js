"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from './api';
import { useParams, useRouter } from "next/navigation";

const AppContext = createContext();

export function AppProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loadingProd, setLoadingProd] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [refreshCount, setRefreshCount] = useState(0);
    const router = useRouter()
    const pathname = useParams();

    // جلب البيانات مرة واحدة فقط عند إقلاع التطبيق
    const fetchInitialData = async () => {
        try {
            setLoadingProd(true);
            const res = await apiClient.get('/user/rugs');
            const data = res.data;
            console.log("data.res rugs", data)
            setProducts(data);
            setRefreshCount((prevCount) => prevCount + 1);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoadingProd(false);
        }
    };

    const fetchUserData = async (authtoken) => {
        const authToken = authtoken || token;

        if (!authToken) {
            setUser(null);
            setLoadingAuth(false);
            return;
        }

        try {
            setLoadingAuth(true)
            const RespUser = await apiClient.get('/user/getuser', {
                headers: {
                    Authorization: authToken,
                },
            })
            setUser(RespUser.data?.user ?? null)
        } catch (error) {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            router.push('/login')
            console.error("Error fetching data ", error);
        } finally {
            setLoadingAuth(false);
        }
    }

    useEffect(() => {
        fetchInitialData();
        const storedToken = localStorage.getItem('token');

        if (!storedToken && pathname == '/signup') {
            return router.push('/login');
        }

        if (storedToken) {
            setToken(storedToken);
            fetchUserData(storedToken);
        } else {
            setLoadingAuth(false);
        }
    }, []);

    // دالة تُستدعى يدوياً فقط عند الإضافة أو الحذف أو التعديل لrefresh البيانات
    const refreshProducts = () => {
        fetchInitialData();
    };

    const refetchUserData = () => {
        fetchUserData(token);
    };

    const checkUserLogin =  async (newToken) => {
        localStorage.setItem('token' , newToken)
        setToken(newToken);
        console.log("token login check ", token);
        await fetchUserData(newToken)
    }

    const checkLogout = async () => {
        const storedToken = localStorage.getItem('token');

        await apiClient.post('/user/logoutuser', {}, {
            headers: {
                Authorization: storedToken,
            },
        })

        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        return router.push('/login');
    };
    return (
        <AppContext.Provider value={{ products, setProducts, loadingProd,
                                      cart, setCart,
                                      refreshProducts, refreshCount,
                                      fetchUserData, user, loadingAuth, token,
                                      refetchUserData, checkUserLogin, checkLogout
                                    }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppUser = () => useContext(AppContext);