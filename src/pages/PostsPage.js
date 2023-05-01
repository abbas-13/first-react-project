import { useEffect, useState } from "react";

import { List } from "../components/List";

const totalPosts = 100;

export const PostsPage = () => {
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const columnNames = [
    { value: "ID", keyName: "id" },
    { value: "Title", keyName: "title" },
    { value: "Body", keyName: "body" },
    { value: "UserID", keyName: "userId" },
  ];

  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const postsData = await response.json();
    setData(postsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

  const onPageChange = (number) => {
    setCurrentPage(number);
  };

  return (
    <div>
      <List
        data={currentPosts}
        onPageChange={onPageChange}
        columns={columnNames}
        currentPage={currentPage}
        total={totalPosts}
      />
    </div>
  );
};
