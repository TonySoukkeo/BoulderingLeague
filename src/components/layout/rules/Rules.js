import React, { Component } from "react";

class Rules extends Component {
  onClickBack = () => {
    const { history } = this.props;

    history.push("/tracker");
  };

  render() {
    return (
      <div className="rules">
        <button onClick={this.onClickBack} className="route-comments__btn">
          <i className="fas fa-arrow-circle-left" /> Back
        </button>
        <div className="rules__author">
          <img
            className="rules__author-img"
            src="/assets/luke_ferda.jpg"
            alt="Luke Ferda profile picture"
          />
          <div className="rules__author-text">
            Written by <span className="text-bold">Luke Ferda</span> | Executive
            writer
          </div>
        </div>

        <div className="rules__header">
          <div className="rules__header-hr"></div>
          <div className="rules__header-title">Rules</div>

          <p>
            We use a red point styling system to keep track of your score. Every
            route is worth one point, regardless of their grade. This is an
            honor-based system, meaning that when you click "complete", you are
            claiming to have successfully climbed the route.
          </p>
          <br />
          <p>
            Before being able to mark a route as complete, you will need to show
            how many attempts it took to complete the route, as you will be
            awarded 12 points for a first attempt and 10 points for anything
            more.
          </p>
          <br />
          <p>
            You may find some routes in the league that you successfully climbed
            in the past. In that given case, the first time you climb the route
            from the start of the session will be considered the first attempt,
            regardless of how many times you may have climbed it before the
            session started.
          </p>
        </div>

        <div className="rules__getting-started">
          <p>
            Before being able to mark a route as complete, you will need to show
            how many attempts it took to complete the route, as you will be
            awarded 2 points for a first attempt, and 1 point for anything more.
          </p>

          <br />

          <p>
            You may find some routes on the league that you have climbed before.
            In that given case, the first time that you have climbed the route
            on the start of the session, will be considered the first attempt,
            regardless of how ever many times you have climbed it before the
            session start.
          </p>
        </div>

        <div className="rules__content">
          <h2>What counts as a successfull climb?</h2>
          <ul className="rules__list">
            <li className="rules__list-item">
              Start the route with both feet off the mat and in a controlled
              manner.
            </li>
            <li className="rules__list-item">
              Once your body leaves the mat, your first attempt has started.
            </li>
            <li className="rules__list-item">
              No "dabbing" (feet and/or hands cannot touch any other route
              holds/foothold). If any part of you touches the mat after starting
              your attempt, it's considered a "dab". Thus counting as a failed
              attempt.
            </li>
            <li className="rules__list-item">
              Both hands must stay on the finish hold for a minimum of 3
              seconds.
            </li>
          </ul>

          <h2>What's a "session"?</h2>
          <p>
            You can think of it like a season to a TV series. Just as a TV
            series lasts for a period of time and is followed by a waiting
            period, each session lasts for 2 weeks, followed by 2 weeks of
            intermission. After the intermission the routes will get reset, and
            new league routes will become available here on the web app,
            signifying the start of a new session.
          </p>
          <br />
          <p>
            With each session comes 2 routes per grade (level of difficulty).
            For example, there will be 2 v0 routes, 2 v1 routes, so on and so
            forth.
          </p>

          <br />
          <h2>What happens at the end of each session?</h2>
          <p>
            The climber with the most points in the current session will receive
            a special prize.
          </p>

          <br />

          <h2>What are achievements?</h2>
          <p>
            Achievements are unlocked by fulfilling a certain requirement. For
            example, completing your very first v1 will unlock an achievement.
            There are more achievements than just that one; however, they are
            kept a secret. You will just have to keep climbing if you want to
            unlock more!
          </p>

          <br />

          <h2>XP (experience points)?</h2>
          <p>
            Your experience points (that you gain for your personal level) are
            kept separate from the overall leaderboards and have no association
            with how you are placed, ranked, or compared to other climbers.
          </p>

          <br />

          <p>
            You can gain experience points from completing routes and unlocking
            achievements. Below you can find how many experience points each
            route grade gives:
          </p>
        </div>

        <div className="rules__xp">
          <ul className="rules__list--xp">
            <li>
              <span>v0</span>
              <span>10xp</span>
            </li>
            <li>
              <span>v1</span>
              <span>20xp</span>
            </li>
            <li>
              <span>v2</span>
              <span>45xp</span>
            </li>
            <li>
              <span>v3</span>
              <span>90xp</span>
            </li>
            <li>
              <span>v4</span>
              <span>180xp</span>
            </li>
            <li>
              <span>v5</span>
              <span>350xp</span>
            </li>
            <li>
              <span>v6</span>
              <span>625xp</span>
            </li>
            <li>
              <span>v7</span>
              <span>800xp</span>
            </li>
            <li>
              <span>Special</span>
              <span>900xp</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Rules;
