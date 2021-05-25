import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import background from "../../assets/noPosterSmall.png";

const Collections = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
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
const CLink = styled(Link)`
  display: block;
  width: 128px;
  margin-right: 5px;
`;
const Title = styled.span`
  display: block;
  text-align: center;
  margin-bottom: 3px;
`;
const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 180px;
  width: 128px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
  &:hover {
    opacity: 0.5;
  }
`;

withRouter.propTypes = {
  result: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default withRouter(({ result, error, loading }) =>
  loading ? (
    <span>loading...</span>
  ) : (
    <Collections>
      <Header>Collections</Header>
      <Body>
        {result.map((item) => (
          <CLink
            to={`/movie/${item.id}`}
            key={item.id}
            onClick={() => {
              window.location.href = `/movie/${item.id}`;
            }}
          >
            <Image
              bgUrl={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                  : background
              }
            />
            <Title>
              {item.original_title.length > 18
                ? `${item.original_title.substring(0, 18)}...`
                : item.original_title}
            </Title>
          </CLink>
        ))}
      </Body>
    </Collections>
  )
);
