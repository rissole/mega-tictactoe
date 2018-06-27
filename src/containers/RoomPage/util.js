export const CODE_LENGTH = 4;

export function generateCode() {
    let code = '';
    const alphabet = 'abcdefghjklmnopqrstuvwxyz';
    for (let i = 0; i < CODE_LENGTH; i++) {
        code += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return code;
}