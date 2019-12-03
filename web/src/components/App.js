import React, { Component } from 'react';
import { AsyncStorage } from 'AsyncStorage';
import store from './ConfigureStore';
import { Provider } from 'react-redux';

import Loading from '../_helpers/Loading';
import Login from './login/login.component';
import Menu from './menu/menu.component';

class App extends Component {

  constructor() {
    super();
    this.state = {
      cargando: true,
      login: undefined
    }
  }

  componentWillMount() {
    this.comprobarSesion();
  }

  render() {
    const { cargando, login } = this.state;
    return (
      <Provider store={store}>
        <div style={styles.component}>
          {(cargando == true) &&
            <div style={styles.fondo}>
              <Loading />
            </div>
          }
          {(login == true) &&
            <Menu />
          }
          {(login == false) &&
            <Login />
          }
        </div>
      </Provider>
    );
  }

  async comprobarSesion() {
    AsyncStorage.getItem('login_dashboard', (err, res) => {
      if (!err && res && res != "undefined") {
        var usuario = JSON.parse(res);
        var date = new Date();
        var vencimiento = new Date(usuario.fecha);
        console.log(date, vencimiento);
        if (usuario.fecha && vencimiento != date) {
          this.setState({ login: true, cargando: false });
        } else {
          AsyncStorage.setItem('login_dashboard', undefined).then(() => {
            this.setState({ login: false, cargando: false });
          });
        }
      } else {
        this.setState({ login: false, cargando: false });
      }
    });
  }
}

const styles = {
  component: { display: 'flex', height: '100vh', width: '100%' },
  fondo: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
    overflow: 'hidden',
  }
}

export default App;