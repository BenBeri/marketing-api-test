export const clearArrayDuplicates = (fieldName: string, array: any[]): any[] => {
    return array.reduce((unqiueArray: any[], object: any) => {
            if (!unqiueArray.some(obj => obj[fieldName] === object[fieldName])) {
                unqiueArray.push(object);
            }
            return unqiueArray;
        }, []);
};
