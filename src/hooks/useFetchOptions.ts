import axios from "axios";
import { useEffect, useState } from "react";

type LabelKey<T> = keyof T | ((item: T) => string);
type ValueKey<T> = keyof T | ((item: T) => string | number);
type FilterFn<T> = (item: T) => boolean;

export function useFetchOptions<T = any>(
  url: string,
  labelKey: LabelKey<T> = "name" as keyof T,
  valueKey: ValueKey<T> = "id" as keyof T,
  filterFn?: FilterFn<T>
) {
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        let data: T[] = res.data?.data || [];

        if (typeof filterFn === "function") {
          data = data.filter(filterFn);
        }

        const opts = data.map((item) => ({
          label:
            typeof labelKey === "function"
              ? labelKey(item)
              : String(item[labelKey as keyof T]),
          value: String(
            typeof valueKey === "function"
              ? valueKey(item)
              : item[valueKey as keyof T]
          ),
        }));

        setOptions(opts);
      } catch (error) {
        console.error("Failed to fetch options data:", error);
      }
    };

    fetchData();
  }, [url, labelKey, valueKey, filterFn]);

  return options;
}
