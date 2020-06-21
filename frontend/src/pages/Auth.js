import React, {useState, useContext} from 'react';
import './Auth.css';
import AuthContext from '../context/auth-context';


const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const {login, logout} = useContext(AuthContext);
    
    const submitHanlder = (e) => {
        e.preventDefault();
        if(email.trim().length === 0 || password.trim().length === 0) return;

        let reqBody= {
            query: `
                query Login($email: String!, $password: String!){
                    login(email: $email, password: $password) {
                        userId
                        token
                        tokenExpiration
                    }
                }
            `,
            variables: {
                email,
                password
            }
        };

        if(!isLogin) {
            reqBody = {
                query:`
                    mutation CreateUser($email: String!, $password: String!){
                        createUser(userInput: {email: $email, password: $password}){
                            _id
                            email
                        }
                    }
                `,
                variables: {
                    email,
                    password
                }
            };
        }
        
        
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
            
            if(resData.data.login.token) {
                login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration);
            }
        })
        .catch(err => {
            console.log(err);
            
        });
    }

    return(
        <form className="auth-form" onSubmit={submitHanlder}>
            <div className="form-control">
                <label htmlFor="email">E-Mail</label>
                <input type="email" id="email" onChange={(value) => setEmail(value.target.value)}/>
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(value) => setPassword(value.target.value)}/>
            </div>
            <div className="form-actions">
                <button onClick={() => setIsLogin(!isLogin)} type="button">Switch to {isLogin ? 'Signup' : 'Login'}</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default AuthPage;