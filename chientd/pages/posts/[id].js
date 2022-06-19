import React from "react";
import apiClient from "../api/apiClient";
import { getPostData } from "./index";
import styles from "../../styles/Post.module.css";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

export default function DetailPost({ data }) {
  return (
    <div>
      <div style={{ fontSize: "20px", fontWeight: "bold", height: "100px" }}>
        <Link href="/posts">
          <a style={{ textDecoration: "underline" }}>List Post</a>
        </Link>
        <span> > </span>
        <span>{data.text}</span>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", minHeight: "50px", gap: "70px" }}>
          <div>
            <Image
              src={data.image}
              width={200}
              height={300}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div>
            <div className={styles.nameDetail}>{data.text}</div>
            <div style={{ display: "flex", minHeight: "50px" }}>
              <div className={styles.titleDetail}>Likes:</div>
              <div>{data.likes}</div>
            </div>
            <div style={{ display: "flex", minHeight: "50px" }}>
              <div className={styles.titleDetail}>Publish Date:</div>
              <div>{moment(data.publishDate).format("DD/MM/YYYY HH:mm")}</div>
            </div>
            <div style={{ display: "flex", minHeight: "50px" }}>
              <div className={styles.titleDetail}>Tags:</div>
              {data.tags.toString()}
            </div>
            <div style={{ display: "flex" }}>
              <div className={styles.titleDetail}>Owner:</div>
              <div>
                <div style={{ display: "flex", height: "30px" }}>
                  <div className={styles.titleDetail}>Title:</div>
                  <div>{data.owner.title}</div>
                </div>
                <div style={{ display: "flex", height: "30px" }}>
                  <div className={styles.titleDetail}>First Name:</div>
                  <div>{data.owner.firstName}</div>
                </div>
                <div style={{ display: "flex", height: "30px" }}>
                  <div className={styles.titleDetail}>lastName:</div>
                  <div>{data.owner.lastName}</div>
                </div>
                <div style={{ display: "flex", height: "30px" }}>
                  <div className={styles.titleDetail}>Picture:</div>
                  <div>
                    <Image
                      src={data.owner.picture}
                      width={100}
                      height={100}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const data = await getPostData(params);

  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  // Return a list of possible value for id

  const data = await apiClient.get("/post");
  const posts = data.data.data;

  const paths = posts.map((x) => {
    return {
      params: {
        id: x.id,
        slug: x.text,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
