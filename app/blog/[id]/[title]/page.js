import ArticleReader from "@/app/blog/[id]/[title]/(BLogComponent)/ArticleReader";
import axios from "axios";
import readingTime from "reading-time";
import GetView from "./(BLogComponent)/GetView";
import LoveBtn from "./(BLogComponent)/LoveBtn";

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
        <GetView blogId={id} />
      </div>
      <ArticleReader articleId={id} articleContent={articalpost} />
      <div>
        <LoveBtn articleId={id} />
      </div>
    </div>
  );
}
