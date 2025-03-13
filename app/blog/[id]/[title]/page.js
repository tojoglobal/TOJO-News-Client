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

const getView = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${id}/view`
    );
    return data.viewCount || 0;
  } catch (error) {
    return 0;
  }
};

export default async function BlogPost({ params }) {
  const { id } = await params;
  // const blog = await getBlogPost(id);
  // const view = await getView(id);
  const [blog, viewCount] = await Promise.all([getBlogPost(id), getView(id)]);

  console.log(blog);
  console.log(viewCount);

  if (!blog || blog.length === 0) {
    return <div className="text-center text-red-500">Blog post not found</div>;
  }

  const {
    subtitle,
    dateAndTime,
    author,
    category,
    commentsCount,
    likesCount,
    dislikesCount,
    viewsCount,
    articalpost,
  } = blog[0];

  const stats = readingTime(blog[0]?.articalpost || "");

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{subtitle}</h1>
      <div>
        <p className="text-gray-600">{new Date(dateAndTime).toDateString()}</p>
        <span className="text-sm">Reading Time: {stats.text}</span>
        <span className="ml-2 text-sm">Author: {author}</span>
        <span className="ml-2 text-sm">Category: {category}</span>
        <span className="ml-2 text-sm">Comments: {commentsCount}</span>
        <span className="ml-2 text-sm">Likes: {likesCount}</span>
        <span className="ml-2 text-sm">Dislikes: {dislikesCount}</span>
        <span className="ml-2 text-sm">Views: {viewCount}</span>
      </div>

      <ArticleReader articleId={id} articleContent={articalpost} />
    </div>
  );
}
