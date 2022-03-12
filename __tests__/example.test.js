function soma(a, b) {
    return a + b;
}

test('renan', ()=>{
    const result = soma(3, 4);

    expect(result).toBe(7);
})