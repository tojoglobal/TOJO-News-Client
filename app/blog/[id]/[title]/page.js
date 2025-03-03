import ArticleReader from "@/app/Component/Blog/ArticleReader";
import axios from "axios";
import readingTime from "reading-time";

const getBlogPost = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/blogpostbyid/${id}`
    );
    return data.Result || null;
  } catch (error) {
    return null;
  }
};

export default async function BlogPost({ params }) {
  const { id } = await params;
  const blog = await getBlogPost(id);

  if (!blog) {
    return <div className="text-center text-red-500">Blog post not found</div>;
  }

  const stats = readingTime(blog?.articalpost || "");

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <div>
        <p className="text-gray-600">
          {new Date(blog.dateAndTime).toDateString()}
        </p>
        <span className="text-sm">Reading Time: {stats.text}</span>
        <span className="ml-2 text-sm">Author: {blog.author}</span>
        <span className="ml-2 text-sm">Category: {blog.category}</span>
        <span className="ml-2 text-sm">Comments: {blog.commentsCount}</span>
        <span className="ml-2 text-sm">Likes: {blog.likesCount}</span>
        <span className="ml-2 text-sm">Dislikes: {blog.dislikesCount}</span>
        <span className="ml-2 text-sm">Views: {blog.viewsCount}</span>
      </div>

      <ArticleReader articleId={id} articleContent={blog.articalpost} />
    </div>
  );
}
