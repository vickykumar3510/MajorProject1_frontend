import NoLoginNoSearchBarHeader from "../components/NoLoginNoSearchBarHeader";
import Footer from "../components/Footer";
import { useState, useContext } from "react";
import AddressContext from "../contexts/AddressContext";

const UserAccount = () => {
  const [nickname, setNickname] = useState("");
  const [house, setHouse] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [editingId, setEditingId] = useState(null);

  const {
    addresses,
    addAddress,
    editAddress,
    deleteAddress,
    selectedAddress,
    setSelectedAddress,
  } = useContext(AddressContext);

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

    setNickname("");
    setHouse("");
    setArea("");
    setLandmark("");
    setPincode("");
    setCity("");
    setState("");
  };

  return (
    <main>
      <NoLoginNoSearchBarHeader />

      <div className="container-fluid">
        <div className="container">
          <div className="row mt-4">

            {/* LEFT: FORM */}
            <div className="col-12 col-md-6 mb-4">
              <h2>Hi User!</h2>
              <p><strong>Please fill the delivery address form:</strong></p>

              <form onSubmit={handleSubmit} className="my-4">

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

            {/* RIGHT: ADDRESS CARDS */}
            <div className="col-12 col-md-6">
              <h4>Saved Addresses</h4>
              {addresses.length === 0 && <p>No addresses added yet.</p>}
              <p><strong>Please choose a delivery address:</strong></p>

              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="card p-3 mt-3"
                  style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                >
                  <div className="d-flex flex-column flex-md-row align-items-start">

                    {/* RADIO BUTTON */}
                    <input
                      type="radio"
                      name="selectedAddress"
                      checked={selectedAddress === addr.id}
                      onChange={() => setSelectedAddress(addr.id)}
                      className="me-3 mb-2 mb-md-0"
                    />

                    <div className="flex-grow-1 mb-2 mb-md-0">
                      <p><strong>{addr.nickname}</strong></p>
                      <p>{addr.house}, {addr.area}, {addr.landmark}</p>
                      <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                    </div>

                    <div className="d-flex gap-2 flex-wrap">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteAddress(addr.id)}
                      >
                        Delete
                      </button>

                      <button
                        className="btn btn-warning btn-sm"
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
                    </div>

                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default UserAccount;
