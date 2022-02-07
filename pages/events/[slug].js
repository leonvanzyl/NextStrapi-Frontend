import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";

// main module
function EventPage({ evt }) {
  const router = useRouter();

  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image.formats.large.url} height={600} width={960} />
          </div>
        )}
        <h3>Performers</h3>
        <p>{evt.performers}</p>

        <h3>Description:</h3>
        <p>{evt.description}</p>

        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a className={styles.back}>{"<"} Go back</a>
        </Link>
      </div>
    </Layout>
  );
}

export default EventPage;

export async function getServerSideProps(ctx) {
  const { slug } = ctx.query;

  const res = await fetch(`${API_URL}/events/?slug=${slug}`);
  const events = await res.json();
  return {
    props: {
      evt: events[0],
    },
  };
}
