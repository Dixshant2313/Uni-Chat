import  express  from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { Configuration, OpenAIApi } from "openai"
import openAiRoutes from "./routes/openai.js"
import authRoutes from "./routes/auth.js"

//  Configurations 
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(morgan("common"));

// OPEN AI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

// ROUTES
app.use("/openai", openAiRoutes)
app.use("/auth", authRoutes)


// Server Setup
const port = process.env.PORT || 9000
app.listen(port, () => {
    console.log(`Example App listening at http://localhost:${port}`)
})