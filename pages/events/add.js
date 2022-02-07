import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

import Layout from "@/components/layout/Layout";

import { parseCookies } from "@/helpers/index";

function AddEventPage({ token }) {
  const router = useRouter();

  const nameInput = useRef("");
  const performersInput = useRef("");
  const venueInput = useRef("");
  const addressInput = useRef("");
  const timeInput = useRef("");
  const dateInput = useRef("");
  const descriptionInput = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      nameInput.current.value.trim() === "" ||
      performersInput.current.value.trim() === "" ||
      venueInput.current.value.trim() === "" ||
      addressInput.current.value.trim() === "" ||
      timeInput.current.value.trim() === "" ||
      dateInput.current.value.trim() === "" ||
      descriptionInput.current.value.trim() === ""
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const res = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nameInput.current.value,
        performers: performersInput.current.value,
        venue: venueInput.current.value,
        address: addressInput.current.value,
        time: timeInput.current.value,
        date: dateInput.current.value,
        description: descriptionInput.current.value,
      }),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("No token included");
        return;
      }
      toast.error("Something went wrong");
      return;
    }

    const evt = await res.json();
    console.log(evt);
    router.push(`/events/${evt.slug}`);
  };

  return (
    <Layout title="Add Event">
      <Link href="/events">Go back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input type="text" id="name" name="name" ref={nameInput} />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              ref={performersInput}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input type="text" name="venue" id="venue" ref={venueInput} />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="address" ref={addressInput} />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date" ref={dateInput} />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input type="text" name="time" id="time" ref={timeInput} />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            ref={descriptionInput}
          ></textarea>
        </div>

        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
}

export default AddEventPage;

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx.req);

  return {
    props: {
      token,
    },
  };
}
