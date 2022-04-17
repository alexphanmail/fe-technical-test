import { Layout, Image, Button, Avatar, Card } from "antd";

import LogoImage from "../../images/logo.svg";
import StartGame from "../../images/start-game.svg";
import { RightOutlined } from "@ant-design/icons";
import useHome from "./redux/hooks";
import React from "react";

const { Content, Sider } = Layout;

export const Home = (props) => {
  const {fname} = props;
  const { startGame, getCard, deck_id, cards, cardsHistory } = useHome();
  React.useEffect(() => {
    startGame();
  }, [startGame]);

  return (
    <Layout hasSider>
      <Sider
        className="left-sider"
        theme="light"
        width={256}
        breakpoint="md"
        collapsedWidth="100%"
      >
        <div className="flex">
          <div className="logo">
            <Image src={LogoImage} width="158" />
          </div>
          <div className="expandable">
            <div className="header">
              <p>Admin tools</p>
            </div>
            <Button icon={<Image src={StartGame} />} onClick={startGame}>
              Restart Game
            </Button>
          </div>
          <div className="profile">
            <Avatar className="profile-img" />
            <div className="profile-info">
              <p className="name">{fname}</p>
              <p className="caption">Free account</p>
            </div>
          </div>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div className="heading">
            <h5>Hi <span>{fname}</span>,</h5>
            <h2>Let's Play!</h2>
          </div>
          <div className="cards">
            <div className="stack-cards">
              <div className="first-card">
                {cards.length > 0 && <Image src={cards[0].image} />}
              </div>
              <div className="hidden-card-1"></div>
              <div className="hidden-card-2"></div>
            </div>
          </div>
          <div className="center">
            <Button onClick={() => getCard(deck_id, cardsHistory)}>
              Choose a card!
            </Button>
          </div>
        </Content>
      </Layout>
      <Sider
        className="right-sider"
        theme="light"
        width={426}
        breakpoint="lg"
        collapsedWidth="100%"
      >
        <div className="flex">
          <Card className="list-cards" title="Your last cards" bordered={false}>
            {cardsHistory
              .filter((val, index, arr) => index > cardsHistory.length - 5 - 1)
              .reverse()
              .map((item) => {
                return (
                  <div className="card" key={item.code}>
                    <div className="card-img">
                      <Image src={item.image} />
                    </div>
                    <div className="card-info">
                      <div className="title">
                        <div>{item.value + " " + item.suit}</div>
                        <div className="card-more">
                          <RightOutlined />
                        </div>
                      </div>
                      <p className="caption">
                        {item.timestamp ? item.timestamp.toString() : ""}
                      </p>
                    </div>
                  </div>
                );
              })}
          </Card>
        </div>
      </Sider>
    </Layout>
  );
};
