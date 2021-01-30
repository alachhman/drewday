import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';

function App() {
    const [words, setWords] = useState([]);
    const fetchWords = async () => {
        // let chosenLetter = getRandomLetter();
        let chosenLetter = "u";
        let apiCall = "http://api.datamuse.com/words?sp=" + chosenLetter + "*&md=p";
        console.log(chosenLetter, apiCall);
        setWords(await fetch(apiCall)
            .then(response => response.json())
            .then(json => {
                json.filter(x => x.tags.includes("v"))
            })
        )
    };
    useEffect(() => {
        document.title = "X Your Mom";
        fetchWords().then(x => x)
        console.log(words)
    }, [words]);
    return (
        <div className="App">
            <header className="App-header">
                I'm going to {words.length > 0
                ? words[getRandomInt(words.length)].word
                : "None"} your mom.
            </header>
        </div>
    );
}

export default App;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return alphabet[Math.floor(Math.random() * alphabet.length)]
}
