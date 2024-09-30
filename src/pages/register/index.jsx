import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { Component } from "react";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      loading: false,
    };
  }

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleRegister = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({ loading: true });
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error:" + error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div>
        <fieldset>
          <legend>Register</legend>
          <form action="" onSubmit={this.handleRegister}>
            <label htmlFor="">
              <p>First Name</p>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={this.handleChangeInput}
              />
            </label>
            <label htmlFor="">
              <p>Last Name</p>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={this.handleChangeInput}
              />
            </label>
            <label htmlFor="">
              <p>Email</p>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleChangeInput}
              />
            </label>
            <label htmlFor="">
              <p>Password</p>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChangeInput}
              />
            </label>
            <hr />
            {this.state.loading ? "Loading" : <button>Register</button>}
          </form>
        </fieldset>
      </div>
    );
  }
}

export default Register;
