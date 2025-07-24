import { useCallback, useEffect, useState, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [symbolAllowed, setSymbolAllowed] = useState(true);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numberAllowed) {
      str += '0123456789';
    }
    if (symbolAllowed) {
      str += '!@#$%^&*?~';
    }

    let pass = '';
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * str.length);
      pass += str.charAt(idx);
    }

    setPassword(pass);
  }, [length, numberAllowed, symbolAllowed,setPassword]);

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select()
    if (password) {
      navigator.clipboard.writeText(password);
      // Optional: notify user on success
    }
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    // <div className='bg-black h-screen '>
    <div className="w-full max-w-max shadow-md bg-gray-800 text-orange-500 rounded-lg px-4 py-3 my-5 mx-auto">
      <h1 className="text-center">Password Generator</h1>

      <div className="flex shadow rounded-lg bg-white my-5 overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full px-2 py-1 mx-2.5"
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={generatePassword} className="bg-violet-500 text-white px-2">
          Generate
        </button>
        <button onClick={copyPassToClipboard} className="bg-blue-800 text-white px-4">
          Copy
        </button>
      </div>

      <div className="flex gap-x-2 text-sm">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            id="numbers"
          />
          <label htmlFor="numbers">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={symbolAllowed}
            onChange={() => setSymbolAllowed((prev) => !prev)}
            id="symbols"
          />
          <label htmlFor="symbols">Symbols</label>
        </div>
      </div>
    </div>
    // </div> 
  );
}

export default App;
