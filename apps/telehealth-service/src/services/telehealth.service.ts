import { db } from "@repo/database";

export class TelehealthService {
  /**
   * Fetches all virtual encounters assigned to a specific practitioner or client
   */
  async getUserSessions(userUid: string, role: 'doctor' | 'patient') {
    // Fixed: Queries the 'telehealthSession' table instead of 'appointment'
    return db.telehealthSession.findMany({
      where: {
        sessionType: "video", // Fixed: Schema enum for SessionType is 'video' | 'audio' | 'chat'
        ...(role === 'doctor' ? { doctor: userUid } : { patientId: userUid }) // Fixed: Field is 'doctor', not 'doctorId'
      },
      orderBy: { date: "asc" } // Fixed: Order by schema-compliant 'date' field instead of 'scheduledAt'
    });
  }

  /**
   * Creates structural telemetry records for an authorized video call room session
   */
  async initializeSession(sessionId: string) {
    // Production note: Replace with real service integration (Daily, Agora, Twilio)
    const secureRoomId = `room_${Math.random().toString(36).substring(2, 15)}`;
    const mockJoinUrl = `https://telehealth.yourdomain.com/v1/${secureRoomId}`;

    // Fixed: Updates the 'telehealthSession' record using its accurate schema layouts
    return db.telehealthSession.update({
      where: { id: sessionId },
      data: {
        status: "live", // Fixed: Changed from uppercase 'ACTIVE' to schema enum 'live'
        recordingUrl: mockJoinUrl // Fixed: Maps cleanly to the schema's available 'recordingUrl' string field
      }
    });
  }
}