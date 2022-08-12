import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleUserModal();
    }

    handleOnchangeInput = (e, id) => {
        // good code
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i])
                break;
            }
        }
        return isValid
    }



    handleAddNewUser = (data) => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call api
            // console.log('data modal ', this.state);
            this.props.createNewUser(data)
        }
    }


    render() {
        // console.log('check child props', this.props, '----', this.props.isOpen);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
            >
                <ModalHeader toggle={() => this.toggle()}>Modal title</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' value={this.state.email} onChange={(e) => this.handleOnchangeInput(e, 'email')} />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' value={this.state.password} onChange={(e) => this.handleOnchangeInput(e, 'password')} />
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input type='text' value={this.state.firstName} onChange={(e) => this.handleOnchangeInput(e, 'firstName')} />
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input type='text' value={this.state.lastName} onChange={(e) => this.handleOnchangeInput(e, 'lastName')} />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text' value={this.state.address} onChange={(e) => this.handleOnchangeInput(e, 'address')} />
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button className='px-3' color="primary" onClick={() => this.handleAddNewUser(this.state)}>Save changes</Button>{' '}
                    <Button className='px-3' color="secondary" onClick={() => this.toggle()}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);




