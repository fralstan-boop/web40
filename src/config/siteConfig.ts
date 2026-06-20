/**
 * Central configuration for all server addresses and external links.
 * Update values here — every component imports from this file.
 */
export const siteConfig = {
  /** Primary server address — Java players paste this directly. */
  serverIp: 'thala.ender.co.in:45627',

  /** Java edition IP (with port). */
  javaIp: 'thala.ender.co.in:45627',

  /** Bedrock edition host (no port — port is separate below). */
  bedrockIp: 'thala.ender.co.in',

  /** Bedrock edition port. */
  bedrockPort: '45627',

  /** BlueMap live world map URL. */
  liveMapUrl: 'http://thala.ender.co.in:45580/',

  /** mcstatus.io query address for server ping (host only, no port). */
  statusQueryHost: 'thala.ender.co.in',

  /** Discord server invite link. */
  discordInvite: 'https://discord.gg/Q6tBHmqzJf',

  // TODO: replace with live data once stats API/source exists
  stats: {
    nationsClaimed: 32,
    warsActive: 5,
    seasonDay: 47,
  },
} as const;
