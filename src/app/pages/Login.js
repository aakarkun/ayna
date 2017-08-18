import React from 'react';
import { Link } from 'react-router';

export class Login extends React.Component {
    render() {
        return(
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2">
                     <center><h2>Login</h2></center>
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2">
                            <form>
                                <div className="form margin-large-top text-center">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="inputUsername"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="inputPassword"/>
                                    </div>
                                    <div className="margin-large-top">
                                        <a type="submit" className="btn btn-default margin-top">Login</a>
                                        <Link to={"/register"} type="button" className="btn btn-default margin-top margin-left">Register</Link>
                                    </div>
                                </div>
                            </form>    
                        </div>    
                    </div> 
                </div>
            </div>
        );
    }
}