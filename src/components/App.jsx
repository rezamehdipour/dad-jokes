import { useState, useEffect } from "react";
import axios from "axios";

// Components
import Joke from "./Joke/Joke";

// Hooks
import useUpdateEffect from "../hooks/useUpdateEffect";

// Images
import LaughPng from "../images/laugh.png";

// CSS
import "./App.scss";

const App = (props) => {
	const [loading, setLoading] = useState(false);
	const [jokes, setJokes] = useState(JSON.parse(window.localStorage.getItem("jokes") || "[]"));
	const sortedJokes = () => jokes.sort((a, b) => b.likes - a.likes);
	const fetchJokes = async () => {
		setLoading(true);
		let fetchedJokes = [];
		while (fetchedJokes.length < 10) {
			const response = await axios.get("https://icanhazdadjoke.com", {
				headers: {
					Accept: "application/json",
				},
			});
			const { data } = response;
			if (fetchedJokes.findIndex((fj) => fj.id === data.id) === -1) {
				fetchedJokes.push({ id: data.id, joke: data.joke, likes: 0 });
			}
		}
		setJokes(fetchedJokes);
		setLoading(false);
	};
	useUpdateEffect(() => {
		window.localStorage.setItem("jokes", JSON.stringify(jokes));
	}, [jokes]);

	// handle Like & Dislike
	const handleLike = (id) => {
		let newJokes = [...jokes];
		let i = newJokes.findIndex((j) => j.id === id);
		newJokes[i].likes = newJokes[i].likes + 1;
		setJokes(newJokes);
	};
	const handleDislike = (id) => {
		let newJokes = [...jokes];
		let i = newJokes.findIndex((j) => j.id === id);
		if (newJokes[i].likes - 1 >= 0) {
			newJokes[i].likes = newJokes[i].likes - 1;
			setJokes(newJokes);
		}
	};

	// ComponentDidMount
	useEffect(() => {
		if (!window.localStorage.getItem("jokes")) {
			fetchJokes();
		}
	}, []);

	return (
		<>
			{loading === true && (
				<div className="loading">
					<div className="image">
						<i className="far fa-laugh-squint"></i>
					</div>
					<h6>Loading ...</h6>
				</div>
			)}
			{loading === false && (
				<div className="wrapper">
					<div className="head">
						<div className="center">
							<h1>
								<span className="main">Dad</span>
								<span className="sub">Jokes</span>
							</h1>
							<div className="image">
								<img src={LaughPng} alt="laugh" />
							</div>
							<div className="new">
								<button onClick={() => fetchJokes()}>New Jokes</button>
							</div>
						</div>
					</div>
					<div className="content">
						<ul>
							{jokes.length > 0 &&
								sortedJokes().map(({ id, joke, likes }) => (
									<Joke
										key={id}
										text={joke}
										likes={likes}
										onLike={() => handleLike(id)}
										onDislike={() => handleDislike(id)}
									/>
								))}
						</ul>
					</div>
				</div>
			)}
		</>
	);
};

export default App;
