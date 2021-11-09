import { useState } from 'react'
import { login } from './api/test'
import logo from './logo.svg'
import './App.css'

function App() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [res, setRes] = useState('');

  const handleLogin = async () => {
    setRes('');
    console.log('参数: ', account, password);
    const res = await login({ account, password });
    setRes(JSON.stringify(res))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <div>
          <input type="text" placeholder='用户名' value={account} onChange={e => setAccount(e.target.value)} />
        </div>
        <div>
          <input type="password" placeholder='密码' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="button" onClick={handleLogin}>
          登录
        </button>
        <div>
          结果: {res}
        </div>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
