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
export const tiporesta = [
    [   
        Type.INT,Type.DOUBLE, Type.INT,Type.INT,Type.ERROR
    ],
    [
        Type.DOUBLE,Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.ERROR
    ],
    [ 
        Type.INT, Type.DOUBLE,Type.ERROR,Type.ERROR,Type.ERROR
    ],
    [ 
        Type.INT, Type.DOUBLE,Type.ERROR,Type.ERROR,Type.ERROR
    ],
    [ 
        Type.ERROR, Type.ERROR,Type.ERROR,Type.ERROR,Type.ERROR
    ]

];

export const tipomultiplicacion = [
    [   
        Type.INT,Type.DOUBLE, Type.ERROR,Type.INT,Type.ERROR
    ],
    [
        Type.DOUBLE,Type.DOUBLE, Type.ERROR, Type.DOUBLE, Type.ERROR
    ],
    [ 
        Type.ERROR, Type.ERROR,Type.ERROR,Type.ERROR,Type.ERROR
    ],
    [ 
        Type.INT, Type.DOUBLE,Type.ERROR,Type.ERROR,Type.ERROR
    ],
    [ 
        Type.ERROR, Type.ERROR,Type.ERROR,Type.ERROR,Type.ERROR
    ]

];

export const tipodivision = [
    [ 
        Type.INT,Type.DOUBLE, Type.ERROR,Type.ERROR,Type.ERROR
    ],
    [
        Type.DOUBLE,Type.DOUBLE, Type.ERROR, Type.DOUBLE, Type.ERROR
    ],
    [ 
        Type.ERROR, Type.ERROR,Type.ERROR,Type.ERROR,Type.ERROR
    ],
    [ 
        Type.ERROR, Type.ERROR,Type.ERROR,Type.ERROR,Type.ERROR
    ],
    [ 
        Type.ERROR, Type.ERROR,Type.ERROR,Type.ERROR,Type.ERROR
    ]

];

export const tipopotencia = [
    [   
        Type.INT,Type.DOUBLE, Type.ERROR,Type.DOUBLE,Type.ERROR
    ],
    [
        Type.DOUBLE,Type.DOUBLE, Type.ERROR, Type.DOUBLE, Type.ERROR
    ],
    [ 
        Type.ERROR, Type.ERROR,Type.ERROR,Type.ERROR,Type.ERROR
    ],
    [ 
        Type.DOUBLE, Type.DOUBLE,Type.ERROR,Type.ERROR,Type.ERROR
    ],
    [ 
        Type.ERROR, Type.ERROR,Type.ERROR,Type.ERROR,Type.ERROR
    ]

];
export const tipomod = [
    [    
        Type.DOUBLE,Type.DOUBLE, Type.ERROR,Type.DOUBLE,Type.ERROR
    ],
    [
        Type.DOUBLE,Type.DOUBLE, Type.ERROR, Type.DOUBLE, Type.ERROR
    ],
    [ 
        Type.ERROR, Type.ERROR,Type.ERROR,Type.ERROR,Type.ERROR
    ],
    [ 
        Type.DOUBLE, Type.DOUBLE,Type.ERROR,Type.ERROR,Type.ERROR
    ],
    [ 
        Type.ERROR, Type.ERROR,Type.ERROR,Type.ERROR,Type.ERROR
    ]

];