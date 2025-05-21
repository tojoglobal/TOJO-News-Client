import { useAxiospublic } from "@/src/app/hooks/useAxiospublic";

const getView = async (id) => {
  try {
    const axiosPublic = useAxiospublic();
    const { data } = await axiosPublic.get(`/api/${id}/view`);
    return data.viewCount || 0;
  } catch (error) {
    return 0;
  }
};

const GetView = async ({ blogId }) => {
  const viewCount = await getView(blogId);
  return (
    <>
      <span className="ml-2 text-sm">Views: {viewCount}</span>
    </>
  );
};

export default GetView;
