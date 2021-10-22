export enum Type {
    INT = 0,
    DOUBLE = 1,
    BOOLEAN = 2,
    CHAR = 3,
    STRING = 4,
    ERROR=5
}
export type Retorno={
    value: any,
    type: Type}

export const tiposuma   = [
    [  
        Type.INT,Type.DOUBLE, Type.INT,Type.INT,Type.STRING
    ],
    [   
        Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.STRING
    ],
    [ 
        Type.INT, Type.DOUBLE,Type.ERROR,Type.ERROR,Type.STRING
    ],
    [ 
        Type.INT, Type.DOUBLE,Type.ERROR,Type.STRING,Type.STRING
    ],
    [ 
        Type.STRING, Type.STRING,Type.STRING,Type.STRING,Type.STRING
    ]
];