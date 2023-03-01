import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UsersProfile.css";
import {
	Container,
	Row,
	Col,
	Image,
	Card,
	ListGroup,
	Button,
} from "react-bootstrap";
import Chart from "./Chart";
import TableOfAllScores from "./TableOfAllScores";

function Profile({ isDarkMode, colorForIsDarkMode }) {
	const navigate = useNavigate();
	function handleChecklist() {
		navigate("/student");
	}
	const [userData, setUserData] = useState([]);
	const id = sessionStorage.getItem("userId");
	useEffect(() => {
		axios
			.get("/api/user-profile")
			.then((response) => {
				if (response.status === 200) {
					return response.data;
				} else {
					throw new Error("Something is wrong");
				}
			})
			.then((data) => {
				setUserData(data[0]);
			})
			.catch((e) => console.log({ error: e.message }));
	}, []);
	const picLink = `https://robohash.org/${id}.png`;
	// console.log(id);
	const colorForIsDarkModeTable = isDarkMode
		? {
				backgroundColor: "#333",
				color: "#fff",
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  }
		: {
				backgroundColor: "#fff",
				color: "#dc143c",
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  };
	return (
		<Container
			style={{
				border: "1px solid grey",
				padding: "30px",
				width: "70rem",
				borderRadius: "5px",
				boxShadow: "1px 3px 3px #888888",
			}}
		>
			<Row style={colorForIsDarkMode}>
				<Col sm={12} md={6} className="d-flex justify-content-center">
					<Image
						src={picLink}
						roundedCircle
						style={{ background: "#8888", maxWidth: "40%" }}
						alt="profile picture"
					/>
				</Col>
				<Col
					sm={12}
					md={6}
					className="d-flex justify-content-center"
					style={colorForIsDarkMode}
				>
					<Card style={{ width: "30rem", marginTop: "15px" }}>
						<Card.Header as="h4" style={colorForIsDarkMode}>
							User Profile
						</Card.Header>

						<ListGroup variant="flush" style={colorForIsDarkMode}>
							<ListGroup.Item style={colorForIsDarkMode}>
								<strong>Name:</strong> {userData["name"]}
							</ListGroup.Item>
							<ListGroup.Item style={colorForIsDarkMode}>
								<strong>Username:</strong> {userData["username"]}
							</ListGroup.Item>
							<ListGroup.Item style={colorForIsDarkMode}>
								<strong>Class:</strong> {userData["class_code"]}
							</ListGroup.Item>
							<ListGroup.Item style={colorForIsDarkMode}>
								<strong>Region:</strong> {userData["region"]}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
			<Row style={{ marginTop: "30px" }}>
				<Col className="d-flex justify-content-center">
					<ListGroup.Item style={colorForIsDarkModeTable}>
						<strong>Current Score Level:</strong>
					</ListGroup.Item>
				</Col>
				<Col className="d-flex justify-content-center">
					<Button variant="danger" onClick={handleChecklist}>
						Course Topic Checklist
					</Button>
				</Col>
			</Row>
			<Card style={{ marginTop: "30px" }}>
				<Card.Header
					className="card-header"
					as="h4"
					style={{
						textAlign: "center",
						...colorForIsDarkModeTable,
					}}
				>
					Progress Chart
				</Card.Header>
				<Chart colorForIsDarkModeTable={colorForIsDarkModeTable} />
			</Card>
			<TableOfAllScores colorForIsDarkModeTable={colorForIsDarkModeTable} />
		</Container>
	);
}

export default Profile;
