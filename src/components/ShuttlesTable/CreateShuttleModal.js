import React, { Component } from 'react';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import Button from 'wix-style-react/Button';
import FormField from 'wix-style-react/FormField';
import Dropdown from 'wix-style-react/Dropdown';
import Input from 'wix-style-react/Input';
import Modal from 'wix-style-react/Modal';
import { Add } from 'wix-style-react/new-icons';
import { DESTINATIONS, shuttles } from './ShuttlesTable';
import PropTypes from 'prop-types';

class CreateShuttleModal extends Component {
  static propTypes = {
    onCreateShuttle: PropTypes.func,
  };

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      isOpenFullScreenModal: false,
      name: '',
      destination: '',
      numOfSeats: '',
      contactName: '',
      contactPhoneNumber: '',
    };
  }

  getDestinationsDropDownArray() {
    const destinations = [];
    Object.keys(DESTINATIONS).forEach(function(key, index) {
      destinations.push({
        id: index,
        key,
        value: DESTINATIONS[key],
      });
    });
    return destinations;
  }

  createShuttle = () => {
    // console.log(this.props);
    this.props.onCreateShuttle({
      id: shuttles.length + 1,
      name: this.state.name,
      contactName: this.state.contactName,
      contactPhone: this.state.contactPhoneNumber,
      destination: this.state.destination,
      // numOfSeats: this.state.numOfSeats,
    });
    this.setState({ isOpenFullScreenModal: false });
    window.alert(`New shuttle added!`);
  };

  divider() {
    return <div style={{ height: '15px' }} />;
  }

  render() {
    const setState = state => () => this.setState(state);
    const closeFullScreenModal = setState({ isOpenFullScreenModal: false });
    const openFullScreenModal = setState({ isOpenFullScreenModal: true });
    const destinations = this.getDestinationsDropDownArray();
    return (
      <div>
        <Button
          dataHook="open-full-screen-modal-button"
          onClick={openFullScreenModal}
          suffixIcon={<Add />}
        >
          Add
        </Button>
        <Modal
          isOpen={this.state.isOpenFullScreenModal}
          onRequestClose={closeFullScreenModal}
          contentLabel="Full screen modal example"
        >
          <MessageBoxFunctionalLayout
            cancelText="Cancel"
            confirmText="Submit"
            dataHook="fullscreen-modal"
            fullscreen
            onCancel={closeFullScreenModal}
            onOk={this.createShuttle}
            theme="blue"
            title="Create Shuttle"
          >
            <div>
              <FormField label={'Destination'} required>
                <Dropdown
                  placeholder="Select an option"
                  options={destinations}
                  onSelect={option => this.onDestinationSelect(option)}
                />
              </FormField>
              {this.divider()}
              <FormField label={'Shuttle Name'} required>
                <Input onChange={this.onNameChange} />
              </FormField>
              {this.divider()}
              <FormField label={'Number of Seats'} required>
                <Input onChange={this.onNumOfSeatsChange} />
              </FormField>
              {this.divider()}
              <FormField label={'Contact Name'} required>
                <Input onChange={this.onContactNameChange} />
              </FormField>
              {this.divider()}
              <FormField label={'Contact Phone Number'} required>
                <Input onChange={this.onContactPhoneNumberChange} />
              </FormField>
            </div>
          </MessageBoxFunctionalLayout>
        </Modal>
      </div>
    );
  }

  onNameChange = ({ target: { value } }) => this.setState({ name: value });
  onNumOfSeatsChange = ({ target: { value } }) =>
    this.setState({ numOfSeats: value });
  onContactNameChange = ({ target: { value } }) =>
    this.setState({ contactName: value });
  onContactPhoneNumberChange = ({ target: { value } }) =>
    this.setState({ contactPhoneNumber: value });
  onDestinationSelect = option => {
    this.setState({ destination: DESTINATIONS[option.key] });
  };
}

export default CreateShuttleModal;
