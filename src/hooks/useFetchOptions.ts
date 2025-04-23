import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchOptions = (url, labelKey, valueKey = "id") => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        const opts = res.data.data.map((item) => ({
          label: item[labelKey],
          value: item[valueKey],
        }));
        setOptions(opts);
      })
      .catch(console.error);
  }, [url]);
  return options;
};
