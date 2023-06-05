import { useEffect, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { array } from "prop-types";

import { SearchBar } from "../components/Search";
import { List } from "../components/List";

export const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    skip: 0,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const columnNames = [
    { value: "ID", keyName: "id" },
    { value: "Title", keyName: "title" },
    { value: "Description", keyName: "description" },
    { value: "Price", keyName: "price" },
    { value: "Discount Percentage", keyName: "discountPercentage" },
    { value: "Rating", keyName: "rating" },
    { value: "Stock", keyName: "stock" },
    { value: "Brand", keyName: "brand" },
    { value: "Category", keyName: "category" },
    // {value: "Thumbnail", keyName: "thumbnail", type: "image"},
    // {value: "Images", keyName: "images", type: "image"}
  ];

  const debounce = (func, timeout = 1000) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const delayedSearch = useCallback(
    debounce((query) => setSearchParams(query)),
    []
  );

  const fetchData = async (
    queryString = inputValue ? "" : "limit=10&skip=0"
  ) => {
    try {
      setIsLoading(true);

      const response = inputValue
        ? await fetch(`https://dummyjson.com/products/search?q=${queryString}`)
        : await fetch(`https://dummyjson.com/products?${queryString}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const productsData = await response.json();

      setData(productsData.products);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const queryParams = Object.fromEntries([...searchParams]);
    const arrayParams = [];

    if (inputValue) {
      for (const key in queryParams) {
        arrayParams.push(`${queryParams[key]}`);
      }
    } else {
      for (const key in queryParams) {
        arrayParams.push(`${key}=${queryParams[key]}`);
      }
    }

    const updatedQueryParams = arrayParams.join("&");

    if (updatedQueryParams !== "") {
      fetchData(updatedQueryParams);
    } else {
      fetchData();
    }
  }, [pagination, searchParams]);

  const totalProducts = 100;
  const lastPage = Math.ceil(totalProducts / pagination.limit);

  const onPageChange = (number) => {
    if (number >= 1 && number <= lastPage) {
      setPagination((prevState) => ({
        ...prevState,
        currentPage: number,
        skip: (number - 1) * pagination.limit,
      }));

      setSearchParams({
        limit: pagination.limit,
        skip: (number - 1) * pagination.limit,
      });
    } else {
      setPagination((prevState) => ({
        ...prevState,
        currentPage: lastPage,
        skip: (lastPage - 1) * pagination.limit,
      }));
    }
  };

  const handleChange = (event) => {
    const targetValue = event.target.value;

    setInputValue(targetValue);
    delayedSearch({ product: targetValue });
  };

  const onLimitUpdate = (event) => {
    let updatedCurrentPage;
    let updatedSkip;
    const updatedLimit = event.target.value;

    setPagination((prevState) => {
      updatedCurrentPage =
        prevState.currentPage > totalProducts / updatedLimit
          ? Math.ceil(totalProducts / updatedLimit)
          : prevState.currentPage;

      updatedSkip =
        prevState.skip > totalProducts
          ? Math.ceil((totalProducts - updatedLimit) / 10) * 10
          : (updatedCurrentPage - 1) * updatedLimit;

      return {
        currentPage: updatedCurrentPage,
        limit: updatedLimit,
        skip: updatedSkip,
      };
    });

    setSearchParams({
      limit: updatedLimit,
      skip: updatedSkip,
    });
  };

  return (
    <div>
      <SearchBar
        inputValue={inputValue}
        handleChange={handleChange}
        placeholder="Product"
      />
      <List
        columns={columnNames}
        data={data}
        total={totalProducts}
        onPageChange={onPageChange}
        currentPage={pagination.currentPage}
        rowsPerPage={pagination.limit}
        onLimitUpdate={onLimitUpdate}
        isLoading={isLoading}
      />
    </div>
  );
};
