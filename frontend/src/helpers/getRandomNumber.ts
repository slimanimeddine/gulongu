export const getRandomNumber = (): number => {
    const random = Math.random();
    const randomNumber = Math.floor(random * 101);
    return randomNumber;
}