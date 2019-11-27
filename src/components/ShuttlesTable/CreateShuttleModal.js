import React, { Component } from 'react';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import Button from 'wix-style-react/Button';
import Modal from 'wix-style-react/Modal';
import { Add } from 'wix-style-react/new-icons';

class CreateShuttleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenFullScreenModal: false,
    };
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
            onOk={closeFullScreenModal}
            theme="blue"
            title="Create Shuttle"
          >
            Form
          </MessageBoxFunctionalLayout>
        </Modal>
      </div>
    );
  }
}

export default () => <CreateShuttleModal />;
