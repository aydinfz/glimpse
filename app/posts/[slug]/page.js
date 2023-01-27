import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetaData from "@/components/getPostMetadata";

const getPostContent = (slug) => {
  const folder = "posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};

export const generateStaticParams = async () => {
  const posts = getPostMetaData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export default function PostPage({ params }) {
  const slug = params.slug;
  const post = getPostContent(slug);
  return (
    <div>
      <h1>{post.data.title}</h1>
      <Markdown>{post.content}</Markdown>
    </div>
  );
}