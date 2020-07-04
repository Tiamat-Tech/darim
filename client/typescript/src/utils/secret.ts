import * as CryptoJS from 'crypto-js';

class Secret {
  static parseUtf8ToString(text: string): string {
    return CryptoJS.enc.Utf8.parse(text).toString(CryptoJS.enc.Utf8);
  }

  static getRandomString(): string {
    return CryptoJS.lib.WordArray.random(512 / 8).toString();
  }

  static encryptAES(message: string, secretPassphrase: string): string {
    return CryptoJS.AES.encrypt(message, secretPassphrase).toString()
  }

  static decryptAES(encryptedMessage: string, secretPassphrase: string): string {
    return CryptoJS.AES.decrypt(encryptedMessage, secretPassphrase).toString(CryptoJS.enc.Utf8)
  }

  static getPrivateKeyFromLocalStorage(): string {
    const key = localStorage.getItem('key');

    if (!key) {
      throw new Error('Failed to load key');
    }

    return key;
  }

  static setPrivateKeyToLocalStorage(value: string): void {
    localStorage.setItem('key', value);
  }
}

export default Secret;
