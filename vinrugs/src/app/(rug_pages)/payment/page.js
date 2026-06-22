"use client";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { apiClient } from "@/app/lib/api";
import { useAppUser } from "@/app/lib/AppContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)



    function PaymentForm({ userdata }) {
        const stripe = useStripe();
        const elements = useElements();
        const { token, refetchUserData, refreshProducts } = useAppUser();
        const router = useRouter();
        const [loading, setLoading] = useState(false);

        console.log('userdata After',userdata)

        const handlePay = async (e) => {
            e.preventDefault();

            if (!stripe || !elements || !userdata) return;

            setLoading(true);

            try {
            const { token: cardToken, error } = await stripe.createToken(
                elements.getElement(CardElement),
                {
                name: `${userdata.Fname} ${userdata.Lname}`,
                address_line1: userdata.address,
                address_city:  userdata.city,
                address_zip:   userdata.postal_code,
                address_country: "US",
                }
            );

            if (error) {
                toast.error(error.message || "Payment failed");
                return;
            }

            const dataForm = new FormData();
            dataForm.append("Fname",        userdata.Fname);
            dataForm.append("Lname",        userdata.Lname);
            dataForm.append("email",        userdata.email);
            dataForm.append("address",      userdata.address);
            dataForm.append("city",         userdata.city);
            dataForm.append("postal_code",  userdata.postal_code);
            dataForm.append("VarCountrie",  userdata.VarCountrie);
            dataForm.append("DiscountCode", userdata.DiscountCode || "");
            dataForm.append("card_token",   cardToken.id);


            const resp = await apiClient.post("/user/storeorders", dataForm, {
                headers: { Authorization: token },
            });

            if (resp.status === 200) {
                await refetchUserData();
                await refreshProducts();
                toast.success("Payment successful!");
                router.push("/cart");
            }
            } catch (error) {
                const msg = error.response?.data?.message || error.message;
                const msgerr = error.response?.data?.error || error.error;
                toast.error(msg);// || "Payment failed"
                toast.error(msgerr);// || "Payment failed"
            } finally {
                setLoading(false);
            }
        };

        if (!userdata) {
            return (
            <section className="max-w-xl mx-auto py-12 px-4">
                <p className="text-center">Loading payment info...</p>
            </section>
            );
        }

        return (
            <section className="max-w-xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-10">Payment</h1>

            <form onSubmit={handlePay} className="space-y-6">
                {/* Order summary */}
                <div className="bg-stone-50 border border-stone-200 p-4 rounded text-sm space-y-1">
                    <p className="font-bold uppercase tracking-wider text-xs mb-2">
                        Order Summary
                    </p>
                    <p>{userdata?.Fname} {userdata?.Lname}</p>
                    <p>{userdata?.address}, {userdata?.city}, {userdata?.postal_code}</p>
                    {userdata?.DiscountCode && (
                        <p className="text-green-600 font-bold">
                        Discount: {userdata.DiscountCode} ({userdata.discountPorcent}% OFF)
                        </p>
                    )}
                </div>

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
                onClick={() => window.location.reload()}
                className="w-full border border-stone-300 text-stone-700 py-4 text-sm font-bold uppercase tracking-widest hover:bg-stone-50"
                >
                ← Back to Checkout
                </button>

                <p className="text-center text-xs text-stone-400 uppercase tracking-widest">
                Secured by Stripe
                </p>
            </form>
            </section>
        );
    }


export default function Payment({ userdata }){

return(
    <Elements stripe={stripePromise}>
        <PaymentForm userdata={userdata} />
    </Elements>
)
}