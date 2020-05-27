import React from "react";
import DragAndDrop from "./components/DrapAndDrop";
import "./App.css";

const data = [
	{
		title: "Todo",
		items: ["1", "2", "3", "4", "5"],
	},
	{
		title: "Done",
		items: ["6", "7", "8"],
	},
];

function App() {
	return (
		<div>
			<header>
				<DragAndDrop data={data} />
			</header>
		</div>
	);
}

export default App;
