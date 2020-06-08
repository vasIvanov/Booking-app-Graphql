import React, {useState} from 'react';
import './Auth.css';


const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const submitHanlder = (e) => {
        e.preventDefault();
        if(email.trim().length === 0 || password.trim().length === 0) return;

        let reqBody= {
            query: `
                query {
                    login(email:"${email}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        };

        if(!isLogin) {
            reqBody = {
                query:`
                    mutation {
                        createUser(userInput: {email:"${email}", password: "${password}"}){
                            _id
                            email
                        }
                    }
                `
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
            console.log(res);
            
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
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