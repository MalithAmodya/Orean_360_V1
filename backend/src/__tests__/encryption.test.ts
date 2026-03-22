import { encrypt, decrypt } from "../utils/encryption";

// ─── Unit Tests for AES-256-GCM Encryption Utility ──────────────────────

// Set a valid 64-character hex key for testing
const TEST_ENCRYPTION_KEY =
  "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2";

beforeAll(() => {
  process.env.ENCRYPTION_KEY = TEST_ENCRYPTION_KEY;
});

afterAll(() => {
  delete process.env.ENCRYPTION_KEY;
});

describe("Encryption Module", () => {
  // ── Encrypt Function ──────────────────────────────────────────────────
  it("should encrypt a plaintext string successfully", () => {
    const plaintext = "my_secret_social_token_12345";
    const encrypted = encrypt(plaintext);

    expect(encrypted).toBeDefined();
    expect(typeof encrypted).toBe("string");
    expect(encrypted).not.toBe(plaintext);
  });

  it("should return encrypted text in iv:authTag:ciphertext format", () => {
    const plaintext = "test_token";
    const encrypted = encrypt(plaintext);

    const parts = encrypted.split(":");
    expect(parts).toHaveLength(3);

    // IV should be 32 hex chars (16 bytes)
    expect(parts[0]).toHaveLength(32);
    // Auth tag should be 32 hex chars (16 bytes)
    expect(parts[1]).toHaveLength(32);
    // Ciphertext should be a non-empty hex string
    expect(parts[2].length).toBeGreaterThan(0);
  });

  it("should produce different ciphertexts for the same plaintext (due to random IV)", () => {
    const plaintext = "same_token_value";
    const encrypted1 = encrypt(plaintext);
    const encrypted2 = encrypt(plaintext);

    expect(encrypted1).not.toBe(encrypted2);
  });

  // ── Decrypt Function ──────────────────────────────────────────────────
  it("should decrypt back to the original plaintext", () => {
    const plaintext = "facebook_access_token_abc123";
    const encrypted = encrypt(plaintext);
    const decrypted = decrypt(encrypted);

    expect(decrypted).toBe(plaintext);
  });

  it("should correctly handle special characters in plaintext", () => {
    const plaintext = "token/with+special=chars&more!@#$%";
    const encrypted = encrypt(plaintext);
    const decrypted = decrypt(encrypted);

    expect(decrypted).toBe(plaintext);
  });

  it("should correctly handle empty string encryption/decryption", () => {
    const plaintext = "";
    const encrypted = encrypt(plaintext);
    const decrypted = decrypt(encrypted);

    expect(decrypted).toBe(plaintext);
  });

  // ── Error Handling ────────────────────────────────────────────────────
  it("should throw error for invalid encrypted text format", () => {
    expect(() => decrypt("invalid_format")).toThrow(
      "Invalid encrypted text format"
    );
  });

  it("should throw error when ENCRYPTION_KEY is not set", () => {
    const originalKey = process.env.ENCRYPTION_KEY;
    delete process.env.ENCRYPTION_KEY;

    expect(() => encrypt("test")).toThrow(
      "ENCRYPTION_KEY is not set in environment variables"
    );

    process.env.ENCRYPTION_KEY = originalKey;
  });

  it("should throw error when ENCRYPTION_KEY has wrong length", () => {
    const originalKey = process.env.ENCRYPTION_KEY;
    process.env.ENCRYPTION_KEY = "tooshort";

    expect(() => encrypt("test")).toThrow(
      "ENCRYPTION_KEY must be a 64-character hex string"
    );

    process.env.ENCRYPTION_KEY = originalKey;
  });
});
