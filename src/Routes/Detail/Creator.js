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

const Creator = ({ result }) => (
  <Seasons>
    <Header>Creators</Header>
    <Body>
      {result.created_by &&
        result.created_by.map((creator) => (
          <Content key={creator.id}>
            <Image
              bgUrl={
                creator.profile_path
                  ? `https://image.tmdb.org/t/p/w300${creator.profile_path}`
                  : background
              }
            />
            <Title>
              {creator.name.length > 18
                ? `${creator.name.substring(0, 18)}...`
                : creator.name}
            </Title>
          </Content>
        ))}
    </Body>
  </Seasons>
);

export default Creator;
