import { encrypt, decrypt } from "../utils/encryption";
import { registerSchema, loginSchema } from "../utils/validation";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// ─── Performance Tests for Orean 360 Backend ────────────────────────────
// These tests measure execution speed and throughput of critical modules.

const JWT_SECRET = process.env.JWT_SECRET || "orean360_super_secret_key";
const TEST_ENCRYPTION_KEY =
  "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2";

beforeAll(() => {
  process.env.ENCRYPTION_KEY = TEST_ENCRYPTION_KEY;
});

afterAll(() => {
  delete process.env.ENCRYPTION_KEY;
});

// ─── Helper: Measure execution time ─────────────────────────────────────
function measureTime(fn: () => void): number {
  const start = performance.now();
  fn();
  const end = performance.now();
  return end - start;
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. ENCRYPTION PERFORMANCE
// ═══════════════════════════════════════════════════════════════════════════

describe("Performance – Encryption Module", () => {
  const ITERATIONS = 1000;

  it(`should encrypt ${ITERATIONS} tokens in under 2 seconds`, () => {
    const plaintext = "facebook_access_token_abc123xyz456";

    const elapsed = measureTime(() => {
      for (let i = 0; i < ITERATIONS; i++) {
        encrypt(plaintext);
      }
    });

    console.log(
      `  ⚡ Encryption: ${ITERATIONS} operations in ${elapsed.toFixed(2)}ms ` +
        `(${(elapsed / ITERATIONS).toFixed(3)}ms per operation)`
    );

    expect(elapsed).toBeLessThan(2000);
  });

  it(`should decrypt ${ITERATIONS} tokens in under 2 seconds`, () => {
    const plaintext = "instagram_token_secret_value_12345";
    const encrypted = encrypt(plaintext);

    const elapsed = measureTime(() => {
      for (let i = 0; i < ITERATIONS; i++) {
        decrypt(encrypted);
      }
    });

    console.log(
      `  ⚡ Decryption: ${ITERATIONS} operations in ${elapsed.toFixed(2)}ms ` +
        `(${(elapsed / ITERATIONS).toFixed(3)}ms per operation)`
    );

    expect(elapsed).toBeLessThan(2000);
  });

  it(`should handle encrypt + decrypt round-trip for ${ITERATIONS} cycles`, () => {
    const tokens = [
      "meta_page_access_token_long_string_here",
      "youtube_refresh_token_xyz",
      "tiktok_bearer_token",
    ];

    const elapsed = measureTime(() => {
      for (let i = 0; i < ITERATIONS; i++) {
        const token = tokens[i % tokens.length];
        const encrypted = encrypt(token);
        const decrypted = decrypt(encrypted);
        expect(decrypted).toBe(token);
      }
    });

    console.log(
      `  ⚡ Full round-trip: ${ITERATIONS} cycles in ${elapsed.toFixed(2)}ms ` +
        `(${(elapsed / ITERATIONS).toFixed(3)}ms per cycle)`
    );

    expect(elapsed).toBeLessThan(4000);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// 2. VALIDATION PERFORMANCE
// ═══════════════════════════════════════════════════════════════════════════

describe("Performance – Zod Validation Schemas", () => {
  const ITERATIONS = 5000;

  it(`should validate ${ITERATIONS} registration payloads in under 2 seconds`, () => {
    const validData = {
      name: "Performance Test User",
      email: "perftest@orean360.com",
      password: "securePassword123",
      role: "designer",
    };

    const elapsed = measureTime(() => {
      for (let i = 0; i < ITERATIONS; i++) {
        registerSchema.safeParse(validData);
      }
    });

    console.log(
      `  ⚡ Register validation: ${ITERATIONS} parses in ${elapsed.toFixed(2)}ms ` +
        `(${(elapsed / ITERATIONS).toFixed(3)}ms per parse)`
    );

    expect(elapsed).toBeLessThan(2000);
  });

  it(`should validate ${ITERATIONS} login payloads in under 1 second`, () => {
    const validData = {
      email: "login@orean360.com",
      password: "myPassword",
    };

    const elapsed = measureTime(() => {
      for (let i = 0; i < ITERATIONS; i++) {
        loginSchema.safeParse(validData);
      }
    });

    console.log(
      `  ⚡ Login validation: ${ITERATIONS} parses in ${elapsed.toFixed(2)}ms ` +
        `(${(elapsed / ITERATIONS).toFixed(3)}ms per parse)`
    );

    expect(elapsed).toBeLessThan(1000);
  });

  it(`should reject ${ITERATIONS} invalid payloads in under 2 seconds`, () => {
    const invalidData = {
      name: "X",
      email: "not-an-email",
      password: "12",
      role: "hacker",
    };

    const elapsed = measureTime(() => {
      for (let i = 0; i < ITERATIONS; i++) {
        registerSchema.safeParse(invalidData);
      }
    });

    console.log(
      `  ⚡ Invalid rejection: ${ITERATIONS} parses in ${elapsed.toFixed(2)}ms ` +
        `(${(elapsed / ITERATIONS).toFixed(3)}ms per parse)`
    );

    expect(elapsed).toBeLessThan(2000);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// 3. AUTH MIDDLEWARE PERFORMANCE
// ═══════════════════════════════════════════════════════════════════════════

describe("Performance – JWT Auth Middleware", () => {
  const ITERATIONS = 1000;

  // Helper to create mock objects
  const mockReq = (authHeader?: string): Partial<AuthRequest> => ({
    headers: authHeader ? { authorization: authHeader } : {},
  });

  const mockRes = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it(`should verify ${ITERATIONS} valid JWT tokens in under 3 seconds`, () => {
    const payload = { id: 1, email: "bench@orean360.com", role: "admin" };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    const elapsed = measureTime(() => {
      for (let i = 0; i < ITERATIONS; i++) {
        const req = mockReq(`Bearer ${token}`) as AuthRequest;
        const res = mockRes() as Response;
        const next = jest.fn();
        authMiddleware(req, res, next);
      }
    });

    console.log(
      `  ⚡ JWT verification: ${ITERATIONS} tokens in ${elapsed.toFixed(2)}ms ` +
        `(${(elapsed / ITERATIONS).toFixed(3)}ms per verification)`
    );

    expect(elapsed).toBeLessThan(3000);
  });

  it(`should reject ${ITERATIONS} invalid tokens in under 3 seconds`, () => {
    const token = jwt.sign({ id: 1 }, "wrong_secret");

    const elapsed = measureTime(() => {
      for (let i = 0; i < ITERATIONS; i++) {
        const req = mockReq(`Bearer ${token}`) as AuthRequest;
        const res = mockRes() as Response;
        const next = jest.fn();
        authMiddleware(req, res, next);
      }
    });

    console.log(
      `  ⚡ JWT rejection: ${ITERATIONS} invalid tokens in ${elapsed.toFixed(2)}ms ` +
        `(${(elapsed / ITERATIONS).toFixed(3)}ms per rejection)`
    );

    expect(elapsed).toBeLessThan(3000);
  });

  it("should process a single token verification in under 5ms", () => {
    const payload = { id: 42, email: "speed@orean360.com", role: "designer" };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    const req = mockReq(`Bearer ${token}`) as AuthRequest;
    const res = mockRes() as Response;
    const next = jest.fn();

    const elapsed = measureTime(() => {
      authMiddleware(req, res, next);
    });

    console.log(`  ⚡ Single JWT verification: ${elapsed.toFixed(3)}ms`);

    expect(elapsed).toBeLessThan(5);
  });
});
