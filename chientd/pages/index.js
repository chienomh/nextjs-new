import Head from "next/head";
// import React from "react";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import apiClient from "./api/apiClient";
import Link from "next/link";
import Router from "next/router";

export default function Home({ name }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>ChienTD</title>
      </Head>
      <h1 className={styles.styleHeader}>{name}</h1>
      <button
        onClick={() => Router.push(`/posts`)}
        style={{
          backgroundColor: "#FFD154",
          border: "0px",
          padding: "10px",
          fontFamily: "inherit",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Go to exam
      </button>
    </div>
  );
}

export async function getStaticProps() {
  const name = "Tạ Đức Chiến - 2K15";

  return {
    props: {
      name,
    },
  };
}
