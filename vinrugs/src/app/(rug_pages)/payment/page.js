"use client";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { apiClient } from "@/app/lib/api";
import { useApp } from "@/app/lib/AppContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



export default function Payment(){

    // const {register, handleSubmit, formState : {errors, isSubmitting}, reset} = useForm()
    const stripe = useStripe();
    const elements = useElements();
    const { token, user } = useApp();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [orderInfo, setOrderInfo] = useState(null);


    const handlePay = async (e) => {

        e.preventDefault();
        if (!stripe || !elements || !orderInfo) return;

        try {

            const { token, error } = await stripe.createToken(
                elements.getElement(CardElement),
                {
                    name: `${orderInfo.Fname} ${orderInfo.Lname}`,
                    address_line1: orderInfo.address,
                    address_city:  orderInfo.city,
                    address_zip:   orderInfo.postal_code,
                    address_country: "US",
                }
            )
            if (error) {
                return toast.error("Payment failed");
            }

            const resp = await apiClient.post('/checkoutpayment', dataForm,{
                headers:{Authorization:token},
            })

            if (resp.status === 200) {
                toast.success("Payment successful!");
                router.push("/cart");
            }
            
        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            toast.error(msg || "Payment failed");
        } finally {
            setLoading(false);
        }
    }



return(

<Elements stripe={stripePromise}>
    <section className="max-w-xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-10">Payment</h1>
        <form onSubmit={handlePay} className="space-y-6">

            {/* Order summary */}
            <div className="bg-stone-50 border border-stone-200 p-4 rounded text-sm space-y-1">
                <p className="font-bold uppercase tracking-wider text-xs mb-2">Order Summary</p>
                <p>{orderInfo.Fname} {orderInfo.Lname}</p>
                <p>{orderInfo.address}, {orderInfo.city}, {orderInfo.postal_code}</p>
                {orderInfo.DiscountCode && (
                    <p className="text-green-600 font-bold">
                        Discount: {orderInfo.DiscountCode} ({orderInfo.discountPorcent}% OFF)
                    </p>
                )}
            </div>

            {/* Stripe card input */}
            <div className="border border-stone-200 p-5 bg-stone-50">
                <label className="block text-xs font-bold uppercase tracking-wider mb-3">
                    Card Details
                </label>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#1c1b19",
                                fontFamily: "sans-serif",
                                "::placeholder": { color: "#bab9b4" },
                            },
                            invalid: { color: "#a12c7b" },
                        },
                        hidePostalCode: true,
                    }}
                />
            </div>

            {/* Test card hint */}
            <p className="text-xs text-stone-400 text-center">
                Test card: <span className="font-mono font-bold">4242 4242 4242 4242</span> | Expiry: <span className="font-mono font-bold">12/34</span> | CVC: <span className="font-mono font-bold">123</span>
            </p>

            <button
                type="submit"
                disabled={loading || !stripe}
                className="w-full bg-stone-900 text-white py-5 text-sm font-bold uppercase tracking-widest hover:opacity-90 disabled:opacity-50"
            >
                {loading ? "Processing Payment..." : "Pay Now"}
            </button>

            <button
                type="button"
                onClick={() => router.push("/cart")}
                className="w-full border border-stone-300 text-stone-700 py-4 text-sm font-bold uppercase tracking-widest hover:bg-stone-50"
            >
                ← Back to Checkout
            </button>

            <p className="text-center text-xs text-stone-400 uppercase tracking-widest">
                Secured by Stripe
            </p>
        </form>
    </section>
</Elements>
)
}