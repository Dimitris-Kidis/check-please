export function processInput(input: string, hasToBeUpperCase: boolean = false): string {
    if (typeof input === 'string'){
        if (/^\d+$/.test(input)) {
            return input.trim();
        } else {
            const words = input.trim().split(' ');
            const processedWords = words.map(word => {
                if (hasToBeUpperCase && !/^\d+$/.test(word)) {
                    return word.toUpperCase();
                }

                const firstChar = word.charAt(0).toUpperCase();
                const restOfWord = word.slice(1).toLowerCase();
                return firstChar + restOfWord;
            });
            return processedWords.join(' ');
        }
    } else {
        throw new Error('Unsupported input type');
    }
}