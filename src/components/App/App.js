import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import s from './App.scss';
import { Page, Card, Box, Container, Row, Tabs, Col } from 'wix-style-react';
import Shuttles from '../pages/Shuttles';
import WarRoom from '../pages/WarRoom';
import Supervisors from '../pages/Supervisors';
import Riders from '../pages/Riders';
import Statistics from '../pages/Statistics';
import Settings from '../pages/Settings';

const tabs = [
  { id: 1, title: 'War Room', component: <WarRoom /> },
  { id: 2, title: 'Shuttles', component: <Shuttles /> },
  { id: 3, title: 'Supervisors', component: <Supervisors /> },
  { id: 4, title: 'Riders', component: <Riders /> },
  { id: 5, title: 'Statistics', component: <Statistics /> },
  { id: 6, title: 'Settings', component: <Settings /> },
];

class App extends React.Component {
  static propTypes = {
    t: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  state = {
    tab: 1,
  };

  async componentDidMount() {}

  getTabComponent = tab => tabs.find(_ => _.id === tab).component;

  render() {
    const { t } = this.props;

    return (
      <div className={s.root}>
        <Page upgrade height={window.height}>
          <Page.Header title="Shuttle System" />
          <Page.Tail>
            <Tabs
              activeId={this.state.tab}
              hasDivider={true}
              onClick={clickedTab =>
                this.setState({
                  tab: clickedTab.id,
                })
              }
              type="uniformFull"
              items={tabs}
            />
          </Page.Tail>
          <Page.Content>
            <Container>
              <Row>
                <Col>{this.getTabComponent(this.state.tab)}</Col>
              </Row>
            </Container>
          </Page.Content>
        </Page>
      </div>
    );
  }
}

export default translate()(App);
