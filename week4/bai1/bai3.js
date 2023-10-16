function rot13(str) {
    return str.replace(/[A-Z]/g, (char) => {
      const charCode = char.charCodeAt(0);
      let decodedCharCode = charCode - 13;
  
      if (decodedCharCode < 65) {
        decodedCharCode += 26;
      }
  
      return String.fromCharCode(decodedCharCode);
    });
}
  