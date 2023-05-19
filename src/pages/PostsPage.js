import { useEffect, useState } from "react";

import { List } from "../components/List";

export const PostsPage = () => {
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState();

  const columnNames = [
    { value: "ID", keyName: "id" },
    { value: "Title", keyName: "title" },
    { value: "Body", keyName: "body" },
    { value: "UserID", keyName: "userId" },
  ];

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const postsData = await response.json();
      
      setData(postsData);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPosts = data?.length;
  const lastPage = Math.ceil(totalPosts / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

  const onPageChange = (number) => {
    if (number >= 1 && number <= lastPage) {
      setCurrentPage(number);
    }
  };

  const handleSelectChange = (event) => {
    setPostsPerPage(event.target.value);
  };

  return (
    <div>
      <List
        data={currentPosts}
        columns={columnNames}
        onPageChange={onPageChange}
        currentPage={currentPage}
        total={totalPosts}
        rowsPerPage={postsPerPage}
        handleSelectChange={handleSelectChange}
        isLoading={isLoading}
      />
    </div>
  );
};
