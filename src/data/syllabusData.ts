export const PLAYLIST_ID = 'PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt';
export const PLAYLIST_NAME = 'Apna College - Complete C++ DSA Course';
export const PLAYLIST_URL =
  'https://www.youtube.com/playlist?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt';
export const PLAYLIST_LECTURE_COUNT = 144;

// When a playlist-only lecture (id ACnnn) is later replaced by its real YouTube id,
// the old -> new pair is recorded here so saved progress and notes are carried over.
export const VIDEO_ID_ALIASES: Record<string, string> = {
  AC028: 'varXreLWPRo',
  AC006: 'xpy5NXiBFvA',
  AC034: 'Y4KdgqV1IqA',
  AC010: '9IZYqostl2M',
  AC011: '_xqIp2rj8bo',
  AC013: 'WBzZCm46mFo',
  AC014: 'EbkMABpP52U',
  AC015: 'TW2m8m_FNJE',
  AC036: 'LEFFjgt5i6w',
  AC037: 'XMpdvwUObho',
  AC030: 'dSRFgEs3a6A',
  AC031: 'VXewy91P0S4',
  AC033: 'cAB15h6-sWA',
  AC018: '6WNZQBHWQJs',
  AC019: 'RjxD6UXGlhc',
  AC020: 'qsbCBduIs40',
  AC021: 'JRAByolWqhw',
  AC022: 'srsFN5OHBgw',
  AC023: '7wOzDqsfXy0',
  AC026: '-1cLK6PaLsQ',
  AC058: 'R-CKBYnOv1U',
  AC059: 'nzaHG0dme4g',
  AC060: '-1E8ZMS0gSs',
  AC061: 'f8RPIb-0DDE',
  AC062: '8ze7Zopdsaw',
  AC065: 'I8b0rff5F9M',
  AC066: '-swgIiMIlJo',
  AC067: 'wwbTMNVlFHQ',
  AC078: 'GsY6y0iPaHw',
  AC039: 'K-RsltkN63w',
  AC040: 'X6sL8JTROLY',
  AC041: 'KDH4mhFVvHw',
  AC069: 'NlHupEeDXzY',
  AC070: '01vBuZyMfqk',
  AC072: 'WnjUfBn9nZM',
  AC073: 'wHDm-N2m2XY',
  AC074: 'ysy1o-QEj3k',
  AC075: 'If--3pm9K3U',
  AC076: 'UHHp8USwx4M',
  AC077: 'OZPmEA_8FM8',
  AC081: 'sFvP5Ois0CE',
  AC082: 'sqyCBvEQN9c',
  AC083: 'XwG5cozqfaM',
  AC084: 'SmTow5Ht4iU',
  AC045: 'N4gJDGdhpLw',
  AC046: 'BdSJnIdR-4s',
  AC047: '70cP3qtJp-s',
  AC048: 'D8Yze9CDDAw',
  AC049: 'jkgZw2WEaqA',
  AC050: 'aZ0B1eWkSVU',
  AC055: 'Sp1jzttFVdE',
  AC053: 'SBQfXK7q5K4',
  AC054: 'ynnWDBTdVi0',
  AC086: '7tzHzN_Ehus',
  AC087: 'tumW7jsjv68',
  AC088: 'aPyDPImR5UM',
  AC089: 'FGr-syrhvOA',
  AC090: 'ze4JO_ODl3w',
  AC091: 'oX5D0uKOMck',
  AC092: '33b1M980cCA',
  AC093: 'TY6kEejJEM0',
  AC094: 'AWJD__CfM6A',
  AC095: 'rhz-csskg_A',
  AC096: 'PUfADhkq1LI',
  AC097: 'dU2Z5HWSGM0',
  AC099: '0s6sCjs_4g0',
  AC100: 'dSBcCynP1nA',
  AC101: 'WZmjRXF_Zi4',
  AC102: 'ORxkZ12FrU4',
  AC103: 'Kq4BbvIhj44',
  AC104: '-n5Ur1wE5Jc',
  AC105: 'AiKZjCuy2k4',
  AC106: '0KGzfij_SCk',
  AC107: 'Pr-HFxp7npk',
  AC108: 'a8VKpW1DsD8',
  AC109: 'dS1bKglre3A',
  AC116: 'AME6baBpswY',
  AC117: 'RmXo5SWkhCs',
  AC118: 'J3F7g0hQdJk',
  AC122: 'JI_e2RzARbM',
  AC120: '37cJ38HadM4',
  AC121: 'rZsgWxodGmM',
  AC133: '6h1SucBNxgc',
  AC134: 'cn7pov3BEmg',
  AC135: 'lqY8TE0P1S8',
  AC124: '8gYBHjtjWBI',
  AC125: '3rFHlbJ7qKc',
  AC127: 'Sflh1z6cIMk',
  AC128: 'nnrjWxWMo3E',
  AC129: 'inoM6jwj1CA',
  AC130: 'J1yCPIP-K8s',
  AC131: 'mEx8JJQJUs8',
  AC132: 'CLmykzpeCCs',
  AC136: 'iZBXd-vjHUA',
  AC137: 'uBA8DkCBdco',
  AC138: '3GzA0mz6wp0',
  AC139: 'BRmLlJA6ncI',
  AC140: 'hSMJj9AdNBo',
  AC141: 'AKqlgskrZwI',
  AC142: 'KwItlcfF9vE',
  AC143: 'yggezlvUN2w',
  AC144: 'tEW-zDckvFw'
};

// ==========================================
// SYLLABUS UPDATE: subtopic progress migration
// Progress is stored per subtopic POSITION (`<unitId>_sub_<index>`). When a unit's subtopic list
// changes, SUBTOPIC_MIGRATION maps NEW index -> OLD index (null = brand-new topic) so ticks made
// before the update are carried over once. `subtopicSchema` in the saved state records that it ran.
// ==========================================
export const SUBTOPIC_SCHEMA = 2;
export const SUBTOPIC_MIGRATION: Record<string, (number | null)[]> = {
  'P1-U1': [0, 1, 2, null, 3, 3],
  'P1-U2A': [0, 0, 1, 1, 2, 3, 3, 3],
  'P1-U2B': [2, 0, 1],
  'P1-U3A': [0, 1, 2, null, 3],
  'P1-U3B': [0, null, 1, 2, 3],
  'P1-U4': [null, 0, 1, 2, 3],
  'P1-U5A': [0, null, 1, 2, 2],
  'P2-U1': [null, null, 0, null, 1, 2, 2, 3],
  'P2-U2': [0, 1, 2, 2, null],
  'P2-U3': [0, 0, 1, 2, null, 3, 3],
  'P2-U4': [null, 0, null, null, 1, 2, null],
  'P2-U5': [0, 1, 1, null, 2, 2, 2],
  'P3-U1A': [0, 0, 1, 2, 2],
  'P3-U1B': [0, 0, 1, 2],
  'P3-U2A': [null, 0, 1, null, 1, 2],
  'P3-U3': [null, 0, 0, 1, 1, null, 2, 2, 2, 2, 3, 3],
  'P3-U4': [0, 1, 1, 2, 2, null],
  'P3-U5A': [0, 1, 2],
  'P3-U5B': [null, 0, 1, 2, 2]
};

export function migrateSubtopicProgress<
  T extends { completedSubtopics?: Record<string, boolean>; subtopicSchema?: number }
>(st: T): T {
  if (!st || st.subtopicSchema === SUBTOPIC_SCHEMA) return st;
  const old = st.completedSubtopics || {};
  const next = { ...old };
  Object.entries(SUBTOPIC_MIGRATION).forEach(([unitId, newToOld]) => {
    Object.keys(old).forEach((k) => {
      if (k.startsWith(unitId + '_sub_') && /^\d+$/.test(k.slice((unitId + '_sub_').length)))
        delete next[k];
    });
    newToOld.forEach((oldIdx, newIdx) => {
      if (oldIdx !== null && old[`${unitId}_sub_${oldIdx}`]) next[`${unitId}_sub_${newIdx}`] = true;
    });
  });
  return { ...st, completedSubtopics: next, subtopicSchema: SUBTOPIC_SCHEMA };
}
