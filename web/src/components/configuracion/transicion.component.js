import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Divider, Select, InputNumber } from 'antd';

import ConfigActions from '../../_actions/config.actions';

const { Item } = Form;
const { Option } = Select;

class Transicion extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { transiciones } = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-center">
                        <p className="m-0 p-0 h3">Configuración de transiciones</p>
                        <p className="p-0 m-0">Permite configurar el tiempo entre transiciones</p>
                        <br />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 offset-md-3 bordered">
                        <Form ref={ref => this.formulario = ref} onSubmit={this.handleEnviar.bind(this)}>

                            <Divider orientation="left">Seleccione la operación que desee modificar</Divider>

                            <Item label="Operacion">
                                {getFieldDecorator('id_operacion', {
                                    rules: [{ required: true, message: 'Por favor seleccione una opcion!' }],
                                    initialValue: undefined
                                })(
                                    <Select
                                        placeholder="Seleccione la operacion"
                                        showSearch
                                        autoClearSearchValue
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        onChange={(value) => { this.handleIntervalos(value) }}
                                    >
                                        <Option value={1}>Cobros</Option>
                                        <Option value={2}>Telemarketing</Option>
                                    </Select>
                                )}
                            </Item>

                            {transiciones &&
                                <div>
                                    <Divider orientation="left">Tiempos en segundos</Divider>

                                    <Item label="Primer y ultimo">
                                        {getFieldDecorator('sg_lugar', {
                                            initialValue: transiciones.sg_lugar ? transiciones.sg_lugar : undefined,
                                            rules: [{ required: true, message: 'Por favor indica un tiempo!' }]
                                        })(
                                            <InputNumber className="input" min={1} placeholder="Duracion" />
                                        )}
                                    </Item>

                                    <Item label="Equipo">
                                        {getFieldDecorator('sg_grupo', {
                                            initialValue: transiciones.sg_grupo ? transiciones.sg_grupo : undefined,
                                            rules: [{ required: true, message: 'Por favor indica un tiempo!' }]
                                        })(
                                            <InputNumber className="input" min={1} placeholder="Duracion" />
                                        )}
                                    </Item>

                                    <Item label="Top">
                                        {getFieldDecorator('sg_top', {
                                            initialValue: transiciones.sg_top ? transiciones.sg_top : undefined,
                                            rules: [{ required: true, message: 'Por favor indica un tiempo!' }]
                                        })(
                                            <InputNumber className="input" min={1} placeholder="Duracion" />
                                        )}
                                    </Item>
                                </div>
                            }

                            <Button htmlType="submit" type="primary" block>
                                Enviar
                            </Button>
                        </Form>
                    </div>
                </div>
            </div >
        );
    }

    handleEnviar(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch(ConfigActions.putTransiciones(values));
                this.props.form.resetFields();
            }
        });
    }

    handleIntervalos(id_operacion) {
        this.props.dispatch(ConfigActions.getTransiciones(id_operacion));
    }
}

function mapStateToProps(state) {
    const { _config } = state;
    const { transiciones } = _config;
    return { transiciones };
}

export default connect(mapStateToProps)(Form.create()(Transicion));