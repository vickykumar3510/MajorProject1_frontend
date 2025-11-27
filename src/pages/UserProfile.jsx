import HeaderNoSearchBar from "../components/HeaderNoSearchBar";
import Footer from "../components/Footer";
import { useState, useContext, useEffect } from "react";
import AddressContext from "../contexts/AddressContext";

const UserProfile = () => {
  const [nickname, setNickname] = useState("");
  const [house, setHouse] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  const { addresses, addAddress, editAddress, deleteAddress, selectedAddress, setSelectedAddress } = useContext(AddressContext);

  
  useEffect(() => {
    fetch("https://major-project1-backend-jet.vercel.app/orders")
      .then(res => res.json())
      .then(data => {
        const sortedOrders = data.sort((a, b) => new Date(b.orderDateTime) - new Date(a.orderDateTime));
        setOrderHistory(sortedOrders);
      })
      .catch(() => setOrderHistory([]));
  }, []);

  
  const formatDateTime = (dateTime) => {
    if (!dateTime) return "Date not available";
    const date = new Date(dateTime);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nickname || !house || !area || !landmark || !pincode || !city || !state) {
      alert("Please fill all fields!");
      return;
    }
    const data = { nickname, house, area, landmark, pincode, city, state };
    if (editingId) {
      editAddress(editingId, data);
      alert("Address updated successfully!");
      setEditingId(null);
    } else {
      addAddress({ id: Date.now(), ...data });
      alert("Address added successfully!");
    }
    setNickname(""); setHouse(""); setArea(""); setLandmark(""); setPincode(""); setCity(""); setState("");
  };

  return (
    <main>
      <HeaderNoSearchBar />
      <div className="container-fluid">
        <div className="container my-4">

  
          <div className="card p-3 mb-4">
            <h3>Hello User!</h3>
            <p><strong>Name:</strong> Vicky Kumar</p>
            <p><strong>Email:</strong> vickykumar@gmail.com</p>
            <p><strong>Phone:</strong> +91 9999991254</p>
            <p><strong>Member Since:</strong> November, 2025</p>
          </div>

        
          <div className="card p-3 my-5">
            <h4>Order History</h4>
            {orderHistory.length === 0 && <p>No previous orders.</p>}
            <div className="d-flex flex-column gap-4 mt-3">
              {orderHistory.map(order => {
                const formattedDate = formatDateTime(order.orderDateTime);
                const orderTotal = (order.items || []).reduce(
                  (sum, item) => sum + (Number(item.bookPrice) || 0) * (Number(item.quantity) || 1),
                  0
                );
                const matchingAddress = addresses.find(
                  addr => `${addr.house}, ${addr.area}, ${addr.landmark}, ${addr.city}, ${addr.state} - ${addr.pincode}` === order.customerAddress
                );
                const displayName = matchingAddress?.nickname || order.customerName || "Not provided";

                return (
                  <div key={order._id} className="card p-3 shadow-sm">
                    <h6 className="text-secondary mb-1"><strong>Ordered On:</strong> {formattedDate}</h6>
                    <p className="mb-1"><strong>Customer Name:</strong> {displayName}</p>
                    <p className="mb-3"><strong>Delivery Address:</strong> {order.customerAddress || "Not provided"}</p>
                    <p className="fw-bold mb-3" style={{ fontSize: "16px" }}>Total Order Amount: Rs. {orderTotal}</p>

                    <div className="d-flex flex-column gap-3">
                      {(order.items || []).map((item, idx) => {
                        const price = Number(item.bookPrice) || 0;
                        const qty = Number(item.quantity) || 1;
                        const total = price * qty;
                        return (
                          <div key={idx} className="d-flex border rounded p-2 align-items-center">
                            <img
                              src={item.bookImage}
                              alt={item.bookName}
                              style={{ width: "80px", height: "110px", objectFit: "cover", borderRadius: "6px" }}
                            />
                            <div className="ms-3 flex-grow-1">
                              <h6 className="mb-1">{item.bookName}</h6>
                              <p className="text-muted small mb-1">{item.bookAuthor}</p>
                              <p className="small mb-1">Quantity: <strong>{qty}</strong></p>
                              <p className="small mb-0">Price: Rs. {price}</p>
                            </div>
                            <div>
                              <p className="fw-bold">Rs. {total}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        
          <div className="row my-5">
    
            <div className="col-12 col-md-6 mb-4">
              <h4 className="text-info mb-4">{editingId ? "Edit Address" : "Add New Address"}</h4>
              <form onSubmit={handleSubmit}>
                <label>Nickname</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />

                <label>Flat / House No / Building</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={house}
                  onChange={(e) => setHouse(e.target.value)}
                />

                <label>Area / Street / Sector</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />

                <label>Landmark</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />

                <label>Pincode</label>
                <input
                  type="number"
                  className="form-control mb-3"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />

                <label>City</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />

                <label>State</label>
                <select
                  className="form-control mb-3"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Goa">Goa</option>
                  <option value="Punjab">Punjab</option>
                </select>

                <button className="btn btn-primary w-100" type="submit">
                  {editingId ? "Save Changes" : "Add Address"}
                </button>
              </form>
            </div>

        
            <div className="col-12 col-md-6 mb-4">
              <h4 className="text-info mb-2">Saved Addresses</h4>
              <p><strong>Please choose a delivery address:</strong></p>
              <div className="d-flex flex-column gap-2">
                {addresses.map((addr) => (
                  <div key={addr.id} className="d-flex align-items-center justify-content-between border rounded p-2">
                    <div className="d-flex align-items-center gap-2">
                      <input
                        type="radio"
                        name="selectedAddress"
                        checked={selectedAddress?.id === addr.id}
                        onChange={() => setSelectedAddress(addr)}
                      />
                      <div>
                        <strong>{addr.nickname}</strong>: {addr.house}, {addr.area}, {addr.landmark}, {addr.city}, {addr.state} - {addr.pincode}
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => {
                          setEditingId(addr.id);
                          setNickname(addr.nickname);
                          setHouse(addr.house);
                          setArea(addr.area);
                          setLandmark(addr.landmark);
                          setPincode(addr.pincode);
                          setCity(addr.city);
                          setState(addr.state);
                        }}
                      >
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => deleteAddress(addr.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
};

export default UserProfile;
