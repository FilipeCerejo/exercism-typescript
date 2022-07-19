export const encode = (ints: number[]): number[] => {
    const res: number[] = [];

    ints.forEach((int: number) => {
        let bytes: number[] = [];

        do {
            let byte = int & 0x7f;
            if (bytes.length) byte |= 0x80;
            bytes.unshift(byte);

            int >>>= 7;
        } while (int);

        res.push(...bytes);
    });

    return res;
};

export const decode = (bytes: number[]): number[] => {
    const res: number[] = [];

    let seq = 0;
    let current = 0;

    bytes.forEach((byte: number) => {
        if (seq) {
            current <<= 7;
        }
        current |= byte & 0x7f;

        if (byte & 0x80) {
            seq++;
        } else {
            res.push(current >>> 0); // converts to unsigned int
            current = seq = 0;
        }
    });

    if (seq) throw new Error('Incomplete sequence');
    return res;
};