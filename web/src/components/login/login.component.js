import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Icon, Form } from 'antd';

import UserActions from '../../_actions/user.actions';
const imageUrl = require('../../media/fondo.jpg');
const FormItem = Form.Item;

class Login extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={styles.fondo}>
                <div className="login-view">
                    <Form ref={ref => this.formulariote = ref} onSubmit={this.handleLogin.bind(this)} className="form form-horizontal">
                        <FormItem>
                            {getFieldDecorator('usuario', {
                                rules: [{ required: true, message: 'Por favor ingrese un usuario' }],
                                initialValue: ''
                            })(
                                <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Usuario" />
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('pass', {
                                rules: [{ required: true, message: 'Por favor ingrese un Contraseña' }],
                                initialValue: ''
                            })(
                                <Input size="large" type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Contraseña" />
                            )}
                        </FormItem>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block" type="submit">
                                Enviar
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }

    handleLogin(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch(UserActions.login(values));
            }
        });
    }
}

const styles = {
    fondo: {
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        overflow: 'hidden'
    }
}

export default connect()(Form.create()(Login));