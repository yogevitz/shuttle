import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import s from './Supervisors.scss';
import { Page, Card, Box, Container, Row, Tabs, Col } from 'wix-style-react';

class Supervisors extends React.Component {
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

  render() {
    const { t } = this.props;

    return (
      <Card>
        <Card.Content>Supervisors</Card.Content>
      </Card>
    );
  }
}

export default translate()(Supervisors);
