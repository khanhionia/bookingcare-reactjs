import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false
        }
    }

    handleOnChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleLogin = async () => {
        console.log('username: ', this.state.username);
        console.log('pww: ', this.state.password);
        try {
            await handleLoginApi(this.state.username, this.state.password);
        } catch (e) {
            console.log(e);
        }
    }
    handleShowHidePassword = () => {
        // let isS = isShowPassword;
        // isS = !isS;
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type='text'
                                value={this.state.username}
                                onChange={(e) => this.handleOnChangeUsername(e)}
                                className='form-control' placeholder='Enter your username' />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnChangePassword(e)}
                                    className='form-control' placeholder='Enter your password' />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    {this.state.isShowPassword ?
                                        <i class="fas fa-eye"></i>
                                        :
                                        <i class="fas fa-eye-slash"></i>
                                    }
                                </span>
                            </div>

                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot tour password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span>Or Login with</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i class="fab fa-google-plus-g google"></i>
                            <i class="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
