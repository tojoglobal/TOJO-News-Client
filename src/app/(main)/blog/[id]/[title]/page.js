import Author from "@/src/components/RecalcFunction/Author";
import Category from "@/src/components/RecalcFunction/Category";
import axios from "axios";
import Image from "next/image";
import readingTime from "reading-time";
import GetView from "./(BLogComponent)/GetView";
import ArticleReader from "./(BLogComponent)/ArticleReader";
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
    return (
      <div className="flex items-center justify-center text-center min-h-[60vh] text-red-500">
        Blog post not found
      </div>
    );
  }

  const {
    title,
    subtitle,
    dateAndTime,
    thumble,
    category_id,
    author1_id,
    author2_id,
    articalpost,
  } = blog[0];

  const stats = readingTime(blog[0]?.articalpost || "");

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* news title */}
      <h1 className="text-xl md:text-3xl font-bold mb-4">{title}</h1>
      {/* news sub body */}
      <h1 className="text-gray-900 flex-grow-0 flex-shrink-0 text-sm lg:text-lg text-left">
        {subtitle}
      </h1>
      {/* news author and  time */}
      <div className="flex flex-col md:flex-row gap-2 content-baseline align-middle justify-start mt-3 mb-3 md:mb-7">
        <div className="flex flex-wrap justify-start items-start gap-1 text-xs">
          <div className="flex flex-wrap gap-1 uppercase">
            by{" "}
            <span>
              <Author
                author1={author1_id}
                author2={author2_id}
                showSingle={true}
              />
            </span>
            <span> /</span>
          </div>
          <div className="flex justify-start items-start relative gap-1 uppercase">
            <p className="text-gray-600">
              <time dateTime={dateAndTime}>
                {new Date(dateAndTime).toDateString()}
              </time>
            </p>
          </div>
        </div>
      </div>

      {/* news thumbline  */}
      <div className="w-full relative aspect-[1.5/1] md:aspect-[1.65/1]">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Images/${thumble}`}
          alt={title}
          fill
          className="rounded-lg object-fill md:object-cover"
        />
        {/* Category Tag */}
        <span className="bg-royal-indigo text-white text-xs px-2 py-1 rounded-md font-medium absolute bottom-1 left-1">
          <Category category={category_id} />
        </span>
      </div>
      {/* news reading time and getview  */}
      <div>
        <span className="text-sm mt-2">Reading Time: {stats.text}</span>
        <GetView blogId={id} />
      </div>
      {/* news reading time spent
       and
        news post */}
      <ArticleReader
        articleId={id}
        articleContent={articalpost}
        title={title}
      />
      {/* news love btn */}
      <div>
        <LoveBtn articleId={id} />
      </div>
    </div>
  );
}
