import React, { Component } from 'react';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import Button from 'wix-style-react/Button';
import FormField from 'wix-style-react/FormField';
import Dropdown from 'wix-style-react/Dropdown';
import Input from 'wix-style-react/Input';
import Modal from 'wix-style-react/Modal';
import { Add } from 'wix-style-react/new-icons';

class CreateSupervisorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenFullScreenModal: false,
    };
  }

  createRider = () => {
    this.setState({ isOpenFullScreenModal: false });
    window.alert(`New supervisor added!`);
  };

  divider() {
    return <div style={{ height: '15px' }} />;
  }

  render() {
    const setState = state => () => this.setState(state);
    const closeFullScreenModal = setState({ isOpenFullScreenModal: false });
    const openFullScreenModal = setState({ isOpenFullScreenModal: true });
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
            onOk={this.createRider}
            theme="blue"
            title="Create Supervisor"
          >
            <div>
              <FormField label={'Name'} required>
                <Input />
              </FormField>
              {this.divider()}
              <FormField label={'ID'} required>
                <Input />
              </FormField>
              {this.divider()}
              <FormField label={'Phone Number'} required>
                <Input />
              </FormField>
              {this.divider()}
              <FormField label={'Email'} required>
                <Input />
              </FormField>
            </div>
          </MessageBoxFunctionalLayout>
        </Modal>
      </div>
    );
  }
}

export default () => <CreateSupervisorModal />;
