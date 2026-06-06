import crypto from "crypto";
import jwt from "jsonwebtoken";
import { User } from "@repo/types/auth.types.js";

export class CryptoService {
  private privateKey: string;
  private publicKey: string;
  private keyId: string;

  constructor() {
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "pkcs1", format: "pem" },
      privateKeyEncoding: { type: "pkcs1", format: "pem" }
    });

    this.privateKey = privateKey;
    this.publicKey = publicKey;
    this.keyId = crypto.randomUUID();
  }

  getJwks() {
    return {
      keys: [
        {
          kid: this.keyId,
          kty: "RSA",
          alg: "RS256",
          use: "sig",
          x5c: [
            this.publicKey
              .replace(/-----\s*BEGIN[^-]+-----\s*/g, "")
              .replace(/-----\s*END[^-]+-----\s*/g, "")
              .replace(/\r?\n|\r/g, "")
          ]
        }
      ]
    };
  }

  issueUserToken(user: User): string {
    const payload = {
      sub: user.uid,
      email: user.email,
      name: user.displayName,
      roles: ["provider"]
    };

    return jwt.sign(payload, this.privateKey, {
      algorithm: "RS256",
      expiresIn: "1h",
      keyid: this.keyId,
      issuer: "auth-service"
    });
  }
}

export const cryptoEngine = new CryptoService();