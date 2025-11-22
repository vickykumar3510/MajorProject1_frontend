import { createContext, useState } from "react";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const addAddress = (address) => {
    setAddresses((prev) => [...prev, address]);
  };

  const editAddress = (id, updatedData) => {
  setAddresses((prev) =>
    prev.map((addr) => (addr.id === id ? { ...addr, ...updatedData } : addr))
  );
};

  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    alert("Address deleted successfully!");
  };

  return (
    <AddressContext.Provider
      value={{ addresses, addAddress, deleteAddress, selectedAddress, setSelectedAddress, editAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export default AddressContext;
