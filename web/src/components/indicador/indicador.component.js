import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'AsyncStorage';

import Supervisor from './supervisor.component';
import Gestor from './gestor.component';

class Indicador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            vista: undefined, 
            id_supervisor: undefined
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('login_dashboard', (err, res) => {
            if (!err && res && res != "undefined") {
                const user = JSON.parse(res);
                this.setState({ user }, () => this.handleGetIndicadores());
            }
        });
    }

    render() {
        const { user, vista, id_supervisor } = this.state;
        return (
            <div>
                {(user && vista == 1) &&
                    <Supervisor user={user} changeView={this.handleChangeView.bind(this)} />
                }

                {(user && vista == 0) &&
                    <Gestor id_supervisor={id_supervisor} changeView={this.handleChangeView.bind(this)} />
                }
            </div>
        );
    }

    handleGetIndicadores() {
        const { user } = this.state;
        this.setState({ vista: user.cargo, id_supervisor: user.id_usuario });
    }

    handleChangeView(vista, id_supervisor = undefined) {
        this.setState({ vista, id_supervisor });
    }
}

export default connect()(Indicador);