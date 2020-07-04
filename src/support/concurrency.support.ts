export const sleep = async (milliseconds: number) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('sleep resolved');
            resolve();
        }, milliseconds);
    })
};
