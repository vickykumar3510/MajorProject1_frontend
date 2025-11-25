import NoProfileNoSearchBarHeader from "../components/NoProfileNoSearchBarHeader";
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

  const {
    addresses,
    addAddress,
    editAddress,
    deleteAddress,
    selectedAddress,
    setSelectedAddress,
  } = useContext(AddressContext);

  
  const parseDate = (d) => {
    if (!d) return null;
    const iso = new Date(d);
    if (!isNaN(iso.getTime())) return iso;
    const parts = d.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      return new Date(year, month - 1, day);
    }
    return null;
  };

  const isValidDate = (d) => parseDate(d) !== null;

  const formatDateTime = (dateString, timeString) => {
    const date = parseDate(dateString);
    if (!date) return "Date not available";
    const formatted = date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    if (timeString) return `${formatted}, ${timeString}`;
    return formatted;
  };

  const makeGroupKey = (order) => {
    if (order.orderGroupId) return order.orderGroupId;
    const dateVal = order.orderDate || order.createdAt || order.updatedAt;
    if (!isValidDate(dateVal)) {
      return `${order.bookName || "no-book"}|${order.customerAddress || "no-addr"}`;
    }
    const d = parseDate(dateVal);
    const keyDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}|${d.getHours()}:${d.getMinutes()}`;
    const addr = order.customerAddress || "no-addr";
    return `${keyDate}|${addr}`;
  };

  
  useEffect(() => {
    fetch("https://major-project1-backend-jet.vercel.app/orders")
      .then((res) => res.json())
      .then((data) => {
        let raw = [];
        if (Array.isArray(data)) raw = data;
        else if (Array.isArray(data.orders)) raw = data.orders;
        else if (Array.isArray(data.data)) raw = data.data;
        else raw = [];

        const hasItemsArray = raw.length > 0 && raw[0].items && Array.isArray(raw[0].items);

        if (hasItemsArray) {
          const sanitized = raw.map((orderDoc) => {
            const dateVal = orderDoc.orderDate || orderDoc.createdAt || orderDoc.updatedAt;
            const items = (orderDoc.items || []).map((it) => ({
              bookName: it.bookName,
              bookAuthor: it.bookAuthor,
              bookImage: it.bookImage,
              bookPrice: Number(it.bookPrice) || 0,
              quantity: Number(it.quantity) || 1,
            }));
            return {
              ...orderDoc,
              items,
              _orderDateForSort: isValidDate(dateVal) ? parseDate(dateVal).getTime() : 0,
            };
          });

          sanitized.sort((a, b) => b._orderDateForSort - a._orderDateForSort);
          setOrderHistory(sanitized);
          return;
        }

        
        const groups = new Map();
        raw.forEach((orderDoc) => {
          const key = makeGroupKey(orderDoc);
          const dateVal = orderDoc.orderDate || orderDoc.createdAt || orderDoc.updatedAt;
          const when = isValidDate(dateVal) ? parseDate(dateVal).getTime() : Date.now();

          const item = {
            bookName: orderDoc.bookName,
            bookAuthor: orderDoc.bookAuthor,
            bookImage: orderDoc.bookImage,
            bookPrice: Number(orderDoc.bookPrice) || 0,
            quantity: Number(orderDoc.quantity) || 1,
          };

          if (!groups.has(key)) {
            groups.set(key, {
              _id: orderDoc._id || key,
              orderDate: isValidDate(dateVal) ? dateVal : undefined,
              customerAddress: orderDoc.customerAddress || "",
              customerName: orderDoc.customerName || "",
              customerPhone: orderDoc.customerPhone || "",
              items: [item],
              _orderDateForSort: when,
            });
          } else {
            const grp = groups.get(key);
            grp.items.push(item);
          }
        });

        const groupedArray = Array.from(groups.values());
        groupedArray.sort((a, b) => (b._orderDateForSort || 0) - (a._orderDateForSort || 0));
        setOrderHistory(groupedArray);
      })
      .catch(() => setOrderHistory([]));
  }, []);

  
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
      <NoProfileNoSearchBarHeader />
      <div className="container-fluid">
        <div className="container my-4">

      
          <div className="card p-3 mb-4">
            <h3>Hello User!</h3>
            <p><strong>Name:</strong> Vicky Kumar</p>
            <p><strong>Email:</strong> vickykumar@gmail.com</p>
            <p><strong>Phone:</strong> +91 9999991254</p>
            <p><strong>Member Since:</strong> November, 2025</p>
          </div>

          <div className="row mt-4">

      
            <div className="col-12 col-md-6 mb-4">
              <h4>Add New Address</h4>
              <form onSubmit={handleSubmit} className="my-4">
                <label>Nickname</label>
                <input type="text" className="form-control mb-3" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                <label>Flat / House No / Building</label>
                <input type="text" className="form-control mb-3" value={house} onChange={(e) => setHouse(e.target.value)} />
                <label>Area / Street / Sector</label>
                <input type="text" className="form-control mb-3" value={area} onChange={(e) => setArea(e.target.value)} />
                <label>Landmark</label>
                <input type="text" className="form-control mb-3" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
                <label>Pincode</label>
                <input type="number" className="form-control mb-3" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                <label>City</label>
                <input type="text" className="form-control mb-3" value={city} onChange={(e) => setCity(e.target.value)} />
                <label>State</label>
                <select className="form-control mb-3" value={state} onChange={(e) => setState(e.target.value)}>
                  <option value="">Select</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Goa">Goa</option>
                  <option value="Punjab">Punjab</option>
                </select>
                <button className="btn btn-primary w-100" type="submit">{editingId ? "Save Changes" : "Add Address"}</button>
              </form>
            </div>

        
            <div className="col-12 col-md-6">
              <h4>Saved Addresses</h4>
              {addresses.length === 0 && <p>No addresses added yet.</p>}
              <p><strong>Please choose a delivery address:</strong></p>
              {addresses.map((addr) => (
                <div key={addr.id} className="card p-3 mt-3">
                  <div className="d-flex flex-column flex-md-row align-items-start">
                    <input type="radio" name="selectedAddress" checked={selectedAddress === addr.id} onChange={() => setSelectedAddress(addr.id)} className="me-3 mb-2 mb-md-0"/>
                    <div className="flex-grow-1 mb-2 mb-md-0">
                      <p><strong>{addr.nickname}</strong></p>
                      <p>{addr.house}, {addr.area}, {addr.landmark}</p>
                      <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                    </div>
                    <div className="d-flex gap-2 flex-wrap">
                      <button className="btn btn-danger btn-sm" onClick={() => deleteAddress(addr.id)}>Delete</button>
                      <button className="btn btn-warning btn-sm" onClick={() => {
                        setEditingId(addr.id);
                        setNickname(addr.nickname);
                        setHouse(addr.house);
                        setArea(addr.area);
                        setLandmark(addr.landmark);
                        setPincode(addr.pincode);
                        setCity(addr.city);
                        setState(addr.state);
                      }}>Edit</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

      
          <div className="card p-3 my-5">
            <h4>Order History</h4>
            {orderHistory.length === 0 && <p>No previous orders.</p>}
            <div className="d-flex flex-column gap-4 mt-3">
              {orderHistory.map((order) => {
                const formattedDate = formatDateTime(order.orderDate, order.orderTime);
                const orderTotal = (order.items || []).reduce((sum, item) => sum + (Number(item.bookPrice) || 0) * (Number(item.quantity) || 1), 0);

          
                const matchingAddress = addresses.find(
                  (addr) => `${addr.house}, ${addr.area}, ${addr.landmark}, ${addr.city}, ${addr.state} - ${addr.pincode}` === order.customerAddress
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
                            <img src={item.bookImage} alt={item.bookName} style={{ width: "80px", height: "110px", objectFit: "cover", borderRadius: "6px" }} />
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

        </div>
      </div>
      <Footer />
    </main>
  );
};

export default UserProfile;
