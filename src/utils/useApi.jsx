import { useState, useEffect } from "react";
import axios from "axios";

function useApi(url) {
  const [establishments, setEstablishments] = useState([]);
  const [establishment, setEstablishment] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [messages, setMessages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  const toggleItem = (item) => {
    setData(item);
    setOpen(item !== null);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get(url);
        const data = response.data.data;
        setEstablishments(data);
        setEstablishment(data);
        setFacilities(data);
        setMessages(data);
        setBookings(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData(url);
  }, [url]);

  return {
    establishments,
    establishment,
    facilities,
    messages,
    bookings,
    loading,
    error,
    data,
    open,
    toggleItem,
    closeModal,
  };
}

export default useApi;