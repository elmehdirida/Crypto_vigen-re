import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VigenereEncryptService {
    key: string = "musique";
  constructor() { }
   vigenere(text: string, encrypt: boolean): string {
    text = text.toUpperCase();
    this.key = this.key.toUpperCase();
    let result = "";
    const keyLength = this.key.length;
    let i = 0;

    for (let char of text) {
      if (char.match(/[A-Z]/)) {
        const textChar = char.charCodeAt(0) - 65;
        const keyChar = this.key.charCodeAt(i % keyLength) - 65;
        let modifiedChar: number;

        if (encrypt) {
          modifiedChar = (textChar + keyChar) % 26;
        } else {
          modifiedChar = (textChar - keyChar + 26) % 26;
        }

        result += String.fromCharCode(modifiedChar + 65);
        i++;
      } else {
        result += char;
      }
    }

    return result;
  }

   vigenereEncrypt(text: string): string {
    return this.vigenere(text, true);
  }

   vigenereDecrypt(text: string): string {
    return this.vigenere(text, false);
  }
}
