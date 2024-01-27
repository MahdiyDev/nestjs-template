export class BigMath {
	static abs(x: bigint) {
		return x < BigInt(0) ? -x : x;
	}
	static sign(x: bigint) {
		if (x === BigInt(0)) {
			return BigInt(0);
		}
		return x < BigInt(0) ? BigInt(-1) : BigInt(1);
	}
	static pow(base: bigint, exponent: bigint) {
		return base ** exponent;
	}
	static min(value: bigint, ...values: bigint[]) {
		for (const v of values) {
			if (v < value) {
				value = v;
			}
		}
		return value;
	}
	static max(value: bigint, ...values: bigint[]) {
		for (const v of values) {
			if (v > value) {
				value = v;
			}
		}
		return value;
	}
}
