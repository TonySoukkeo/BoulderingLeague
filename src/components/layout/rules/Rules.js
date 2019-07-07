import React from "react";

const Rules = () => {
  return (
    <div id="rules" className="container ">
      <h1>Rules</h1>
      <div id="rules-header">
        <div className="rules-box1" />
        <div className="rules-box2" />
      </div>
      <div className="card">
        <div className="card-body">
          <p>
            {" "}
            We use a red point styling system to keep track of your score. Every
            route is worth one point, regardlesss of their grade. This is an
            honor based system, meaning that when you click 'complete' on a
            route, means that you have successfully climbed the route.
          </p>

          <p>
            Before being able to mark a route as complete, you will need to show
            how many attempts it took to complete the route, as you will be
            awarded 2 points for a first attempt, and 1 point for anything more.
          </p>

          <p>
            You may find some routes on the league that you have climbed before.
            In that given case, the first time that you have climbed the route
            on the start of the session, will be considered the first attempt,
            regardless of how ever many times you have climbed it before the
            session start.
          </p>

          <br />
          <br />

          <h2>So what counts as a sucessfull climb?</h2>
          <ul>
            <li>
              Starting the route with both feet off the mat, in a controlled
              manner.
            </li>

            <li>
              No dabbing (feet and/or hands doesn't touch any other route
              holds/foothold)
            </li>
            <li>
              Once your body leaves the mat, that counts as a route attempt. And
              if any part of you touches the mat, it's considered a dab.
            </li>
            <li>Both hands on the end hold for a minimum of 3 seconds.</li>
          </ul>
          <br />
          <br />
          <h2>What's a session?</h2>
          <p>
            You can think of it kind of like an episode, or a season to a tv
            series. Each session lasts for 2 weeks, and 2 weeks
            intermission,then the routes will get reset, and new ones will
            become available on here, via the next session start.{" "}
          </p>

          <p>
            With each session, comes 2 routes per grade. For example, there will
            be 2 v0 routes, 2 v1 routes, so on and so forth.
          </p>
          <br />
          <br />
          <h2>What happens at the end of each session?</h2>
          <p>
            The climber with the most amount of points in the current session,
            will receive a special prize. At the end of session, there will be a
            2 week gap, before the next session starts.
          </p>
          <br />
          <br />
          <h2>What are achievements?</h2>
          <p>
            Achievements are unlocked, by fullfilling a certain requirement. For
            example, having completed your very first v1, will unlock an
            achievement. Of course there are more achievements than just that
            one! But the rest are kept a secret, you would just have to keep
            climbing if you want to unlock more!
          </p>
          <br />
          <br />
          <h2>XP?</h2>
          <p>
            You're experience points that you gain for your personal level is
            kept separate from the overall leaderboards, and have no association
            with how you are placed or ranked.
          </p>

          <p>
            You can gain experience points from completing routes, along with
            unlocking achievements. Below is where you can find how much
            experience points each route grade give:
          </p>
          <ul className="rules-xp-list">
            <li>
              <span className="rules-xp-grade">v0</span>
              <i className="fas fa-long-arrow-alt-right arrow-right" />
              10xp
            </li>
            <li>
              <span className="rules-xp-grade">v1</span>
              <i className="fas fa-long-arrow-alt-right arrow-right" /> 20xp
            </li>
            <li>
              <span className="rules-xp-grade">v2</span>
              <i className="fas fa-long-arrow-alt-right arrow-right" /> 45xp
            </li>
            <li>
              <span className="rules-xp-grade">v3</span>
              <i className="fas fa-long-arrow-alt-right arrow-right" /> 90xp
            </li>
            <li>
              <span className="rules-xp-grade">v4</span>
              <i className="fas fa-long-arrow-alt-right arrow-right" /> 180xp
            </li>
            <li>
              <span className="rules-xp-grade">v5</span>
              <i className="fas fa-long-arrow-alt-right arrow-right" /> 350xp
            </li>
            <li>
              <span className="rules-xp-grade">v6</span>
              <i className="fas fa-long-arrow-alt-right arrow-right" /> 625xp
            </li>
            <li>
              <span className="rules-xp-grade">v7</span>
              <i className="fas fa-long-arrow-alt-right arrow-right" /> 800xp
            </li>
            <li>
              <span className="rules-xp-grade">Special</span>
              <i className="fas fa-long-arrow-alt-right arrow-right" /> 900xp
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Rules;
