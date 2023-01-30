import { wordBank } from './wordBank';


export function getWord(): string{
    const wordBankLength : number = wordBank.length;
    const randomIndex = Math.floor(Math.random() * wordBankLength);
    return wordBank[randomIndex].toUpperCase();
}