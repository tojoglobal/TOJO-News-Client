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
    console.error("Error fetching blog post:", error);
    return null;
  }
};

export default async function BlogPost({ params }) {
  const { id } = await params;
  const blog = await getBlogPost(id);

  if (!blog || blog.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Post Not Found
          </h2>
          <p className="text-gray-600">
            The blog post you&apos;re looking for doesn&apos;t exist or may have
            been removed.
          </p>
        </div>
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

  const stats = readingTime(articalpost || "");
  const publishDate = new Date(dateAndTime);
  const formattedDate = publishDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-5xl mx-auto p-5">
      {/* Article Header */}
      <header className="mb-8">
        {/* Category Tag */}
        <div className="mb-4">
          <span className="inline-block bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-medium">
            <Category category={category_id} />
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Author and Date */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>By</span>
            <span className="font-medium text-gray-800">
              <Author
                author1={author1_id}
                author2={author2_id}
                showSingle={true}
              />
            </span>
          </div>
          <span className="text-gray-400">•</span>
          <time dateTime={dateAndTime} className="text-sm text-gray-600">
            {formattedDate}
          </time>
        </div>

        {/* Featured Image */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md mb-6">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Images/${thumble}`}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 border-b border-gray-200 pb-6">
          <span>Reading time: {stats.text}</span>
          <GetView blogId={id} />
        </div>
      </header>

      {/* Article Content */}
      <ArticleReader
        articleId={id}
        articleContent={articalpost}
        title={title}
      />

      {/* Engagement Section */}
      <footer className="mt-12 pt-6 border-t border-gray-200">
        <div className="flex justify-center">
          <LoveBtn articleId={id} />
        </div>
      </footer>
    </article>
  );
}
