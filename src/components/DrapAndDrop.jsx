import React, { useState, useRef } from "react";

const DragAndDrop = ({ data }) => {
	const [list, setList] = useState(data);
	const [dragging, setDragging] = useState(false);

	const dragItem = useRef();
	const dragNode = useRef();

	const handleDragStart = (e, params) => {
		console.log("Drag starting....", params);
		dragItem.current = params;
		dragNode.current = e.target;
		dragNode.current.addEventListener("dragend", handleDragEnd);
		setTimeout(() => {
			setDragging(true);
		});
	};

	const hangleDragEnter = (e, params) => {
		console.log("Enter drag enter...", params);
		const currentItem = dragItem.current;
		if (e.target !== dragNode.current) {
			console.log("Target is not same");
			setList(oldList => {
				let newList = JSON.parse(JSON.stringify(oldList));
				newList[params.grpI].items.splice(params.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]);
				dragItem.current = params;
				return newList;
			});
		}
	};

	const handleDragEnd = () => {
		console.log("ending drag");
		dragNode.current.removeEventListener("dragend", handleDragEnd);
		dragItem.current = null;
		dragNode.current = null;
		setDragging(false);
	};

	const getStyles = params => {
		const currentItem = dragItem.current;
		if (currentItem.grpI === params.grpI && currentItem.itemI === params.itemI) {
			return "current dnd-item";
		}
		return "dnd-item";
	};

	return (
		<div className="drag-n-drop">
			{list.map((grp, grpI) => (
				<div
					key={grpI}
					className="dnd-group"
					onDragEnter={
						dragging && !grp.items.length
							? e => {
									hangleDragEnter(e, { grpI, itemI: 0 });
							  }
							: null
					}>
					<div className="group-title">{grp.title}</div>
					{grp.items.map((item, itemI) => (
						<div
							draggable
							onDragStart={e => {
								handleDragStart(e, { grpI, itemI });
							}}
							onDragEnter={
								dragging
									? e => {
											hangleDragEnter(e, { grpI, itemI });
									  }
									: null
							}
							key={itemI}
							className={dragging ? getStyles({ grpI, itemI }) : "dnd-item"}>
							{item}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default DragAndDrop;
