import { createContext, useState, useEffect } from "react";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem("addresses");
    return saved ? JSON.parse(saved) : [];
  });

  
  const [selectedAddress, setSelectedAddress] = useState(() => {
    const saved = localStorage.getItem("selectedAddress");
    return saved ? JSON.parse(saved) : null;
  });

  
  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  
  useEffect(() => {
    localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
  }, [selectedAddress]);

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

    
    setSelectedAddress((prev) => (prev?.id === id ? null : prev));

    alert("Address deleted successfully!");
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        addAddress,
        deleteAddress,
        selectedAddress,
        setSelectedAddress,
        editAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export default AddressContext;
