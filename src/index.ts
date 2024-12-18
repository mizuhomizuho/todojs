console.log('Happy developing ✨')

type X<T1, T2> = {
    value1: T1,
    value2: T2,
};
const yyy: X<number, number> = {value1: 51, value2: 6};

export default interface ITask {
    targetId: number
    _onExecute?: () => void
    _onComplete?: () => void
}