import React, {useEffect, useState} from "react";
import './App.css';

function App() {
    const [word, setWords] = useState("");
    const [emoji, setEmoji] = useState("");
    const fetchWords = async () => {
        let chosenLetter = await getRandomLetter();
        let apiCall = "http://api.datamuse.com/words?sp=" + chosenLetter + "*&md=p";
        setWords(
            await fetch(apiCall)
                .then(response => response.json())
                .then(json => getVerbs(json))
                .then(verbs => verbs[getRandomInt(verbs.length)])
        )
    };
    const fetchEmoji = async () => {
        setEmoji(
            await fetch('https://ranmoji.herokuapp.com/emojis/api/v.1.0/')
                .then(response => response.json())
                .then(json => json.emoji.split(";")[0])
                .then(emoji => String.fromCodePoint(emoji.replace(";", "").replace("&#", "0")))
        )
    }
    useEffect(() => {
        document.title = "X Your Mom";
        if (word === "" && emoji === "") {
            fetchWords().then(x => x);
            fetchEmoji().then(x => x);
        }
    }, [word, emoji]);
    return (
        <div className="App">
            <header className="App-header">
                <span>
                    <img src={process.env.PUBLIC_URL + '/drew.jpg'} alt={"drew"} className={"portrait"}/>
                    <div className="Bubble">
                        {emoji} I'm going to {word !== "" ? word.word : "None"} your mom. {emoji}
                    </div>
                </span>
                <br/>
                <button className={"button"} onClick={() => {
                    fetchWords().then(r => r);
                    fetchEmoji().then(r => r);
                }}>Re-Drew It.
                </button>
            </header>
        </div>
    );
}

function getVerbs(words) {
    return words.filter(v => {
        if (v.tags !== undefined) {
            let isVerb = false;
            for (let value of v.tags) {
                if (value === "v") {
                    isVerb = true;
                }
            }
            return isVerb;
        } else {
            return false;
        }
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return alphabet[Math.floor(Math.random() * alphabet.length)]
}

export default App;

