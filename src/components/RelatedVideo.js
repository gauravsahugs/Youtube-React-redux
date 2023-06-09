import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { RELATED_VIDEO, YOUTUBE_API_KEY } from "../utils/constants";
import RelatedVideoCard from "./RelatedVideoCard";
import { useSelector } from "react-redux";

const RelatedVideo = () => {
  const [searchParams] = useSearchParams();
  const [relatedVideo, setRelatedVideo] = useState([]);
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  console.log(searchParams.get("v"));

  useEffect(() => {
    const options = {
      part: "snippet",
      maxResults: 100,
      order: "viewCount",
      region: "IN",
      relatedToVideoId: searchParams?.get("v"),
      type: "video",
      key: YOUTUBE_API_KEY,
    };
    async function getRelatedVideo() {
      const data = await fetch(
        `${RELATED_VIDEO}/search?` + new URLSearchParams(options)
      );
      const videoinfo = await data.json();
      console.log(videoinfo.items);
      setRelatedVideo(videoinfo.items);
    }
    getRelatedVideo();
  }, [searchParams]);
  console.log(isMenuOpen);

  return (
    <div className={" h-[100px]"}>
      {/* {relatedVideo.map((video)=>{ <RelatedVideoCard key={video.id} data={video} />})} */}
      {relatedVideo.map((video) => (
        <Link to={"/watch?v=" + video.id.videoId}>
          <RelatedVideoCard data={video} />
        </Link>
      ))}
    </div>
  );
};

export default RelatedVideo;
