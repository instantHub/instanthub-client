import { CalendarScheduleFillIcon, ProfileIcon } from "@icons";
import { useNavigate, useParams } from "react-router-dom";
import { blogPostsData, IBlogPostsData } from "src/data";

export const SelectedBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //   @ts-ignore
  const selectedPost: IBlogPostsData = blogPostsData.find(
    (blog) => blog.id === Number(id)
  );
  console.log("SelectedBlog", selectedPost);

  const handleGoBack = () => {
    window.history.back();
  };
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen">
      {/* Article Header */}
      <div className="bg-white">
        <div className="mx-auto px-4 py-6">
          {/* <button
            onClick={handleGoBack}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4 group"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </button> */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              {selectedPost?.category}
            </span>
            <div className="flex items-center gap-1">
              <CalendarScheduleFillIcon className="w-4 h-4" />
              {selectedPost?.date}
            </div>
            <div className="flex items-center gap-1">
              <ProfileIcon className="w-4 h-4" />
              {selectedPost?.author}
            </div>
            <span>{selectedPost?.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4 text-center">
            {selectedPost?.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {selectedPost?.excerpt}
          </p>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white p-8 md:p-12">
          {/* Article Image */}
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">{selectedPost?.image}</div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-lg leading-relaxed text-gray-700 font-medium">
              {selectedPost?.content.intro}
            </p>
          </div>

          {/* Sections */}
          {selectedPost?.content.sections.map((section, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
                {section.heading}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                {section.content}
              </p>
            </div>
          ))}

          {/* Conclusion */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
              Key Takeaway
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              {selectedPost?.content.conclusion}
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-instant-mid to-instant-end rounded-2xl text-white p-8 mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Sell Your Device?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Get an instant quote and turn your old gadgets into cash today!
            </p>
            <button
              onClick={handleNavigate}
              className="bg-white text-instant-mid px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Quote Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
