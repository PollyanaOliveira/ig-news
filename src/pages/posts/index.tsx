/* eslint-disable react/jsx-key */
import Head from "next/head";
import Link from "next/link";

import { getPrismicClient } from "../../../prismicio";
import styles from "./styles.module.scss";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }) {
  return (
    <>
      <Head>
        <title>posts | news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps({ params, previewData }) {
  const client = getPrismicClient({ previewData });
  const documents = await client.getAllByType("ignews-post");

  const posts = documents.map((post) => {
    return {
      slug: post.uid,
      title: post.data.title[0].text,
      excerpt:
        post.data.content.find(
          (content: { type: string; text: string | any[] }) =>
            content.type === "paragraph" && content.text.length
        )?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: { posts },
  };
}
