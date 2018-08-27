import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import Schedule from "./Schedule.js";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { formatSessionData } from "../../lib/FormatSessions";

export const ScheduleData = gql`
  {
    allSessions {
      title
      description
      startTime
      location
      id
    }
  }
`;

export default class ScheduleContainer extends Component {
  static navigationOptions = { title: "Schedule" };

  NavForSession = id => {
    this.props.navigation.navigate("Session", { id: id });
  };

  render() {
    return (
      <Query query={ScheduleData}>
        {({ loading, error, data: { allSessions } }) => {
          if (loading) return <ActivityIndicator />;
          if (error) return <Text>Error</Text>;

          return (
            <Schedule
              data={formatSessionData(allSessions)}
              nav={id => this.NavForSession(id)}
            />
          );
        }}
      </Query>
    );
  }
}
