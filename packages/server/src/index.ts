import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import { Application } from "./Application/Application";

dotenv.config();

const server = express();
const app = new Application(server);
app.start(process.env.PORT || 3000);
