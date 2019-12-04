import React, { Component } from 'react';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import Button from 'wix-style-react/Button';
import FormField from 'wix-style-react/FormField';
import Dropdown from 'wix-style-react/Dropdown';
import Input from 'wix-style-react/Input';
import Modal from 'wix-style-react/Modal';
import { Add } from 'wix-style-react/new-icons';
import { DESTINATIONS } from './ShuttlesTable';

class CreateShuttleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenFullScreenModal: false,
    };
  }

  getDestinationsDropDownArray() {
    const destinations = [];
    Object.keys(DESTINATIONS).forEach(function(key, index) {
      destinations.push({
        id: index,
        value: DESTINATIONS[key],
      });
    });
    return destinations;
  }

  createShuttle = () => {
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
                />
              </FormField>
              {this.divider()}
              <FormField label={'Shuttle Name'} required>
                <Input />
              </FormField>
              {this.divider()}
              <FormField label={'Number of Seats'} required>
                <Input />
              </FormField>
              {this.divider()}
              <FormField label={'Contact Name'} required>
                <Input />
              </FormField>
              {this.divider()}
              <FormField label={'Contact Phone Number'} required>
                <Input />
              </FormField>
            </div>
          </MessageBoxFunctionalLayout>
        </Modal>
      </div>
    );
  }
}

export default () => <CreateShuttleModal />;
