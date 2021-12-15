// Images
import confusedPng from "../../images/confused.png";
import slightlySmilingPng from "../../images/slightly-smiling.png";
import grinningPng from "../../images/grinning.png";
import grinningSquintingPng from "../../images/grinning-squinting.png";
import rollingOnTheFloorLaughingPng from "../../images/rolling-on-the-floor-laughing.png";

// CSS
import "./Joke.scss";

const Joke = ({ id, text, likes, onLike, onDislike }) => {
	// Likes Border Color
	let likesBorderColor = "dc2626"; // red
	if (likes > 7) {
		likesBorderColor = "16a34a"; // green
	} else if (likes > 5) {
		likesBorderColor = "65a30d";
	} else if (likes > 3) {
		likesBorderColor = "ca8a04";
	} else if (likes > 1) {
		likesBorderColor = "ea580c";
	}

	// Emoji
	let Emoji = confusedPng;
	if (likes > 7) {
		Emoji = rollingOnTheFloorLaughingPng;
	} else if (likes > 5) {
		Emoji = grinningSquintingPng;
	} else if (likes > 3) {
		Emoji = grinningPng;
	} else if (likes > 1) {
		Emoji = slightlySmilingPng;
	}

	return (
		<li className="joke">
			<div className="rate">
				<button className="like" onClick={onLike}>
					<i className="far fa-thumbs-up"></i>
				</button>
				<div className="likes" style={{ borderColor: `#${likesBorderColor}` }}>
					<span>{likes}</span>
				</div>
				<button className="dislike" onClick={onDislike} disabled={likes < 1 ? true : false}>
					<i className="far fa-thumbs-down"></i>
				</button>
			</div>
			<div className="text">
				<p>{text}</p>
			</div>
			<div className="emoji">
				<img src={Emoji} alt="emoji" />
			</div>
		</li>
	);
};

export default Joke;
