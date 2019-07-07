import React, { Component } from "react";
import AllDivisionView from "./AllDivisionView";
import { connect } from "react-redux";
import Spinner2 from "../../../common/helpers/Spinner2";

class AllDivisionLeaderboard extends Component {
  state = {
    session: ""
  };

  componentDidMount() {
    const sessionTotalValue = this.props.match.params.id;

    this.setState({
      session: sessionTotalValue
    });
  }

  goBack = () => {
    const { history } = this.props;

    // Go back to previous page
    history.goBack();
  };

  render() {
    const { overall } = this.props,
      { session } = this.state;
    if (overall) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto mt-1">
              <button
                style={{ marginTop: "30px" }}
                onClick={this.goBack}
                className="btn btn-back btn-lg"
              >
                <i className="fas fa-arrow-circle-left" /> Back
              </button>
              <div className="card">
                <div
                  style={{ marginBottom: ".7px" }}
                  className="card-header text-center"
                >
                  <h3>{session}</h3>
                </div>

                <AllDivisionView users={overall} session={session} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner2 />;
    }
  }
}

const mapState = state => {
  return {
    overall: state.overall.overallUsers
  };
};

export default connect(mapState)(AllDivisionLeaderboard);
