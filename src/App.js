import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';

function App() {
    const [words, setWords] = useState([]);
    const fetchWords = async () => {
        setWords(await fetch("http://api.datamuse.com/words?sp=a*&md=p")
            .then(response => response.json())
            .then(json => json))
    };
    useEffect(() => {
        document.title = "X Your Mom";
        fetchWords().then(x => x)
        console.log(words)
    }, []);
    return (
        <div className="App">
            <header className="App-header">
                {words.length > 0 ? words[0].word : "None"}
            </header>
        </div>
    );
}

export default App;
