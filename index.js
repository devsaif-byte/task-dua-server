import sqlite3 from "sqlite3";
import express from "express";
import bodyParser from "body-parser";
import { open } from "sqlite";

sqlite3.verbose();
const app = express();
app.use(bodyParser.json({ type: "application/*+json" }));
const PORT = 3000;
let db;

const connect = async () => {
	try {
		db = await open({
			filename: "./dua_main.sqlite",
			driver: sqlite3.Database,
		});
		console.log("Connected to the SQLite database.", db);
	} catch (err) {
		console.log("Error connecting to the database:", err.message);
	}
};

app.listen(PORT, async () => {
	await connect();
	console.log(`Server is running on ${PORT}`);
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/category", async (req, res) => {
	try {
		// const category = await db.all(`SELECT * FROM category`);
		const category = await db.all(`SELECT * FROM category`);
		res.json(category);
	} catch (err) {
		console.log(err.message);
	}
});
app.get("/sub-category", async (req, res) => {
	try {
		const sub_category = await db.all(`SELECT * FROM sub_category`);
		res.json(sub_category);
	} catch (err) {
		console.log(err.message);
	}
});
app.get("/dua", async (req, res) => {
	try {
		const dua = await db.all(`SELECT * FROM dua`);
		res.json(dua);
	} catch (err) {
		console.log(err.message);
	}
});
