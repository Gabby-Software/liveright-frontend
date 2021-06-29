import {noImage} from'./no-image.pipe';

test('NoImage should return right value', () => {
    expect(noImage('Yosef', 'Tukachinsky')).toEqual('YT');
    expect(noImage('yosef', 'tukachinsky')).toEqual('YT');
    expect(noImage('Marina', 'gergel')).toEqual('MG');
    expect(noImage('marina', 'Gergel')).toEqual('MG');
});
