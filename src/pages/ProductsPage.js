import { useEffect, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { SearchBar } from "../components/Search";
import { List } from "../components/List";

const baseURL = "https://dummyjson.com/products";

export const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState({
    products: [],
    total: 0,
  });
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
    queryString = inputValue.length ? "" : "limit=10&skip=0"
  ) => {
    try {
      setIsLoading(true);

      const apiToUse = inputValue.length
        ? `${baseURL}/search?q=${queryString}`
        : `${baseURL}?${queryString}`;

      const response = await fetch(apiToUse);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const productsData = await response.json();

      setData({
        products: productsData.products,
        total: inputValue.length ? productsData.length : 100,
      });
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

  const lastPage = Math.ceil(data.total / pagination.limit);

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

    const delayedSearchVar =
      targetValue === "" ? "limit=10&skip=0" : { product: targetValue };

    setInputValue(targetValue);
    delayedSearch(delayedSearchVar);
  };

  const onLimitUpdate = (event) => {
    let updatedCurrentPage;
    let updatedSkip;
    const updatedLimit = event.target.value;

    setPagination((prevState) => {
      updatedCurrentPage =
        prevState.currentPage > data.total / updatedLimit
          ? Math.ceil(data.total / updatedLimit)
          : prevState.currentPage;

      updatedSkip =
        prevState.skip > data.total
          ? Math.ceil((data.total - updatedLimit) / 10) * 10
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
        data={data.products}
        total={data.total}
        onPageChange={onPageChange}
        currentPage={pagination.currentPage}
        rowsPerPage={pagination.limit}
        onLimitUpdate={onLimitUpdate}
        isLoading={isLoading}
      />
    </div>
  );
};
