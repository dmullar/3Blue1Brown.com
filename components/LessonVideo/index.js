import { useState, useContext } from "react";
import Link from "next/link";
import { PageContext } from "../../pages/_app";
import Section from "../Section";
import topics from "../../data/topics.yaml";
import styles from "./index.module.scss";

export default function LessonVideo() {
  const {
    video: videoId,
    topic: topicName,
    chapter,
    slug,
  } = useContext(PageContext);

  const topic = topics.find(({ name }) => name === topicName);
  const topicIsSeries = chapter !== undefined;

  const lessonIndex = topic
    ? topic.lessons.findIndex((lesson) => lesson === slug)
    : null;
  const prevLesson = topic ? topic.lessons[lessonIndex - 1] : null;
  const nextLesson = topic ? topic.lessons[lessonIndex + 1] : null;

  const [showCoverImage, setShowCoverImage] = useState(true);
  const startVideo = () => {
    setShowCoverImage(false);
  };

  return (
    <Section dark={true} width={showCoverImage ? "narrow" : "full"}>
      <div
        className={styles.videoArea}
        data-showcoverimage={showCoverImage}
        data-topicisseries={topicIsSeries}
      >
        {topic && (
          <Link href={`/topics/${topic.slug}`}>
            <a className={styles.topicLink}>
              <i class="fas fa-arrow-left"></i>
              {topicName}
            </a>
          </Link>
        )}

        {prevLesson && (
          <Link href={`/lessons/${prevLesson}`}>
            <a className={styles.arrowLeft} aria-label="Previous">
              <i className="fas fa-angle-left" />
            </a>
          </Link>
        )}

        <div className={styles.video}>
          {showCoverImage && (
            <button className={styles.coverButton} onClick={startVideo}>
              <img
                className={styles.coverImage}
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Youtube video"
              />
              <svg
                className={styles.coverPlayButton}
                height="100%"
                version="1.1"
                viewBox="0 0 68 48"
                width="100%"
              >
                <path
                  d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                  fill="currentColor"
                />
                <path d="M 45,24 27,14 27,34" fill="#fff" />
              </svg>
            </button>
          )}
          {!showCoverImage && (
            <div className={styles.frame}>
              <iframe
                title="YouTube Video"
                className={styles.iframe}
                src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=1`}
                allow="autoplay"
                allowFullScreen
                onLoad={(event) => {
                  // Scroll so video is centered on screen
                  const rect = event.target.getBoundingClientRect();
                  const relativeMiddle = rect.top + rect.height / 2;
                  const absoluteMiddle = relativeMiddle + window.pageYOffset;
                  const scrollPosition =
                    absoluteMiddle - window.innerHeight / 2;
                  window.scrollTo(0, scrollPosition);
                }}
              />
            </div>
          )}
        </div>

        {nextLesson && (
          <Link href={`/lessons/${nextLesson}`}>
            <a className={styles.arrowRight} aria-label="Next">
              <i className="fas fa-angle-right" />
            </a>
          </Link>
        )}
      </div>
    </Section>
  );
}