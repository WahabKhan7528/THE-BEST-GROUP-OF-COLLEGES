import RefreshToken from "../models/RefreshToken.js";

const DEFAULT_REVOKED_TOKEN_RETENTION_DAYS = 30;
const DEFAULT_CLEANUP_INTERVAL_HOURS = 24;

const parsePositiveInteger = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

export const cleanupRevokedRefreshTokens = async () => {
  const retentionDays = parsePositiveInteger(
    process.env.REFRESH_TOKEN_REVOKED_RETENTION_DAYS,
    DEFAULT_REVOKED_TOKEN_RETENTION_DAYS,
  );
  const cutoffDate = new Date(
    Date.now() - retentionDays * 24 * 60 * 60 * 1000,
  );

  const result = await RefreshToken.deleteMany({
    revokedAt: { $exists: true, $lt: cutoffDate },
  });

  return result.deletedCount || 0;
};

export const startRefreshTokenCleanupSchedule = () => {
  const intervalHours = parsePositiveInteger(
    process.env.REFRESH_TOKEN_CLEANUP_INTERVAL_HOURS,
    DEFAULT_CLEANUP_INTERVAL_HOURS,
  );
  const intervalMs = intervalHours * 60 * 60 * 1000;

  const runCleanup = async () => {
    try {
      const deletedCount = await cleanupRevokedRefreshTokens();
      if (deletedCount > 0) {
        console.log(`Refresh token cleanup removed ${deletedCount} revoked tokens`);
      }
    } catch (error) {
      console.error("Refresh token cleanup failed", error);
    }
  };

  void runCleanup();

  const timer = setInterval(runCleanup, intervalMs);
  timer.unref?.();

  return timer;
};