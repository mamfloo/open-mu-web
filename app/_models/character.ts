/* export interface Character {
    id: string
    characterClassId: string 
    currentMapId: string
    inventoryId: string
    accountId: string
    name: string
    characterSlot: number
    createDate: Date
    experience: number
    masterExperience: number
    levelUpPoints: number
    masterLevelUpPoints: number
    positionX: number
    positionY: number
    playerKillCount: number
    stateRemainingSeconds: number
    state: number
    characterStatus: number
    pose: number
    usedFruitPoints: number
    usedNegFruitPoints: number
    inventoryExtensions: number
    keyConfiguration: number
    muHelperConfiguration: number
} */

export interface CharacterRanking {
    Name: string,
    CharacterClassId: string,
    resets: number,
    lvl: number,
    masterlvl: number
    guildStatus: number
}