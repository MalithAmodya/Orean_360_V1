import { registerSchema, loginSchema } from "../utils/validation";

// ─── Unit Tests for Zod Validation Schemas ──────────────────────────────

describe("Register Schema Validation", () => {
  // ── Valid Inputs ──────────────────────────────────────────────────────
  it("should pass with valid registration data", () => {
    const validData = {
      name: "Malith Amodya",
      email: "malith@orean360.com",
      password: "securePass123",
      role: "admin",
    };

    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should pass without role and default to 'user'", () => {
    const data = {
      name: "Sanja Dev",
      email: "sanja@orean360.com",
      password: "password123",
    };

    const result = registerSchema.safeParse(data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.role).toBe("user");
    }
  });

  // ── Invalid Inputs ────────────────────────────────────────────────────
  it("should fail if name is less than 2 characters", () => {
    const data = {
      name: "A",
      email: "test@orean360.com",
      password: "password123",
    };

    const result = registerSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Name must be at least 2 characters"
      );
    }
  });

  it("should fail with an invalid email format", () => {
    const data = {
      name: "Test User",
      email: "not-an-email",
      password: "password123",
    };

    const result = registerSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid email address");
    }
  });

  it("should fail if password is less than 6 characters", () => {
    const data = {
      name: "Test User",
      email: "test@orean360.com",
      password: "123",
    };

    const result = registerSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Password must be at least 6 characters"
      );
    }
  });

  it("should fail with an invalid role", () => {
    const data = {
      name: "Test User",
      email: "test@orean360.com",
      password: "password123",
      role: "superadmin",
    };

    const result = registerSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should fail when email field is missing", () => {
    const data = {
      name: "Test User",
      password: "password123",
    };

    const result = registerSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});

describe("Login Schema Validation", () => {
  it("should pass with valid login credentials", () => {
    const data = {
      email: "malith@orean360.com",
      password: "securePass123",
    };

    const result = loginSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should fail with an invalid email", () => {
    const data = {
      email: "invalid-email",
      password: "password123",
    };

    const result = loginSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should fail with an empty password", () => {
    const data = {
      email: "test@orean360.com",
      password: "",
    };

    const result = loginSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Password is required");
    }
  });

  it("should fail when both fields are missing", () => {
    const data = {};

    const result = loginSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});
