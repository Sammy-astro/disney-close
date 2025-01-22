import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../firebase";

const Detail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const doc = await db.collection("movies").doc(id).get();
        if (doc.exists) {
          setDetailData(doc.data());
        } else {
          console.error("No such document in Firebase 🔥");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    if (id) fetchMovieDetails();
  }, [id]);

  return (
    <Container>
      {detailData.backgroundImg && (
        <Background>
          <img alt={detailData.title} src={detailData.backgroundImg} />
        </Background>
      )}

      {detailData.titleImg && (
        <ImageTitle>
          <img alt={detailData.title} src={detailData.titleImg} />
        </ImageTitle>
      )}

      <ContentMeta>
        <Controls>
          <Player>
            <img src="/images/play-icon-black.png" alt="Play Icon" />
            <span>Play</span>
          </Player>
          <Trailer>
            <img src="/images/play-icon-white.png" alt="Trailer Icon" />
            <span>Trailer</span>
          </Trailer>
          <AddList>
            <span />
            <span />
          </AddList>
          <GroupWatch>
            <div>
              <img src="/images/group-icon.png" alt="Group Watch Icon" />
            </div>
          </GroupWatch>
        </Controls>
        <SubTitle>{detailData.subTitle || "Subtitle not available"}</SubTitle>
        <Description>
          {detailData.description || "No description available"}
        </Description>
      </ContentMeta>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 0.8;

  img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;

    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

const ImageTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin: 0 auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;

  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
  margin-top: 24px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
  gap: 16px;
`;

const Player = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(249, 249, 249);
  color: rgb(0, 0, 0);
  border: none;
  padding: 0 24px;
  height: 56px;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
  text-transform: uppercase;

  img {
    width: 32px;
    margin-right: 8px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0 12px;
    font-size: 12px;

    img {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  color: rgb(249, 249, 249);
  border: 1px solid rgb(249, 249, 249);
`;

const AddList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  border: 2px solid white;
  cursor: pointer;

  span {
    background-color: rgb(249, 249, 249);

    &:first-child {
      width: 16px;
      height: 2px;
    }

    &:nth-child(2) {
      width: 2px;
      height: 16px;
    }
  }
`;

const GroupWatch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  cursor: pointer;

  div {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: black;

    img {
      width: 100%;
    }
  }
`;

const SubTitle = styled.div`
  font-size: 15px;
  color: rgb(249, 249, 249);
  margin-top: 8px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  font-size: 20px;
  color: rgb(249, 249, 249);
  line-height: 1.4;
  margin-top: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Detail;
