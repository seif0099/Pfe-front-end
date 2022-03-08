import React from "react";
import "./mainEmployee.css";
import avatar from "../../../assets/avatar.png";
const MainEmployee = () => {
  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <img src={avatar} alt="avatar" />
          <div className="main__greeting">
            <h1>hello Admin</h1>
            <p>welcome to admin dashboard</p>
          </div>
        </div>
        <div className="main__card">
          <div className="card">
            <i className="fa fa-user fa-2x text-lightblue"></i>
            <div className="card_inner">
              <p className="text-primary-p">number of subs</p>
              <span className="font-bold text-title">578</span>
            </div>
          </div>
          <div className="card">
            <i className="fa fa-calendar fa-2x text-red"></i>
            <div className="card_inner">
              <p className="text-primary-p">times of watching</p>
              <span className="font-bold text-title">2467</span>
            </div>
          </div>
          <div className="card">
            <i className="fa fa-video-camera fa-2x text-yellow"></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of videos</p>
              <span className="font-bold text-title">340</span>
            </div>
          </div>
          <div className="card">
            <i className="fa fa-thumbs-up fa-2x text-green"></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of likes</p>
              <span className="font-bold text-title">600</span>
            </div>
          </div>
        </div>
        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>daily reports</h1>
                <p>california,usa</p>
              </div>
              <i className="fa fa-usd"></i>
            </div>
          </div>
          <div className="charts__right">
            <div className="charts__right__title">
              <h1>Stats</h1>
              <p>tatouine , touns</p>
            </div>
            <i className="fa fa-use"></i>

            <div className="charts__right__cards">
              <div className="card1">
                <h1>income</h1>
                <p>75</p>
              </div>
              <div className="card2">
                <h1>sales</h1>
                <p>200</p>
              </div>
              <div className="card3">
                <h1>users</h1>
                <p>2000</p>
              </div>
              <div className="card4">
                <h1>orders</h1>
                <p>4000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainEmployee;
