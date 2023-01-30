import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getWord } from './src/getWord';
import { word } from './wordleLogic/word';

const app = express();
const port = 3333;

app.use(cors());
app.use(bodyParser.json());

export const correctWord = getWord();

app.use('/word', word);

app.listen(port, () => {
  console.log('app is running');
});