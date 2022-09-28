import { useState, useEffect } from "react";
import axios from "axios";

function useApi(url) {
  const [establishments, setEstablishments] = useState([]);
  const [establishment, setEstablishment] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get(url);
        const data = response.data.data;
        setEstablishments(data);
        setEstablishment(data);
        setFacilities(data);
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
    loading,
    error,
  };
}

export default useApi;