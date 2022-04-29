const reactionTypes = ['like', 'love', 'haha', 'sad', 'angry'] as const

type ReactionType = typeof reactionTypes[number]

export { reactionTypes, ReactionType }
