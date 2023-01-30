import { Request, Response, Router } from 'express';
import { correctWord } from '../App';

export const word = Router();

word.get('/', (req : Request,res: Response )=>{
    res.send('working');
});

word.post('/check',(req : Request,res: Response )=>{
    const userWord = req.body.userWord;
    console.log(userWord);
    let correctGuess  = false;
    const colorTileArray = colorTiles(userWord);

    if(userWord === correctWord){
        correctGuess = true;
    }

    res.send(JSON.stringify({correctGuess,colorTileArray}));
    
});


function colorTiles(userWord: string){
    const wordDict : Map<string,number> = new Map<string,number>();
    const colorTileArray: Array<string> = ['','','','',''];

    correctWord.split('').forEach((letter : string) => {
        
        if(!wordDict.has(letter)){
            wordDict.set(letter,1);
        }else{
            const gettingValue = wordDict.get(letter) ?? 1;
            wordDict.set(letter, gettingValue + 1);
        }
    });

    for (let i = 0; i < 5; i++){
        
        if(userWord[i] === correctWord[i]){

            const Value = wordDict.get(correctWord[i]) ?? 1 ;
            wordDict.set(correctWord[i], Value - 1 );
            colorTileArray.splice(i, 1, 'green');
    }}    

    for (let i = 0; i < 5; i++){   
        if(correctWord.includes(userWord[i])){

            const Value = wordDict.get(userWord[i]) ?? 1 ;
            if( Value <= 0 && colorTileArray[i] === ''){
                
                colorTileArray.splice(i, 1, 'gray');

            }else if(colorTileArray[i] === ''){
                
                wordDict.set(userWord[i], Value - 1 );
                colorTileArray.splice(i, 1, 'yellow'); 
            }

        }else{

            colorTileArray.splice(i, 1, 'gray');
        }
    }

    return colorTileArray;
}