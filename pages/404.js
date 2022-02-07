import React from "react";
import Layout from "@/components/layout/Layout";
import styles from "@/styles/404.module.css";
import Link from "next/link";

// Main Component
function NotFoundPage() {
  return (
    <Layout title="Page not found">
      <div className={styles.error}>
        <div>404 - Page not found</div>
        <p>
          <Link href="/">Go Home</Link>
        </p>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
