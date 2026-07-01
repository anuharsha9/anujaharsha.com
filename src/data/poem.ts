/**
 * "Gifts from Life" — 12-stanza poem written by Anuja.
 * Source of truth for both /me (full immersive experience) and the Life tab teaser.
 */

export interface PoemStanza {
    lines: string[]
    gift: string
    giftLine: number
}

export const POEM_STANZAS: PoemStanza[] = [
    { lines: ['Opening my eyes to this beautiful world', 'I see the creator of my life,', 'Life gave me the gift of mother;', 'To be loved, nurtured, and cared for,'], gift: 'mother', giftLine: 2 },
    { lines: ['In the struggle to get up after a fall', 'I see the person who lifts me up,', 'Life gave me the gift of a father;', 'To be loved and feel secure,'], gift: 'father', giftLine: 2 },
    { lines: ["When I’m a blank canvas and lost", 'I see what helps me build my existence,', 'Life gave me the gift of a teacher;', "To guide me through it’s path,"], gift: 'teacher', giftLine: 2 },
    { lines: ['Try to cope with the ups and downs of life', "I see the person who’s always with me,", 'Life gave me the gift of a sister;', 'To share my happiness and sadness,'], gift: 'sister', giftLine: 2 },
    { lines: ["When love loses its meaning, and I’m fading", 'I see what helps me to hold on to it,', 'Life gave me the gift of motherhood;', 'To teach me the meaning of love,'], gift: 'motherhood', giftLine: 2 },
    { lines: ['In a world where everyone comes and goes alone', 'I see what helps me through this forsaken journey,', 'Life gave me the gift of a husband;', 'To have someone to belong to,'], gift: 'husband', giftLine: 2 },
    { lines: ['In the moments when I feel nothing is right', 'I see what brings me comfort,', 'Life gave me the gift of a friend;', 'To have a shoulder to cry on,'], gift: 'friend', giftLine: 2 },
    { lines: ['In the midst of all that is happening', 'I see a smile on my face, trying to push through,', 'Life gave me the gift of joy;', "To enjoy it’s beauty and gifts,"], gift: 'joy', giftLine: 2 },
    { lines: ['When I start becoming scornful', 'I see what teaches me a lesson,', 'Life gave me the gift of pain;', 'To make me grounded and grateful,'], gift: 'pain', giftLine: 2 },
    { lines: ['When I go blind with my fantasies', 'I see what opens my eyes,', 'Life gave me the gift of loss;', 'To enlighten me of the world,'], gift: 'loss', giftLine: 2 },
    { lines: ['When agony and grief overwhelm me', 'I see what cuts through my bitterness,', 'Life gave me the gift of love;', 'To make me kind and benevolent,'], gift: 'love', giftLine: 2 },
    { lines: ['Where everything and everyone is just temporary', 'I see what helps me treasure the evanescent,', 'Life gave me the gift of art;', 'To be able to express myself.'], gift: 'art', giftLine: 2 },
]
