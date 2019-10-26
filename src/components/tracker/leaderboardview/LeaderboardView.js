import React from "react";
import AllDivisionLeaderboard from "../../leaderboard/alldivision/AllDivisionLeaderboard";
import AdultLeaderboard from "../../leaderboard/adultdivision/AdultLeaderboard";
import YouthLeaderboard from "../../leaderboard/youthdivision/YouthLeaderboard";

const LeaderboardView = ({
  session,
  closeModal,
  overallLeaderboard,
  adultLeaderboard,
  youthLeaderboard,
  openOverallLeaderboard,
  openAdultLeaderboard,
  openYouthLeaderboard
}) => {
  return (
    <React.Fragment>
      <div className="leaderboard">
        <h1 className="header-1 leaderboard-header">Leaderboard</h1>

        <div className="leaderboard__content">
          <div
            onClick={openOverallLeaderboard}
            className="leaderboard__overall"
          >
            <span className="leaderboard__overall-text">Overall</span>
          </div>

          <div className="leaderboard__group">
            <div
              onClick={openAdultLeaderboard}
              className="leaderboard__group-adult"
            >
              <div className="leaderboard__group-adult-text">Adult</div>
            </div>
            <div
              onClick={openYouthLeaderboard}
              className="leaderboard__group-youth"
            >
              <div className="leaderboard__group-youth-text">Youth</div>
            </div>
          </div>
        </div>
      </div>
      {/** POPUP MODALS FOR LEADERBOARD **/}

      <AllDivisionLeaderboard
        overallLeaderboard={overallLeaderboard}
        session={session}
        closeModal={closeModal}
      />

      <AdultLeaderboard
        adultLeaderboard={adultLeaderboard}
        session={session}
        closeModal={closeModal}
      />

      <YouthLeaderboard
        youthLeaderboard={youthLeaderboard}
        session={session}
        closeModal={closeModal}
      />

      {/** DARK OVERLAY **/}

      <div
        className={
          overallLeaderboard || adultLeaderboard || youthLeaderboard
            ? "dark-overlay dark-overlay--auth dark-overlay-active"
            : "dark-overlay"
        }
      ></div>
    </React.Fragment>
  );
};

export default LeaderboardView;
