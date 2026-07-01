import React from "react";
import ArticleDetailsBreadcrumb from "../../Components/ArticleDetailsBreadcrumb/ArticleDetailsBreadcrumb";
import ArticleDetailsSec from "../../Components/ArticleDetailsSec/ArticleDetailsSec";
import Newsletter from "../../Components/Newsletter/Newsletter";

const ArticleDetails = () => {
  return (
    <div>
      <ArticleDetailsBreadcrumb />
      <ArticleDetailsSec />
      <Newsletter />
    </div>
  );
};

export default ArticleDetails;
