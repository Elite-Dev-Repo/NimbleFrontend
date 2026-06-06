import React, { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import {
  clearPendingPayment,
  getOrderDetails,
  PAYMENT_ORDER_KEY,
  PAYMENT_REFERENCE_KEY,
  verifyPayment,
} from "./data";

const getStoredPaymentValue = (key) => {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(key);
};

const getPaymentErrorMessage = (error) => {
  const status = error?.response?.status;
  const detail = error?.response?.data?.detail || error?.response?.data?.message;

  if (detail) return detail;
  if (status === 400) return "This payment reference is invalid.";
  if (status === 404) return "We could not find this payment reference.";
  if (status === 502) {
    return "The payment provider could not confirm this payment right now.";
  }

  return "We could not verify this payment. Please try again.";
};

const isVerifiedPayment = (payment) =>
  payment?.status === "success" ||
  payment?.payment_status === "success" ||
  payment?.order_payment_status === "paid";

const isFailedPayment = (payment) =>
  payment?.status === "failed" ||
  payment?.status === "abandoned" ||
  payment?.payment_status === "failed" ||
  payment?.payment_status === "abandoned";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const urlReference = searchParams.get("reference") || searchParams.get("trxref");
  const reference = urlReference || getStoredPaymentValue(PAYMENT_REFERENCE_KEY);
  const orderId = getStoredPaymentValue(PAYMENT_ORDER_KEY);
  const hasReference = Boolean(reference);
  const [status, setStatus] = useState(hasReference ? "verifying" : "failed");
  const [message, setMessage] = useState(
    hasReference ? "Confirming your payment..." : "Payment reference is missing.",
  );
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const verifyReference = useCallback(async () => {
    if (!reference) {
      toast.error("Payment reference is missing.");
      return;
    }

    try {
      setStatus("verifying");
      setMessage("Confirming your payment...");

      const payment = await verifyPayment(reference);
      setPaymentDetails(payment);

      if (isVerifiedPayment(payment)) {
        if (orderId) {
          try {
            const order = await getOrderDetails(orderId);
            setOrderDetails(order);
          } catch {
            setOrderDetails(null);
          }
        }

        clearPendingPayment();
        setStatus("success");
        setMessage("Payment verified successfully.");
        toast.success("Payment verified");
        return;
      }

      if (isFailedPayment(payment)) {
        setStatus("failed");
        setMessage("Payment was not completed. You can try again.");
        toast.error("Payment failed");
        return;
      }

      setStatus("failed");
      setMessage("Payment verification returned an unknown status.");
      toast.error("Payment not verified");
    } catch (error) {
      setStatus("failed");
      setMessage(getPaymentErrorMessage(error));
      toast.error("Payment verification failed");
    }
  }, [orderId, reference]);

  useEffect(() => {
    const timer = setTimeout(() => {
      verifyReference();
    }, 0);

    return () => clearTimeout(timer);
  }, [verifyReference]);

  const isVerifying = status === "verifying";
  const isSuccess = status === "success";

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster richColors position="top-center" duration={1500} />
      <Nav />
      <main className="flex-1 max-w-3xl mx-auto w-full px-5 pt-32 pb-20 flex items-center justify-center">
        <section className="w-full bg-white border p-8 md:p-12 text-center">
          <p className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-4">
            Payment Callback
          </p>
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            {isVerifying
              ? "Verifying payment"
              : isSuccess
                ? "Payment confirmed"
                : "Payment not verified"}
          </h1>
          <p className="text-gray-600 mb-8">{message}</p>

          {paymentDetails && (
            <div className="mb-8 text-sm text-left bg-gray-50 border p-4 space-y-2">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Reference</span>
                <span className="font-medium text-right break-all">
                  {paymentDetails.reference || reference}
                </span>
              </div>
              {paymentDetails.amount && (
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-medium">
                    {paymentDetails.currency || "NGN"} {paymentDetails.amount}
                  </span>
                </div>
              )}
              {orderDetails?.payment_status && (
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Order Payment</span>
                  <span className="font-medium">
                    {orderDetails.payment_status}
                  </span>
                </div>
              )}
            </div>
          )}

          {isVerifying ? (
            <div className="mx-auto h-10 w-10 rounded-full border-2 border-gray-200 border-t-black animate-spin" />
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/shop"
                className="w-full sm:w-auto bg-black text-white px-8 py-3 uppercase text-xs font-bold hover:bg-secondary transition-colors text-center"
              >
                Continue Shopping
              </Link>
              {!isSuccess && (
                <button
                  type="button"
                  onClick={verifyReference}
                  className="w-full sm:w-auto border border-black px-8 py-3 uppercase text-xs font-bold hover:bg-black hover:text-white transition-colors text-center"
                >
                  Retry Verification
                </button>
              )}
              {!isSuccess && (
                <Link
                  to="/cart"
                  className="w-full sm:w-auto border border-black px-8 py-3 uppercase text-xs font-bold hover:bg-black hover:text-white transition-colors text-center"
                >
                  Return to Cart
                </Link>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentCallback;
