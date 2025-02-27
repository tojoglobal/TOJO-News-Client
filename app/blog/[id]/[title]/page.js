import axios from "axios";

const getBlogPost = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/blogpost/${id}`
    );
    return data.Result || null; // Ensure we return `null` if no result
  } catch (error) {
    return null;
  }
};

const BlogPost = async ({ params }) => {
  const { id } = await params; // ✅ Await params before accessing properties
  console.log(id);

  const blog = await getBlogPost(id); // Fetch blog post data

  if (!blog) {
    return <div className="text-center text-red-500">Blog post not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-gray-600">
        {new Date(blog.dateAndTime).toDateString()}
      </p>
      <div
        dangerouslySetInnerHTML={{ __html: blog.articalpost || "" }} // ✅ Ensure content is not undefined/null
        className="mt-4 text-lg"
      />
    </div>
  );
};

export default BlogPost;
