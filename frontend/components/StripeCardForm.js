"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "@/lib/api";

let stripePromise = null;

function getStripe(publishableKey) {
    if (!stripePromise && publishableKey) {
        stripePromise = loadStripe(publishableKey);
    }
    return stripePromise;
}

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: "16px",
            fontWeight: "600",
            color: "#e4e4e7",
            fontFamily: '"Inter", -apple-system, sans-serif',
            "::placeholder": { color: "#71717a" },
            iconColor: "#00d632",
        },
        invalid: {
            color: "#ef4444",
            iconColor: "#ef4444",
        },
    },
    hidePostalCode: true,
};

function CardForm({ onSuccess, onCancel }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsSubmitting(true);
        setError(null);

        try {
            // Create a PaymentMethod via Stripe.js (real tokenization)
            const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
            });

            if (stripeError) {
                setError(stripeError.message);
                setIsSubmitting(false);
                return;
            }

            // Send the real Stripe PaymentMethod ID to our backend
            const res = await api.post("/funding/methods", {
                stripe_payment_method_id: paymentMethod.id,
                nickname: `${paymentMethod.card.brand} •••• ${paymentMethod.card.last4}`,
            });

            onSuccess(res.data.data?.paymentMethod);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center pt-2 pb-2">
                <p className="font-bold text-sm mb-1">Link a Debit Card</p>
                <p className="text-xs text-gray-500">Securely add your card via Stripe</p>
            </div>

            <div className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700">
                <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>

            {error && (
                <p className="text-xs text-red-500 font-bold text-center px-4">{error}</p>
            )}

            <div className="flex space-x-3">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold py-4 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={!stripe || isSubmitting}
                    className="flex-1 bg-cashapp text-white font-bold py-4 rounded-full shadow-lg shadow-cashapp/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                    {isSubmitting ? "Linking..." : "Link Card"}
                </button>
            </div>
        </form>
    );
}

export default function StripeCardForm({ publishableKey, onSuccess, onCancel }) {
    const stripeInstance = getStripe(publishableKey);

    if (!stripeInstance) {
        return (
            <div className="text-center py-8">
                <p className="text-sm text-gray-500">Loading Stripe...</p>
            </div>
        );
    }

    return (
        <Elements stripe={stripeInstance}>
            <CardForm onSuccess={onSuccess} onCancel={onCancel} />
        </Elements>
    );
}
