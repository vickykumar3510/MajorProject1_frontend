import HeaderNoSearchBar from "../components/HeaderNoSearchBar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const CheckoutPage = () => {
  const { state } = useLocation();

  const orderCart = state?.orderCart || [];
  const address = state?.address;
  const totalPrice = state?.totalPrice;
  const totalBooks = state?.totalBookQuantity;

  const now = new Date();
  const orderDate = now.toLocaleDateString("en-IN");
  const orderTime = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const hasSaved = useRef(false);

  useEffect(() => {
    if (hasSaved.current) return;
    hasSaved.current = true;

    if (!orderCart || orderCart.length === 0 || !address) return;

    async function saveOrder() {
      try {
        const orderData = {
          items: orderCart,
          customerName: "Vicky Kumar",
          customerAddress: `${address.house}, ${address.area}, ${address.landmark}, ${address.city}, ${address.state} - ${address.pincode}`,
          customerPhone: "9999991254",
          totalPrice,
          totalBooks,
          orderDate,
          orderTime,
        };

        await fetch("https://major-project1-backend-jet.vercel.app/place-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        console.log("Order saved successfully!");
      } catch (err) {
        console.error("Failed to save order", err);
      }
    }

    saveOrder();
  }, []); 

  return (
    <main>
      <HeaderNoSearchBar />

      <div className="container-fluid">
        <div className="container">
          <h1 className="mt-4 mb-4 display-6 text-info text-center">
            Thank you for Shopping with us! 🥰
          </h1>

          <h3 className="text-center text-md-start">Below are your order details:</h3>

          <div className="card p-3 mt-4 bg-success-subtle text-success-emphasis">
            <h4>Delivery Address</h4>
            {address ? (
              <>
                <p><strong>{address.nickname}</strong></p>
                <p>{address.house}</p>
                <p>{address.area}, {address.landmark}</p>
                <p>{address.city}, {address.state} - {address.pincode}</p>
              </>
            ) : (
              <p>No address found!</p>
            )}
          </div>

          <div className="card p-3 mt-4 bg-primary-subtle text-primary-emphasis">
            <h4>Order Summary</h4>
            <p><strong>Total Books:</strong> {totalBooks}</p>
            <p><strong>Total Amount:</strong> Rs. {totalPrice}</p>
            <p><strong>Order Date:</strong> {orderDate}</p>
            <p><strong>Order Time:</strong> {orderTime}</p>
          </div>

          <h4 className="mt-4">Items in Your Order:</h4>

          <div
            className="d-flex overflow-auto gap-3 py-3"
            style={{ whiteSpace: "nowrap" }}
          >
            {orderCart.map((item, i) => (
              <div
                key={i}
                className="card p-3 text-center shadow-sm"
                style={{ width: "200px", flex: "0 0 auto" }}
              >
                <img
                  src={item.bookImage}
                  alt={item.bookName}
                  style={{
                    width: "120px",
                    height: "160px",
                    objectFit: "cover",
                    margin: "auto",
                  }}
                />

             
                <h6
                  className="mt-2"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2, 
                    WebkitBoxOrient: "vertical",
                    wordBreak: "break-word",
                    whiteSpace: "normal"
                  }}
                  title={item.bookName} 
                >
                  {item.bookName}
                </h6>

                <p className="text-muted small">{item.bookAuthor}</p>
                <p className="small">Quantity: {item.quantity}</p>
                <p className="fw-bold">Rs. {item.bookPrice * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default CheckoutPage;
