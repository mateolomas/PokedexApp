import { useState, useEffect } from "react";
import axios from "axios";
export const useFetch = <T>(url: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<T>();
  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get<T>(url);
      const dataApi = response.data;
      setData(dataApi);
    } catch (error: unknown) {
      let errorMessage = "Ha ocurrido un error inesperado";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return { loading, error, data };
};