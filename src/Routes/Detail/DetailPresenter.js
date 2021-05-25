import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// import Helmet from "react-helmet";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ReactCountryFlag from "react-country-flag";
import { ExternalLink } from "react-external-link";
import "./react-tabs.css";
import Loader from "../../Components/Loader";
import Collections from "../Collection/Collection";
import background from "../../assets/noPosterSmall.png";
import Creator from "./Creator";
import Season from "./Season";

const TabsContainer = styled(Tabs)`
  height: 15em;
`;
const TabPanelContainer = styled(TabPanel)``;

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  display: flex;
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  overflow: auto;
  height: 6em;
`;

const ImdbLink = styled.div`
  display: flex;
  width: 35px;
  justify-content: center;
  align-items: center;
  background-color: #e3c22f;
  color: black;
  border-radius: 3px;
  font-weight: bold;
`;

const EL = styled(ExternalLink)`
  width: max-content;
`;

const YLink = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 5px;
  margin-left: 3px;
  &:hover {
    color: yellow;
  }
`;
const Icon = styled.svg`
  width: 2em;
  height: 2em;
  margin-right: 5px;
`;
const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 100px;
  width: 100px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  grid-gap: 25px;
`;

const Company = styled.div``;
const CountryBox = styled.div`
  display: flex;
`;
const Country = styled.div`
  margin-right: 5px;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Loader />
    </>
  ) : (
    <Container>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : background
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {result.imdb_id && result.imdb_id.length > 0 && (
              <>
                <Divider>•</Divider>
                <EL href={`https://www.imdb.com/title/${result.imdb_id}/`}>
                  <ImdbLink>IMdb</ImdbLink>
                </EL>
              </>
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <TabsContainer>
            <TabList>
              <Tab>YouTube Videos</Tab>
              <Tab>Production Company</Tab>
              <Tab>Production Countries</Tab>
            </TabList>

            <TabPanelContainer>
              {result.videos.results.map((video) => (
                <EL
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.key}`}
                >
                  <YLink>
                    <Icon
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </Icon>
                    {video.name}
                  </YLink>
                </EL>
              ))}
            </TabPanelContainer>
            <TabPanelContainer>
              <Grid>
                {result.production_companies.map((company) => (
                  <Company key={company.id}>
                    <Image
                      bgUrl={
                        company.logo_path
                          ? `https://image.tmdb.org/t/p/w200${company.logo_path}`
                          : background
                      }
                    ></Image>
                    {company.name}
                  </Company>
                ))}
              </Grid>
            </TabPanelContainer>
            <TabPanelContainer>
              <CountryBox>
                {result.production_countries.map((country, index) => (
                  <Country key={index}>
                    <ReactCountryFlag
                      countryCode={country.iso_3166_1}
                      style={{
                        width: "3em",
                        height: "3em",
                      }}
                      title={country.name}
                      svg
                    />
                  </Country>
                ))}
              </CountryBox>
            </TabPanelContainer>
          </TabsContainer>
          {result.belongs_to_collection && (
            <>
              <Collections
                collectionId={result.belongs_to_collection.id}
                id={result.id}
              ></Collections>
            </>
          )}
          {result.created_by && <Creator result={result}></Creator>}
          {result.seasons && <Season result={result}></Season>}
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
