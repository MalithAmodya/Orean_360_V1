import { authMiddleware, AuthRequest } from "../middleware/authMiddleware";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// ─── Unit Tests for JWT Authentication Middleware ────────────────────────

const JWT_SECRET = process.env.JWT_SECRET || "orean360_super_secret_key";

// Helper to create mock Express request/response/next objects
const mockRequest = (authHeader?: string): Partial<AuthRequest> => ({
  headers: authHeader ? { authorization: authHeader } : {},
});

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext: NextFunction = jest.fn();

describe("Auth Middleware  JWT Token Verification", () => {
  // ── Successful Authentication ────────────────────────────────────────
  it("should call next() with a valid JWT token", () => {
    const payload = { id: 1, email: "malith@orean360.com", role: "admin" };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    const req = mockRequest(`Bearer ${token}`) as AuthRequest;
    const res = mockResponse() as Response;

    authMiddleware(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(req.user).toBeDefined();
    expect(req.user?.email).toBe("malith@orean360.com");
    expect(req.user?.role).toBe("admin");
  });

  // ── Missing Token ────────────────────────────────────────────────────
  it("should return 401 when no authorization header is provided", () => {
    const req = mockRequest() as AuthRequest;
    const res = mockResponse() as Response;
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "No token provided" });
    expect(next).not.toHaveBeenCalled();
  });

  // ── Invalid Token Format ─────────────────────────────────────────────
  it("should return 401 when token format is invalid (no Bearer prefix)", () => {
    const req = mockRequest("InvalidTokenFormat") as AuthRequest;
    const res = mockResponse() as Response;
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  // ── Expired Token ────────────────────────────────────────────────────
  it("should return 401 when the JWT token has expired", () => {
    const payload = { id: 1, email: "test@orean360.com", role: "user" };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "0s" });

    const req = mockRequest(`Bearer ${token}`) as AuthRequest;
    const res = mockResponse() as Response;
    const next = jest.fn();

    // Small delay to ensure expiry
    setTimeout(() => {
      authMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
      expect(next).not.toHaveBeenCalled();
    }, 100);
  });

  // ── Tampered Token ───────────────────────────────────────────────────
  it("should return 401 when the token is signed with a wrong secret", () => {
    const payload = { id: 1, email: "hacker@evil.com", role: "admin" };
    const token = jwt.sign(payload, "wrong_secret_key");

    const req = mockRequest(`Bearer ${token}`) as AuthRequest;
    const res = mockResponse() as Response;
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
    expect(next).not.toHaveBeenCalled();
  });

  // ── Malformed Token ──────────────────────────────────────────────────
  it("should return 401 when the token is completely malformed", () => {
    const req = mockRequest("Bearer this.is.not.a.jwt") as AuthRequest;
    const res = mockResponse() as Response;
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
    expect(next).not.toHaveBeenCalled();
  });
});
