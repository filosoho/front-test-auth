import React from "react";
import { Link } from "react-router-dom";
import { truncateText, capitalizeFirstLetter } from "../utils/utils";
import { formatDate, timeAgo } from "../utils/dateUtils";
import { calculateReadTime } from "../utils/articleUtils";
import clockImg from "../assets/clock.svg";
import commentImg from "../assets/comments-grey.png";
import voteImg from "../assets/up-arrow-grey.png";
import "../styles/ArticleCard.css";

const ArticleCard = ({
  article,
  isLarge,
  headerArticleInfo = false,
  isTextOnly,
  isSubArticles,
  isTextSub,
  isSecondLarge,
  isSidebar,
  isSidebarPopular,
  isSidebarTrendy,
  customNum,
  onTopicClick,
}) => {
  const handleTopicClick = (e) => {
    e.preventDefault();
    onTopicClick && onTopicClick(article.topic);
  };

  const altText = `Image for the article titled "${truncateText(
    article.title,
    40
  )}" in the ${article.topic} topic`;

  const articleText = `${truncateText(article.body, 306)}`;
  const articleTextShort = `${truncateText(article.body, 88)}`;

  const { formattedDate, formattedTime } = formatDate(article.created_at);
  const readTime = calculateReadTime(article.body);
  const timeAgoText = timeAgo(article.created_at);

  const renderCommentsAndVotes = () => {
    return (
      <div className="comments-votes">
        <p>
          <img className="vote-icon" src={voteImg} /> {article.votes}
        </p>
        <p>
          <img src={commentImg} /> {article.comment_count}
        </p>
      </div>
    );
  };

  const renderClockWithDate = () => {
    return (
      <>
        <img src={clockImg} alt="Clock" />
        {formattedDate}
      </>
    );
  };

  const renderArticleImage = (className) => {
    return (
      <img src={article.article_img_url} alt={altText} className={className} />
    );
  };

  if (headerArticleInfo) {
    return (
      <article className="header-article-card">
        <Link
          to={`/article/${article.article_id}`}
          className="header-article-link"
        >
          <div className="header-image-wrapper">
            {renderArticleImage("header-article-image")}
            <div className="header-article-info">
              <h2 className="header-article-title">{article.title}</h2>
              <div className="header-article-date">
                <p>{formattedDate}</p>
                <p className="header-article-time">
                  <img src={clockImg} alt="Clock" />
                  {formattedTime}
                </p>
              </div>
            </div>
            <div className="header-article-overlay">
              <p>{article.topic}</p>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article
      className={`article-card ${
        isLarge || isSecondLarge
          ? "large-article-card"
          : isTextOnly
          ? "text-only-article-card"
          : isSidebar
          ? "article-sidebar"
          : ""
      }`}
    >
      <Link to={`/article/${article.article_id}`} className="article-link">
        {!isSubArticles &&
          !isTextOnly &&
          !isSidebar &&
          !isSidebarPopular &&
          !isTextSub &&
          !isSidebarTrendy && <>{renderArticleImage("article-image")}</>}
        {isSubArticles && <>{renderArticleImage("sub-article-image")}</>}

        {isSidebar && customNum === "01" && (
          <>
            {renderArticleImage("article-image")}
            <div className="article-header-number">
              <h2 className="article-title">{article.title}</h2>
              <span className="first-article-number">{customNum}</span>
            </div>
            <div className="article-sub-line">
              <div className="article-sub-date">{renderClockWithDate()}</div>
              {renderCommentsAndVotes()}
            </div>
          </>
        )}
        {isSidebar && customNum !== "01" && (
          <>
            <div className="article-header-number">
              <span className="article-number">{customNum}</span>
              <div className="article-side-info">
                <h2 className="sidebar-title">{article.title}</h2>
                <div className="content-card">
                  <div className="article-sub-line-list">
                    {renderCommentsAndVotes()}
                  </div>
                  <div className="article-sub-date">
                    {renderClockWithDate()}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {isSidebarPopular && customNum === "01" && (
          <>
            <p className="topic-header active-topic">Popular</p>
            {renderArticleImage("article-image")}
            <div className="article-header-number">
              <h2 className="article-title">{article.title}</h2>
            </div>
            <div className="article-info-sidebar-topic">
              <p className="article-date-large">{renderClockWithDate()}</p>
              <p>
                <img className="vote-icon" src={voteImg} /> {article.votes}
              </p>
              <p>
                <img src={commentImg} />
                {article.comment_count}
              </p>
            </div>
            <div className="article-sidebar-body">{articleTextShort}</div>
          </>
        )}
        {isSidebarPopular && customNum !== "01" && (
          <>
            <div className="article-header-number">
              {renderArticleImage("topic-article-image")}
              <div className="article-side-info">
                <h2 className="sidebar-title">{article.title}</h2>
                <div className="content-card">
                  <div className="topics-info">
                    <div className="article-sub-date ">
                      {renderClockWithDate()}{" "}
                    </div>
                    <div className="comments-votes topics">
                      <p>
                        <img className="vote-icon" src={voteImg} />{" "}
                        {article.votes}
                      </p>
                      <p>
                        <img src={commentImg} />
                        {article.comment_count}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {isSidebarTrendy && customNum === "01" && (
          <>
            <p className="topic-header active-topic">Trending Now</p>
            {renderArticleImage("article-image")}
            <div className="article-header-number">
              <h2 className="article-title">{article.title}</h2>
            </div>
            <div className="article-info-sidebar-topic">
              <p className="article-date-large">{renderClockWithDate()}</p>
              <p>
                <img className="vote-icon" src={voteImg} /> {article.votes}
              </p>
              <p>
                <img src={commentImg} />
                {article.comment_count}
              </p>
            </div>
            <div className="article-sidebar-body">{articleTextShort}</div>
          </>
        )}
        {isSidebarTrendy && customNum !== "01" && (
          <>
            <div className="article-header-number">
              {renderArticleImage("topic-article-image")}
              <div className="article-side-info">
                <h2 className="sidebar-title">{article.title}</h2>
                <div className="content-card">
                  <div className="topics-info">
                    <div className="article-sub-date ">
                      {renderClockWithDate()}{" "}
                    </div>
                    <div className="comments-votes topics">
                      <p>
                        <img className="vote-icon" src={voteImg} />{" "}
                        {article.votes}
                      </p>
                      <p>
                        <img src={commentImg} />
                        {article.comment_count}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {isLarge && (
          <>
            <h2 className="article-title-large" data-num={customNum}>
              {article.title}
            </h2>
            <div className="content-card-large">
              <div className="article-info-large">
                <p className="article-author">
                  <span className="author-span">by</span> {article.author}{" "}
                </p>
                <p className="article-date-large">{renderClockWithDate()}</p>
                <p>
                  <img className="vote-icon" src={voteImg} /> {article.votes}
                </p>
                <p>
                  <img src={commentImg} />
                  {article.comment_count}
                </p>
              </div>
              <div className="article-body-large">{articleText}</div>
            </div>
          </>
        )}
        {isTextOnly && (
          <>
            <h2 className="article-title-text-only" data-num={customNum}>
              {article.title}
            </h2>
          </>
        )}
        {isTextSub && (
          <>
            <div className="textsub-article">
              {renderArticleImage("textsub-image")}
              <div className="content-card-textsub">
                <h2 className="article-title-textsub" data-num={customNum}>
                  {article.title}
                </h2>
                <div className="article-body-textsub">{articleTextShort}</div>
              </div>
            </div>
            <div className="article-info-textsub">
              <p className="article-author">
                <span className="author-span">by</span> {article.author}{" "}
              </p>
              <p className="article-date-large">{renderClockWithDate()}</p>
              <p>
                <img className="vote-icon" src={voteImg} /> {article.votes}
              </p>
              <p>
                <img src={commentImg} />
                {article.comment_count}
              </p>
            </div>
          </>
        )}
        {isSecondLarge && (
          <>
            <h2 className="article-title" data-num={customNum}>
              {article.title}
            </h2>
            <div className="content-card-large">
              <div className="article-info-large">
                <p className="article-author">
                  <span className="author-span">by</span> {article.author}{" "}
                </p>
                <p className="article-date-large">{renderClockWithDate()}</p>
                <p>
                  <img className="vote-icon" src={voteImg} /> {article.votes}
                </p>
                <p>
                  <img src={commentImg} />
                  {article.comment_count}
                </p>
              </div>
              <div className="article-body-large">{articleTextShort}</div>
            </div>
          </>
        )}
        <div className="general-info">
          {!isLarge &&
            !isSecondLarge &&
            !isSidebar &&
            !isSidebarPopular &&
            !isSidebarTrendy &&
            !isTextSub &&
            !isTextOnly && (
              <h2 className="article-title" data-num={customNum}>
                {article.title}
              </h2>
            )}

          {!isTextOnly &&
            !isLarge &&
            !isSidebar &&
            !isSecondLarge &&
            !isSidebarPopular &&
            !isSidebarTrendy &&
            !isTextSub && (
              <div className="content-card">
                <div>
                  <div className="article-sub-line-list">
                    <p className="article-topic">
                      {"#" + capitalizeFirstLetter(article.topic)}
                    </p>
                    {renderCommentsAndVotes()}
                  </div>
                  <div className="article-date">
                    <p>{formattedDate}</p>
                    <p>{formattedTime}</p>
                    <p className="divider"></p>
                    <p className="article-read-time">
                      Read Time: {readTime} min
                    </p>
                    <p className="article-time-ago">Posted {timeAgoText}</p>
                  </div>
                </div>
              </div>
            )}
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
