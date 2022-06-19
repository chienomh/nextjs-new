import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import styles from "../../styles/Post.module.css";
import Image from "next/image";
import moment from "moment";
import Router from "next/router";
import Link from "next/link";

export default function Post({ posts }) {
  const goDetailPost = (id) => {
    // const slugify = (text) =>
    //   text
    //     .toLowerCase()
    //     .trim()
    //     .replace(/[^\w\s-]/g, "")
    //     .replace(/[\s_-]+/g, "-")
    //     .replace(/^-+|-+$/g, "");

    Router.push(`/posts/${id}`);
  };

  const [params, setParams] = useState({ limit: 10, page: 0 });
  const [dataPost, setDataPost] = useState(posts);
  const [typeSort, setTypeSort] = useState(-1);

  useEffect(() => {
    (async () => {
      const data = await apiClient.get(
        `/post/?page=${params.page}&limit=${params.limit}`
      );

      setDataPost(data.data.data);
      // console.log(typeSort);
      // switch (typeSort) {
      //   case "0": {
      //     const datapost = data.data.data.sort((a, b) =>
      //       a.likes > b.likes ? 1 : b.likes > a.likes ? -1 : 0
      //     );
      //     setDataPost(datapost);
      //   }
      //   case "1": {
      //     const datapost = data.data.data.sort((a, b) =>
      //       a.likes < b.likes ? -1 : b.likes < a.likes ? 1 : 0
      //     );
      //     setDataPost(datapost);
      //   }
      // }
    })();
  }, [params, typeSort]);

  const handleChagePrePage = () => {
    if (params.page !== 0) {
      setParams((pre) => ({ ...pre, page: pre.page - 1 }));
    }
  };

  const handleChageNextPage = () => {
    setParams((pre) => ({ ...pre, page: pre.page + 1 }));
  };

  const changeTypeSort = (e) => {
    setTypeSort(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div>
        Sort by:{" "}
        <select style={{ minWidth: "200px" }} onChange={changeTypeSort}>
          <option value="-1">No</option>
          <option value="0">Asc like</option>
          <option value="1">Des like</option>
          <option value="2">Like</option>
        </select>
      </div>
      <table className={styles.tablePost}>
        <thead className={styles.tableHeader}>
          <tr>
            <td style={{ minWidth: "50px" }}>Index</td>
            <td style={{ minWidth: "150px" }}>Id</td>
            <td style={{ minWidth: "150px" }}>Text</td>
            <td style={{ minWidth: "150px" }}>Image</td>
            <td style={{ minWidth: "150px" }}>Likes</td>
            <td style={{ minWidth: "150px" }}>Tags</td>
            <td style={{ minWidth: "150px" }}>PublishDate</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {dataPost.map((x, index) => (
            <tr
              key={index}
              className={styles.tableBody}
              style={{ cursor: "pointer" }}
            >
              <td>{index + 1}</td>
              <td>{x.id}</td>
              <td>{x.text}</td>
              <td>
                <Image src={x.image} width={100} height={100} />
              </td>
              <td>{x.likes}</td>
              <td>{x.tags}</td>
              <td>{moment(x.publishDate).format("DD/MM/YYYY")}</td>
              <td>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={() => goDetailPost(x.id)}
                >
                  Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleChagePrePage}
          style={{ width: "100px", cursor: "pointer" }}
          disabled={params.page === 0}
        >
          Pre
        </button>
        <button
          onClick={handleChageNextPage}
          style={{ width: "100px", cursor: "pointer" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const params = {
    limit: 10,
    page: 0,
  };

  const data = await apiClient.get(
    `/post/?page=${params.page}&limit=${params.limit}`
  );
  const posts = data.data.data;

  return {
    props: {
      posts,
    },
  };
}

export async function getPostData(params) {
  const dataCall = await apiClient.get(`/post/${params.id}`);

  // Combine the data with the id
  return {
    id: params.id,
    ...dataCall.data,
  };
}
