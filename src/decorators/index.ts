function ClassDecorator() {
    return function (target: any) {
        console.log('Class');
    };
}

function MethodDecorator() {
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
        console.log('Method');
    };
}

function ParameterDecorator() {
    return function (target: any, name: string, index: number) {
        console.log('Parameter');
    };
}

function PropertyDecorator() {
    return function (target: any, name: string) {
        console.log('Property');
    };
}

// 4
@ClassDecorator()
class Test {
    // 1
    @PropertyDecorator()
    test: string = '';

    constructor() {}

    // 3
    @MethodDecorator()
    log(
        // 2
        @ParameterDecorator()
        name: string,
    ) {}
}
