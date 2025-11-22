import NoLoginNoSearchBarHeader from "../components/NoLoginNoSearchBarHeader";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const { state } = useLocation();

  const orderCart = state?.orderCart || [];
  const address = state?.address;
  const totalPrice = state?.totalPrice;
  const totalBooks = state?.totalBookQuantity;

  return (
    <main>
      <NoLoginNoSearchBarHeader />

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
          </div>


          <h4 className="mt-4">Items in Your Order:</h4>

          <div className="row">
            {orderCart.map((item) => (
              <div className="col-12 col-sm-6 col-md-4 my-3" key={item.bookName}>
                <div className="card p-3 text-center shadow-sm h-100">

                  <img
                    src={item.bookImage}
                    alt={item.bookName}
                    className="mx-auto"
                    style={{
                      width: "120px",
                      height: "160px",
                      objectFit: "cover",
                    }}
                  />

                  <h5 className="mt-2">{item.bookName}</h5>
                  <p className="text-muted">{item.bookAuthor}</p>

                  <p>Quantity: {item.quantity}</p>

                  <h6>Subtotal: Rs. {item.bookPrice * item.quantity}</h6>

                </div>
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
