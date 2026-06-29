"use client";
import { apiClient } from "@/app/lib/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AppContextAdmin = createContext();

export default function ({ children }) {
    const [adminToken, setAdminToken] = useState(null);
    const [adminInfos, setAdminInfos] = useState(null);
    const [adminInfosLoad, setAdminInfosLoad] = useState(true);

    const [AdProducts, setadProducts] = useState(null);
    const [AdProductsCount, setadProductsCount] = useState(null);
    const [AdProductsLoad, setadProductsLoad] = useState(true);

    const [contacts, setContacts] = useState(null);
    const [contactsCount, setContactsCount] = useState(null);
    const [contactsLoad, setContactsLoad] = useState(true);

    const [users, setUsers] = useState(null);
    const [usersCount, setUsersCount] = useState(null);
    const [usersLoad, setUsersLoad] = useState(true);

    const [orders, setOrders] = useState(null);
    const [ordersCount, setOrdersCount] = useState(null);
    const [ordersLoad, setOrdersLoad] = useState(true);

    const router = useRouter();

    const getAdminHeaders = (token) => {
        if (!token) {
            return undefined;
        }

        return {
            Authorization: token,
        };
    };

    const clearAdminSession = async () => {
        const storedToken = localStorage.getItem('admin-token');
        const resp = await apiClient.post('/admin/logoutadmin', {}, {
            headers: getAdminHeaders(storedToken)
        })
        console.log('logout: ',resp);
        toast.error(resp.message || 'Something went wrong');

        localStorage.removeItem('admin-token');
        setAdminToken(null);
        setAdminInfos(null);
        router.push("/wp-admin/login");
    };

    const fetchInitialAdData = async (AdminAuthToken) => {
        const token = AdminAuthToken || adminToken;

        if (!token) {
            return;
        }

        console.log('fetchInitialAdData token: ',token)

        await Promise.all([
            fetchAdminData(token),
            fetchProducts(token),
            fetchContact(token),
            fetchUsers(token),
            fetchOrders(token)
        ]);
    };

    const fetchAdminData = async (AdminAuthToken) => {
        const adminauthtoken = AdminAuthToken || adminToken;

        if (!adminauthtoken) {
            setAdminInfos(null);
            setAdminInfosLoad(false);
            return;
        }

        try {
            const resp = await apiClient.get("/admin/admininfos", {
                headers: getAdminHeaders(adminauthtoken),
            });
                console.log('admin: ', resp)

            if (resp.status === 200) {
                setAdminInfos(resp.data.admin);
                setAdminInfosLoad(true);
                console.log('admin: ', resp)
            }
        } catch (error) {
            setUsers(null);
            if (error?.response?.status === 401) {
                clearAdminSession();
            }
            console.error("Error fetching data ", error);
        } finally {
            setAdminInfosLoad(false);
        }

    };

    const fetchUsers = async (AdminAuthToken) => {
        const token = AdminAuthToken || adminToken;

        if (!token) {
            setUsers(null);
            setUsersLoad(false);
            return;
        }

        try {
            const resp = await apiClient.get("/admin/getusers", {
                headers: getAdminHeaders(token),
            });

            if (resp.status === 200) {
                setUsers(resp.data.users);
                setUsersCount(resp.data.users.length);
                setUsersLoad(true);
                console.log('users: ', users)
                console.log('users: ', resp.data.users)
            }
        } catch (error) {
            setUsers(null);
            if (error?.response?.status === 401) {
                clearAdminSession();
            }
            console.error("Error fetching data ", error);
        } finally {
            setUsersLoad(false);
        }
    };

    const fetchProducts = async (AdminAuthToken) => {
        const token = AdminAuthToken || adminToken;

        if (!token) {
            setadProducts(null);
            setadProductsLoad(false);
            return;
        }

        try {
            const resp = await apiClient.get("/admin/getadproducts", {
                headers: getAdminHeaders(token),
            });

            if (resp.status === 200) {
                setadProducts(resp.data.rugs);
                setadProductsCount(resp.data.rugs.length)
                setadProductsLoad(true);
                console.log('AdProducts: ',AdProducts)
                console.log('AdProducts: ',resp.data.rugs)
            }
        } catch (error) {
            setadProducts(null);
            if (error?.response?.status === 401) {
                clearAdminSession();
            }
            console.error("Error fetching data ", error);
        } finally {
            setadProductsLoad(false);
        }
    };

    const fetchContact = async (AdminAuthToken) => {
    const token = AdminAuthToken || adminToken;

    if (!token) {
        setContacts(null);
        setContactsLoad(false);
        return;
    }

    try {
        const resp = await apiClient.get("/admin/contacts", {
            headers: getAdminHeaders(token),
        });

        if (resp.status === 200) {
            setContacts(resp.data);
            setContactsCount(resp.data.length);
            setContactsLoad(true);
            console.log("contacts: ", contacts);
        }
    } catch (error) {
        setContacts(null);
        if (error?.response?.status === 401) {
            clearAdminSession();
        }
        console.error("Error fetching data ", error);
    } finally {
        setContactsLoad(false);
    }
    };

    // start fetch Orders

    const fetchOrders = async (AdminAuthToken) => {
        const token = AdminAuthToken || adminToken;

        if (!token) {
            setOrders(null);
            setOrdersLoad(false);
            return;
        }

        try {
            
            const resp = await apiClient.get("/admin/getorders", {
                headers: getAdminHeaders(token),
            });

            if (resp.status === 200) {
                setOrders(resp.data.orders);
                setOrdersCount(resp.data.orders.length);
                setOrdersLoad(true);
                console.log("orders: ", orders);
            }

        } catch (error) {
            setOrders(null);
            if (error?.response?.status === 401) {
                clearAdminSession();
            }
            console.error("Error fetching data ", error);
        } finally {
            setOrdersLoad(false);
        }
    }

    // end fetch Orders

    // start refetch apis

    const refetchUsers = () => {
        fetchUsers(adminToken);
    };

    const refetchAdminData = () => {
        fetchAdminData(adminToken);
    };

    const refetchProducts = () => {
        fetchProducts(adminToken);
    };


    const refetchContact = () => {
        fetchContact(adminToken);
    };

    const refetchOrders = () => {
        fetchOrders(adminToken);
    }

    // end refetch apis

    const AdminLogout = async () => {
        clearAdminSession();
    };

    const CheckAdminLogin = async (AdminAuthToken) => {
        localStorage.setItem("admin-token", AdminAuthToken);
        // console.log('AdminAuthToken: ', AdminAuthToken);
        setAdminToken(AdminAuthToken);
        await fetchInitialAdData(AdminAuthToken);
    };


    // on app start

    useEffect(() => {
        const StoredadminToken = localStorage.getItem("admin-token");

        if (!StoredadminToken) {
            router.push("/wp-admin/login");
            return;
        }

        setAdminToken(StoredadminToken);
        fetchInitialAdData(StoredadminToken);
    }, []);

    return (
        <AppContextAdmin.Provider
            value={{
                CheckAdminLogin, refetchAdminData, AdminLogout, adminInfos, adminInfosLoad, adminToken,

                fetchUsers, refetchUsers, users, usersLoad, usersCount,
                
                fetchProducts, refetchProducts, AdProducts, AdProductsLoad, AdProductsCount,
                
                fetchContact, refetchContact, contacts, contactsLoad, contactsCount,

                fetchOrders, refetchOrders, orders, ordersLoad, ordersCount,
            }}
        >
            {children}
        </AppContextAdmin.Provider>
    );
}

export const useAppAdmin = () => useContext(AppContextAdmin);
