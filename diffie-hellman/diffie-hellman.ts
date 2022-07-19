export class DiffieHellman {
    constructor(private p: number, private g: number) {
        if (!this.isPrime(p) || !this.isPrime(2)) throw new Error();
    }

    private isPrime(n: number): boolean {
        if (n < 2) throw new Error();
        for (let i = 2; i < n; i++) {
            if (n % i === 0) return false;
        }
        return true;
    }

    public getPublicKey(privateKey: number): number {
        if (privateKey < 2 || privateKey >= this.p) throw new Error();
        return this.g ** privateKey % this.p;
    }

    public getSecret(theirPublicKey: number, myPrivateKey: number): number {
        return theirPublicKey ** myPrivateKey % this.p;
    }
}