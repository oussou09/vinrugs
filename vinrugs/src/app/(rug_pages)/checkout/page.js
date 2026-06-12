"use client";
import { apiClient } from "@/app/lib/api";
import { useApp } from "@/app/lib/AppContext"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import styled from "styled-components";
import Payment from "../payment/page";
import FormCountries from "./formcountries";
// import FormCountries from "./"


export default function Checkout(){

    const {token, user, loadingAuth, refreshProducts, fetchUserData} = useApp()
    // console.log('token checkout: ',token)
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
    } = useForm({
        defaultValues: {
            Fname: "",
            Lname: "",
            address: "",
            city: "",
            postalcode: "",
            VarCountrie: "US",
            DiscountCode: "",
        },
    });
    const [totalPriceRugs, setTotalPriceRugs] = useState(0)
    const [shippinRug, setShippinRug] = useState(0)
    const [totalPrice, setotalPrice] = useState(0)
    const [discountName, setDiscountName] = useState("")
    const [discountPorcent, setDiscountPorcent] = useState(0)
    const [sendDataForm, setSendDataForm] = useState(null)
    const [isSendDataForm, setIsSendDataForm] = useState(false) 
    const router = useRouter();

    console.log('user: ',user)

    useEffect(() => {
        if (user) {
            reset({
            Fname: user.first_name || "",
            Lname: user.last_name || "",
            email: user.email || "",
            address: "",
            city: "",
            postalcode: "",
            VarCountrie: "",
            DiscountCode: "",
            });
        }

        if (!user?.cart_shopping || user.cart_shopping.length === 0) {
            setTotalPriceRugs(0);
            setShippinRug(0);
            setotalPrice(0);
            return;
        }

        const cartSubtotal = user.cart_shopping.reduce((sum, item) => {
            const price = Number(item.rug?.rug_price || 0);
            const qty = Number(item.cart_rug_quantity || 0);
            return sum + price * qty;
        }, 0);

        const totalQuantity = user.cart_shopping.reduce((sum, item) => {
            return sum + Number(item.cart_rug_quantity || 0);
        }, 0);

        const shippingPrice = (cartSubtotal * totalQuantity) / 100;
        const beforeDiscount = cartSubtotal + shippingPrice;

        const discountAmount =
            discountPorcent > 0 ? (beforeDiscount * discountPorcent) / 100 : 0;

        const finalTotal = beforeDiscount - discountAmount;

        setTotalPriceRugs(cartSubtotal);
        setShippinRug(shippingPrice);
        setotalPrice(finalTotal.toFixed(2));
    }, [user, discountPorcent, reset]);

    const OnsubmitsDiscount = async () => {

        try {
            if(!discountName){
                toast.error('Discount is Empty');
                return;
            }
            const resp = await apiClient.post('/checkdiscount', {'DiscountCode': discountName},{
                headers:{Authorization:token},
            })

            if(resp.status === 200 || resp.status === 201){
                console.log(resp)
                toast.success(resp.data.message || "Discount is applyed");
                setDiscountPorcent(resp.data.DiscountInfos.discount_porcent);
            }
            
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage || 'Something went wrong');
            console.error('Connection Error:', errorMessage);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("FULL ERROR:", error);
        }
    }

    const DeleteDiscount = () => {
        setDiscountPorcent(0);
        const inputDiscount = document.querySelector('input[name="DiscountCode"]')
        inputDiscount.value = "";
    }

    const Onsubmits = (data) => {

        setSendDataForm({
            Fname: data.Fname,
            Lname: data.Lname,
            email: data.email,
            address: data.address,
            city: data.city,
            postal_code: data.postalcode,
            VarCountrie: data.countries,
            DiscountCode: discountName || "",
            discountPorcent: discountPorcent || 0,
        });
        setIsSendDataForm(true);
    }

    useEffect(() => {
        if (sendDataForm) {
            console.log('sendDataForm updated:', sendDataForm);
        }
    }, [sendDataForm]);


    return(
        // <!-- Checkout Page -->
        <section className="py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* <!-- Checkout Form --> */}
                    <div className="flex-grow lg:w-3/5">
                        <h1 className="serif text-4xl mb-12">Checkout</h1>

                        {isSendDataForm ? (
                            <Payment userdata={sendDataForm} />
                        ) : (
                        
                        <form method="POST" onSubmit={handleSubmit(Onsubmits)} className="space-y-12">
                            {/* <!-- Section: Shipping --> */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest border-b border-stone-200 pb-4 mb-8">Shipping Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-1">
                                        <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">First Name</label>
                                        <input
                                            { ...register ("Fname",{ required: "First Name is required"})}
                                            name="Fname"
                                            type="text" className="w-full bg-white border border-stone-200 p-3 text-sm focus:ring-1 focus:ring-stone-900 focus:border-stone-900 transition-soft outline-none" />
                                            {errors.Fname && <span className="text-red-500">{errors.Fname.message}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Last Name</label>
                                        <input
                                            { ...register ("Lname",{ required: "Last Name is required"})}
                                            name="Lname"
                                            type="text" className="w-full bg-white border border-stone-200 p-3 text-sm focus:ring-1 focus:ring-stone-900 focus:border-stone-900 transition-soft outline-none" />
                                            {errors.Lname && <span className="text-red-500">{errors.Lname.message}</span>}

                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Email</label>
                                        <input
                                            { ...register ("email",{ required: "Email is required"})}
                                            name="email"
                                            type="email" className="w-full bg-white border border-stone-200 p-3 text-sm focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none" />
                                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Address</label>
                                        <input
                                            { ...register ("address",{ required: "Address is required"})}
                                            name="address"
                                            type="text" className="w-full bg-white border border-stone-200 p-3 text-sm focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none" />
                                            {errors.address && <span className="text-red-500">{errors.address.message}</span>}
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">City</label>
                                        <input
                                            { ...register ("city",{ required: "City is required"})}
                                            name="city"
                                            type="text" className="w-full bg-white border border-stone-200 p-3 text-sm focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none" />
                                            {errors.city && <span className="text-red-500">{errors.city.message}</span>}

                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Postal Code</label>
                                        <input
                                            { ...register ("postalcode",{ required: "Postal Code is required"})}
                                            name="postalcode"
                                            type="text" className="w-full bg-white border border-stone-200 p-3 text-sm focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none" />
                                            {errors.postalcode && <span className="text-red-500">{errors.postalcode.message}</span>}
                                    </div>
                                    <div className="col-span-2">
                                        <FormCountries VarCountrie={register} />
                                        {errors.countries && (
                                        <p className="text-red-500 text-sm">{errors.countries.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-stone-900 text-white py-6 text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-soft">
                                {/* {isSubmitting ? 'Complete Order & Review...' : 'Complete Order & Review'} */}
                                {isSubmitting ? 'Go to pay...' : 'Go to pay'}
                            </button>
                            <p className="text-center text-[10px] text-stone-400 uppercase tracking-widest">
                                Your transaction is encrypted and secured by ArtisanPay
                            </p>
                        </form>

                        )}
                    </div>

                    {/* <!-- Order Sidebar --> */}
                    <div className="lg:w-2/5">
                        <div className="bg-white border border-stone-100 p-8">
                            <h2 className="text-xs font-bold uppercase tracking-widest mb-8">Review Order</h2>
                                { loadingAuth ?
                                (
                                    <li className="flex gap-4 animate-pulse">
                                        <div className="w-16 h-20 bg-stone-100 flex-shrink-0" />
                                        <div className="flex-grow space-y-2">
                                            <div className="h-3 w-24 bg-stone-100 rounded" />
                                            <div className="h-2.5 w-16 bg-stone-100 rounded" />
                                        </div>
                                        <div className="h-3 w-12 bg-stone-100 rounded" />
                                    </li>
                                )
                                : !user?.cart_shopping?.length ?
                                (
                                    <li className="flex flex-col items-center justify-center gap-3 py-8 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300">
                                            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/>
                                            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/>
                                            <path d="M9 13h6"/>
                                        </svg>
                                        <p className="text-xs font-bold uppercase text-stone-400 tracking-widest">No items in cart</p>
                                    </li>
                                )
                                :
                                (  
                                    <>
                                        {user?.cart_shopping?.map((product) => (
                                            <ul key={product.id} className="space-y-6 mb-10">
                                                <li className="flex gap-4">
                                                    <div className="w-16 h-20 bg-stone-100 flex-shrink-0">
                                                        <img src={`http://127.0.0.1:8000/storage/${product?.rug?.rug_imges?.[0]?.main_rug_path}`} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-grow">
                                                        <p className="text-xs font-bold uppercase text-stone-900">{product?.rug?.rug_title}</p>
                                                        <p className="text-[10px] text-stone-400 mt-1">Quantity: {product?.cart_rug_quantity}</p>
                                                    </div>
                                                    <span className="text-xs font-bold">${product?.rug?.rug_price}</span>
                                                </li>
                                            </ul>
                                        ))}
                                    </>
                                )
                                }

                            { discountPorcent ?
                            (
                            <div className="flex items-center justify-center border-t border-stone-200 pt-3">
                                <p className="block text-[20px] text-center font-bold uppercase tracking-widest text-green-500">
                                    {discountName} {discountPorcent}%
                                </p>
                                <button onClick={DeleteDiscount}>
                                    <img src="/icons/delete-bin.png" className="h-6 w-6 ml-3" alt="Delete" />
                                </button>
                            </div>
                            ) : null
                            }

                            <div className="pt-2">
                                <div className="flex items-end gap-3">
                                    <div className="flex-grow">
                                    <label htmlFor="DiscountCode" className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                                        Discount Code
                                    </label>
                                    <input
                                        // { ...register ("DiscountCode",{ required: "Discount field is empty"})}
                                        onChange={(e)=>setDiscountName(e.target.value)}
                                        type="text"
                                        disabled={!!discountPorcent}
                                        name="DiscountCode"
                                        placeholder="Enter code"
                                        className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg text-sm font-medium text-stone-900 placeholder-stone-400 outline-none focus:border-stone-900 transition-colors"
                                    />
                                    </div>
                                    <button type="button" onClick={OnsubmitsDiscount} style={{ marginBottom: '5px' }} className="px-6 py-3 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-stone-700 transition-soft flex-shrink-0">
                                        Apply
                                    </button>
                                </div>
                            </div>
                            
                            <div className="border-t border-stone-100 pt-8 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-400">Shipment</span>
                                    <span className="font-medium">${shippinRug ? shippinRug : 0}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-400">Insurance</span>
                                    <span className="font-medium text-emerald-600">Included</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t border-stone-100 pt-6">
                                    <span>Total</span>
                                    <span>${totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const StyledWrapper = styled.div`
  .uiverse-pixel-radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.75em;
    border-radius: 0.5em;
    font-family: "Courier New", monospace;
  }

  .uiverse-pixel-radio {
    display: flex;
    align-items: center;
    gap: 0.75em;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    color: #fff;
    text-shadow: 1px 1px #000;
    position: relative;
  }

  .uiverse-pixel-radio input[type="radio"] {
    appearance: none;
    width: 1.5em;
    height: 1.5em;
    background: #ff6b35;
    border: none;
    box-shadow:
      0 0 0 0.15em #000,
      0 0 0 0.3em #fff,
      0 0 0 0.45em #000;
    image-rendering: pixelated;
    margin: 0;
    transition: all 0.1s steps(1);
    position: relative;
  }

  .uiverse-pixel-radio input[type="radio"]::before {
    content: "";
    display: block;
    width: 0.75em;
    height: 0.75em;
    background: #fff;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.1s ease-out;
    box-shadow: 0 0 0 1px #000;
  }

  .uiverse-pixel-radio input[type="radio"]:checked::before {
    transform: translate(-50%, -50%) scale(1);
    background: #000;
  }

  .uiverse-pixel-radio input[type="radio"]:hover {
    background: #ff8c42;
  }

  .uiverse-pixel-radio input[type="radio"]:active {
    background: #e55a2b;
    transform: translateY(0.125em);
  }

  .uiverse-pixel-radio input[type="radio"]:focus-visible {
    outline: 2px dashed #fff;
    outline-offset: 0.2em;
  }`;







{/* <!-- Section: Payment --> */}
{/* <div>
    <h3 className="text-xs font-bold uppercase tracking-widest border-b border-stone-200 pb-4">2. Payment Method</h3>
    <StyledWrapper>
        {user?.ccusers?.map((cuser, index) => (
            <div key={cuser.id} >
                <div className="rounded-lg p-4 text-black">
                    <div className="flex items-center gap-4 mt-2 text-[15px] text-bold opacity-80">

                        <label className="uiverse-pixel-radio" key={cuser.id}>
                            <input
                                type="radio"
                                name="pixel-choice"
                                value={cuser.id}
                                checked = {selectedCard == cuser.id}
                                onChange={() => {
                                    setSelectedCard(cuser.id);
                                    clearErrors("selectedCard");
                                }}
                            />
                        </label>

                        <p className="text-sm opacity-80">VISA</p>
                        <span>{cuser.full_name}</span>
                        <span>Exp: {cuser.expiration_date}</span>
                        <span className="text-lg font-mono mt-2">•••• •••• •••• {cuser.card_number.slice(-4)}</span>
                    </div>
                </div>
                {selectedCard == cuser.id && (
                    <div className={`mt-1 ${index === user?.ccusers?.length - 1 ? 'mb-7' : ''}`}>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                            CVC
                        </label>
                        <input
                            {...register("cvcSelected", {
                                required: "CVC is required",
                                maxLength: {
                                    value: 4,
                                    message: "CVC cannot exceed 4 digits",
                                },
                                minLength: {
                                    value: 3,
                                    message: "CVC must be at least 3 digits",
                                },
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Only numbers are allowed",
                                },
                            })}
                            type="number"
                            name="cvcSelected"
                            placeholder="XXX"
                            className="w-full bg-white border border-stone-200 p-3 text-sm outline-none"
                        />
                    </div>
                )}
            </div>
        ))}
    </StyledWrapper>
    <div className="bg-stone-50 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <span className="text-sm font-medium">Credit / Debit Card</span>
            <div className="flex space-x-2">
                <div className="w-8 h-5 bg-white border border-stone-200 rounded"></div>
                <div className="w-8 h-5 bg-white border border-stone-200 rounded"></div>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Card Number</label>
                <input
                    { ...register ("cardnumber")}
                    name="cardnumber"
                    type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-white border border-stone-200 p-3 text-sm outline-none" />
                    
            </div>
            <div className="col-span-1">
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Expiry</label>
                <input
                    { ...register ("expiry")}
                    name="expiry"
                    type="text" placeholder="MM/YY" className="w-full bg-white border border-stone-200 p-3 text-sm outline-none" />
                    
            </div>
            <div className="col-span-1">
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">CVC</label>
                <input
                    { ...register ("cvc")}
                    name="cvc"
                    type="text" placeholder="XXX" className="w-full bg-white border border-stone-200 p-3 text-sm outline-none" />
                    
            </div>
        </div>
    </div>
</div> */}

