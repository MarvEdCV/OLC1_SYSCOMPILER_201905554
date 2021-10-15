export enum Type {
    INT = 0,
    DOUBLE = 1,
        BOOLEAN = 2,
    CHAR = 3,
    STRING = 4
}
export type Retorno={
    value: any,
    type: Type}

export const tipos   = [
    [  
        Type.INT,Type.DOUBLE, Type.INT,Type.INT,Type.STRING
    ],
    [   
        Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.STRING
    ],
    [ 
        Type.INT, Type.DOUBLE,Type.STRING/*pendiente de revisar*/,Type.STRING/*pendiente de revisar*/,Type.STRING
    ],
    [ 
        Type.INT, Type.DOUBLE,Type.STRING/*pendiente de revisar*/,Type.STRING,Type.STRING
    ],
    [ 
        Type.STRING, Type.STRING,Type.STRING,Type.STRING,Type.STRING
    ]
];