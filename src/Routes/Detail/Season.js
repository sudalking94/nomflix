import React from "react";
import styled from "styled-components";
import background from "../../assets/noPosterSmall.png";

const Seasons = styled.div`
  margin-top: 10px;
  width: 100%;
  overflow: auto;
`;

const Header = styled.span`
  display: flex;
  width:max-content;
  justify-content: start
  align-items:center;  
  padding: 6px 12px;
  background-color: rgb(138, 143, 143, 0.7);
  border-radius: 5px;
  text-shadow: 2px 2px 2px black;
`;

const Body = styled.div`
  margin-top: 5px;
  margin-left: 5px;
  display: flex;
  justify-content: start;
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
  text-align: center;
`;
const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 180px;
  width: 128px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
`;

const Content = styled.div`
  margin-right: 5px;
`;

const Season = ({ result }) => (
  <Seasons>
    <Header>Seasons</Header>
    <Body>
      {result.seasons &&
        result.seasons.map((season) => (
          <Content key={season.id}>
            <Image
              bgUrl={
                season.poster_path
                  ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
                  : background
              }
            />
            <Title>
              {season.name.length > 18
                ? `${season.name.substring(0, 18)}...`
                : season.name}
            </Title>
          </Content>
        ))}
    </Body>
  </Seasons>
);

export default Season;
