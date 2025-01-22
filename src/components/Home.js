import { selectUserName } from "../features/user/userSlice";
import { setMovies } from "../features/movie/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieSection from "./MovieSections";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import { useEffect } from "react";
import Viewers from "./Viewers";
import db from "../firebase";

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const snapshot = await db.collection("movies").get();
        const movies = {
          recommend: [],
          newDisneys: [],
          originals: [],
          trending: [],
        };



        snapshot.docs.forEach((doc) => {
          const movieData = { id: doc.id, ...doc.data() };
          console.log(movieData);
          console.log(movies);
          switch (movieData.type) {
            case "recommend":
              movies.recommend.push(movieData);
              break;
            case "new":
              movies.newDisneys.push(movieData);
              break;
            case "original":
              movies.originals.push(movieData);
              break;
            case "trending":
              movies.trending.push(movieData);
              break;
            default:
              break;
          }
        });

        dispatch(setMovies(movies));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    if (userName) fetchMovies();
  }, [userName, dispatch]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <MovieSection title="Recommends" type="recommend" />
      <MovieSection title="Trending" type="trending" />
      <MovieSection title="New to Disney+" type="newDisneys" />
      <MovieSection title="Originals" type="originals" />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
