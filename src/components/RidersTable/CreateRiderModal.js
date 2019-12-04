import React, { Component } from 'react';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import Button from 'wix-style-react/Button';
import FormField from 'wix-style-react/FormField';
import Dropdown from 'wix-style-react/Dropdown';
import Input from 'wix-style-react/Input';
import Modal from 'wix-style-react/Modal';
import { Add } from 'wix-style-react/new-icons';

class CreateRiderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenFullScreenModal: false,
    };
  }

  createRider = () => {
    this.setState({ isOpenFullScreenModal: false });
    window.alert(`New rider added!`);
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
            title="Create Rider"
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
              <FormField label={'Class'} required>
                <Dropdown
                  placeholder="Select an option"
                  options={[
                    { id: 0, value: 'A-1' },
                    { id: 1, value: 'A-2' },
                    { id: 2, value: 'A-3' },
                    { id: 3, value: 'B-1' },
                    { id: 4, value: 'B-2' },
                    { id: 5, value: 'B-3' },
                    { id: 6, value: 'C-1' },
                    { id: 7, value: 'C-2' },
                    { id: 8, value: 'C-3' },
                    { id: 9, value: 'D-1' },
                    { id: 10, value: 'D-2' },
                    { id: 11, value: 'D-3' },
                    { id: 12, value: 'E-1' },
                    { id: 13, value: 'E-2' },
                    { id: 14, value: 'E-3' },
                    { id: 15, value: 'F-1' },
                    { id: 16, value: 'F-2' },
                    { id: 17, value: 'F-3' },
                  ]}
                />
              </FormField>
              {this.divider()}
              <FormField label={'Phone Number'} required>
                <Input />
              </FormField>
              {this.divider()}
              <FormField label={'Shuttle'} required>
                <Dropdown
                  placeholder="Select an option"
                  options={[
                    { id: 0, value: 'Beer Sheva Yellow Bus' },
                    { id: 1, value: 'Beit Kama Mini Bus' },
                    { id: 2, value: 'BK Large Bus' },
                    { id: 3, value: 'Rahat 10' },
                    { id: 4, value: 'Lehavim School Bus' },
                    { id: 5, value: 'Mishmar 2' },
                  ]}
                />
              </FormField>
              {this.divider()}
              <FormField label={'Parent Name'} required>
                <Input />
              </FormField>
              {this.divider()}
              <FormField label={'Parent Phone Number'} required>
                <Input />
              </FormField>
              {this.divider()}
              <FormField label={'Parent Email'} required>
                <Input />
              </FormField>
            </div>
          </MessageBoxFunctionalLayout>
        </Modal>
      </div>
    );
  }
}

export default () => <CreateRiderModal />;
