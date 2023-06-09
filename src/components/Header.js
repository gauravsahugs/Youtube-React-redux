import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import { closeMobileMenu } from "../utils/appSlice";

const Header = () => {
  const [searchQuery, setQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
    const getSearchSuggestions = async () => {
      console.log("API CAll" + searchQuery);
      const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const json = await data.json();

      setSuggestion(json[1]);
      dispatch(
        cacheResults({
          [searchQuery]: json[1],
        })
      );

      console.log(json[1]);
    };
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestion(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);
    // console.log(searchQuery);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, searchCache, dispatch]);

  useEffect(() => {
    dispatch(closeMobileMenu());
  });

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  console.log("showSuggestion:" + suggestion);
  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-md max-sm:flex max-sm:w-[1000px] ">
      <div className="flex col-span-1 ">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-10  hover:cursor-pointer max-sm:h-6 "
          alt="ham"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
        />
        <a href="/">
          <img
            className="h-10 mx-2 hover:cursor-pointer max-sm:w-10 max-sm:h-6"
            alt="youtube"
            src="https://logos-world.net/wp-content/uploads/2020/04/YouTube-Logo.png"
          />
        </a>
      </div>
      <div className="col-span-10 px-10 relative max-sm:flex max-sm:px-5">
        <div>
          <input
            type="text"
            className=" w-1/2  px-5 border border-gray-400 p-2 rounded-l-full max-sm:w-20   max-sm:h-10"
            value={searchQuery}
            onChange={(e) => {
              setShowSuggestion(true);
              setQuery(e.target.value);
            }}
            onFocus={() => setShowSuggestion(true)}
            // onBlur={() => setShowSuggestion(false)}
          />
          <Link to={"/search?q=" + searchQuery}>
            <button
              className=" border border-gray-400 p-2 rounded-r-full "
              onBlur={() => setShowSuggestion(false)}
            >
              Search
            </button>
          </Link>
        </div>
        {showSuggestion && (
          <div className="absolute left-[40px] right-0 top-[71px] bg-white py-2 px-2 w-[31rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestion.map((s, index) => (
                <Link
                  to={"/search?q=" + s}
                  key={index}
                  onClick={() => {
                    setQuery(s);
                    setShowSuggestion(false);
                    setSuggestion(null);
                  }}
                >
                  <li className="px-2 py-2 hover:bg-gray-100">&#128269; {s}</li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-center flex-row items-center">
        <h2 className="font-bold">Gaurav Sahu</h2>
        <img
          className="w-11 hover:cursor-pointer"
          alt="profile"
          src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
        />
      </div>
    </div>
  );
};

export default Header;
