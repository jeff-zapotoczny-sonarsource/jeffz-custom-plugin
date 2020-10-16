/*
 * Copyright (C) 2009-2019 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import React from "react";
// SonarComponents (referenced as sonar-components here, see the Webpack config)
// exposes React components exposed by SonarQube.
import { DeferredSpinner } from "sonar-components";
import { findIssuesForProject, findProjects, findQualityProfilesStatistics, findQualityQatesStatistics } from "../../common/api";

export default class ProjectApp extends React.PureComponent {
  state = {
    loading: true
  };

  componentDidMount() {
    console.log('props', this.props);
    findIssuesForProject(this.props.project).then(total => {
    this.setState({
      loading: false,
      issueCount: total
    });
  });
  }

  render() {
    if (this.state.loading) {
      return <div className="page page-limited"><DeferredSpinner /></div>;
    }
/* 
    <h1>Here comes some awesome stuff!</h1>
    <h1>Project key is <strong>{this.props.project.key}</strong></h1>
    <h1>Last analyzed at {this.props.project.analysisDate}</h1> */

    return (
      <div className="page page-limited sanity-check">
    <h1>The project has {this.state.issueCount} total issues.</h1>
      </div>
    );
  }
}
